# SSO and Data Connect Authorization Guide

## Overview

Your application uses **SSO (Single Sign-On)** for authentication and **Firestore email-based authorization**. This guide explains how Data Connect integrates with your existing auth model.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    SSO Provider                              │
│            (Google, Microsoft, Okta, etc.)                   │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ 1. User logs in via SSO
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                  Firebase Auth                               │
│  • Receives SSO token                                        │
│  • Creates Firebase user with email                          │
│  • Generates Firebase Auth Token (JWT)                       │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ 2. Cloud Function: onUserCreated
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                    Firestore                                 │
│  Collection: users                                           │
│  {                                                           │
│    uid: "user123",                                           │
│    email: "user@company.com",                                │
│    tenantId: "tenant-001",  ← Your authorization key        │
│    role: "user",                                             │
│    permissions: ["read:files", "write:files"]                │
│  }                                                           │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ 3. Set Custom Claims
                     ▼
┌─────────────────────────────────────────────────────────────┐
│              Firebase Auth Token (JWT)                       │
│  {                                                           │
│    uid: "user123",                                           │
│    email: "user@company.com",                                │
│    tenantId: "tenant-001",    ← Custom claim                │
│    role: "user"               ← Custom claim                │
│  }                                                           │
└────────┬────────────────────────────────────┬───────────────┘
         │                                    │
         │ 4a. Query Firestore               │ 4b. Query Data Connect
         ▼                                    ▼
┌─────────────────────┐           ┌──────────────────────────┐
│   Firestore Rules   │           │  Data Connect Schema     │
│                     │           │                          │
│ match /files/{id} { │           │ query ListFiles          │
│   allow read: if    │           │   @auth(level: USER) {   │
│   request.auth      │           │   files(where: {         │
│     .token.tenantId │           │     tenantId: {          │
│     == resource     │           │       eq: $tenantId      │
│     .data.tenantId; │           │     }                    │
│ }                   │           │   })                     │
└─────────────────────┘           │ }                        │
                                  └──────────────────────────┘
```

## How It Works

### 1. **SSO Authentication**

When user logs in via SSO:
```typescript
// User clicks SSO login button
const provider = new GoogleAuthProvider();
await signInWithPopup(auth, provider);

// Firebase Auth receives SSO token
// Creates/updates Firebase user with email
```

### 2. **Auto-Create User Profile**

Cloud Function automatically creates Firestore profile:
```typescript
// functions/src/ssoAuthorization.ts
export const onUserCreated = functions.auth.user().onCreate(async (user) => {
  // Create user document in Firestore
  await db.collection("users").doc(user.uid).set({
    uid: user.uid,
    email: user.email,
    tenantId: "default", // Assign default tenant
    role: "user",
    permissions: ["read:files", "write:files"],
    createdAt: now,
    ssoProvider: user.providerData[0]?.providerId
  });

  // Set custom claims for Data Connect
  await admin.auth().setCustomUserClaims(user.uid, {
    tenantId: "default",
    role: "user"
  });
});
```

### 3. **Custom Claims in Token**

Custom claims are embedded in JWT token:
```json
{
  "uid": "user123",
  "email": "user@company.com",
  "email_verified": true,
  "tenantId": "tenant-001",    ← Your auth key
  "role": "user",              ← Your role
  "iat": 1234567890,
  "exp": 1234571490
}
```

### 4. **Data Connect Authorization**

Data Connect uses these custom claims:

#### Option A: Schema-Level Security
```graphql
# schema/schema.gql

# User can only query their tenant's files
query ListMyFiles @auth(level: USER) {
  files(where: { 
    tenantId: { eq: $auth.token.tenantId }
  }) {
    id
    name
    uploadedBy
  }
}

# Admin can query all files
query ListAllFiles @auth(level: ADMIN) {
  files {
    id
    name
    tenantId
  }
}
```

#### Option B: Row-Level Security
```graphql
# schema/schema.gql
type File @table {
  id: UUID!
  name: String!
  tenantId: String!
  uploadedBy: String!
  
  # Only accessible if user's tenantId matches
  @auth(
    expr: "auth.token.tenantId == this.tenantId"
  )
}
```

### 5. **Client-Side Usage**

#### Get User Profile with Authorization
```typescript
// In your React component
import { useAuthProfile } from '@/lib/AuthService';

function MyComponent() {
  const { profile, loading } = useAuthProfile();

  if (loading) return <div>Loading...</div>;
  if (!profile) return <div>Please log in</div>;

  // profile contains: uid, email, tenantId, role, permissions
  console.log('User tenant:', profile.tenantId);
  console.log('User role:', profile.role);
}
```

#### Query Data Connect with TenantId
```typescript
import { listFiles } from '@movie/dataconnect';
import { getAuthQueryVariables } from '@/lib/AuthService';

