#!/usr/bin/env pwsh
# Pre-Deployment Checklist Script
# Verifies all requirements before production deployment

$ErrorActionPreference = "Stop"

function Write-CheckItem {
    param($Message, $Status)
    $icon = if ($Status) { "✅" } else { "❌" }
    $color = if ($Status) { "Green" } else { "Red" }
    Write-Host "$icon $Message" -ForegroundColor $color
}

function Test-Command {
    param($Command)
    try {
        & $Command --version > $null 2>&1
        return $true
    } catch {
        return $false
    }
}

Write-Host ""
Write-Host "🔍 Pre-Deployment Checklist for Firebase Data Connect" -ForegroundColor Cyan
Write-Host "======================================================" -ForegroundColor Cyan
Write-Host ""

$allChecksPassed = $true

# 1. Check Firebase CLI
Write-Host "1. Firebase CLI" -ForegroundColor Yellow
$firebaseInstalled = Test-Command "firebase"
Write-CheckItem "Firebase CLI installed" $firebaseInstalled
if ($firebaseInstalled) {
    $firebaseVersion = firebase --version
    Write-Host "   Version: $firebaseVersion" -ForegroundColor Gray
}
$allChecksPassed = $allChecksPassed -and $firebaseInstalled

# 2. Check Node.js
Write-Host ""
Write-Host "2. Node.js & npm" -ForegroundColor Yellow
$nodeInstalled = Test-Command "node"
Write-CheckItem "Node.js installed (18+)" $nodeInstalled
if ($nodeInstalled) {
    $nodeVersion = node --version
    Write-Host "   Version: $nodeVersion" -ForegroundColor Gray
}
$allChecksPassed = $allChecksPassed -and $nodeInstalled

# 3. Check Firebase authentication
Write-Host ""
Write-Host "3. Firebase Authentication" -ForegroundColor Yellow
try {
    $currentUser = firebase login:list 2>&1
    if ($currentUser -match "Logged in as") {
        Write-CheckItem "Logged in to Firebase" $true
        Write-Host "   $currentUser" -ForegroundColor Gray
    } else {
        Write-CheckItem "Logged in to Firebase" $false
        $allChecksPassed = $false
    }
} catch {
    Write-CheckItem "Logged in to Firebase" $false
    $allChecksPassed = $false
}

# 4. Check Firebase project
Write-Host ""
Write-Host "4. Firebase Project" -ForegroundColor Yellow
try {
    $project = firebase use 2>&1
    $correctProject = $project -match "zfile-manager-v2"
    Write-CheckItem "Correct project selected (zfile-manager-v2)" $correctProject
    if (-not $correctProject) {
        Write-Host "   Current: $project" -ForegroundColor Gray
        Write-Host "   Run: firebase use zfile-manager-v2" -ForegroundColor Gray
        $allChecksPassed = $false
    }
} catch {
    Write-CheckItem "Firebase project configured" $false
    $allChecksPassed = $false
}

# 5. Check environment files
Write-Host ""
Write-Host "5. Environment Configuration" -ForegroundColor Yellow
$envProdExists = Test-Path "app/.env.production"
Write-CheckItem ".env.production exists" $envProdExists
if (-not $envProdExists) {
    Write-Host "   Create app/.env.production with real Firebase config" -ForegroundColor Gray
    $allChecksPassed = $false
}

$envDevExists = Test-Path "app/.env.development"
Write-CheckItem ".env.development exists" $envDevExists

# 6. Check Data Connect configuration
Write-Host ""
Write-Host "6. Data Connect Configuration" -ForegroundColor Yellow
$dataconnectYamlExists = Test-Path "dataconnect/dataconnect.yaml"
Write-CheckItem "dataconnect.yaml exists" $dataconnectYamlExists

if ($dataconnectYamlExists) {
    $yamlContent = Get-Content "dataconnect/dataconnect.yaml" -Raw
    $hasInstanceId = $yamlContent -notmatch "your-instance-id"
    Write-CheckItem "Cloud SQL instanceId configured" $hasInstanceId
    if (-not $hasInstanceId) {
        Write-Host "   Update instanceId in dataconnect/dataconnect.yaml" -ForegroundColor Gray
        $allChecksPassed = $false
    }
}

# 7. Check schema files
Write-Host ""
Write-Host "7. GraphQL Schema" -ForegroundColor Yellow
$schemaExists = Test-Path "dataconnect/schema/schema.gql"
Write-CheckItem "schema.gql exists" $schemaExists
$allChecksPassed = $allChecksPassed -and $schemaExists

