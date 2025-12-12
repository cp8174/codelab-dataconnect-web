# File Archiver - Cloud Scheduler

Automatically archives files based on a configured time threshold using Firebase Cloud Functions and Cloud Scheduler.

## Overview

This is a **cloud-deployed** scheduled function that runs automatically every hour to archive old files in Firebase Data Connect.

**Features:**
- ✅ **Scheduled Archiver**: Auto-archives old files every hour
- ✅ **File Activity Logging**: Tracks file creation and updates in real-time
- ✅ **Mutation Listeners**: Automatically logs when files are created/updated
- ✅ **Activity Query API**: HTTP endpoint to retrieve activity logs

## Cloud Functions

### 1. `archiveOldFiles` (Scheduled)
- **Trigger**: Cloud Scheduler (every hour)
- **Purpose**: Archives files older than configured threshold
- **Logs**: Cloud Logging

### 2. `manualArchiveFiles` (HTTP)
- **Trigger**: HTTP request
- **Purpose**: Manually trigger archival for testing
- **URL**: `https://[region]-[project].cloudfunctions.net/manualArchiveFiles?minutes=5`

### 3. `onFileCreated` (Data Connect Listener)
- **Trigger**: CreateFile mutation
- **Purpose**: Logs file creation events
- **Storage**: Firestore `fileActivityLogs` collection

### 4. `onFileUpdated` (Data Connect Listener)
- **Trigger**: UpdateFile mutation
- **Purpose**: Logs file update events
- **Storage**: Firestore `fileActivityLogs` collection

### 5. `getFileActivityLogs` (HTTP)
- **Trigger**: HTTP request
- **Purpose**: Query file activity logs
- **URL**: `https://[region]-[project].cloudfunctions.net/getFileActivityLogs`

## Architecture

```
User Actions (CreateFile/UpdateFile)
         ↓
Data Connect Mutations
         ↓
Cloud Function Listeners → Firestore Logs
         ↓                        ↓
   Cloud Logging          Activity Query API
```

## Setup

### 1. Install Function Dependencies

```bash
cd functions
npm install
cd ..
```

### 2. Configure Archive Threshold

Edit `functions/.env.yaml`:
```yaml
ARCHIVE_AFTER_MINUTES: "60"  # Change to desired minutes
```

### 3. Deploy to Firebase

```bash
# Deploy Data Connect schema first
firebase deploy --only dataconnect --project emc-zdtrk-development1-d

# Deploy Firestore indexes (if needed)
firebase deploy --only firestore:indexes --project emc-zdtrk-development1-d

# Deploy Cloud Functions
firebase deploy --only functions --project emc-zdtrk-development1-d
```

On first deployment, you'll be prompted to:
- Enable required APIs (Cloud Functions, Cloud Scheduler, Firestore)
- Grant necessary permissions

## How It Works

### File Archival (Scheduled)

1. **Cloud Scheduler** triggers `archiveOldFiles` function every hour
2. **Function calculates** threshold: `Now - ARCHIVE_AFTER_MINUTES`
3. **Calls Data Connect API** with `ArchiveOldFiles` mutation
4. **Bulk updates** all files older than threshold:
   ```
   SET isArchived = true, archivedAt = NOW()
   WHERE uploadedAt < threshold AND isArchived = false
   ```
5. **Logs results** to Cloud Logging

### File Activity Logging (Real-time)

1. **User creates/updates file** → `CreateFile` or `UpdateFile` mutation executes
2. **Data Connect listener** (`onFileCreated`/`onFileUpdated`) triggers automatically
3. **Logging function** writes to Firestore `fileActivityLogs` collection:
   ```json
   {
     "action": "created",
     "fileId": "abc-123",
     "fileName": "document.pdf",
     "userId": "user123",
     "size": 524288,
     "mimeType": "application/pdf",
     "timestamp": "2025-12-12T18:00:00Z"
   }
   ```
4. **Cloud Logging** shows formatted log: `📁 NEW FILE: document.pdf (512 KB) by user user123`

### Query Activity Logs

```bash
# Get last 50 activities
curl https://us-central1-emc-zdtrk-development1-d.cloudfunctions.net/getFileActivityLogs

# Get only file creations
curl https://us-central1-emc-zdtrk-development1-d.cloudfunctions.net/getFileActivityLogs?action=created

# Get activities for specific user
curl https://us-central1-emc-zdtrk-development1-d.cloudfunctions.net/getFileActivityLogs?userId=user123

# Limit results
curl https://us-central1-emc-zdtrk-development1-d.cloudfunctions.net/getFileActivityLogs?limit=10
```

### Manual Archival

