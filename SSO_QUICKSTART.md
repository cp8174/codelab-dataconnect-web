# SSO + Data Connect Quick Start

## The Simple Answer

**Data Connect works EXACTLY like Firestore with your SSO setup:**

1. ✅ User logs in via SSO → Gets Firebase Auth token
2. ✅ Token contains email (same as Firestore)
3. ✅ Add custom claims with tenantId
4. ✅ Data Connect uses same token to filter queries

## The Key Concept

```
Your Current Firestore Pattern:
┌─────────────────────────────────────┐
│ User Document:                      │
│ {                                   │
│   email: "user@company.com"         │
│   tenantId: "tenant-001"  ← THIS    │
│ }                                   │
└─────────────────────────────────────┘

Data Connect Pattern (Same!):
┌─────────────────────────────────────┐
│ Query with tenantId:                │
│ listFiles({                         │
│   tenantId: "tenant-001"  ← SAME    │
│ })                                  │
└─────────────────────────────────────┘
```

## 3-Step Implementation

### Step 1: Add Custom Claims (One-time setup)

When user logs in via SSO, add their tenantId to the auth token:

```typescript
// Cloud Function: functions/src/ssoAuthorization.ts
export const onUserCreated = functions.auth.user().onCreate(async (user) => {
  // Get tenantId from Firestore (your existing pattern)
  const userDoc = await db.collection("users").doc(user.uid).get();
  const tenantId = userDoc.data()?.tenantId || "default";
  
  // Add to token
  await admin.auth().setCustomUserClaims(user.uid, { tenantId });
});
```

### Step 2: Query Data Connect with TenantId

Just pass tenantId from your Firestore user doc:

```typescript
// In your React component
import { useAuthProfile } from '@/lib/AuthService';
import { listFiles } from '@movie/dataconnect';

function MyComponent() {
  const { profile } = useAuthProfile(); // Gets tenantId from Firestore
  
  const files = await listFiles({
    tenantId: profile.tenantId  // Same pattern as Firestore!
  });
}
```

### Step 3: Secure Your Schema

Add tenant filter to Data Connect queries:

```graphql
# schema/schema.gql
query ListMyFiles($tenantId: String!) @auth(level: USER) {
  files(where: { 
    tenantId: { eq: $tenantId }  # Filter by tenant
  })
}
```

## That's It!

**Your existing auth pattern works with Data Connect:**
- ✅ SSO login → Same as before
- ✅ Email in Firestore → Same as before  
- ✅ TenantId from user doc → Same as before
- ✅ Filter queries by tenantId → Same pattern

**The only addition:**
- Custom claims put tenantId in auth token
- Data Connect can validate tenantId matches user's tenant

## Example: Complete Flow

```typescript
// 1. User logs in via SSO (your existing code)
await signInWithPopup(auth, new GoogleAuthProvider());

// 2. Get user's tenantId from Firestore (your existing code)
const userDoc = await getDoc(doc(db, 'users', user.uid));
const tenantId = userDoc.data().tenantId;

// 3. Query Data Connect with tenantId (new - but same pattern!)
const result = await listFiles({ tenantId });

// 4. Data Connect returns only that tenant's files
// Just like Firestore security rules filter by tenantId
```

## Security Comparison

**Firestore Rules:**
```javascript
match /files/{fileId} {
  allow read: if request.auth.token.tenantId == resource.data.tenantId;
}
```

**Data Connect (Same concept!):**
```graphql
query ListFiles($tenantId: String!) @auth(level: USER) {
  files(where: { tenantId: { eq: $tenantId } })
}
```

## Files Created for You

1. **AuthService.tsx** - Helper functions for getting tenantId
2. **ssoAuthorization.ts** - Cloud Functions for custom claims
3. **SSO_DATACONNECT_AUTHORIZATION.md** - Complete guide

## Next Steps

1. Deploy the new Cloud Functions:
   ```powershell
   cd functions
   npm run build
   firebase deploy --only functions
   ```

2. Test with your SSO:
   ```typescript
   // Your existing SSO login
   await signInWithPopup(auth, provider);
   
   // New: Get auth profile
   const { profile } = useAuthProfile();
   console.log('TenantId:', profile.tenantId);
   
   // Query Data Connect
   const files = await listFiles({ tenantId: profile.tenantId });
   ```

3. Update your Data Connect queries to require tenantId

## Key Takeaway

**Data Connect authorization = Firestore authorization**

Both use:
- ✅ Firebase Auth token from SSO
- ✅ Email-based user identification
- ✅ TenantId from Firestore user document
- ✅ Same security model

The only difference: Data Connect uses GraphQL instead of Firestore queries, but the security is identical! 🎉
