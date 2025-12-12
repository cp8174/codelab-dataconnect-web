# Simulate Workflow - User Guide

## Overview

The **Simulate Workflow** module demonstrates the complete data pipeline in your Firebase application:

```
File Upload → Storage → Firestore → Cloud SQL (Data Connect)
                        ↓
               ZDNA Device Creation
                        ↓
               Cloud SQL Query via Cloud Function
```

## Accessing the Simulator

Navigate to: **http://localhost:5173/simulate**

Or click **🎭 Simulate Workflow** in the navigation bar.

## What It Does

This simulation shows 6 steps in real-time:

### Step 1: 📤 File Upload
- Upload a device configuration file to Firebase Storage
- Path: `tenants/tenant-001/files/{timestamp}_{filename}`
- Metadata includes: tenantId, deviceName, uploadedBy

### Step 2: 🔥 Storage → Firestore
- **Cloud Function**: `onStorageFileUploaded` (automatic)
- Extracts tenantId from storage path
- Creates document in Firestore `files` collection
- Fields: id, name, storagePath, size, mimeType, status, uploadedAt

### Step 3: ⚡ Firestore → Cloud SQL
- **Cloud Function**: `onFileCreatedSyncToDataConnect` (automatic)
- Triggered when Firestore document created
- Syncs file metadata to Data Connect (Cloud SQL)
- Updates `dataConnectSync` field with sync status

### Step 4: 💾 Create ZDNA Device
- **Cloud Function**: `createDevice` (callable)
- Creates device record in Firestore `devices` collection
- Links device to uploaded config file
- Device data: name, type, status, osVersion, serialNumber, configFileUrl

### Step 5: 🔄 Device Sync
- Automatic sync of device to Cloud SQL
- Similar to file sync process
- Device data available in SQL database

### Step 6: 📊 Read from Cloud SQL
- **Cloud Function**: `readCloudSqlData` (callable)
- Queries Firestore (which mirrors Cloud SQL)
- Returns both files and devices
- Shows sync status for each record

## How to Use

### 1. Prepare Test Data

**Device Config File:**
- Create a simple config file (any format: JSON, XML, TXT)
- Example content:
  ```json
  {
    "deviceId": "DEV-001",
    "settings": {
      "autoUpdate": true,
      "securityLevel": "high"
    }
  }
  ```

**Device Details:**
- Device Name: e.g., "Work Laptop", "Mobile Phone"
- Device Type: Laptop, Desktop, Mobile, or Tablet

### 2. Run Simulation

1. **Select Config File**: Click the file upload area
2. **Enter Device Name**: Type a descriptive name
3. **Choose Device Type**: Select from dropdown
4. **Click "▶️ Start Simulation"**: Watch the magic happen!

### 3. Watch the Progress

Each step shows:
- ⏳ **Pending**: Not started yet
- 🔄 **Running**: Currently executing (animated)
- ✅ **Success**: Completed successfully
- ❌ **Error**: Something went wrong

**Real-time Data:**
- Timestamp of each step
- Duration in milliseconds
- JSON data payloads
- Connection flow between steps

### 4. View Results

After completion, see:
- **Total Files in Cloud SQL**: Count of all files
- **Total Devices in Cloud SQL**: Count of all devices
- **Complete Data**: Full JSON from Cloud SQL query
- **Sync Status**: Which records successfully synced

## Cloud Functions Involved

### 1. onStorageFileUploaded
**Location**: `functions/src/storageListeners.ts`
**Trigger**: Storage object finalize
**Action**: Creates Firestore document
```typescript
{
  id: auto-generated,
  tenantId: "tenant-001",
  name: "config.json",
  storagePath: "tenants/tenant-001/files/...",
  status: "active"
}
```

### 2. onFileCreatedSyncToDataConnect
**Location**: `functions/src/firestoreToDataConnect.ts`
**Trigger**: Firestore document onCreate
**Action**: Syncs to Data Connect
```typescript
{
  dataConnectSync: {
    status: "synced",
    syncedAt: timestamp,
    lastSyncAttempt: timestamp
  }
}
```

