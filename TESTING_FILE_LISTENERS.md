# Testing File Management Listeners

## Prerequisites

1. **Start Firebase Emulators**
   ```bash
   firebase emulators:start
   ```

2. **Ensure all emulators are running:**
   - Functions: `127.0.0.1:5001`
   - Firestore: `127.0.0.1:8088`
   - Storage: `127.0.0.1:9199`
   - Database: `127.0.0.1:9002`

## Quick Test

Run the automated test script:

```bash
node testFileListeners.js
```

This will test all 7 file management listeners automatically.

## Manual Testing

### Test 1: Storage Upload → Firestore Sync

**Using Firebase Console:**
1. Open Emulator UI: http://127.0.0.1:4000/storage
2. Click on your bucket
3. Upload a file to path: `tenants/tenant-001/files/test.txt`
4. Check Firestore: http://127.0.0.1:4000/firestore
5. Look for new document in `files` collection

**Expected Result:**
- New document created in Firestore `files` collection
- Document contains: `id`, `tenantId`, `name`, `storagePath`, `mimeType`, `size`, `status`

### Test 2: Storage Delete → Firestore Update

1. In Storage UI, delete the uploaded file
2. Check Firestore `files` collection
3. Document should have `status: "deleted"` and `deletedAt` timestamp

### Test 3: Firestore Create → Data Connect Sync

**Using Firestore Console:**
1. Open Firestore: http://127.0.0.1:4000/firestore
2. Create new document in `files` collection:
   ```json
   {
     "id": "test-123",
     "tenantId": "tenant-001",
     "name": "manual-test.pdf",
     "storagePath": "tenants/tenant-001/files/manual-test.pdf",
     "mimeType": "application/pdf",
     "size": 2048,
     "status": "active",
     "uploadedAt": [current timestamp],
     "createdAt": [current timestamp],
     "updatedAt": [current timestamp]
   }
   ```
3. Wait 2-3 seconds
4. Refresh the document - should see new field: `dataConnectSync` with status

### Test 4: Firestore Update → Data Connect Sync

1. Edit an existing file document in Firestore
2. Change the `name` or `size` field
3. Wait 2-3 seconds
4. Check Functions logs: http://127.0.0.1:4000/functions
5. Should see log: "File updated in Firestore, syncing to Data Connect"

### Test 5: Check Functions Logs

**View all listener activity:**
```bash
# In Firebase Emulator UI
http://127.0.0.1:4000/functions
```

Look for these function executions:
- `onStorageFileUploaded`
- `onStorageFileDeleted`
- `onStorageFileMetadataUpdated`
- `onFileCreatedSyncToDataConnect`
- `onFileUpdatedSyncToDataConnect`
- `onFileDeletedSyncToDataConnect`

## Testing with curl

### Call Batch Sync Function

```bash
# Get auth token from emulator (any user)
curl -X POST http://127.0.0.1:5001/zfile-manager-v2/us-central1/batchSyncFilesToDataConnect \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "tenantId": "tenant-001",
      "limit": 50
    }
  }'
```

## Verification Checklist

✅ **Storage → Firestore Sync**
- [ ] File upload creates Firestore document
- [ ] File delete updates status to "deleted"
- [ ] File metadata update syncs to Firestore

✅ **Firestore → Data Connect Sync**
- [ ] File creation triggers sync
- [ ] File update triggers sync (no infinite loop)
- [ ] File deletion triggers sync
- [ ] Sync status tracked in `dataConnectSync` field

✅ **Error Handling**
- [ ] Failed syncs marked as "failed" in Firestore
- [ ] Error messages logged
- [ ] No crashes on invalid data

## Monitoring

### Check Firestore Data
```
http://127.0.0.1:4000/firestore
```
Collections to monitor:
- `files` - File metadata
- `tenants` - Tenant storage usage
- `users` - User file associations

### Check Storage
```
http://127.0.0.1:4000/storage
```
Browse uploaded files by tenant path

### Check Functions Logs
```
http://127.0.0.1:4000/functions
```
Filter by function name to see specific listener activity

## Troubleshooting

**Listeners not triggering?**
1. Verify emulators are running
2. Check that functions are deployed: `npm run build` in functions directory
3. Restart emulators: `firebase emulators:start`

**No sync status in Firestore?**
1. Check Functions logs for errors
2. Verify Firestore emulator connection
3. Check that function has proper permissions

**Files not appearing in Firestore?**
1. Verify file path matches pattern: `tenants/{tenantId}/files/{filename}`
2. Check that file is not hidden (doesn't start with `.`)
3. Review Functions logs for processing errors

## Production Deployment

Before deploying to production:

1. **Update Data Connect integration** in:
   - `firestoreToDataConnect.ts`
   - Replace TODO comments with actual Data Connect API calls

2. **Add authentication checks**
   - Verify user permissions for file operations

3. **Add rate limiting**
   - Prevent abuse of batch sync function

4. **Deploy functions:**
   ```bash
   firebase deploy --only functions
   ```

## Expected Performance

- **Storage Upload → Firestore**: ~100-500ms
- **Firestore → Data Connect**: ~200-800ms
- **Total sync time**: ~1-2 seconds for complete pipeline

All timings are for emulator environment. Production may vary based on network and load.
