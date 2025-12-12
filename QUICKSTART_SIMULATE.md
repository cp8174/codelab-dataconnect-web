# Quick Start: Simulate Workflow

## 🚀 3-Step Setup

### Step 1: Start Emulators
```powershell
cd functions
npm run serve
```
✅ Wait for: "All emulators ready! It is now safe to connect your app."

### Step 2: Start React App  
```powershell
cd app
npm run dev
```
✅ Wait for: "Local: http://localhost:5173/"

### Step 3: Access Simulator
Open: **http://localhost:5173/simulate**

Or click **🎭 Simulate Workflow** in navbar

## 🎯 Quick Test

1. **Click** file upload area
2. **Select** any file (JSON, TXT, PDF, anything)
3. **Enter** device name: "Test Device"
4. **Select** device type: "Laptop"
5. **Click** "▶️ Start Simulation"
6. **Watch** all 6 steps complete (15-20 seconds)
7. **See** final results with data counts

## ✅ Success Indicators

You'll see:
- ✅ All 6 steps turn green
- ✅ Timestamp and duration for each step
- ✅ JSON data preview at each step
- ✅ Final results showing files and devices
- ✅ No errors in console

## 📊 What You'll See

### Step 1: 📤 File Upload
```
Status: ✅ Success
Data: {
  "path": "tenants/tenant-001/files/1234567890_config.json",
  "size": 256
}
Duration: 500ms
```

### Step 2: 🔥 Storage → Firestore
```
Status: ✅ Success
Data: {
  "collection": "files",
  "tenantId": "tenant-001"
}
Duration: 3000ms
```

### Step 3: ⚡ Firestore → Cloud SQL
```
Status: ✅ Success
Data: {
  "database": "Cloud SQL",
  "status": "synced"
}
Duration: 5000ms
```

### Step 4: 💾 Create ZDNA Device
```
Status: ✅ Success
Data: {
  "success": true,
  "deviceId": "abc123",
  "message": "Device created successfully"
}
Duration: 1000ms
```

### Step 5: 🔄 Device Sync
```
Status: ✅ Success
Data: {
  "deviceId": "abc123",
  "synced": true
}
Duration: 4000ms
```

### Step 6: 📊 Read from Cloud SQL
```
Status: ✅ Success
Data: {
  "success": true,
  "tenantId": "tenant-001",
  "summary": {
    "totalFiles": 5,
    "totalDevices": 3,
    "syncedFiles": 5
  },
  "files": [...],
  "devices": [...]
}
Duration: 2000ms
```

## 🎉 Final Results Panel

```
🎉 Simulation Complete!

Files in Cloud SQL: 5
Devices in Cloud SQL: 3

Complete Data from Cloud SQL:
{
  "success": true,
  "tenantId": "tenant-001",
  "timestamp": "2025-12-08T10:30:45.123Z",
  "summary": {
    "totalFiles": 5,
    "totalDevices": 3,
    "syncedFiles": 5
  },
  "files": [
    {
      "id": "file-001",
      "name": "config.json",
      "storagePath": "tenants/tenant-001/files/...",
      "tenantId": "tenant-001",
      "size": 256,
      "status": "active",
      "dataConnectSync": {
        "status": "synced",
        "syncedAt": "2025-12-08T10:30:40.123Z"
      }
    }
  ],
  "devices": [
    {
      "id": "device-001",
      "name": "Test Device",
      "type": "Laptop",
      "tenantId": "tenant-001",
      "status": "active",
      "serialNumber": "SN-1234567890",
      "configFileUrl": "tenants/tenant-001/files/..."
    }
  ]
}
```

## 🔍 Verify in Emulator UI

Open: **http://localhost:4000**

### Firestore Tab
1. Click "Firestore" in left sidebar
2. Find `files` collection → See your uploaded file
3. Find `devices` collection → See your created device
4. Check `dataConnectSync` field shows "synced"

### Storage Tab
1. Click "Storage" in left sidebar
2. Browse to `tenants/tenant-001/files/`
3. See your uploaded file

### Functions Tab
1. Click "Functions" in left sidebar
2. See all function invocations:
   - onStorageFileUploaded
   - onFileCreatedSyncToDataConnect
   - createDevice
   - readCloudSqlData

## 🐛 Troubleshooting

### "Start Simulation" button is disabled
✅ Make sure you:
- Selected a file
- Entered device name
- Both fields are required

### Step 2 never completes
✅ Check emulators:
```powershell
# In functions terminal, look for:
✔ functions[onStorageFileUploaded]: Finished execution
```

### Step 3 takes forever
✅ Normal behavior:
- Firestore listeners have 5-10 second delay
- This is expected in emulator environment
- Production is faster

### No data in final results
✅ Check previous steps:
- All steps should be ✅ green
- If any step failed, reset and try again
- Check Cloud Function logs for errors

## 🔄 Reset and Try Again

Click **🔄 Reset** button to:
- Clear all step statuses
- Clear results panel
- Start fresh simulation

## 📖 Learn More

- **SIMULATE_WORKFLOW_GUIDE.md** - Complete user guide
- **SIMULATE_MODULE_SUMMARY.md** - Technical details
- **FILE_SYNC_ARCHITECTURE.md** - Architecture diagrams

## 🎯 What This Demonstrates

Your complete Firebase pipeline:
1. ✅ File upload to Storage
2. ✅ Automatic Storage → Firestore sync
3. ✅ Automatic Firestore → Cloud SQL sync
4. ✅ Device management via Cloud Functions
5. ✅ Query data from Cloud SQL
6. ✅ Real-time visual feedback

**Perfect for**: Testing, debugging, demonstrating, and learning! 🚀
