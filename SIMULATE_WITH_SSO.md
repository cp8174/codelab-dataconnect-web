# Updated Simulate Workflow with SSO Authorization

## What's New

The simulation now includes **SSO authentication and authorization steps** to demonstrate the complete security flow!

## New Steps Added

### 🔐 Step 1: SSO Authentication
- Verifies user is logged in via SSO
- Gets Firebase Auth JWT token
- Retrieves tenantId from token custom claims
- Shows user email and authorization status

**What you'll see:**
```json
{
  "uid": "user123",
  "email": "user@company.com",
  "tenantId": "tenant-001",
  "hasCustomClaims": true
}
```

### 🎫 Step 2: Custom Claims Validation
- Calls `getUserAuthProfile` Cloud Function
- Validates user has correct tenantId, role, and permissions
- Checks authorization for tenant operations

**What you'll see:**
```json
{
  "tenantId": "tenant-001",
  "role": "user",
  "permissions": ["read:files", "write:files"],
  "customClaims": { "tenantId": "tenant-001", "role": "user" },
  "message": "User authorized for tenant operations"
}
```

### ✅ Step 6: Authorization Check (NEW)
- Calls `verifyDataConnectAuth` Cloud Function
- Checks if user has `write:devices` permission
- Validates user's tenantId matches device's tenantId
- Ensures cross-tenant access is blocked

**What you'll see:**
```json
{
  "authorized": true,
  "reason": "Authorized",
  "userRole": "user",
  "tenantMatch": true,
  "permissions": ["read:files", "write:files", "write:devices"]
}
```

## Complete 9-Step Flow

```
Step 1: 🔐 SSO Authentication
        ↓ Get user token with tenantId
Step 2: 🎫 Custom Claims Validation
        ↓ Verify permissions
Step 3: 📤 File Upload
        ↓ Upload with user context
Step 4: 🔥 Storage → Firestore
        ↓ Cloud Function (tenant-scoped)
Step 5: ⚡ Firestore → Cloud SQL
        ↓ Cloud Function (tenant-scoped)
Step 6: ✅ Authorization Check
        ↓ Verify write:devices permission
Step 7: 💾 Create ZDNA Device
        ↓ Create with tenant validation
Step 8: 🔄 Device Sync
        ↓ Sync to Cloud SQL (tenant-scoped)
Step 9: 📊 Read from Cloud SQL
        ↓ Query filtered by tenantId
```

## How to Use

### 1. Sign In First!
**IMPORTANT:** You must be signed in via SSO before running the simulation.

If not signed in, you'll see:
```
⚠️ Not authenticated
Please sign in to run simulation
```

Click "Sign In with Google" in the navbar first.

### 2. Run Simulation
Once signed in:
1. Select config file
2. Enter device name
3. Select device type
4. Click "▶️ Start Simulation"

### 3. Watch Authorization Flow
The simulation now shows:
- ✅ User authentication status
- ✅ Custom claims validation
- ✅ Permission checks before device creation
- ✅ Tenant-scoped operations throughout

## What Each Step Shows

### Authentication Steps (NEW)
**Step 1 & 2:** Demonstrate how SSO integrates with Firestore authorization
- Gets user email from SSO
- Retrieves tenantId from Firestore
- Validates custom claims in JWT token

### File Operations (Updated)
**Step 3-5:** Now include user context
- Files uploaded with `uploadedBy: user@company.com`
- Storage metadata includes `authorizedBy: SSO`
- Firestore documents show tenant validation

### Authorization Check (NEW)
**Step 6:** Before creating device, verify:
- User has `write:devices` permission
- User's tenantId matches target tenant
- Role-based access control enforced

### Device Operations (Updated)
**Step 7-8:** Include authorization metadata
- Device created with `createdBy` and `createdByEmail`
- Shows `authorizedRole` in response
- Tenant validation passed

### Query Results (Updated)
**Step 9:** Shows security features
- Results filtered by user's tenantId
- Row-level security applied
- Only authorized data returned

## UI Updates

### Header Shows Auth Status
```
✓ Authenticated via SSO
user@company.com
Tenant: tenant-001
✓ All Cloud Functions Active
```

### Requires Authentication
Button is disabled if:
- ❌ Not signed in
- ❌ No file selected
- ❌ No device name entered

### Clear Error Messages
If not authenticated:
```
🔐 Please sign in with SSO to run simulation
Authentication required for tenant-scoped operations
```

## Authorization Data in Results

### File Upload Response
```json
{
  "path": "tenants/tenant-001/files/...",
  "size": 1024,
  "uploadedBy": "user@company.com",
  "tenantId": "tenant-001"
}
```

### Device Creation Response
```json
{
  "success": true,
  "deviceId": "device-123",
  "tenantValidation": "Passed",
  "authorizationCheck": "User has write:devices permission"
}
```

### Cloud SQL Query Response
```json
{
  "files": [...],
  "devices": [...],
  "authorization": "Query filtered by tenantId",
  "userTenant": "tenant-001",
  "rowLevelSecurity": "Applied"
}
```

## Testing Different Scenarios

### Scenario 1: Admin User
If you're an admin:
- All permission checks pass
- Can see additional authorization metadata
- Full access to operations

### Scenario 2: Regular User
If you're a regular user:
- Read and write permissions granted
- Tenant-scoped operations only
- Cannot access other tenants' data

### Scenario 3: Viewer Role
If you're a viewer:
- Read permissions only
- Write operations would fail at Step 6
- Device creation blocked

## Error Handling

### Not Authenticated
```
Step 1: ❌ Error
User not authenticated. Please sign in first.
```

### Insufficient Permissions
```
Step 6: ❌ Error
Authorization failed: User does not have write:devices permission
```

### Tenant Mismatch
```
Step 7: ❌ Error
Tenant validation failed: User's tenant does not match device tenant
```

## Cloud Functions Involved

### New Functions
1. **getUserAuthProfile** - Get user's authorization profile
2. **verifyDataConnectAuth** - Check permissions before operations
3. **onSsoUserCreated** - Set custom claims when SSO user registers
4. **onSsoUserProfileUpdated** - Update claims when profile changes

### Updated Functions
- **createDevice** - Now validates tenant and permissions
- **readCloudSqlData** - Now shows authorization metadata

## Key Differences from Before

| Before | After |
|--------|-------|
| 6 steps | 9 steps |
| No auth validation | Full SSO auth flow |
| Anonymous operations | User-attributed actions |
| No permission checks | Permission validation |
| Generic operations | Tenant-scoped operations |

## Benefits

✅ **Security Visualization**: See how SSO and Firestore auth work together
✅ **Permission Validation**: Understand role-based access control
✅ **Tenant Isolation**: Watch multi-tenant security in action
✅ **Audit Trail**: Every operation shows who performed it
✅ **Error Prevention**: Authorization checks before operations

## Summary

The simulation now demonstrates:
1. **SSO Integration** - How SSO login integrates with Firestore
2. **Custom Claims** - How tenantId gets into JWT token
3. **Authorization** - How permissions are checked before operations
4. **Tenant Scoping** - How data is isolated by tenant
5. **Audit Trail** - How user actions are tracked

Perfect for understanding your complete security architecture! 🎉

## Quick Test

1. Open: http://localhost:5173/simulate
2. Sign in with Google (if not already)
3. Upload a test file
4. Enter device name
5. Click "Start Simulation"
6. Watch all 9 steps complete with auth details!
