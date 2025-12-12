# File Connector Migration Complete

## What Was Changed

### 1. Created New File Connector
Created a dedicated `file-connector` for all file management operations:
- **Location**: `dataconnect/file-connector/`
- **Files Created**:
  - `connector.yaml` - Connector configuration with connectorId: "file-connector"
  - `mutations.gql` - All file and folder mutations (CreateFile, UpdateFile, DeleteFile, CreateFolder, UpdateFolder, DeleteFolder, ArchiveFile, ArchiveOldFiles, RestoreFile)
  - `queries.gql` - All file and folder queries (ListFiles, GetFile, SearchFiles, GetRecentFiles, ListArchivedFiles, etc.)

### 2. Updated Movie Connector
Cleaned up `movie-connector` to only contain movie/actor/review operations:
- **Removed**: All file-related mutations and queries
- **Kept**: Movie, actor, review, and user operations

### 3. Updated Configuration Files

#### dataconnect.yaml
Changed from:
```yaml
connectorDirs: ["./movie-connector"]
```
To:
```yaml
connectorDirs: ["./movie-connector", "./file-connector"]
```

#### functions/index.js
Changed connector reference from:
```javascript
const DATACONNECT_CONNECTOR = "movie-connector";
```
To:
```javascript
const DATACONNECT_CONNECTOR = "file-connector";
```

## Next Steps Required

### 1. Regenerate SDK
Run the following command to generate the SDK for the new file-connector:
```powershell
firebase dataconnect:sdk:generate
```

This will create/update the SDK packages. You should see two SDKs generated:
- `@movie/dataconnect` - for movie-connector operations
- A new SDK package for file-connector operations (check package name after generation)

### 2. Update Frontend Imports

After SDK regeneration, update `app/src/lib/FileService.tsx`:

**Current import (line 17-36)**:
```typescript
import {
  listFiles,
  listFilesByUser,
  getFile,
  // ... other file operations
} from '@movie/dataconnect';
```

**New import** (change to file-connector SDK package):
```typescript
// Import from the generated file-connector SDK
import {
  listFiles,
  listFilesByUser,
  getFile,
  // ... other file operations
} from '@file/dataconnect'; // Update package name based on actual SDK generation
```

### 3. Deploy to Production

Deploy in this order:
```powershell
# 1. Deploy Data Connect schema and connectors
firebase deploy --only dataconnect --project emc-zdtrk-development1-d

# 2. Deploy Cloud Functions (now using file-connector)
firebase deploy --only functions --project emc-zdtrk-development1-d

# 3. Deploy Firestore indexes (for activity logs)
firebase deploy --only firestore:indexes --project emc-zdtrk-development1-d
```

### 4. Update Frontend Application

After SDK regeneration and import updates:
```powershell
cd app
npm install  # Update dependencies to include new SDK package
npm run build  # Build the frontend
```

### 5. Test the Changes

1. **Test file operations** in FileManager UI
2. **Verify Cloud Functions** are using file-connector:
   - Check archiveOldFiles scheduler
   - Verify onFileCreated and onFileUpdated mutation listeners
3. **Confirm activity logging** to Firestore works correctly

## Benefits of This Change

1. **Better Organization**: Separate concerns - movies in movie-connector, files in file-connector
2. **Easier Maintenance**: Changes to file operations don't affect movie operations
3. **Clearer API**: Each connector has focused, domain-specific operations
4. **Scalability**: Can add more connectors independently (e.g., user-connector, analytics-connector)
5. **Better Security**: Each connector can have its own auth rules

## File Structure After Migration

```
dataconnect/
├── dataconnect.yaml          # Updated with both connectors
├── schema/
│   └── schema.gql            # Shared schema (File, Folder, Movie, Actor types)
├── movie-connector/
│   ├── connector.yaml
│   ├── mutations.gql         # Only movie/actor/review mutations
│   └── queries.gql           # Only movie/actor/review queries
└── file-connector/           # NEW!
    ├── connector.yaml
    ├── mutations.gql         # Only file/folder mutations
    └── queries.gql           # Only file/folder queries
```

## Important Notes

- **No data migration needed** - only changing how operations are organized
- **Schema stays shared** - both connectors use the same schema.gql
- **Mutation listeners** now reference file-connector for CreateFile/UpdateFile events
- **Auth rules preserved** - USER-level auth with auth.uid auto-population still works
- **Archive function** now calls ArchiveOldFiles from file-connector

## Verification Checklist

After completing the migration:

- [ ] SDK regenerated successfully
- [ ] FileService imports updated to use file-connector SDK
- [ ] Movie operations still work (Home page, Actor pages, Reviews)
- [ ] File operations still work (FileManager upload, download, archive)
- [ ] Cloud Functions deployed and scheduler active
- [ ] Mutation listeners logging to Firestore
- [ ] No console errors in browser
- [ ] No deployment errors in Firebase console
