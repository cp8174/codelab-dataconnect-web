# Task Scheduler Configuration for File Archiver
# Run this script as Administrator to set up automated archiving

$scriptPath = "$PSScriptRoot\archive-files.ps1"
$taskName = "Firebase File Archiver"
$description = "Archives old files in Firebase Data Connect based on configured threshold"

Write-Host "Setting up Windows Task Scheduler..." -ForegroundColor Cyan

# Create scheduled task to run every hour
$action = New-ScheduledTaskAction -Execute "PowerShell.exe" -Argument "-NoProfile -ExecutionPolicy Bypass -File `"$scriptPath`""
$trigger = New-ScheduledTaskTrigger -Once -At (Get-Date) -RepetitionInterval (New-TimeSpan -Hours 1)
$settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -StartWhenAvailable

# Check if task already exists
$existingTask = Get-ScheduledTask -TaskName $taskName -ErrorAction SilentlyContinue

if ($existingTask) {
    Write-Host "Task already exists. Updating..." -ForegroundColor Yellow
    Unregister-ScheduledTask -TaskName $taskName -Confirm:$false
}

# Register the task
Register-ScheduledTask -TaskName $taskName -Action $action -Trigger $trigger -Settings $settings -Description $description

Write-Host "✓ Task '$taskName' created successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "The task will run every hour." -ForegroundColor White
Write-Host ""
Write-Host "To manage the task:" -ForegroundColor Cyan
Write-Host "  - Open: Task Scheduler (taskschd.msc)" -ForegroundColor White
Write-Host "  - Or run: Get-ScheduledTask -TaskName '$taskName'" -ForegroundColor White
Write-Host ""
Write-Host "To run manually:" -ForegroundColor Cyan
Write-Host "  - Run: Start-ScheduledTask -TaskName '$taskName'" -ForegroundColor White
Write-Host "  - Or: npm run archive-files" -ForegroundColor White
