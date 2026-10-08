$ErrorActionPreference = "Stop"

$ftpServer = "ftp://77.245.159.112"
$ftpUser = "babyanimals_canli"
$ftpPass = 'Jo#u0Qk7i$hoF2or'
$remoteTarget = "$ftpServer/httpdocs"
$localDist = Join-Path $PSScriptRoot "dist"

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

# 1. Klasörleri tara ve sunucuda oluştur
$dirs = Get-ChildItem -Path $localDist -Recurse -Directory
foreach ($d in $dirs) {
    $relative = $d.FullName.Substring($localDist.Length).Replace('\', '/')
    $remoteDirUri = "$remoteTarget$relative"
    Make-FtpDirectory $remoteDirUri
}

# 2. Dosyaları yükle
$files = Get-ChildItem -Path $localDist -Recurse -File
Write-Host "`nToplam $($files.Count) dosya /httpdocs dizinine yükleniyor..." -ForegroundColor Yellow

$successCount = 0
foreach ($f in $files) {
    $relative = $f.FullName.Substring($localDist.Length).Replace('\', '/')
    $remoteFileUri = "$remoteTarget$relative"
    if (Upload-FtpFile -localFile $f.FullName -remoteFile $remoteFileUri) {
        $successCount++
    }
}

Write-Host "`n==========================================================" -ForegroundColor Green
Write-Host "YAYINLAMA TAMAMLANDI! ($successCount / $($files.Count) dosya yüklendi)" -ForegroundColor Green
Write-Host "Hedef URL: https://jeina.com.tr/" -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Green
