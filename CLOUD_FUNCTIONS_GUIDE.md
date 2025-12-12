# Cloud Functions - File Management & Logging

## Deployed Functions

### 1. 📅 Scheduled Archiver
**Function**: `archiveOldFiles`
- **Type**: Scheduled (Cloud Scheduler)
- **Schedule**: Every hour (`0 * * * *`)
- **Purpose**: Archives files older than 60 minutes
- **Action**: Calls `ArchiveOldFiles` mutation

### 2. 🔧 Manual Archiver
**Function**: `manualArchiveFiles`
- **Type**: HTTP Callable
- **URL**: `https://[region]-[project].cloudfunctions.net/manualArchiveFiles`
- **Query Params**: `?minutes=5` (optional)
- **Purpose**: Manually trigger archival for testing

### 3. 📝 File Creation Logger
**Function**: `onFileCreated`
- **Type**: Data Connect Mutation Listener
- **Trigger**: `CreateFile` mutation
- **Action**: Logs to Firestore `fileActivityLogs` collection
- **Log Format**:
  ```json
  {
    "action": "created",
    "fileId": "uuid",
    "fileName": "document.pdf",
    "userId": "user123",
    "size": 524288,
    "mimeType": "application/pdf",
    "timestamp": "ISO8601"
  }
  ```

### 4. ✏️ File Update Logger
**Function**: `onFileUpdated`
- **Type**: Data Connect Mutation Listener
- **Trigger**: `UpdateFile` mutation
- **Action**: Logs to Firestore `fileActivityLogs` collection
- **Log Format**:
  ```json
  {
    "action": "updated",
    "fileId": "uuid",
    "fileName": "document.pdf",
    "updates": {
      "name": "new-name.pdf",
      "description": "Updated description",
      "tags": ["tag1", "tag2"]
    },
    "timestamp": "ISO8601"
  }
  ```

### 5. 📊 Activity Logs Query
**Function**: `getFileActivityLogs`
- **Type**: HTTP Callable
- **URL**: `https://[region]-[project].cloudfunctions.net/getFileActivityLogs`
- **Query Params**:
  - `limit=50` - Number of logs to return (default: 50)
  - `action=created|updated` - Filter by action type
  - `userId=user123` - Filter by user
- **Purpose**: Retrieve file activity logs

## Deployment

```bash
# 1. Install dependencies
cd functions
npm install
cd ..

# 2. Deploy everything
firebase deploy --only dataconnect,firestore:indexes,functions --project emc-zdtrk-development1-d

# Or deploy individually
firebase deploy --only functions:archiveOldFiles
firebase deploy --only functions:onFileCreated,onFileUpdated
```

## Usage Examples

### Query Activity Logs
```bash
# Get last 50 activities
curl https://us-central1-emc-zdtrk-development1-d.cloudfunctions.net/getFileActivityLogs

# Get file creations only
curl "https://us-central1-emc-zdtrk-development1-d.cloudfunctions.net/getFileActivityLogs?action=created&limit=10"

# Get activities for user
curl "https://us-central1-emc-zdtrk-development1-d.cloudfunctions.net/getFileActivityLogs?userId=user123"
```

### Manual Archival
```bash
# Archive files older than 60 minutes
curl https://us-central1-emc-zdtrk-development1-d.cloudfunctions.net/manualArchiveFiles

# Archive files older than 5 minutes (testing)
curl "https://us-central1-emc-zdtrk-development1-d.cloudfunctions.net/manualArchiveFiles?minutes=5"
```

### View Logs
```bash
# Real-time logs for all functions
firebase functions:log

# Specific function logs
firebase functions:log --only onFileCreated
firebase functions:log --only archiveOldFiles

# Or in Google Cloud Console
# Logging > Logs Explorer > Filter by function name
```

## Monitoring

### Cloud Logging
All functions log to Cloud Logging:
- `📁 NEW FILE: document.pdf (512 KB) by user user123`
- `✏️ FILE UPDATED: document.pdf (ID: abc-123)`
- `Archive completed successfully in 250ms`

### Firestore Collection
Activity logs stored in `fileActivityLogs`:
- Queryable by action, userId, timestamp
- Indexed for fast queries
- Persistent storage for audit trail

### Cloud Monitoring
Set up alerts:
```bash
# Create alert for function errors
gcloud alpha monitoring policies create \
  --notification-channels=CHANNEL_ID \
  --display-name="File Functions Errors" \
  --condition-display-name="Error rate > 5%" \
  --condition-threshold-value=0.05 \
  --condition-threshold-duration=300s
```

## Cost Estimates

**Cloud Functions** (per month):
- Invocations: ~25,000/month (744 scheduled + user actions)
- Cost: Free tier covers ~2M invocations
- **Estimated**: $0-1/month

**Firestore** (per month):
- Writes: ~5,000-10,000 (activity logs)
- Reads: ~1,000 (queries)
- Storage: <1 GB
- **Estimated**: $0.50-2/month

**Total**: ~$0.50-3/month

## Security

- ✅ Mutation listeners run server-side (trusted)
- ✅ Activity logs stored securely in Firestore
- ✅ HTTP endpoints have CORS enabled
- ✅ No authentication bypasses
- ⚠️ Consider adding auth to `getFileActivityLogs` for production

## Firestore Security Rules

Add to `firestore.rules`:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // File activity logs - read-only for authenticated users
    match /fileActivityLogs/{logId} {
      allow read: if request.auth != null;
      allow write: if false; // Only Cloud Functions can write
    }
  }
}
```

## Troubleshooting

### Listeners Not Triggering
```bash
# Check if Data Connect mutations are deployed
firebase deploy --only dataconnect

# Check function deployment
firebase functions:log --only onFileCreated

# Verify connector path in functions/index.js
```

### Firestore Permission Errors
```bash
# Grant Firestore access to Cloud Functions
gcloud projects add-iam-policy-binding emc-zdtrk-development1-d \
  --member="serviceAccount:emc-zdtrk-development1-d@appspot.gserviceaccount.com" \
  --role="roles/datastore.user"
```

### Missing Logs
```bash
# Check Firestore indexes are deployed
firebase deploy --only firestore:indexes

# View index status
firebase firestore:indexes
```
