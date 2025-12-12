# Firebase Data Connect - Production Deployment Guide

**Last Updated:** December 11, 2025  
**Project:** zfile-manager-v2  
**Environment:** Production  

---

## 📋 Table of Contents

1. [Pre-Deployment Checklist](#1-pre-deployment-checklist)
2. [Cloud SQL Setup](#2-cloud-sql-setup)
3. [Firebase Configuration](#3-firebase-configuration)
4. [Environment Variables](#4-environment-variables)
5. [Security Rules Updates](#5-security-rules-updates)
6. [Data Connect Deployment](#6-data-connect-deployment)
7. [Frontend Build & Hosting](#7-frontend-build--hosting)
8. [Cloud Functions Deployment](#8-cloud-functions-deployment)
9. [Post-Deployment Verification](#9-post-deployment-verification)
10. [Rollback Procedures](#10-rollback-procedures)
11. [Monitoring & Maintenance](#11-monitoring--maintenance)

---

## 🎯 1. Pre-Deployment Checklist

### 1.1 Prerequisites

- [ ] Firebase Blaze (Pay-as-you-go) plan enabled
- [ ] Firebase CLI installed and updated: `npm install -g firebase-tools`
- [ ] Authenticated to Firebase: `firebase login`
- [ ] Project ID confirmed: `zfile-manager-v2`
- [ ] Google Cloud project billing enabled
- [ ] Cloud SQL API enabled in Google Cloud Console
- [ ] Node.js 18+ installed
- [ ] Git repository clean (no uncommitted changes)

### 1.2 Verify Current Configuration

```powershell
# Check Firebase project
firebase projects:list
firebase use zfile-manager-v2

# Verify current project
firebase project:info

# Check current authentication
firebase login:list
```

### 1.3 Cost Estimation (Monthly)

**Firebase Data Connect Stack:**
```
├── Cloud SQL Instance (db-f1-micro): ~$7/month (dev/staging)
├── Cloud SQL Instance (db-n1-standard-1): ~$50/month (production)
├── Storage (50GB): ~$8.50/month
├── Network Egress: Variable ($0.12/GB after 1GB free)
├── Cloud Functions (100K invocations): ~$0.40/month
├── Firebase Auth: Free (first 50K MAU)
├── Firebase Hosting: Free (10GB transfer)
└── TOTAL (Production): ~$60-80/month

⚠️ Scale instance size based on actual load
💡 Start with smaller instance and scale up as needed
```

---

## 🗄️ 2. Cloud SQL Setup

### 2.1 Create Cloud SQL Instance (via Console)

**Option A: Using Google Cloud Console**

1. Go to [Cloud SQL Console](https://console.cloud.google.com/sql)
2. Click **"Create Instance"** → **"Choose PostgreSQL"**
3. Configure instance:
   ```
   Instance ID: file-manager-db-prod
   Password: [Generate strong password - save to password manager]
   Database version: PostgreSQL 15
   Region: us-central1 (same as Data Connect)
   Zonal availability: Single zone (dev) or Multiple zones (prod)
   Machine type: db-custom-1-3840 (1 vCPU, 3.75GB RAM)
   Storage type: SSD
   Storage capacity: 10GB (auto-increase enabled)
   Automated backups: Enabled (daily at 3 AM UTC)
   Point-in-time recovery: Enabled
   High availability: Enabled (production only)
   ```
4. Click **"Create Instance"** (takes 5-10 minutes)

**Option B: Using gcloud CLI**

```powershell
# Set project
gcloud config set project zfile-manager-v2

# Create Cloud SQL instance
gcloud sql instances create file-manager-db-prod `
  --database-version=POSTGRES_15 `
  --tier=db-custom-1-3840 `
  --region=us-central1 `
  --storage-type=SSD `
  --storage-size=10GB `
  --storage-auto-increase `
  --backup-start-time=03:00 `
  --enable-bin-log `
  --retained-backups-count=7 `
  --retained-transaction-log-days=7

# Set root password (save this securely!)
gcloud sql users set-password postgres `
  --instance=file-manager-db-prod `
  --password=[YOUR_SECURE_PASSWORD]
```

### 2.2 Create Database

```powershell
# Create the database
gcloud sql databases create zfile-manager-v2 `
  --instance=file-manager-db-prod

# Verify database created
gcloud sql databases list --instance=file-manager-db-prod
```

### 2.3 Update dataconnect.yaml

```powershell
# Get instance connection name
gcloud sql instances describe file-manager-db-prod --format="value(connectionName)"
# Output example: zfile-manager-v2:us-central1:file-manager-db-prod
```

Update `dataconnect/dataconnect.yaml`:

```yaml
specVersion: "v1alpha"
serviceId: "file-manager-fdc"
location: "us-central1"
schema:
  source: "./schema"
  datasource:
    postgresql:
      database: "zfile-manager-v2"
      cloudSql:
        instanceId: "file-manager-db-prod"  # ✅ Update this
connectorDirs: ["./movie-connector"]
```

---

## 🔐 3. Firebase Configuration

### 3.1 Get Production Firebase Config

1. Go to [Firebase Console](https://console.firebase.google.com/project/zfile-manager-v2/settings/general)
2. Navigate to **Project Settings** → **General** → **Your apps**
3. Select your web app or create new one
4. Copy the Firebase configuration object

### 3.2 Create Production Environment File

Create `app/.env.production`:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=AIzaSy...your-actual-api-key
VITE_FIREBASE_AUTH_DOMAIN=zfile-manager-v2.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=zfile-manager-v2
VITE_FIREBASE_STORAGE_BUCKET=zfile-manager-v2.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX

# Environment
VITE_APP_ENV=production
VITE_APP_VERSION=1.0.0

# Data Connect
VITE_DATA_CONNECT_SERVICE_ID=file-manager-fdc
VITE_DATA_CONNECT_LOCATION=us-central1
```

### 3.3 Update Firebase Config in Code

Update `app/src/lib/firebase.tsx`:

```typescript
// Production-ready firebase config
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

const firebaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

const auth = getAuth(firebaseApp);
const dataconnect = getDataConnect(firebaseApp, connectorConfig);
const storage = getStorage(firebaseApp);
const db = getFirestore(firebaseApp);
const functions = getFunctions(firebaseApp);

// ⚠️ IMPORTANT: Remove emulator connections for production
// Only connect to emulators in development
if (import.meta.env.VITE_APP_ENV === "development") {
  connectDataConnectEmulator(dataconnect, "127.0.0.1", 9390, false);
  connectAuthEmulator(auth, "http://localhost:9089");
  connectStorageEmulator(storage, "127.0.0.1", 9199);
  connectFirestoreEmulator(db, "127.0.0.1", 8088);
  connectFunctionsEmulator(functions, "127.0.0.1", 5001);
}
```

### 3.4 Add .env.production to .gitignore

```bash
# Ensure sensitive files are not committed
echo "app/.env.production" >> .gitignore
echo "app/.env.local" >> .gitignore
```

---

## 🔒 5. Security Rules Updates

### 5.1 Update Storage Rules (CRITICAL!)

**BEFORE (Development - INSECURE):**
```plaintext
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if true;  // ❌ NEVER use in production!
    }
  }
}
```

**AFTER (Production - SECURE):**

Update `storage.rules`:

```plaintext
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Files uploaded by users
    match /files/{userId}/{fileName} {
      // Allow read if authenticated and (owner or file is public)
      allow read: if request.auth != null && 
        (request.auth.uid == userId || 
         resource.metadata.isPublic == 'true');
      
      // Allow write only if authenticated and owner
      allow write: if request.auth != null && 
        request.auth.uid == userId &&
        request.resource.size < 100 * 1024 * 1024; // Max 100MB
      
      // Allow delete only if owner
      allow delete: if request.auth != null && 
        request.auth.uid == userId;
    }
    
    // Admin uploads (if needed)
    match /admin/{allPaths=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        request.auth.token.role == 'admin';
    }
    
    // Public assets (logos, etc.)
    match /public/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null && 
        request.auth.token.role == 'admin';
    }
  }
}
```

### 5.2 Firestore Rules (Already Secure)

Your `firestore.rules` already has proper tenant isolation - verify it's production-ready:

```bash
# Test security rules locally
firebase emulators:start --only firestore,storage

# In another terminal, run security rules tests
firebase emulators:exec --only firestore,storage "npm test"
```

### 5.3 Data Connect Authorization

Verify GraphQL queries have proper `@auth` directives in `dataconnect/movie-connector/queries.gql`:

```graphql
# ✅ GOOD: User can only see their files
query ListMyFiles @auth(level: USER) {
  files(where: { uploadedBy: { eq: auth.uid } }) {
    id
    name
    uploadedAt
  }
}

# ✅ GOOD: Tenant isolation enforced
query ListTenantFiles($tenantId: String!)
  @auth(level: USER, expr: "auth.token.tenantId == $tenantId") {
  files(where: { tenantId: { eq: $tenantId } }) {
    id
    name
  }
}

# ❌ BAD: Remove or secure PUBLIC queries
# query ListAllFiles @auth(level: PUBLIC) {
#   files { id name }  # Don't allow in production!
# }
```

---

## 🚀 6. Data Connect Deployment

### 6.1 Generate Production SDK

```powershell
# Navigate to project root
cd c:\Users\CP8174\Documents\GitHub\codelab-dataconnect-web

# Generate SDK for production
firebase dataconnect:sdk:generate --force

# Verify SDK generated in app/src/lib/dataconnect-sdk/
ls app/src/lib/dataconnect-sdk/
```

### 6.2 Deploy Data Connect Schema

```powershell
# Deploy Data Connect service (creates tables, applies schema)
firebase deploy --only dataconnect

# Expected output:
# ✔ Deploy complete!
# 
# Data Connect deployed to:
# Service ID: file-manager-fdc
# Location: us-central1
# CloudSQL Instance: file-manager-db-prod
```

### 6.3 Verify Schema Deployment

```powershell
# Check deployment status
firebase dataconnect:services:list

# Connect to Cloud SQL to verify tables
gcloud sql connect file-manager-db-prod --user=postgres --database=zfile-manager-v2

# In PostgreSQL shell:
# \dt  -- List all tables
# \d+ files  -- Describe files table
# SELECT COUNT(*) FROM files;  -- Should be 0 initially
# \q  -- Exit
```

### 6.4 Populate Initial Data (Optional)

If you need to migrate data from Firestore or load initial data:

```powershell
# Option 1: Run insert mutations via Firebase extension
# Open VSCode → Firebase Extension → Execute moviedata_insert.gql

# Option 2: Run migration script
node scripts/migrateFirestoreToDataConnect.js

# Option 3: Manual GraphQL mutations
firebase dataconnect:execute --operation CreateUser --data '{"id":"admin-001","username":"admin","email":"admin@example.com","tenantId":"default","role":"admin","status":"active"}'
```

---

## 🌐 7. Frontend Build & Hosting

### 7.1 Build React App for Production

```powershell
# Navigate to app directory
cd app

# Install dependencies
npm install

# Build for production (uses .env.production)
npm run build

# Verify build output
ls dist/
# Should contain: index.html, assets/, etc.

# Test production build locally (optional)
npm run preview
# Visit http://localhost:4173
```

### 7.2 Optimize Build (Optional)

Add to `app/vite.config.ts`:

```typescript
export default defineConfig({
  plugins: [react()],
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'firebase-vendor': ['firebase/app', 'firebase/auth', 'firebase/firestore'],
        },
      },
    },
  },
});
```

### 7.3 Deploy to Firebase Hosting

```powershell
# Return to project root
cd ..

# Deploy hosting
firebase deploy --only hosting

# Expected output:
# ✔ Deploy complete!
# 
# Hosting URL: https://zfile-manager-v2.web.app
# Project Console: https://console.firebase.google.com/project/zfile-manager-v2/hosting
```

### 7.4 Configure Custom Domain (Optional)

```powershell
# Add custom domain via Firebase Console
# 1. Go to Hosting → Add custom domain
# 2. Enter domain: files.yourdomain.com
# 3. Add DNS records as instructed
# 4. Wait for SSL provisioning (~24 hours)

# Or via CLI:
firebase hosting:channel:create production
firebase hosting:sites:create yourdomain-com
```

---

## ☁️ 8. Cloud Functions Deployment

### 8.1 Review Functions Configuration

Check `functions/package.json`:

```json
{
  "engines": {
    "node": "18"
  },
  "main": "lib/index.js",
  "dependencies": {
    "firebase-admin": "^12.0.0",
    "firebase-functions": "^5.0.0"
  }
}
```

### 8.2 Build Functions

```powershell
# Navigate to functions directory
cd functions

# Install dependencies
npm install

# Build TypeScript (if applicable)
npm run build

# Verify lib/ folder created
ls lib/
```

### 8.3 Deploy Cloud Functions

```powershell
# Return to project root
cd ..

# Deploy all functions
firebase deploy --only functions

# Or deploy specific function
firebase deploy --only functions:onFileCreated

# Expected output:
# ✔ functions[onFileCreated(us-central1)] Successful create operation
# ✔ functions[cleanupExpiredFiles(us-central1)] Successful create operation
```

### 8.4 Verify Function Triggers

```powershell
# List deployed functions
firebase functions:list

# Check logs
firebase functions:log --only onFileCreated

# Test function (if HTTP callable)
curl -X POST https://us-central1-zfile-manager-v2.cloudfunctions.net/yourFunction `
  -H "Content-Type: application/json" `
  -d '{"test": true}'
```

---

## ✅ 9. Post-Deployment Verification

### 9.1 Health Check Checklist

```powershell
# 1. Check Firebase Hosting
Start-Process "https://zfile-manager-v2.web.app"

# 2. Check Data Connect endpoint
$dataConnectUrl = "https://file-manager-fdc-zfile-manager-v2.a.run.app/graphql"
curl -X POST $dataConnectUrl -H "Content-Type: application/json" -d '{"query":"{ __schema { types { name } } }"}'

# 3. Test authentication
# - Visit app
# - Sign in anonymously
# - Verify user created in Firebase Auth console

# 4. Test file upload
# - Upload a file via UI
# - Verify file appears in Storage console
# - Verify metadata in Cloud SQL (via Cloud Console → SQL → Query)

# 5. Check Cloud Functions logs
firebase functions:log --limit 50

# 6. Monitor Cloud SQL
# Go to Cloud Console → SQL → file-manager-db-prod → Monitoring
```

### 9.2 Production Smoke Tests

**Test Checklist:**
- [ ] Homepage loads without errors
- [ ] User can sign in (anonymous or SSO)
- [ ] File upload works
- [ ] File download works
- [ ] File delete works
- [ ] Folder creation works
- [ ] Breadcrumb navigation works
- [ ] Search/filter works
- [ ] Movie list loads (if applicable)
- [ ] No console errors in browser DevTools
- [ ] Network requests return 200 (not 403/500)

### 9.3 Performance Verification

```powershell
# Run Lighthouse audit
npm install -g lighthouse
lighthouse https://zfile-manager-v2.web.app --view

# Check Core Web Vitals
# - LCP (Largest Contentful Paint): < 2.5s
# - FID (First Input Delay): < 100ms
# - CLS (Cumulative Layout Shift): < 0.1
```

### 9.4 Security Audit

```powershell
# Test storage rules
firebase emulators:exec --only storage "npm run test:storage"

# Test Data Connect auth
# Try to access ListAllFiles without auth (should fail)
curl -X POST https://file-manager-fdc-zfile-manager-v2.a.run.app/graphql `
  -H "Content-Type: application/json" `
  -d '{"query":"query { files { id name } }"}'
# Expected: 403 Forbidden or UNAUTHENTICATED error

# Check SSL certificate
Start-Process "https://www.ssllabs.com/ssltest/analyze.html?d=zfile-manager-v2.web.app"
```

---

## 🔄 10. Rollback Procedures

### 10.1 Rollback Hosting

```powershell
# List hosting releases
firebase hosting:releases:list

# Rollback to previous release
firebase hosting:rollback

# Or rollback to specific version
firebase hosting:channel:deploy previous-release
```

### 10.2 Rollback Cloud Functions

```powershell
# Cloud Functions don't support instant rollback
# Redeploy previous version from Git

# Checkout previous commit
git log --oneline
git checkout [previous-commit-hash]

# Redeploy functions
firebase deploy --only functions

# Return to latest
git checkout main
```

### 10.3 Rollback Data Connect Schema

```powershell
# ⚠️ DANGEROUS: Schema rollback can cause data loss!

# Option 1: Revert schema changes in Git
git checkout [previous-commit-hash] -- dataconnect/

# Redeploy schema (WARNING: may drop tables/columns)
firebase deploy --only dataconnect

# Option 2: Manual SQL migration
gcloud sql connect file-manager-db-prod --user=postgres --database=zfile-manager-v2
# Run manual ALTER TABLE commands
```

### 10.4 Emergency Downtime Procedure

```powershell
# Disable hosting (show maintenance page)
firebase hosting:disable

# Or redirect to maintenance page
# Update firebase.json:
# "hosting": {
#   "redirects": [{
#     "source": "**",
#     "destination": "/maintenance.html",
#     "type": 302
#   }]
# }
```

---

## 📊 11. Monitoring & Maintenance

### 11.1 Set Up Monitoring

**Firebase Console Monitoring:**
1. Go to [Firebase Console](https://console.firebase.google.com/project/zfile-manager-v2)
2. Navigate to **Analytics** → **Dashboard**
3. Set up alerts:
   - Performance Monitoring (slow queries)
   - Error rates (> 5% error rate)
   - Cloud Function failures

**Google Cloud Monitoring:**
1. Go to [Cloud Console Monitoring](https://console.cloud.google.com/monitoring)
2. Create alerts for:
   - Cloud SQL CPU > 80%
   - Cloud SQL storage > 80%
   - Cloud Function errors > 10/min
   - Data Connect API latency > 2s

### 11.2 Enable Logging

Update `app/src/lib/firebase.tsx`:

```typescript
// Add Analytics
import { getAnalytics, logEvent } from 'firebase/analytics';

const analytics = getAnalytics(firebaseApp);

// Log custom events
export function logFileUpload(fileSize: number) {
  logEvent(analytics, 'file_upload', { file_size: fileSize });
}
```

### 11.3 Database Maintenance

```powershell
# Schedule weekly backups (via Cloud Console)
# Go to Cloud SQL → Backups → Create backup

# Or automate via gcloud
gcloud sql backups create --instance=file-manager-db-prod

# List backups
gcloud sql backups list --instance=file-manager-db-prod

# Restore from backup (if needed)
gcloud sql backups restore [BACKUP_ID] --backup-instance=file-manager-db-prod
```

### 11.4 Cost Monitoring

```powershell
# Check billing
gcloud billing accounts list

# Set budget alerts (via Cloud Console)
# Go to Billing → Budgets & alerts
# Create budget: $100/month with 50%, 80%, 100% alerts

# Monitor costs daily
# https://console.cloud.google.com/billing/reports
```

### 11.5 Regular Maintenance Tasks

**Weekly:**
- [ ] Review error logs in Cloud Functions
- [ ] Check Cloud SQL performance metrics
- [ ] Verify automated backups completed
- [ ] Review storage usage

**Monthly:**
- [ ] Update npm dependencies: `npm outdated && npm update`
- [ ] Review security alerts: `npm audit`
- [ ] Clean up old Cloud Function logs
- [ ] Archive old Cloud SQL backups

**Quarterly:**
- [ ] Update Firebase SDK version
- [ ] Review and optimize Cloud SQL instance size
- [ ] Audit security rules
- [ ] Performance optimization review

---

## 🎯 Quick Deployment Command Reference

### Full Deployment (All Services)

```powershell
# Build app
cd app
npm run build
cd ..

# Deploy everything
firebase deploy
```

### Selective Deployment

```powershell
# Data Connect only
firebase deploy --only dataconnect

# Hosting only
firebase deploy --only hosting

# Functions only
firebase deploy --only functions

# Storage rules only
firebase deploy --only storage

# Firestore rules only
firebase deploy --only firestore:rules
```

### Emergency Commands

```powershell
# View live logs
firebase functions:log --follow

# List all deployments
firebase deploy:list

# Check project quota
gcloud compute project-info describe --project=zfile-manager-v2
```

---

## 📞 Support & Resources

**Firebase Support:**
- [Firebase Support](https://firebase.google.com/support)
- [Firebase Status](https://status.firebase.google.com/)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/firebase)

**Data Connect Docs:**
- [Data Connect Documentation](https://firebase.google.com/docs/data-connect)
- [GraphQL Best Practices](https://graphql.org/learn/best-practices/)
- [Cloud SQL Documentation](https://cloud.google.com/sql/docs)

**Emergency Contacts:**
- Firebase Support: support@firebase.google.com
- Google Cloud Support: (via Cloud Console)

---

## ✅ Deployment Completion Checklist

- [ ] Cloud SQL instance created and configured
- [ ] Database `zfile-manager-v2` created
- [ ] `dataconnect.yaml` updated with instance ID
- [ ] Production Firebase config added to `.env.production`
- [ ] Security rules updated for production
- [ ] Data Connect schema deployed
- [ ] React app built for production
- [ ] Firebase Hosting deployed
- [ ] Cloud Functions deployed (if applicable)
- [ ] Post-deployment tests passed
- [ ] Monitoring and alerts configured
- [ ] Team notified of production URL
- [ ] Documentation updated

---

**Deployment Complete! 🎉**

Production URL: **https://zfile-manager-v2.web.app**  
Data Connect Endpoint: **https://file-manager-fdc-zfile-manager-v2.a.run.app/graphql**

---

**Document Version:** 1.0  
**Last Updated:** December 11, 2025  
**Maintained By:** Development Team