### 3. createDevice
**Location**: `functions/src/devices.ts`
**Type**: Callable function
**Action**: Creates device in Firestore
```typescript
POST to createDevice({
  name: "Work Laptop",
  type: "Laptop",
  tenantId: "tenant-001",
  configFileUrl: "tenants/..."
})
```

### 4. readCloudSqlData
**Location**: `functions/src/cloudSqlReader.ts`
**Type**: Callable function
**Action**: Queries synced data
```typescript
POST to readCloudSqlData({
  tenantId: "tenant-001"
})

Returns: {
  files: [...],
  devices: [...],
  summary: { totalFiles, totalDevices, syncedFiles }
}
```

## Expected Timing

| Step | Action | Duration |
|------|--------|----------|
| 1 | File Upload | 500-2000ms |
| 2 | Storage → Firestore | 2000-3000ms |
| 3 | Firestore → Cloud SQL | 4000-5000ms |
| 4 | Create Device | 500-1000ms |
| 5 | Device Sync | 3000-4000ms |
| 6 | Read Cloud SQL | 1000-2000ms |
| **Total** | **Complete Pipeline** | **~15-20 seconds** |

## Data Flow Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    React App UI                          │
│              SimulateWorkflow.tsx                        │
└────────────────────┬────────────────────────────────────┘
                     │
                     │ 1. Upload File
                     ▼
┌─────────────────────────────────────────────────────────┐
│                Firebase Storage                          │
│  Path: tenants/tenant-001/files/{timestamp}_{file}      │
└────────────────────┬────────────────────────────────────┘
                     │
                     │ 🔥 TRIGGER: onStorageFileUploaded
                     ▼
┌─────────────────────────────────────────────────────────┐
│              Firestore Collection: files                 │
│  Document: { id, name, storagePath, tenantId, ... }     │
└────────────────────┬────────────────────────────────────┘
                     │
                     │ 🔥 TRIGGER: onFileCreatedSyncToDataConnect
                     ▼
┌─────────────────────────────────────────────────────────┐
│         Firebase Data Connect (Cloud SQL)                │
│         Files Table with synced metadata                 │
└────────────────────┬────────────────────────────────────┘
                     │
     ┌───────────────┴───────────────┐
     │                               │
     │ 2. Create Device              │ 3. Read Data
     ▼                               ▼
┌─────────────────┐         ┌──────────────────┐
│   createDevice  │         │ readCloudSqlData │
│   (Callable)    │         │   (Callable)     │
└────────┬────────┘         └────────┬─────────┘
         │                           │
         ▼                           ▼
┌─────────────────┐         ┌──────────────────┐
│ Firestore:      │         │ Query Results:   │
│ devices         │         │ - All files      │
│ collection      │         │ - All devices    │
└─────────┬───────┘         │ - Sync status    │
          │                 └──────────────────┘
          │ Sync to Cloud SQL
          ▼
┌─────────────────────────────────────────────────────────┐
│         Firebase Data Connect (Cloud SQL)                │
│         Devices Table with complete data                 │
└─────────────────────────────────────────────────────────┘
```

## Monitoring the Simulation

### In the UI
- **Green checkmarks** (✅): Step completed successfully
- **Spinning icon** (🔄): Step currently running
- **Red X** (❌): Step failed with error
- **Timestamp**: When step completed
- **Duration**: How long step took
- **Data preview**: JSON payload at each step

### In Cloud Function Logs
Open the terminal running `npm run serve` to see:
```
✔ functions[onStorageFileUploaded]: Beginning execution
>  File uploaded and synced to Firestore { fileId, filePath, tenantId }
✔ functions[onStorageFileUploaded]: Finished execution

