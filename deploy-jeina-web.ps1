$ErrorActionPreference = "Stop"

$ftpServer = "ftp://77.245.159.112"
$ftpUser = "babyanimals_canli"
$ftpPass = 'Jo#u0Qk7i$hoF2or'
$remoteTarget = "$ftpServer/httpdocs"
$localDist = Join-Path $PSScriptRoot "dist"
$serverPublish = Join-Path $PSScriptRoot "server\publish"

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "JEINA.COM.TR FTP YAYINLAMA ARACI (Hedef: /httpdocs)" -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan

# Korumalar
if ($remoteTarget -match "babyanimals" -or $remoteTarget -match "demo.jeina") {
    Write-Host "KRİTİK GÜVENLİK HATASI: Yanlış hedef tespit edildi!" -ForegroundColor Red
    exit 1
}

if (-not (Test-Path $localDist)) {
    Write-Host "HATA: dist klasörü bulunamadı. Lütfen önce 'npm run build' çalıştırın." -ForegroundColor Red
    exit 1
}

if (-not (Test-Path $serverPublish)) {
    Write-Host "HATA: server/publish klasörü bulunamadı. Lütfen önce dotnet publish çalıştırın." -ForegroundColor Red
    exit 1
}

function Make-FtpDirectory {
    param([string]$remoteDir)
    try {
        $req = [System.Net.FtpWebRequest]::Create($remoteDir)
        $req.Method = [System.Net.WebRequestMethods+Ftp]::MakeDirectory
        $req.Credentials = New-Object System.Net.NetworkCredential($ftpUser, $ftpPass)
        $req.UsePassive = $true
        $req.EnableSsl = $false
        $resp = $req.GetResponse()
        $resp.Close()
        Write-Host "Klasör oluşturuldu: $remoteDir" -ForegroundColor Gray
    } catch {
        # Zaten varsa devam et
    }
}

function Upload-FtpFile {
    param([string]$localFile, [string]$remoteFile)
    try {
        $wc = New-Object System.Net.WebClient
        $wc.Credentials = New-Object System.Net.NetworkCredential($ftpUser, $ftpPass)
        $wc.UploadFile($remoteFile, $localFile)
        Write-Host "  -> Yüklendi: $remoteFile" -ForegroundColor Green
        return $true
    } catch {
        Write-Host "  -> Yüklenemedi: $remoteFile - $_" -ForegroundColor Red
        return $false
    }
}

function Delete-FtpFile {
    param([string]$remoteFile)
    try {
        $req = [System.Net.FtpWebRequest]::Create($remoteFile)
        $req.Method = [System.Net.WebRequestMethods+Ftp]::DeleteFile
        $req.Credentials = New-Object System.Net.NetworkCredential($ftpUser, $ftpPass)
        $req.UsePassive = $true
        $resp = $req.GetResponse()
        $resp.Close()
        Write-Host "Silindi: $remoteFile" -ForegroundColor Gray
    } catch {
        # Dosya yoksa sorun yok
    }
}

# 1. Bakım modunu etkinleştir (DLL kilitlerini açmak için)
Write-Host "`n1. app_offline.htm sunucuya yükleniyor (IIS kilitleri açılıyor)..." -ForegroundColor Yellow
$tempOffline = Join-Path $PSScriptRoot "temp_app_offline.htm"
@"
<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>Jeina Güncelleniyor</title></head>
<body style="font-family:sans-serif;text-align:center;padding:100px;">
  <h2>Jeina Güncelleniyor</h2>
  <p>Sistem güncelleniyor, lütfen birkaç saniye bekleyin...</p>
</body></html>
"@ | Out-File $tempOffline -Encoding UTF8

Upload-FtpFile -localFile $tempOffline -remoteFile "$remoteTarget/app_offline.htm"
Remove-Item $tempOffline -Force

Write-Host "IIS DLL kilitlerinin çözülmesi için 5 saniye bekleniyor..." -ForegroundColor Gray
Start-Sleep -Seconds 5

# 2. Sunucuda gerekli ana klasörleri oluştur
Write-Host "`n2. Gerekli klasörler hazırlanıyor..." -ForegroundColor Yellow
Make-FtpDirectory "$remoteTarget/wwwroot"
Make-FtpDirectory "$remoteTarget/logs"

# 3. Backend (server/publish) dosyalarını yükle
Write-Host "`n3. .NET 9 Web API ve DLL'ler yükleniyor..." -ForegroundColor Yellow
$backendDirs = Get-ChildItem -Path $serverPublish -Recurse -Directory
foreach ($d in $backendDirs) {
    $rel = $d.FullName.Substring($serverPublish.Length).Replace('\', '/')
    Make-FtpDirectory "$remoteTarget$rel"
}
$backendFiles = Get-ChildItem -Path $serverPublish -Recurse -File
foreach ($f in $backendFiles) {
    $rel = $f.FullName.Substring($serverPublish.Length).Replace('\', '/')
    Upload-FtpFile -localFile $f.FullName -remoteFile "$remoteTarget$rel"
}

# 4. Frontend (dist) dosyalarını wwwroot ve ana dizine yükle
Write-Host "`n4. React SPA Vitrin & CMS dosyaları hazırlanıyor ve yükleniyor..." -ForegroundColor Yellow

# dist/jeina ve dist/admin klasörlerine SPA index.html kopyala (Doğrudan URL erişimi garantisi)
New-Item -ItemType Directory -Path (Join-Path $localDist "jeina") -Force | Out-Null
Copy-Item (Join-Path $localDist "index.html") (Join-Path $localDist "jeina\index.html") -Force

New-Item -ItemType Directory -Path (Join-Path $localDist "admin") -Force | Out-Null
Copy-Item (Join-Path $localDist "index.html") (Join-Path $localDist "admin\index.html") -Force

$frontendDirs = Get-ChildItem -Path $localDist -Recurse -Directory
foreach ($d in $frontendDirs) {
    $rel = $d.FullName.Substring($localDist.Length).Replace('\', '/')
    Make-FtpDirectory "$remoteTarget/wwwroot$rel"
    Make-FtpDirectory "$remoteTarget$rel"
}
$frontendFiles = Get-ChildItem -Path $localDist -Recurse -File
foreach ($f in $frontendFiles) {
    $rel = $f.FullName.Substring($localDist.Length).Replace('\', '/')
    Upload-FtpFile -localFile $f.FullName -remoteFile "$remoteTarget/wwwroot$rel"
    Upload-FtpFile -localFile $f.FullName -remoteFile "$remoteTarget$rel"
}

# 5. web.config dosyasını garanti et
Write-Host "`n5. web.config sunucuya yükleniyor..." -ForegroundColor Yellow
$webConfigFile = Join-Path $PSScriptRoot "public\web.config"
Upload-FtpFile -localFile $webConfigFile -remoteFile "$remoteTarget/web.config"

# 6. app_offline.htm dosyasını sil ve siteyi aç
Write-Host "`n6. app_offline.htm siliniyor (Site canlıya alınıyor)..." -ForegroundColor Yellow
Delete-FtpFile -remoteFile "$remoteTarget/app_offline.htm"

Write-Host "`nIIS uygulamasının ısınması için 3 saniye bekleniyor..." -ForegroundColor Gray
Start-Sleep -Seconds 3

Write-Host "`n==========================================================" -ForegroundColor Green
Write-Host "YAYINLAMA TAMAMLANDI!" -ForegroundColor Green
Write-Host "Hedef URL: https://jeina.com.tr/" -ForegroundColor Cyan
Write-Host "CMS URL:   https://jeina.com.tr/jeina" -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Green
