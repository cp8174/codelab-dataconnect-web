# File Management Feature

This project now includes a complete file management system built with Firebase Data Connect and Firebase Storage.

## What's Been Added

### 1. **Schema Updates** (`dataconnect/schema/schema.gql`)
- Added `File` table for file metadata
- Added `Folder` table for folder structure
- Added `FileShare` table for sharing permissions
- Added `SharePermission` enum

### 2. **GraphQL Operations**
- **Queries** (`dataconnect/movie-connector/queries.gql`):
  - `ListFiles` - List files by folder
  - `ListFilesByUser` - List user's files
  - `GetFile` - Get file details
  - `ListFolders` - List folders
  - `SearchFiles` - Search files by name
  - `GetRecentFiles` - Get recent uploads
  - `GetUserStorageStats` - Calculate storage usage

- **Mutations** (`dataconnect/movie-connector/mutations.gql`):
  - `CreateFile` - Create file metadata
  - `UpdateFile` - Update file info
  - `DeleteFile` - Delete file metadata
  - `IncrementDownloadCount` - Track downloads
  - `CreateFolder` - Create new folder
  - `UpdateFolder` - Update folder info
  - `DeleteFolder` - Delete folder

### 3. **Mock Data** (`dataconnect/filedata_insert.gql`)
Sample data with:
- 5 folders (Documents, Images, Videos, Music, Projects)
- 15 sample files with various types
- Realistic file sizes and metadata

### 4. **Services** (`app/src/lib/FileService.tsx`)
Complete file management service with:
- Upload files to Firebase Storage
- Download files with progress tracking
- Delete files from storage and metadata
- Create and manage folders
- Search and filter files
- Calculate storage statistics
- Format file sizes

### 5. **UI Component** (`app/src/pages/FileManager.tsx`)
Full-featured file manager with:
- File upload with progress bars
- Folder navigation
- File grid view with icons
- Download and delete actions
- Storage usage statistics
- Create new folders
- Dark mode support

### 6. **Configuration Updates**
- Updated `firebase.json` to include Storage emulator (port 9199)
- Updated `firebase.tsx` to connect to Storage emulator
- Added `storage.rules` for security rules

## How to Use

### 1. Start the Emulators
```bash
firebase emulators:start
```

### 2. Generate SDK (in another terminal)
```bash
firebase dataconnect:sdk:generate --watch
```

### 3. Insert Mock Data (optional)
Go to the Firebase Emulator UI at http://localhost:4000, navigate to Data Connect, and run the mutation from `filedata_insert.gql`.

### 4. Start the Development Server (in another terminal)
```bash
cd app
npm run dev
```

### 5. Access File Manager
Navigate to http://localhost:5173/filemanager

## Features

✅ **Upload Files** - Drag and drop or click to upload
✅ **Download Files** - One-click download with progress tracking
✅ **Delete Files** - Remove files from storage and database
✅ **Create Folders** - Organize files in folders
✅ **Folder Navigation** - Browse through folder structure
✅ **File Search** - Search files by name
✅ **Storage Stats** - Track total storage usage
✅ **Download Counter** - Track file popularity
✅ **File Icons** - Visual file type indicators
✅ **Dark Mode** - Full dark mode support

## Storage Emulator

Files are stored in the Firebase Storage Emulator during development. In production, they would be stored in Firebase Storage.

**Emulator Location**: `http://localhost:9199`
**Storage Path Pattern**: `files/{userId}/{timestamp}_{filename}`

## Next Steps

Consider adding:
- File preview for images and PDFs
- File sharing between users
- Advanced search with filters
- Bulk operations (multi-select)
- File versioning
- Thumbnail generation
- Drag-and-drop folder upload
- File permissions management
