# Real-time Mutation Logger for File Manager
# Tails Firebase emulator output and filters for mutations

param(
    [string]$LogFile = "",
    [switch]$All = $false
)

# Colors
function Write-Mutation {
    param($Message, $Type = "INFO")
    
    $timestamp = Get-Date -Format "HH:mm:ss.fff"
    $color = switch ($Type) {
        "MUTATION" { "Cyan" }
        "SUCCESS" { "Green" }
        "ERROR" { "Red" }
        "WARN" { "Yellow" }
        default { "White" }
    }
    
    Write-Host "[$timestamp] " -NoNewline -ForegroundColor DarkGray
    Write-Host $Message -ForegroundColor $color
}

# Header
Clear-Host
Write-Host ""
Write-Host ("=" * 100) -ForegroundColor Cyan
Write-Host " 🔍 MUTATION LOGGER - File Manager Data Connect" -ForegroundColor Cyan
Write-Host ("=" * 100) -ForegroundColor Cyan
Write-Host ""
Write-Host " Monitoring: " -NoNewline
Write-Host "File, Device, User, Folder mutations" -ForegroundColor Yellow
Write-Host " Emulator:   " -NoNewline
Write-Host "http://localhost:4000" -ForegroundColor Blue
Write-Host " Functions:  " -NoNewline
Write-Host "http://localhost:5001" -ForegroundColor Blue
Write-Host ""
Write-Host ("─" * 100) -ForegroundColor DarkGray
Write-Host ""

# Mutation patterns to watch for
$patterns = @(
    @{ Regex = '🎉.*created'; Type = 'MUTATION'; Description = 'Create' },
    @{ Regex = '🔄.*updated'; Type = 'MUTATION'; Description = 'Update' },
    @{ Regex = '🗑️.*deleted'; Type = 'MUTATION'; Description = 'Delete' },
    @{ Regex = 'CreateFile|CreateUser|CreateDevice|CreateFolder'; Type = 'MUTATION'; Description = 'Create Operation' },
    @{ Regex = 'UpdateFile|UpdateUser|UpdateDevice|UpdateFolder'; Type = 'MUTATION'; Description = 'Update Operation' },
    @{ Regex = 'DeleteFile|DeleteUser|DeleteDevice|DeleteFolder'; Type = 'MUTATION'; Description = 'Delete Operation' },
    @{ Regex = '✅.*completed successfully'; Type = 'SUCCESS'; Description = 'Success' },
    @{ Regex = '❌.*Error'; Type = 'ERROR'; Description = 'Error' },
    @{ Regex = 'mutation executed|MUTATION'; Type = 'MUTATION'; Description = 'Mutation Event' }
)

Write-Mutation "🚀 Logger started. Watching for mutations..." "SUCCESS"
Write-Mutation "💡 Trigger some mutations in your app to see them here" "INFO"
Write-Host ""

# Check if emulator is running
$javaProcesses = Get-Process -Name "java" -ErrorAction SilentlyContinue
if ($javaProcesses) {
    Write-Mutation "✅ Found $($javaProcesses.Count) emulator process(es) running" "SUCCESS"
} else {
    Write-Mutation "⚠️  No Java processes found - emulator might not be running" "WARN"
    Write-Mutation "   Start with: firebase emulators:start" "INFO"
}
Write-Host ""
Write-Host ("─" * 100) -ForegroundColor DarkGray
Write-Host ""

# Start firebase log streaming
Write-Mutation "📡 Starting log stream..." "INFO"
Write-Host ""

# Run firebase emulators:log and filter output
$process = Start-Process -FilePath "firebase" -ArgumentList "emulators:log" -RedirectStandardOutput "temp_firebase_log.txt" -RedirectStandardError "temp_firebase_error.txt" -PassThru -NoNewWindow -ErrorAction SilentlyContinue

if ($process) {
    Write-Mutation "✅ Connected to emulator logs" "SUCCESS"
    Write-Host ""
    
    try {
        # Monitor the log file
        $lastSize = 0
        while ($true) {
            Start-Sleep -Milliseconds 500
            
            if (Test-Path "temp_firebase_log.txt") {
                $currentSize = (Get-Item "temp_firebase_log.txt").Length
                
                if ($currentSize -gt $lastSize) {
                    $content = Get-Content "temp_firebase_log.txt" -Tail 50
                    
                    foreach ($line in $content) {
                        foreach ($pattern in $patterns) {
                            if ($line -match $pattern.Regex) {
                                Write-Mutation $line $pattern.Type
                                break
                            }
                        }
                        
                        # Show all logs if -All flag is set
                        if ($All -and $line -notmatch '^\s*$') {
                            Write-Host $line -ForegroundColor DarkGray
                        }
                    }
                    
                    $lastSize = $currentSize
                }
            }
        }
    }
    finally {
        Stop-Process -Id $process.Id -Force -ErrorAction SilentlyContinue
        Remove-Item "temp_firebase_log.txt" -ErrorAction SilentlyContinue
        Remove-Item "temp_firebase_error.txt" -ErrorAction SilentlyContinue
    }
} else {
    Write-Mutation "❌ Could not start firebase command" "ERROR"
    Write-Host ""
    Write-Host "Alternative: Monitor Function logs manually" -ForegroundColor Yellow
    Write-Host "1. Open http://localhost:4000 in your browser" -ForegroundColor Gray
    Write-Host "2. Go to Functions tab" -ForegroundColor Gray
    Write-Host "3. View logs for mutation triggers" -ForegroundColor Gray
    Write-Host ""
    Write-Host "Or tail this file:" -ForegroundColor Yellow
    Write-Host "  %USERPROFILE%\.cache\firebase\emulators\functions.log" -ForegroundColor Gray
    Write-Host ""
}
