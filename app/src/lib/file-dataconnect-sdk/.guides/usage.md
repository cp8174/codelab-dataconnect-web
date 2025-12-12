# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.





## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { createFile, updateFile, deleteFile, incrementDownloadCount, createFolder, updateFolder, deleteFolder, archiveFile, archiveOldFiles, restoreFile } from '@file/dataconnect';


// Operation CreateFile:  For variables, look at type CreateFileVars in ../index.d.ts
const { data } = await CreateFile(dataConnect, createFileVars);

// Operation UpdateFile:  For variables, look at type UpdateFileVars in ../index.d.ts
const { data } = await UpdateFile(dataConnect, updateFileVars);

// Operation DeleteFile:  For variables, look at type DeleteFileVars in ../index.d.ts
const { data } = await DeleteFile(dataConnect, deleteFileVars);

// Operation IncrementDownloadCount:  For variables, look at type IncrementDownloadCountVars in ../index.d.ts
const { data } = await IncrementDownloadCount(dataConnect, incrementDownloadCountVars);

// Operation CreateFolder:  For variables, look at type CreateFolderVars in ../index.d.ts
const { data } = await CreateFolder(dataConnect, createFolderVars);

// Operation UpdateFolder:  For variables, look at type UpdateFolderVars in ../index.d.ts
const { data } = await UpdateFolder(dataConnect, updateFolderVars);

// Operation DeleteFolder:  For variables, look at type DeleteFolderVars in ../index.d.ts
const { data } = await DeleteFolder(dataConnect, deleteFolderVars);

// Operation ArchiveFile:  For variables, look at type ArchiveFileVars in ../index.d.ts
const { data } = await ArchiveFile(dataConnect, archiveFileVars);

// Operation ArchiveOldFiles:  For variables, look at type ArchiveOldFilesVars in ../index.d.ts
const { data } = await ArchiveOldFiles(dataConnect, archiveOldFilesVars);

// Operation RestoreFile:  For variables, look at type RestoreFileVars in ../index.d.ts
const { data } = await RestoreFile(dataConnect, restoreFileVars);


```