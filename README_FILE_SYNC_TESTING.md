# File Manager with Cloud Function Sync - Testing Guide

## 🎯 What This Does

Automatically syncs files across Firebase services:
1. User uploads file in React app
2. **Storage** receives file
3. **Cloud Function** creates Firestore document
4. **Cloud Function** syncs to Data Connect (SQL)
5. React app shows file with sync status

## 🚀 Quick Start (3 Steps)

### Step 1: Start Emulators
```powershell
cd functions
npm run serve
```
✅ Wait for: "All emulators ready!"

### Step 2: Start React App
```powershell
cd app
npm run dev
```
✅ Open: http://localhost:5173/filemanager

### Step 3: Test Upload
1. Click "Click to upload files"
2. Select any file
3. Watch it sync! ✅

## 📊 Monitor Sync Status (Optional)

```powershell
node monitorFileSync.js
```

Shows real-time status:
```
⏳ myfile.jpg    → Pending sync
🔄 myfile.jpg    → Syncing...
✅ myfile.jpg    → Synced (10:30:45 AM)
```

## 🧪 Test Scripts

### Option 1: Upload via React UI (Recommended)
- Navigate to http://localhost:5173/filemanager
- Upload file through interface
- Watch sync happen automatically

### Option 2: Programmatic Test
```powershell
node testFileUpload.js
```
Creates and uploads test file, explains what should happen

### Option 3: Manual Firestore Test
```powershell
node testFirestoreSync.js
```
Tests just the Firestore → Data Connect sync

## ✅ Success Checklist

After uploading a file, you should see:

**In File Manager UI:**
- ✓ File appears in list
- ✓ "Cloud Functions Active" indicator shows green
- ✓ Can download and delete file

**In Monitor Script:**
- ✓ Status changes: ⏳ → 🔄 → ✅
- ✓ Shows sync timestamp

**In Emulator UI (http://localhost:4000):**
- ✓ Firestore: Document in `files` collection
- ✓ Document has `dataConnectSync.status = "synced"`
- ✓ Storage: File at `tenants/tenant-001/files/...`

**In Cloud Function Logs:**
- ✓ "File uploaded and synced to Firestore"
- ✓ "File synced to Data Connect successfully"

## 📚 Documentation

Choose based on what you need:

| File | When to Use |
|------|------------|
| **QUICKSTART_FILE_SYNC.md** | First time setup and testing |
| **FILE_SYNC_TESTING_GUIDE.md** | Comprehensive testing and troubleshooting |
| **FILE_MANAGER_INTEGRATION_SUMMARY.md** | Technical details and architecture |
| **TESTING_FILE_LISTENERS.md** | Function-level testing and debugging |

## 🔧 Troubleshooting

### File uploads but never syncs
```powershell
# Restart emulators
cd functions
# Press Ctrl+C
npm run serve
```

### Monitor shows errors
```powershell
# Check Firestore emulator is running
netstat -ano | findstr :8088
```

### Want to see detailed logs
```powershell
# In functions terminal, watch for:
# "File uploaded and synced to Firestore"
# "File synced to Data Connect successfully"
```

## 🎓 What You're Testing

### 7 Cloud Functions Working Together:

**Storage Listeners (3):**
1. `onStorageFileUploaded` - New file uploaded
2. `onStorageFileDeleted` - File deleted
3. `onStorageFileMetadataUpdated` - Metadata changed

**Firestore Listeners (4):**
4. `onFileCreatedSyncToDataConnect` - Sync new file
5. `onFileUpdatedSyncToDataConnect` - Sync updates
6. `onFileDeletedSyncToDataConnect` - Handle deletion
7. `batchSyncFilesToDataConnect` - Batch sync existing files

### The Complete Pipeline:
```
React App (FileManager.tsx)
    ↓ [Upload]
Firebase Storage (tenants/tenant-001/files/...)
    ↓ [Trigger: onStorageFileUploaded]
Firestore (files collection)
    ↓ [Trigger: onFileCreatedSyncToDataConnect]
Data Connect (SQL database)
    ↓ [Update sync status]
Firestore (dataConnectSync field added)
    ↓ [Query]
React App (Shows file with sync status)
```

## ⚡ Expected Performance

- **Storage → Firestore:** < 1 second
- **Firestore → Data Connect:** 5-10 seconds
- **Total sync time:** 10-15 seconds max
- **UI update:** Immediate after refresh

## 🎉 Success!

If you can upload a file and see it appear with ✅ status in the monitor, everything is working perfectly!

You've successfully integrated:
- ✅ File uploads with tenant context
- ✅ Automatic Firestore sync
- ✅ Background Data Connect sync
- ✅ Real-time status tracking
- ✅ Complete UI integration

## 🚀 Next Steps

1. Test with different file types (images, PDFs, videos)
2. Test with multiple files at once
3. Test delete functionality
4. Check different tenant IDs
5. Monitor performance with large files

## 📞 Need Help?

1. Run the monitor script to see what's happening
2. Check emulator UI at http://localhost:4000
3. Read the comprehensive guides in docs folder
4. Check Cloud Function logs in terminal

---

**Happy Testing! 🎉**
