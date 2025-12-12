# Run Production Build Locally

Write-Host "🚀 Building and Running Production Version Locally" -ForegroundColor Cyan
Write-Host ""

# Step 1: Build the app
Write-Host "📦 Step 1: Building React App..." -ForegroundColor Yellow
Set-Location "$PSScriptRoot\app"
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Build complete!" -ForegroundColor Green
Write-Host ""

# Step 2: Build Cloud Functions
Write-Host "📦 Step 2: Building Cloud Functions..." -ForegroundColor Yellow
Set-Location "$PSScriptRoot\functions"
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Functions build failed!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Functions built!" -ForegroundColor Green
Write-Host ""

# Step 3: Start Firebase Emulators
Write-Host "🔥 Step 3: Starting Firebase Emulators..." -ForegroundColor Yellow
Set-Location "$PSScriptRoot"

Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "🎉 Production Build Ready!" -ForegroundColor Green
Write-Host ""
Write-Host "📱 App: http://localhost:4173" -ForegroundColor White
Write-Host "🔥 Emulator UI: http://localhost:4000" -ForegroundColor White
Write-Host "🔧 Functions: http://localhost:5001" -ForegroundColor White
Write-Host "💾 Firestore: http://localhost:8088" -ForegroundColor White
Write-Host "🔐 Auth: http://localhost:9089" -ForegroundColor White
Write-Host "📦 Storage: http://localhost:9199" -ForegroundColor White
Write-Host "🔌 Data Connect: http://localhost:9390" -ForegroundColor White
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Ctrl+C to stop" -ForegroundColor Yellow
Write-Host ""

# Start emulators in background
$emulatorJob = Start-Job -ScriptBlock {
    Set-Location $using:PSScriptRoot
    npx firebase emulators:start
}

# Wait a bit for emulators to start
Start-Sleep -Seconds 5

# Serve the production build
Set-Location "$PSScriptRoot\app"
npx vite preview

# Cleanup
Stop-Job $emulatorJob
Remove-Job $emulatorJob
