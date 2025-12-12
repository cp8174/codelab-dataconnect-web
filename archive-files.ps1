# Archive Old Files Script

# Set archive threshold (in minutes)
$env:ARCHIVE_AFTER_MINUTES = 60
$env:FIREBASE_PROJECT_ID = "emc-zdtrk-development1-d"

Write-Host "Starting file archiver..." -ForegroundColor Green
node scripts/archiveOldFiles.js