async function loadUserFiles(profile: UserProfile) {
  // Automatically include tenantId filter
  const variables = getAuthQueryVariables(profile);
  
  const result = await listFiles({
    tenantId: variables.tenantId
  });
  
  return result.data.files;
}
```

#### Check Permissions Before Action
```typescript
import { hasPermission } from '@/lib/AuthService';

function FileUploadButton({ profile }: { profile: UserProfile }) {
  const canUpload = hasPermission(profile, 'write:files');

  if (!canUpload) {
    return <div>You don't have permission to upload files</div>;
  }

  return <button onClick={handleUpload}>Upload File</button>;
}
```

## Firestore Security Rules

Match your Firestore rules to Data Connect authorization:

```javascript
// firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Users can read their own profile
    match /users/{userId} {
      allow read: if request.auth.uid == userId;
      allow write: if request.auth.uid == userId 
                   && request.auth.token.role == 'admin';
    }
    
    // Files are tenant-scoped
    match /files/{fileId} {
      allow read: if request.auth != null 
                  && request.auth.token.tenantId == resource.data.tenantId;
      
      allow create: if request.auth != null
                    && request.auth.token.tenantId == request.resource.data.tenantId
                    && 'write:files' in request.auth.token.permissions;
      
      allow update, delete: if request.auth != null
                            && request.auth.token.tenantId == resource.data.tenantId
                            && request.auth.token.role in ['admin', 'user'];
    }
    
    // Devices are tenant-scoped
    match /devices/{deviceId} {
      allow read: if request.auth != null
                  && request.auth.token.tenantId == resource.data.tenantId;
      
      allow write: if request.auth != null
                   && request.auth.token.tenantId == request.resource.data.tenantId
                   && request.auth.token.role in ['admin', 'user'];
    }
    
    // Tenants - admin only
    match /tenants/{tenantId} {
      allow read: if request.auth != null
                  && request.auth.token.tenantId == tenantId;
      
      allow write: if request.auth != null
                   && request.auth.token.role == 'admin';
    }
  }
}
```

## Data Connect Schema with Auth

```graphql
# schema/schema.gql

# Files table with tenant isolation
type File @table {
  id: UUID! @default(expr: "uuidV4()")
  name: String!
  storagePath: String!
  tenantId: String!  # Your authorization key
  uploadedBy: String!
  mimeType: String
  size: Int
  createdAt: Timestamp! @default(expr: "request.time")
}

# Tenant-scoped query
query ListMyFiles($tenantId: String!) @auth(level: USER) {
  files(where: { 
    tenantId: { eq: $tenantId }
  }) {
    id
    name
    uploadedBy
    createdAt
  }
}

# Search within tenant
query SearchFiles(
  $tenantId: String!
  $searchTerm: String!
) @auth(level: USER) {
  files(where: {
    tenantId: { eq: $tenantId }
    name: { contains: $searchTerm }
  }) {
    id
    name
  }
}

# Admin can query across tenants
query ListAllFiles @auth(level: ADMIN) {
  files(orderBy: { createdAt: DESC }) {
    id
    name
    tenantId
  }
}

# Mutation with tenant validation
mutation CreateFile(
  $name: String!
  $storagePath: String!
  $tenantId: String!
  $uploadedBy: String!
) @auth(level: USER) {
  file_insert(data: {
    name: $name
    storagePath: $storagePath
    tenantId: $tenantId
    uploadedBy: $uploadedBy
  })
}
```

## Authorization Levels

### Role Hierarchy
```typescript
type Role = 'admin' | 'user' | 'viewer';

// Permissions by role
const rolePermissions = {
  admin: [
    'read:files', 'write:files', 'delete:files',
    'read:devices', 'write:devices', 'delete:devices',
    'read:users', 'write:users',
    'read:tenants', 'write:tenants'
  ],
  user: [
    'read:files', 'write:files',
    'read:devices', 'write:devices'
  ],
  viewer: [
    'read:files',
    'read:devices'
  ]
};
```

### Permission Checks in Cloud Functions
```typescript
// functions/src/ssoAuthorization.ts
export const verifyDataConnectAuth = functions.https.onCall(async (data, context) => {
  const userDoc = await db.collection("users").doc(context.auth.uid).get();
  const userData = userDoc.data();
  
  // Check role
  if (userData.role !== 'admin') {
    throw new Error('Insufficient permissions');
  }
  
  // Check specific permission
  if (!userData.permissions.includes('write:files')) {
    throw new Error('Cannot write files');
  }
  
  // Check tenant match
  if (userData.tenantId !== data.resourceTenantId) {
    throw new Error('Cross-tenant access denied');
  }
  
  return { authorized: true };
});
```

## Updating User Authorization

### Admin Changes User's Tenant
```typescript
// Call from admin panel
import { getFunctions, httpsCallable } from 'firebase/functions';