$queriesExist = Test-Path "dataconnect/movie-connector/queries.gql"
Write-CheckItem "queries.gql exists" $queriesExist
$allChecksPassed = $allChecksPassed -and $queriesExist

$mutationsExist = Test-Path "dataconnect/movie-connector/mutations.gql"
Write-CheckItem "mutations.gql exists" $mutationsExist
$allChecksPassed = $allChecksPassed -and $mutationsExist

# 8. Check security rules
Write-Host ""
Write-Host "8. Security Rules" -ForegroundColor Yellow
$storageRulesExist = Test-Path "storage.rules"
Write-CheckItem "storage.rules exists" $storageRulesExist

if ($storageRulesExist) {
    $rulesContent = Get-Content "storage.rules" -Raw
    $hasInsecureRules = $rulesContent -match "allow read, write: if true"
    Write-CheckItem "Storage rules are secure (not 'if true')" (-not $hasInsecureRules)
    if ($hasInsecureRules) {
        Write-Host "   WARNING: Storage rules allow unrestricted access!" -ForegroundColor Red
        Write-Host "   Update storage.rules before deploying to production" -ForegroundColor Gray
        $allChecksPassed = $false
    }
}

# 9. Check Git status
Write-Host ""
Write-Host "9. Git Repository" -ForegroundColor Yellow
try {
    $gitStatus = git status --porcelain 2>&1
    $gitClean = -not $gitStatus
    Write-CheckItem "No uncommitted changes" $gitClean
    if (-not $gitClean) {
        Write-Host "   You have uncommitted changes" -ForegroundColor Gray
        Write-Host "   Consider committing before deployment" -ForegroundColor Gray
    }
} catch {
    Write-CheckItem "Git repository initialized" $false
}

# 10. Check app dependencies
Write-Host ""
Write-Host "10. Application Dependencies" -ForegroundColor Yellow
$packageJsonExists = Test-Path "app/package.json"
Write-CheckItem "package.json exists" $packageJsonExists

if ($packageJsonExists) {
    Push-Location app
    try {
        $nodeModulesExist = Test-Path "node_modules"
        Write-CheckItem "node_modules installed" $nodeModulesExist
        if (-not $nodeModulesExist) {
            Write-Host "   Run: cd app && npm install" -ForegroundColor Gray
        }
    } finally {
        Pop-Location
    }
}

# 11. Check Cloud SQL instance (optional - requires gcloud)
Write-Host ""
Write-Host "11. Cloud SQL Instance (Optional)" -ForegroundColor Yellow
$gcloudInstalled = Test-Command "gcloud"
if ($gcloudInstalled) {
    try {
        $instances = gcloud sql instances list --format="value(name)" 2>&1
        $hasInstance = $instances -match "file-manager-db"
        Write-CheckItem "Cloud SQL instance exists" $hasInstance
        if (-not $hasInstance) {
            Write-Host "   Create Cloud SQL instance before deployment" -ForegroundColor Gray
            Write-Host "   See PRODUCTION_DEPLOYMENT_GUIDE.md section 2" -ForegroundColor Gray
        }
    } catch {
        Write-CheckItem "Cloud SQL instance status unknown" $false
    }
} else {
    Write-Host "   ℹ️  gcloud CLI not installed (optional)" -ForegroundColor Gray
}

# 12. Check Firebase Billing
Write-Host ""
Write-Host "12. Firebase Billing" -ForegroundColor Yellow
Write-Host "   ℹ️  Verify Blaze plan enabled in Firebase Console" -ForegroundColor Gray
Write-Host "   https://console.firebase.google.com/project/zfile-manager-v2/usage" -ForegroundColor Gray

# Summary
Write-Host ""
Write-Host "======================================================" -ForegroundColor Cyan
if ($allChecksPassed) {
    Write-Host "✅ ALL CHECKS PASSED - Ready for deployment!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "  1. Review PRODUCTION_DEPLOYMENT_GUIDE.md" -ForegroundColor Gray
    Write-Host "  2. Create Cloud SQL instance (if not exists)" -ForegroundColor Gray
    Write-Host "  3. Update .env.production with real values" -ForegroundColor Gray
    Write-Host "  4. Run: .\deploy-production.ps1" -ForegroundColor Gray
} else {
    Write-Host "❌ SOME CHECKS FAILED - Review issues above" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please fix the issues before deployment" -ForegroundColor Yellow
    Write-Host "See PRODUCTION_DEPLOYMENT_GUIDE.md for help" -ForegroundColor Gray
}
Write-Host "======================================================" -ForegroundColor Cyan
Write-Host ""

exit $(if ($allChecksPassed) { 0 } else { 1 })
