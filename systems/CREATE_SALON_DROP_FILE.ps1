$ErrorActionPreference = 'Stop'
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$rawUrl = 'https://raw.githubusercontent.com/dpromstk2000-lab/dpro-line-systems-site/main/systems/salon.html'
$expectedGitBlobSha = '21b086a33ce6b623615e396b344c9c257bb80b3a'
$old = '美容サロン向けに、予約を1か所に集約、顧客カルテ、回数券などの業務をまとめる業種特化型システム。'
$new = '美容サロン向けに、LINE予約、担当スタッフ選択、電話・店頭受付、スタッフ予約確認、オーナーPC管理、iPad管理をまとめる業種特化型システム。'
$outFile = Join-Path $PSScriptRoot 'salon.html'
$reportFile = Join-Path $PSScriptRoot 'SALON_DROP_PATCH_RESULT.txt'

function Get-GitBlobSha1([byte[]]$bytes) {
    $prefix = [System.Text.Encoding]::ASCII.GetBytes(('blob ' + $bytes.Length + [char]0))
    $all = New-Object byte[] ($prefix.Length + $bytes.Length)
    [Array]::Copy($prefix, 0, $all, 0, $prefix.Length)
    [Array]::Copy($bytes, 0, $all, $prefix.Length, $bytes.Length)
    $sha1 = [System.Security.Cryptography.SHA1]::Create()
    try {
        return (($sha1.ComputeHash($all) | ForEach-Object { $_.ToString('x2') }) -join '')
    } finally { $sha1.Dispose() }
}

try {
    Write-Host 'DPRO #09 SALON Product Site drop file を作成しています...'
    $resp = Invoke-WebRequest -Uri $rawUrl -UseBasicParsing
    $text = [string]$resp.Content
    $bytes = [System.Text.Encoding]::UTF8.GetBytes($text)
    $actualGitBlobSha = Get-GitBlobSha1 $bytes

    if ($actualGitBlobSha -ne $expectedGitBlobSha) {
        throw "現在の salon.html が CENTRAL LOCK時点から変わっています。処理を停止しました。 expected=$expectedGitBlobSha actual=$actualGitBlobSha"
    }

    $count = ([regex]::Matches($text, [regex]::Escape($old))).Count
    if ($count -ne 3) {
        throw "置換対象文が3か所ではありません。処理を停止しました。 count=$count"
    }

    $patched = $text.Replace($old, $new)

    if ($patched.Contains('顧客カルテ') -or $patched.Contains('回数券')) {
        throw '誤訴求語が残っています。処理を停止しました。'
    }

    $required = @('LINE予約','担当スタッフ選択','電話・店頭受付','スタッフ予約確認','オーナーPC管理','iPad管理')
    foreach ($term in $required) {
        if (-not $patched.Contains($term)) { throw "正式6機能が欠落しています: $term" }
    }

    [System.IO.File]::WriteAllText($outFile, $patched, (New-Object System.Text.UTF8Encoding($false)))
    $outBytes = [System.IO.File]::ReadAllBytes($outFile)
    $sha256 = [System.Security.Cryptography.SHA256]::Create()
    try { $outSha256 = (($sha256.ComputeHash($outBytes) | ForEach-Object { $_.ToString('x2') }) -join '') } finally { $sha256.Dispose() }

    @(
      'DPRO #09 SALON PRODUCT SITE DROP PATCH',
      ('TIME=' + (Get-Date -Format 'yyyy-MM-dd HH:mm:ss zzz')),
      'STATUS=PASS',
      ('SOURCE_GIT_BLOB_SHA=' + $actualGitBlobSha),
      'REPLACEMENT_COUNT=3',
      'UNSUPPORTED_COPY_REMAINING=0',
      'FORMAL_SIX_FUNCTIONS=PRESENT',
      ('OUTPUT=' + $outFile),
      ('OUTPUT_SHA256=' + $outSha256)
    ) | Set-Content -LiteralPath $reportFile -Encoding UTF8

    Write-Host ''
    Write-Host 'PASS: salon.html を作成しました。' -ForegroundColor Green
    Write-Host 'この salon.html だけを GitHub の systems フォルダへドラッグ&ドロップしてください。'
    Start-Process explorer.exe -ArgumentList "/select,`"$outFile`""
    Start-Process notepad.exe -ArgumentList "`"$reportFile`""
}
catch {
    @(
      'DPRO #09 SALON PRODUCT SITE DROP PATCH',
      ('TIME=' + (Get-Date -Format 'yyyy-MM-dd HH:mm:ss zzz')),
      'STATUS=ERROR',
      ('MESSAGE=' + $_.Exception.Message)
    ) | Set-Content -LiteralPath $reportFile -Encoding UTF8
    Write-Host ''
    Write-Host ('ERROR: ' + $_.Exception.Message) -ForegroundColor Red
    Start-Process notepad.exe -ArgumentList "`"$reportFile`""
    exit 1
}