async function changeUserTenant(userId: string, newTenantId: string) {
  const functions = getFunctions();
  const updateTenant = httpsCallable(functions, 'updateUserTenant');
  
  const result = await updateTenant({ userId, newTenantId });
  
  // User's token will refresh automatically
  // New queries will use new tenantId
  
  return result.data;
}
```

### Firestore Trigger Updates Claims
```typescript
// Automatic when Firestore user doc changes
export const onUserUpdated = functions.firestore
  .document("users/{userId}")
  .onUpdate(async (change) => {
    const afterData = change.after.data();
    
    // Update custom claims
    await admin.auth().setCustomUserClaims(userId, {
      tenantId: afterData.tenantId,
      role: afterData.role
    });
    
    // Token refreshes on next request
  });
```

## Complete Flow Example

### Scenario: User Uploads File

```typescript
// 1. User logs in via SSO
await signInWithPopup(auth, new GoogleAuthProvider());

// 2. Get user profile with tenantId
const { profile } = useAuthProfile();
// profile.tenantId = "tenant-001"

// 3. Upload file with tenant context
const storage = getStorage();
const storageRef = ref(storage, `tenants/${profile.tenantId}/files/${filename}`);
await uploadBytes(storageRef, file);

// 4. Storage listener creates Firestore doc with tenantId
// (Automatic via onStorageFileUploaded)

// 5. Firestore listener syncs to Data Connect
// (Automatic via onFileCreatedSyncToDataConnect)

// 6. Query Data Connect with tenant filter
const result = await listFiles({
  tenantId: profile.tenantId  // User can only see their tenant's files
});

// 7. Data Connect validates:
//    - User is authenticated (JWT token)
//    - tenantId in query matches token.tenantId
//    - Returns only tenant-001 files
```

## Best Practices

### 1. **Always Filter by TenantId**
```typescript
// ✅ Good
const files = await listFiles({ tenantId: profile.tenantId });

// ❌ Bad - exposes all tenants
const files = await listFiles({});
```

### 2. **Check Permissions Client-Side**
```typescript
// Show/hide UI based on permissions
{hasPermission(profile, 'write:files') && (
  <button onClick={upload}>Upload</button>
)}
```

### 3. **Validate on Server-Side**
```typescript
// Cloud Function always validates
export const createFile = functions.https.onCall(async (data, context) => {
  // Check auth
  if (!context.auth) throw new Error('Unauthenticated');
  
  // Check tenant match
  const userDoc = await db.collection('users').doc(context.auth.uid).get();
  if (userDoc.data().tenantId !== data.tenantId) {
    throw new Error('Tenant mismatch');
  }
  
  // Proceed with creation
});
```

### 4. **Refresh Token When Auth Changes**
```typescript
// After admin changes user's tenant
await auth.currentUser?.getIdToken(true); // Force refresh

// All subsequent queries use new tenantId
```

## Testing Authorization

### Test Different Roles
```typescript
// Create test users with different roles
await createTestUser('admin@company.com', 'tenant-001', 'admin');
await createTestUser('user@company.com', 'tenant-001', 'user');
await createTestUser('viewer@company.com', 'tenant-001', 'viewer');

// Verify permissions
// Admin can do everything
// User can read/write
// Viewer can only read
```

### Test Cross-Tenant Access
```typescript
// User in tenant-001 tries to access tenant-002 file
const result = await listFiles({ tenantId: 'tenant-002' });

// Should return empty or error
// Custom claims prevent cross-tenant access
```

## Migration Guide

If you already have users without custom claims:

```typescript
// Cloud Function to migrate existing users
export const migrateUserClaims = functions.https.onCall(async (data, context) => {
  // Admin only
  if (!context.auth || context.auth.token.role !== 'admin') {
    throw new Error('Admin only');
  }
  
  const usersSnapshot = await db.collection('users').get();
  
  for (const userDoc of usersSnapshot.docs) {
    const userData = userDoc.data();
    
    await admin.auth().setCustomUserClaims(userDoc.id, {
      tenantId: userData.tenantId,
      role: userData.role
    });
  }
  
  return { migrated: usersSnapshot.size };
});
```

## Summary

**Your Authorization Model:**
- ✅ SSO for authentication (email-based)
- ✅ Firestore for authorization data (tenantId, role, permissions)
- ✅ Custom claims bridge Firestore → Data Connect
- ✅ Tenant-scoped queries ensure data isolation
- ✅ Same security model across Firestore and Data Connect

**Key Points:**
1. SSO provides email → Firebase Auth creates user
2. Cloud Function creates Firestore profile with tenantId
3. Custom claims add tenantId to JWT token
4. Data Connect queries filter by tenantId from token
5. All data scoped to user's tenant automatically

Your existing email-based Firestore authorization works seamlessly with Data Connect! 🎉