Trigger immediately via HTTP:
```bash
# Archive files older than 60 minutes (default)
curl https://us-central1-emc-zdtrk-development1-d.cloudfunctions.net/manualArchiveFiles

# Archive files older than 5 minutes (for testing)
curl https://us-central1-emc-zdtrk-development1-d.cloudfunctions.net/manualArchiveFiles?minutes=5
```

Or use Firebase CLI:
```bash
firebase functions:shell
> archiveOldFiles()
```

## Configuration

### Change Archive Threshold

**Option 1: Update .env.yaml and redeploy**
```bash
# Edit functions/.env.yaml
# Then redeploy
firebase deploy --only functions
```

**Option 2: Update environment config (no redeploy needed)**
```bash
firebase functions:config:set archive.minutes=120
```

### Change Schedule

Edit `functions/index.js`:
```javascript
exports.archiveOldFiles = onSchedule({
  schedule: "0 */2 * * *", // Every 2 hours
  // or
  schedule: "0 0 * * *",   // Daily at midnight
  // ...
})
```

Common cron schedules:
- `"0 * * * *"` - Every hour
- `"0 */6 * * *"` - Every 6 hours  
- `"0 0 * * *"` - Daily at midnight
- `"0 2 * * 0"` - Weekly on Sunday at 2 AM

## Monitoring

### View Logs

```bash
# Real-time logs
firebase functions:log --only archiveOldFiles

# Or in Google Cloud Console
# Logging > Logs Explorer > Filter by function name
```

### Check Scheduler Status

```bash
# List scheduled functions
gcloud scheduler jobs list

# View specific job
gcloud scheduler jobs describe firebase-schedule-archiveOldFiles-us-central1
```

## Data Connect Mutations

### ArchiveOldFiles (Cloud Functions Only)

```graphql
mutation ArchiveOldFiles($olderThan: Timestamp!) @auth(level: NO_ACCESS) {
  file_updateMany(
    where: {
      _and: [
        { uploadedAt: { lt: $olderThan } }
        { isArchived: { eq: false } }
      ]
    }
    data: {
      isArchived: true
      archivedAt_timestamp: { now: true }
    }
  )
}
```

### User Mutations (App)

```graphql
# Archive single file
mutation ArchiveFile($id: UUID!) @auth(level: USER)

# Restore archived file  
mutation RestoreFile($id: UUID!) @auth(level: USER)
```

### Queries

```graphql
# List user's archived files
query ListArchivedFiles @auth(level: USER)

# Count archived files
query GetArchivedFilesCount @auth(level: USER)
```

## Testing

### Local Testing with Emulator

```bash
# Start emulators
firebase emulators:start

# In another terminal, trigger function
curl http://localhost:5001/emc-zdtrk-development1-d/us-central1/manualArchiveFiles?minutes=1
```

### Production Testing

```bash
# Trigger manual function
curl https://us-central1-emc-zdtrk-development1-d.cloudfunctions.net/manualArchiveFiles?minutes=5

# Check logs
firebase functions:log --only manualArchiveFiles
```

## Cost Optimization

Cloud Function costs depend on:
- **Invocations**: 2M free per month, then $0.40/M
- **Compute time**: 400K GB-sec free, then $0.0000025/GB-sec
- **Outbound data**: 5GB free, then $0.12/GB

With hourly execution (744 runs/month):
- **Invocations**: Free (well under 2M)
- **Compute**: ~$0.01-0.05/month (assuming <1 second per run)
- **Total**: Essentially free for typical usage

To reduce costs further:
- Increase schedule interval (e.g., every 6 hours)
- Reduce memory allocation (currently 256MiB)
- Add conditional execution (skip if no files to archive)

## Troubleshooting

### Function Deployment Fails

```bash
# Check Node.js version (should be 18)
node --version

# Reinstall dependencies
cd functions
rm -rf node_modules package-lock.json
npm install
cd ..

# Redeploy
firebase deploy --only functions
```

### Authentication Errors

Ensure Cloud Functions has permissions:
```bash
# Grant Data Connect access
gcloud projects add-iam-policy-binding emc-zdtrk-development1-d \
  --member="serviceAccount:emc-zdtrk-development1-d@appspot.gserviceaccount.com" \
  --role="roles/firebasedataconnect.viewer"
```

### No Files Archived

- Check threshold is correct
- Verify files exist older than threshold
- Check Cloud Logging for errors
- Ensure Data Connect schema is deployed

## Security

- ✅ `ArchiveOldFiles` mutation: `@auth(level: NO_ACCESS)` - only Cloud Functions can call
- ✅ Cloud Function runs with service account credentials
- ✅ User operations require authentication (`@auth(level: USER)`)
- ✅ Users can only see/manage their own files

## Uninstall

```bash
# Delete Cloud Function
firebase functions:delete archiveOldFiles
firebase functions:delete manualArchiveFiles

# Or remove from index.js and redeploy
firebase deploy --only functions
```
