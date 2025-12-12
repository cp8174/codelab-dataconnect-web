# Quick Start: Testing File Sync

## 🚀 Start Everything

### Terminal 1: Start Emulators
```powershell
cd functions
npm run serve
```
Wait until you see: `✔  All emulators ready!`

### Terminal 2: Start React App
```powershell
cd app
npm run dev
```
Wait until you see: `Local: http://localhost:5173/`

### Terminal 3: Monitor File Sync (Optional)
```powershell
node monitorFileSync.js
```
This shows real-time sync status for uploaded files

## 🧪 Test the Complete Flow

### 1. Access File Manager
Open browser: http://localhost:5173/filemanager

You should see:
- ✓ Cloud Functions Active indicator (green)
- Tenant: tenant-001 (orange)
- Upload area

### 2. Upload a File
1. Click "Click to upload files"
2. Select any file (image, PDF, etc.)
3. Watch progress bar turn green

### 3. Verify Sync (in Terminal 3)
Within 10-15 seconds you'll see:
```
⏳ myfile.jpg         → Pending sync
   Status: active

🔄 myfile.jpg         → Syncing...
   Status: active

✅ myfile.jpg         → Synced (10:30:45 AM)
   Status: active
```

### 4. Check Emulator UI
Open: http://localhost:4000

**Firestore Tab:**
- Collection: `files`
- Find your file document
- Check `dataConnectSync` field

**Storage Tab:**
- Bucket: `zfile-manager-v2.appspot.com`
- Path: `tenants/tenant-001/files/{timestamp}_{filename}`

## ✅ Success Indicators

Your file sync is working correctly when you see:

1. **In File Manager UI:**
   - File appears in the list
   - Can download and delete

2. **In Terminal 3 (Monitor):**
   - Status changes from ⏳ → 🔄 → ✅
   - Sync Status shows timestamp

3. **In Emulator UI:**
   - Firestore has document with `dataConnectSync.status = "synced"`
   - Storage shows file in correct tenant path

4. **In Cloud Function Logs (Terminal 1):**
   ```
   ✔ functions[us-central1-onStorageFileUploaded]: Finished
   ✔ functions[us-central1-onFileCreatedSyncToDataConnect]: Finished
   ```

## 🎯 What's Happening Behind the Scenes

```
User uploads file in React app
     ↓
Firebase Storage (tenants/tenant-001/files/...)
     ↓ [Cloud Function 1: onStorageFileUploaded]
Firestore (files collection)
     ↓ [Cloud Function 2: onFileCreatedSyncToDataConnect]
Data Connect (SQL database)
     ↓
Sync status updated in Firestore
     ↓
React app shows file
```

## 🐛 If Something Goes Wrong

### File uploads but never gets ✅ status
**Check Terminal 1 for errors:**
```powershell
# In functions terminal, press Ctrl+C and restart:
npm run serve
```

### Monitor script shows errors
**Verify Firestore emulator:**
```powershell
# Check if port 8088 is in use
netstat -ano | findstr :8088
```

### File appears in Storage but not Firestore
**Check storage path format:**
- ✅ Correct: `tenants/tenant-001/files/1234_test.jpg`
- ❌ Wrong: `files/demo-user/1234_test.jpg`

## 📊 Advanced Testing

### Test Multiple Files
Upload 3-5 files at once and watch them all sync

### Test Different File Types
- Images: `.jpg`, `.png`
- Documents: `.pdf`, `.docx`
- Videos: `.mp4`, `.mov`
- Audio: `.mp3`, `.wav`

### Test Delete
1. Upload a file
2. Wait for ✅ sync status
3. Click 🗑️ to delete
4. Verify status changes to "deleted" in monitor

## 🎉 You're Done!

If you see files syncing successfully, congratulations! Your Cloud Function pipeline is working:

- ✅ Storage listeners capturing uploads
- ✅ Firestore documents created automatically
- ✅ Data Connect sync happening in background
- ✅ Real-time monitoring showing status

## 📖 Next Steps

- Read `FILE_SYNC_TESTING_GUIDE.md` for comprehensive testing
- Check `TESTING_FILE_LISTENERS.md` for function-level testing
- Test with different tenantId values
- Add custom metadata fields
