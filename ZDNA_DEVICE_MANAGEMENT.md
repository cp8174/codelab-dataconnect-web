# ZDNA Device Management Module

A full-featured ZDNA device management UI integrated with Firebase Cloud Functions.

## Features

### ✅ Full CRUD Operations
- **Create** ZDNA devices with name, type, OS, version, IP address
- **Read** device list with filtering by status
- **Update** device details and configuration
- **Delete** devices with confirmation

### 📊 Real-time Statistics
- Total ZDNA devices count
- Online devices
- Offline devices
- Devices in maintenance

### 🎨 Device Types Supported
- 🖥️ Desktop
- 📱 Mobile
- 📱 Tablet
- 🔌 IoT Devices
- 🖳 Servers

### 🚦 Status Management
- **Online** - Device is active
- **Offline** - Device is disconnected
- **Maintenance** - Device under maintenance

### 🔍 Filtering
- Filter by device status
- Real-time refresh
- Auto-reload on changes

## Usage

### Access the Module
Navigate to: **http://localhost:5173/devices**

Or click **"📱 ZDNA Devices"** in the navigation bar

### Add a ZDNA Device
1. Click **"➕ Add ZDNA Device"** button
2. Fill in device details:
   - Device Name (required)
   - Device Type (desktop, mobile, tablet, iot, server)
   - Operating System (optional)
   - Version (optional)
   - IP Address (optional)
3. Click **"Add ZDNA Device"**

### Edit a ZDNA Device
1. Click **"Edit"** button on any device card
2. Update the fields
3. Click **"Update ZDNA Device"**

### Update Device Status
- Use the dropdown on each device card to quickly change status
- Changes are saved immediately

### Delete a ZDNA Device
1. Click **"Delete"** button on the device card
2. Confirm the deletion

## Integration with Cloud Functions

The module uses the `DeviceService` which calls these Cloud Functions:

```typescript
// Create ZDNA device
await deviceService.createDevice({
  tenantId: 'tenant-123',
  name: 'Office PC',
  type: 'desktop',
  config: { os: 'Windows 11' }
});

// Get ZDNA devices
const devices = await deviceService.listDevicesByTenant('tenant-123');

// Update ZDNA device
await deviceService.updateDevice({
  deviceId: 'device-123',
  updates: { name: 'New Name' }
});

// Update status
await deviceService.updateDeviceStatus('device-123', 'online');

// Delete ZDNA device
await deviceService.deleteDevice('device-123');

// Get statistics
const stats = await deviceService.getDeviceStats('tenant-123');
```

## Components

### `DeviceManagement` (Main Page)
- Lists all ZDNA devices
- Shows statistics
- Handles filtering and actions

### `DeviceCard`
- Displays ZDNA device information
- Quick status update
- Edit and delete actions

### `DeviceForm`
- Modal form for create/edit
- Validates required fields
- Handles both create and update

## Data Flow

1. **Load Devices** → Cloud Function `listDevicesByTenant` → Display in grid
2. **Load Stats** → Cloud Function `getDeviceStats` → Display metrics
3. **Create** → `DeviceForm` → Cloud Function `createDevice` → Reload list
4. **Update** → `DeviceForm` → Cloud Function `updateDevice` → Reload list
5. **Delete** → Confirmation → Cloud Function `deleteDevice` → Reload list
6. **Status Update** → Cloud Function `updateDeviceStatus` → Reload list

## Firebase Services Used

- **Cloud Functions**: Backend CRUD operations
- **Firestore**: Device data storage
- **Realtime Database**: Real-time status updates
- **Authentication**: User-based access control

## Styling

- Uses Tailwind CSS for responsive design
- Mobile-friendly grid layout
- Color-coded status indicators:
  - 🟢 Green = Online
  - ⚫ Gray = Offline
  - 🟡 Yellow = Maintenance

## Error Handling

- All operations include try-catch blocks
- User-friendly error messages displayed
- Failed operations don't crash the app
- Confirmation dialogs for destructive actions

## Future Enhancements

Potential additions:
- ZDNA device command execution
- Real-time status monitoring
- Device heartbeat tracking
- Location mapping for IoT devices
- Device grouping
- Bulk operations
- Export device list
- Device activity logs
- ZDNA-specific configurations