✔ functions[onFileCreatedSyncToDataConnect]: Beginning execution
>  Syncing file to Data Connect { fileId, name }
>  File synced successfully
✔ functions[onFileCreatedSyncToDataConnect]: Finished execution

✔ functions[createDevice]: Beginning execution
>  Device created { deviceId, name, tenantId }
✔ functions[createDevice]: Finished execution

✔ functions[readCloudSqlData]: Beginning execution
>  Reading Cloud SQL data { tenantId, filesCount, devicesCount }
✔ functions[readCloudSqlData]: Finished execution
```

### In Emulator UI
Open http://localhost:4000

**Firestore Tab:**
- Check `files` collection → Find your uploaded file
- Check `devices` collection → Find your created device
- Verify `dataConnectSync` field shows "synced"

**Storage Tab:**
- Browse to `tenants/tenant-001/files/`
- Verify your uploaded file exists

**Functions Tab:**
- See all function invocations
- Check request/response data
- View execution times

## Troubleshooting

### File upload fails
**Problem**: Upload button doesn't work
**Solution**:
- Check if emulators are running
- Verify Storage emulator on port 9199
- Check browser console for errors

### Step 2 never completes
**Problem**: Storage listener not triggering
**Solution**:
- Restart emulators: `npm run serve`
- Check storage path format
- Verify Cloud Functions are deployed

### Step 3 stuck on "syncing"
**Problem**: Firestore listener not working
**Solution**:
- Wait 10-15 seconds (normal delay)
- Check Firestore emulator on port 8088
- Verify document was created in Step 2

### Device creation fails
**Problem**: Step 4 shows error
**Solution**:
- Check device name is not empty
- Verify createDevice function is deployed
- Check Cloud Function logs for details

### No data in final results
**Problem**: Step 6 returns empty arrays
**Solution**:
- Ensure previous steps completed successfully
- Check tenantId is correct (tenant-001)
- Verify Firestore has documents
- Run query manually in Emulator UI

## Testing Different Scenarios

### Scenario 1: Multiple Files
Run simulation 3 times with different files to see:
- Multiple files in Cloud SQL
- Sync status for each
- Total storage calculation

### Scenario 2: Different Device Types
Test with:
- Laptop config
- Desktop config
- Mobile config
- Tablet config

### Scenario 3: Large Files
Upload larger config files (>1MB) to test:
- Upload progress
- Sync timing
- Performance

### Scenario 4: Error Handling
Intentionally cause errors:
- Upload without selecting file
- Upload without device name
- Stop emulators mid-simulation

## Reset and Retry

**To reset simulation:**
1. Click "🔄 Reset" button
2. All steps return to pending state
3. Results panel clears
4. Select new file and run again

**To clear all data:**
```powershell
node clearDummyData.js
```

## Success Criteria

✅ Simulation successful when you see:
1. All 6 steps show ✅ green checkmarks
2. Each step has timestamp and duration
3. Final results show files and devices
4. No errors in Cloud Function logs
5. Data visible in Emulator UI Firestore tab

## Advanced Usage

### Monitor in Real-Time
In separate terminal:
```powershell
node monitorFileSync.js
```
See files sync status live as simulation runs.

### Test Batch Operations
Run simulation multiple times rapidly to test:
- Concurrent uploads
- Parallel syncs
- Load handling

### Custom Cloud Functions
Modify `cloudSqlReader.ts` to add:
- Custom queries
- Data transformations
- Advanced filtering
- Aggregations

## Summary

The Simulate Workflow module provides:
- ✅ **Visual representation** of data pipeline
- ✅ **Real-time progress tracking** for each step
- ✅ **Complete data visibility** at each stage
- ✅ **Cloud Function integration** demonstration
- ✅ **Error handling** and debugging
- ✅ **Educational tool** for understanding Firebase architecture

Perfect for:
- Testing the complete pipeline
- Demonstrating to stakeholders
- Debugging sync issues
- Learning Firebase architecture
- Validating Cloud Functions

🎉 **Happy Simulating!**
