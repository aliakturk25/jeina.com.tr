using System.Text.Json;
using Microsoft.Data.SqlClient;

var options = new WebApplicationOptions
{
    Args = args,
    WebRootPath = Directory.Exists(Path.Combine(AppContext.BaseDirectory, "wwwroot"))
        ? Path.Combine(AppContext.BaseDirectory, "wwwroot")
        : AppContext.BaseDirectory
};

var builder = WebApplication.CreateBuilder(options);

builder.Services.AddCors(corsOptions =>
{
    corsOptions.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

app.UseCors("AllowAll");
app.UseDefaultFiles();
app.UseStaticFiles();

const string ConnStr = "Server=77.245.159.112;Database=jeinacomtr;User Id=jeinacomtr;Password=PJdb*ul33gMw5a~f;TrustServerCertificate=True;Encrypt=False;Connect Timeout=15;";

// 1. Auth Endpoint
app.MapPost("/api/auth/login", (LoginRequest req) =>
{
    if ((req.Username == "admin" || req.Username == "jeina") && (req.Password == "Jeina2026!" || req.Password == "admin"))
    {
        return Results.Ok(new { success = true, token = "jeina-auth-token-ok", username = req.Username });
    }
    return Results.BadRequest(new { success = false, message = "Kullanıcı adı veya şifre hatalı." });
});

// 2. Demo Leads Endpoints
app.MapGet("/api/leads", () =>
{
    var list = new List<object>();
    using var conn = new SqlConnection(ConnStr);
    conn.Open();
    using var cmd = new SqlCommand("SELECT Id, FullName, CompanyName, Phone, Email, MonthlyOrders, Marketplaces, InterestedPackage, Notes, Status, CONVERT(varchar, CreatedAt, 120) as CreatedAt FROM DemoLeads ORDER BY Id DESC", conn);
    using var reader = cmd.ExecuteReader();
    while (reader.Read())
    {
        var rawMps = reader.IsDBNull(6) ? "" : reader.GetString(6);
        var mps = rawMps.Split(new[] { ',', ';' }, StringSplitOptions.RemoveEmptyEntries).Select(s => s.Trim()).ToArray();
        list.Add(new
        {
            id = "lead-" + reader.GetInt32(0),
            fullName = reader.GetString(1),
            companyName = reader.GetString(2),
            phone = reader.GetString(3),
            email = reader.GetString(4),
            monthlyOrders = reader.IsDBNull(5) ? "" : reader.GetString(5),
            marketplaces = mps,
            interestedPackage = reader.IsDBNull(7) ? "" : reader.GetString(7),
            notes = reader.IsDBNull(8) ? "" : reader.GetString(8),
            status = reader.GetString(9),
            createdAt = reader.GetString(10)
        });
    }
    return Results.Ok(list);
});

app.MapPost("/api/leads", (CreateLeadRequest req) =>
{
    using var conn = new SqlConnection(ConnStr);
    conn.Open();
    using var cmd = new SqlCommand(@"
        INSERT INTO DemoLeads (FullName, CompanyName, Phone, Email, MonthlyOrders, Marketplaces, InterestedPackage, Notes, Status, CreatedAt)
        VALUES (@FullName, @CompanyName, @Phone, @Email, @MonthlyOrders, @Marketplaces, @InterestedPackage, @Notes, 'Yeni', GETDATE());
        SELECT SCOPE_IDENTITY();", conn);
    
    cmd.Parameters.AddWithValue("@FullName", req.FullName ?? "");
    cmd.Parameters.AddWithValue("@CompanyName", req.CompanyName ?? "");
    cmd.Parameters.AddWithValue("@Phone", req.Phone ?? "");
    cmd.Parameters.AddWithValue("@Email", req.Email ?? "");
    cmd.Parameters.AddWithValue("@MonthlyOrders", (object?)req.MonthlyOrders ?? DBNull.Value);
    cmd.Parameters.AddWithValue("@Marketplaces", req.Marketplaces != null ? string.Join(", ", req.Marketplaces) : (object)DBNull.Value);
    cmd.Parameters.AddWithValue("@InterestedPackage", (object?)req.InterestedPackage ?? DBNull.Value);
    cmd.Parameters.AddWithValue("@Notes", (object?)req.Notes ?? DBNull.Value);

    var id = Convert.ToInt32(cmd.ExecuteScalar());
    return Results.Ok(new { success = true, id = "lead-" + id });
});

app.MapPut("/api/leads/{id}/status", (string id, UpdateStatusRequest req) =>
{
    var rawId = id.Replace("lead-", "");
    if (!int.TryParse(rawId, out int intId)) return Results.BadRequest();

    using var conn = new SqlConnection(ConnStr);
    conn.Open();
    using var cmd = new SqlCommand("UPDATE DemoLeads SET Status = @Status WHERE Id = @Id", conn);
    cmd.Parameters.AddWithValue("@Status", req.Status);
    cmd.Parameters.AddWithValue("@Id", intId);
    cmd.ExecuteNonQuery();

    return Results.Ok(new { success = true });
});

app.MapDelete("/api/leads/{id}", (string id) =>
{
    var rawId = id.Replace("lead-", "");
    if (!int.TryParse(rawId, out int intId)) return Results.BadRequest();

    using var conn = new SqlConnection(ConnStr);
    conn.Open();
    using var cmd = new SqlCommand("DELETE FROM DemoLeads WHERE Id = @Id", conn);
    cmd.Parameters.AddWithValue("@Id", intId);
    cmd.ExecuteNonQuery();

    return Results.Ok(new { success = true });
});

// 3. Contact Messages Endpoints
app.MapGet("/api/contact", () =>
{
    var list = new List<object>();
    using var conn = new SqlConnection(ConnStr);
    conn.Open();
    using var cmd = new SqlCommand("SELECT Id, FullName, Email, Phone, Subject, Message, IsRead, CONVERT(varchar, CreatedAt, 120) as CreatedAt FROM ContactMessages ORDER BY Id DESC", conn);
    using var reader = cmd.ExecuteReader();
    while (reader.Read())
    {
        list.Add(new
        {
            id = "msg-" + reader.GetInt32(0),
            fullName = reader.GetString(1),
            email = reader.GetString(2),
            phone = reader.IsDBNull(3) ? "" : reader.GetString(3),
            subject = reader.IsDBNull(4) ? "" : reader.GetString(4),
            message = reader.GetString(5),
            isRead = reader.GetBoolean(6),
            createdAt = reader.GetString(7)
        });
    }
    return Results.Ok(list);
});

app.MapPost("/api/contact", (CreateMessageRequest req) =>
{
    using var conn = new SqlConnection(ConnStr);
    conn.Open();
    using var cmd = new SqlCommand(@"
        INSERT INTO ContactMessages (FullName, Email, Phone, Subject, Message, IsRead, CreatedAt)
        VALUES (@FullName, @Email, @Phone, @Subject, @Message, 0, GETDATE());
        SELECT SCOPE_IDENTITY();", conn);
    
    cmd.Parameters.AddWithValue("@FullName", req.FullName ?? "");
    cmd.Parameters.AddWithValue("@Email", req.Email ?? "");
    cmd.Parameters.AddWithValue("@Phone", (object?)req.Phone ?? DBNull.Value);
    cmd.Parameters.AddWithValue("@Subject", (object?)req.Subject ?? DBNull.Value);
    cmd.Parameters.AddWithValue("@Message", req.Message ?? "");

    var id = Convert.ToInt32(cmd.ExecuteScalar());
    return Results.Ok(new { success = true, id = "msg-" + id });
});

app.MapPut("/api/contact/{id}/read", (string id) =>
{
    var rawId = id.Replace("msg-", "");
    if (!int.TryParse(rawId, out int intId)) return Results.BadRequest();

    using var conn = new SqlConnection(ConnStr);
    conn.Open();
    using var cmd = new SqlCommand("UPDATE ContactMessages SET IsRead = 1 WHERE Id = @Id", conn);
    cmd.Parameters.AddWithValue("@Id", intId);
    cmd.ExecuteNonQuery();

    return Results.Ok(new { success = true });
});

app.MapDelete("/api/contact/{id}", (string id) =>
{
    var rawId = id.Replace("msg-", "");
    if (!int.TryParse(rawId, out int intId)) return Results.BadRequest();

    using var conn = new SqlConnection(ConnStr);
    conn.Open();
    using var cmd = new SqlCommand("DELETE FROM ContactMessages WHERE Id = @Id", conn);
    cmd.Parameters.AddWithValue("@Id", intId);
    cmd.ExecuteNonQuery();

    return Results.Ok(new { success = true });
});

// 4. Packages Endpoints
app.MapGet("/api/packages", () =>
{
    var list = new List<object>();
    using var conn = new SqlConnection(ConnStr);
    conn.Open();
    using var cmd = new SqlCommand("SELECT Id, Name, Badge, IsPopular, PriceMonthly, PriceAnnualMonthly, Description, MarketplaceCount, SyncSpeed, OrderLimit, WarehouseModule, PriceProtection, CommissionAnalysis, SupportLevel, FeaturesJson FROM IntegrationPackages ORDER BY PriceMonthly ASC", conn);
    using var reader = cmd.ExecuteReader();
    while (reader.Read())
    {
        var rawJson = reader.IsDBNull(14) ? "[]" : reader.GetString(14);
        string[] features;
        try
        {
            features = JsonSerializer.Deserialize<string[]>(rawJson) ?? Array.Empty<string>();
        }
        catch
        {
            var clean = rawJson.Trim('[', ']');
            features = clean.Split(new[] { ',', ';' }, StringSplitOptions.RemoveEmptyEntries)
                            .Select(s => s.Trim('"', ' ', '\r', '\n'))
                            .Where(s => !string.IsNullOrWhiteSpace(s))
                            .ToArray();
        }
        list.Add(new
        {
            id = reader.GetString(0),
            name = reader.GetString(1),
            badge = reader.IsDBNull(2) ? "" : reader.GetString(2),
            isPopular = reader.GetBoolean(3),
            priceMonthly = (double)reader.GetDecimal(4),
            priceAnnualMonthly = (double)reader.GetDecimal(5),
            description = reader.IsDBNull(6) ? "" : reader.GetString(6),
            marketplaceCount = reader.IsDBNull(7) ? "" : reader.GetString(7),
            syncSpeed = reader.IsDBNull(8) ? "" : reader.GetString(8),
            orderLimit = reader.IsDBNull(9) ? "" : reader.GetString(9),
            warehouseModule = reader.IsDBNull(10) ? "" : reader.GetString(10),
            priceProtection = reader.IsDBNull(11) ? "" : reader.GetString(11),
            commissionAnalysis = reader.IsDBNull(12) ? "" : reader.GetString(12),
            supportLevel = reader.IsDBNull(13) ? "" : reader.GetString(13),
            features = features
        });
    }
    return Results.Ok(list);
});

app.MapPost("/api/packages", (PackageDto pkg) =>
{
    using var conn = new SqlConnection(ConnStr);
    conn.Open();
    using var cmd = new SqlCommand(@"
        MERGE IntegrationPackages AS target
        USING (SELECT @Id AS Id) AS source
        ON (target.Id = source.Id)
        WHEN MATCHED THEN
            UPDATE SET Name=@Name, Badge=@Badge, IsPopular=@IsPopular, PriceMonthly=@PriceMonthly,
                       PriceAnnualMonthly=@PriceAnnualMonthly, Description=@Description,
                       MarketplaceCount=@MarketplaceCount, SyncSpeed=@SyncSpeed, OrderLimit=@OrderLimit,
                       WarehouseModule=@WarehouseModule, PriceProtection=@PriceProtection,
                       CommissionAnalysis=@CommissionAnalysis, SupportLevel=@SupportLevel, FeaturesJson=@FeaturesJson
        WHEN NOT MATCHED THEN
            INSERT (Id, Name, Badge, IsPopular, PriceMonthly, PriceAnnualMonthly, Description,
                    MarketplaceCount, SyncSpeed, OrderLimit, WarehouseModule, PriceProtection,
                    CommissionAnalysis, SupportLevel, FeaturesJson)
            VALUES (@Id, @Name, @Badge, @IsPopular, @PriceMonthly, @PriceAnnualMonthly, @Description,
                    @MarketplaceCount, @SyncSpeed, @OrderLimit, @WarehouseModule, @PriceProtection,
                    @CommissionAnalysis, @SupportLevel, @FeaturesJson);", conn);

    cmd.Parameters.AddWithValue("@Id", pkg.Id);
    cmd.Parameters.AddWithValue("@Name", pkg.Name);
    cmd.Parameters.AddWithValue("@Badge", (object?)pkg.Badge ?? DBNull.Value);
    cmd.Parameters.AddWithValue("@IsPopular", pkg.IsPopular);
    cmd.Parameters.AddWithValue("@PriceMonthly", (decimal)pkg.PriceMonthly);
    cmd.Parameters.AddWithValue("@PriceAnnualMonthly", (decimal)pkg.PriceAnnualMonthly);
    cmd.Parameters.AddWithValue("@Description", (object?)pkg.Description ?? DBNull.Value);
    cmd.Parameters.AddWithValue("@MarketplaceCount", (object?)pkg.MarketplaceCount ?? DBNull.Value);
    cmd.Parameters.AddWithValue("@SyncSpeed", (object?)pkg.SyncSpeed ?? DBNull.Value);
    cmd.Parameters.AddWithValue("@OrderLimit", (object?)pkg.OrderLimit ?? DBNull.Value);
    cmd.Parameters.AddWithValue("@WarehouseModule", (object?)pkg.WarehouseModule ?? DBNull.Value);
    cmd.Parameters.AddWithValue("@PriceProtection", (object?)pkg.PriceProtection ?? DBNull.Value);
    cmd.Parameters.AddWithValue("@CommissionAnalysis", (object?)pkg.CommissionAnalysis ?? DBNull.Value);
    cmd.Parameters.AddWithValue("@SupportLevel", (object?)pkg.SupportLevel ?? DBNull.Value);
    cmd.Parameters.AddWithValue("@FeaturesJson", JsonSerializer.Serialize(pkg.Features ?? Array.Empty<string>()));

    cmd.ExecuteNonQuery();
    return Results.Ok(new { success = true, id = pkg.Id });
});

app.MapDelete("/api/packages/{id}", (string id) =>
{
    using var conn = new SqlConnection(ConnStr);
    conn.Open();
    using var cmd = new SqlCommand("DELETE FROM IntegrationPackages WHERE Id = @Id", conn);
    cmd.Parameters.AddWithValue("@Id", id);
    cmd.ExecuteNonQuery();
    return Results.Ok(new { success = true });
});

// 5. Dynamic Pages Endpoints
app.MapGet("/api/pages", () =>
{
    var list = new List<object>();
    using var conn = new SqlConnection(ConnStr);
    conn.Open();
    using var cmd = new SqlCommand("SELECT Id, Slug, Title, MetaDescription, HeroBadge, HeroTitle, HeroSubtitle, TargetMarketplace, BlocksJson, IsActive, CONVERT(varchar, CreatedAt, 120), CONVERT(varchar, UpdatedAt, 120) FROM DynamicPages WHERE IsActive = 1", conn);
    using var reader = cmd.ExecuteReader();
    while (reader.Read())
    {
        var rawJson = reader.IsDBNull(8) ? "[]" : reader.GetString(8);
        object? blocks;
        try
        {
            blocks = JsonSerializer.Deserialize<object>(rawJson);
        }
        catch
        {
            blocks = new object[] { };
        }
        list.Add(new
        {
            id = reader.GetString(0),
            slug = reader.GetString(1),
            title = reader.GetString(2),
            metaDescription = reader.IsDBNull(3) ? "" : reader.GetString(3),
            heroBadge = reader.IsDBNull(4) ? "" : reader.GetString(4),
            heroTitle = reader.GetString(5),
            heroSubtitle = reader.IsDBNull(6) ? "" : reader.GetString(6),
            targetMarketplace = reader.IsDBNull(7) ? "" : reader.GetString(7),
            blocks = blocks,
            isActive = reader.GetBoolean(9),
            createdAt = reader.GetString(10),
            updatedAt = reader.GetString(11)
        });
    }
    return Results.Ok(list);
});

app.MapPost("/api/pages", (PageDto page) =>
{
    using var conn = new SqlConnection(ConnStr);
    conn.Open();
    using var cmd = new SqlCommand(@"
        MERGE DynamicPages AS target
        USING (SELECT @Id AS Id) AS source
        ON (target.Id = source.Id)
        WHEN MATCHED THEN
            UPDATE SET Slug=@Slug, Title=@Title, MetaDescription=@MetaDescription, HeroBadge=@HeroBadge,
                       HeroTitle=@HeroTitle, HeroSubtitle=@HeroSubtitle, TargetMarketplace=@TargetMarketplace,
                       BlocksJson=@BlocksJson, IsActive=@IsActive, UpdatedAt=GETDATE()
        WHEN NOT MATCHED THEN
            INSERT (Id, Slug, Title, MetaDescription, HeroBadge, HeroTitle, HeroSubtitle, TargetMarketplace, BlocksJson, IsActive, CreatedAt, UpdatedAt)
            VALUES (@Id, @Slug, @Title, @MetaDescription, @HeroBadge, @HeroTitle, @HeroSubtitle, @TargetMarketplace, @BlocksJson, @IsActive, GETDATE(), GETDATE());", conn);

    cmd.Parameters.AddWithValue("@Id", page.Id);
    cmd.Parameters.AddWithValue("@Slug", page.Slug);
    cmd.Parameters.AddWithValue("@Title", page.Title);
    cmd.Parameters.AddWithValue("@MetaDescription", (object?)page.MetaDescription ?? DBNull.Value);
    cmd.Parameters.AddWithValue("@HeroBadge", (object?)page.HeroBadge ?? DBNull.Value);
    cmd.Parameters.AddWithValue("@HeroTitle", page.HeroTitle ?? "");
    cmd.Parameters.AddWithValue("@HeroSubtitle", (object?)page.HeroSubtitle ?? DBNull.Value);
    cmd.Parameters.AddWithValue("@TargetMarketplace", (object?)page.TargetMarketplace ?? DBNull.Value);
    cmd.Parameters.AddWithValue("@BlocksJson", JsonSerializer.Serialize(page.Blocks ?? new object()));
    cmd.Parameters.AddWithValue("@IsActive", page.IsActive);

    cmd.ExecuteNonQuery();
    return Results.Ok(new { success = true, id = page.Id });
});

app.MapDelete("/api/pages/{id}", (string id) =>
{
    using var conn = new SqlConnection(ConnStr);
    conn.Open();
    using var cmd = new SqlCommand("DELETE FROM DynamicPages WHERE Id = @Id", conn);
    cmd.Parameters.AddWithValue("@Id", id);
    cmd.ExecuteNonQuery();
    return Results.Ok(new { success = true });
});

// 6. Settings Endpoints
app.MapGet("/api/settings", () =>
{
    var dict = new Dictionary<string, string>();
    using var conn = new SqlConnection(ConnStr);
    conn.Open();
    using var cmd = new SqlCommand("SELECT SettingKey, SettingValue FROM SiteSettings", conn);
    using var reader = cmd.ExecuteReader();
    while (reader.Read())
    {
        dict[reader.GetString(0)] = reader.IsDBNull(1) ? "" : reader.GetString(1);
    }
    return Results.Ok(dict);
});

app.MapPost("/api/settings", (Dictionary<string, string> settings) =>
{
    using var conn = new SqlConnection(ConnStr);
    conn.Open();
    foreach (var kvp in settings)
    {
        using var cmd = new SqlCommand(@"
            MERGE SiteSettings AS target
            USING (SELECT @K AS SettingKey) AS source
            ON (target.SettingKey = source.SettingKey)
            WHEN MATCHED THEN
                UPDATE SET SettingValue = @V
            WHEN NOT MATCHED THEN
                INSERT (SettingKey, SettingValue) VALUES (@K, @V);", conn);
        cmd.Parameters.AddWithValue("@K", kvp.Key);
        cmd.Parameters.AddWithValue("@V", kvp.Value ?? "");
        cmd.ExecuteNonQuery();
    }
    return Results.Ok(new { success = true });
});

// Fallback to React index.html for SPA routes (e.g. /jeina, /demo, /fiyatlandirma)
app.MapFallbackToFile("index.html");

app.Run();

record LoginRequest(string Username, string Password);
record CreateLeadRequest(string FullName, string CompanyName, string Phone, string Email, string? MonthlyOrders, string[]? Marketplaces, string? InterestedPackage, string? Notes);
record UpdateStatusRequest(string Status);
record CreateMessageRequest(string FullName, string Email, string? Phone, string? Subject, string Message);
record PackageDto(string Id, string Name, string? Badge, bool IsPopular, double PriceMonthly, double PriceAnnualMonthly, string? Description, string? MarketplaceCount, string? SyncSpeed, string? OrderLimit, string? WarehouseModule, string? PriceProtection, string? CommissionAnalysis, string? SupportLevel, string[]? Features);
record PageDto(string Id, string Slug, string Title, string? MetaDescription, string? HeroBadge, string HeroTitle, string? HeroSubtitle, string? TargetMarketplace, object? Blocks, bool IsActive);
