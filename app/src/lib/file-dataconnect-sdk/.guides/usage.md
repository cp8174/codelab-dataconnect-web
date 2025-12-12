# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.





## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { listFiles, listFilesByUser, getFile, listFolders, getFolder, searchFiles, getRecentFiles, getUserStorageStats, listArchivedFiles, getArchivedFilesCount } from '@file/dataconnect';


// Operation ListFiles:  For variables, look at type ListFilesVars in ../index.d.ts
const { data } = await ListFiles(dataConnect, listFilesVars);

// Operation ListFilesByUser: 
const { data } = await ListFilesByUser(dataConnect);

// Operation GetFile:  For variables, look at type GetFileVars in ../index.d.ts
const { data } = await GetFile(dataConnect, getFileVars);

// Operation ListFolders:  For variables, look at type ListFoldersVars in ../index.d.ts
const { data } = await ListFolders(dataConnect, listFoldersVars);

// Operation GetFolder:  For variables, look at type GetFolderVars in ../index.d.ts
const { data } = await GetFolder(dataConnect, getFolderVars);

// Operation SearchFiles:  For variables, look at type SearchFilesVars in ../index.d.ts
const { data } = await SearchFiles(dataConnect, searchFilesVars);

// Operation GetRecentFiles:  For variables, look at type GetRecentFilesVars in ../index.d.ts
const { data } = await GetRecentFiles(dataConnect, getRecentFilesVars);

// Operation GetUserStorageStats: 
const { data } = await GetUserStorageStats(dataConnect);

// Operation ListArchivedFiles: 
const { data } = await ListArchivedFiles(dataConnect);

// Operation GetArchivedFilesCount: 
const { data } = await GetArchivedFilesCount(dataConnect);


```