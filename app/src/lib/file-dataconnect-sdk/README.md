# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `file-connector`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*ListFiles*](#listfiles)
  - [*ListFilesByUser*](#listfilesbyuser)
  - [*GetFile*](#getfile)
  - [*ListFolders*](#listfolders)
  - [*GetFolder*](#getfolder)
  - [*SearchFiles*](#searchfiles)
  - [*GetRecentFiles*](#getrecentfiles)
  - [*GetUserStorageStats*](#getuserstoragestats)
  - [*ListArchivedFiles*](#listarchivedfiles)
  - [*GetArchivedFilesCount*](#getarchivedfilescount)
- [**Mutations**](#mutations)
  - [*CreateFile*](#createfile)
  - [*UpdateFile*](#updatefile)
  - [*DeleteFile*](#deletefile)
  - [*IncrementDownloadCount*](#incrementdownloadcount)
  - [*CreateFolder*](#createfolder)
  - [*UpdateFolder*](#updatefolder)
  - [*DeleteFolder*](#deletefolder)
  - [*ArchiveFile*](#archivefile)
  - [*ArchiveOldFiles*](#archiveoldfiles)
  - [*RestoreFile*](#restorefile)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `file-connector`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@file/dataconnect` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@file/dataconnect';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@file/dataconnect';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `file-connector` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## ListFiles
You can execute the `ListFiles` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [file-dataconnect-sdk/index.d.ts](./index.d.ts):
```typescript
listFiles(vars?: ListFilesVariables): QueryPromise<ListFilesData, ListFilesVariables>;

interface ListFilesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars?: ListFilesVariables): QueryRef<ListFilesData, ListFilesVariables>;
}
export const listFilesRef: ListFilesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listFiles(dc: DataConnect, vars?: ListFilesVariables): QueryPromise<ListFilesData, ListFilesVariables>;

interface ListFilesRef {
  ...
  (dc: DataConnect, vars?: ListFilesVariables): QueryRef<ListFilesData, ListFilesVariables>;
}
export const listFilesRef: ListFilesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listFilesRef:
```typescript
const name = listFilesRef.operationName;
console.log(name);
```

### Variables
The `ListFiles` query has an optional argument of type `ListFilesVariables`, which is defined in [file-dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListFilesVariables {
  folderId?: UUIDString | null;
}
```
### Return Type
Recall that executing the `ListFiles` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListFilesData`, which is defined in [file-dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListFilesData {
  files: ({
    id: UUIDString;
    name: string;
    storagePath: string;
    mimeType?: string | null;
    size: Int64String;
    folderId?: UUIDString | null;
    uploadedBy: string;
    uploadedAt: TimestampString;
    updatedAt?: TimestampString | null;
    description?: string | null;
    tags?: string[] | null;
    isPublic?: boolean | null;
    downloadCount?: number | null;
  } & File_Key)[];
}
```
### Using `ListFiles`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listFiles, ListFilesVariables } from '@file/dataconnect';

// The `ListFiles` query has an optional argument of type `ListFilesVariables`:
const listFilesVars: ListFilesVariables = {
  folderId: ..., // optional
};

// Call the `listFiles()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listFiles(listFilesVars);
// Variables can be defined inline as well.
const { data } = await listFiles({ folderId: ..., });
// Since all variables are optional for this query, you can omit the `ListFilesVariables` argument.
const { data } = await listFiles();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listFiles(dataConnect, listFilesVars);

console.log(data.files);

// Or, you can use the `Promise` API.
listFiles(listFilesVars).then((response) => {
  const data = response.data;
  console.log(data.files);
});
```

### Using `ListFiles`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listFilesRef, ListFilesVariables } from '@file/dataconnect';

// The `ListFiles` query has an optional argument of type `ListFilesVariables`:
const listFilesVars: ListFilesVariables = {
  folderId: ..., // optional
};

// Call the `listFilesRef()` function to get a reference to the query.
const ref = listFilesRef(listFilesVars);
// Variables can be defined inline as well.
const ref = listFilesRef({ folderId: ..., });
// Since all variables are optional for this query, you can omit the `ListFilesVariables` argument.
const ref = listFilesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listFilesRef(dataConnect, listFilesVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.files);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.files);
});
```

## ListFilesByUser
You can execute the `ListFilesByUser` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [file-dataconnect-sdk/index.d.ts](./index.d.ts):
```typescript
listFilesByUser(): QueryPromise<ListFilesByUserData, undefined>;

interface ListFilesByUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListFilesByUserData, undefined>;
}
export const listFilesByUserRef: ListFilesByUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listFilesByUser(dc: DataConnect): QueryPromise<ListFilesByUserData, undefined>;

interface ListFilesByUserRef {
  ...
  (dc: DataConnect): QueryRef<ListFilesByUserData, undefined>;
}
export const listFilesByUserRef: ListFilesByUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listFilesByUserRef:
```typescript
const name = listFilesByUserRef.operationName;
console.log(name);
```

### Variables
The `ListFilesByUser` query has no variables.
### Return Type
Recall that executing the `ListFilesByUser` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListFilesByUserData`, which is defined in [file-dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListFilesByUserData {
  files: ({
    id: UUIDString;
    name: string;
    storagePath: string;
    mimeType?: string | null;
    size: Int64String;
    folderId?: UUIDString | null;
    uploadedBy: string;
    uploadedAt: TimestampString;
    description?: string | null;
    tags?: string[] | null;
    downloadCount?: number | null;
  } & File_Key)[];
}
```
### Using `ListFilesByUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listFilesByUser } from '@file/dataconnect';


// Call the `listFilesByUser()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listFilesByUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listFilesByUser(dataConnect);

console.log(data.files);

// Or, you can use the `Promise` API.
listFilesByUser().then((response) => {
  const data = response.data;
  console.log(data.files);
});
```

### Using `ListFilesByUser`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listFilesByUserRef } from '@file/dataconnect';


// Call the `listFilesByUserRef()` function to get a reference to the query.
const ref = listFilesByUserRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listFilesByUserRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.files);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.files);
});
```

## GetFile
You can execute the `GetFile` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [file-dataconnect-sdk/index.d.ts](./index.d.ts):
```typescript
getFile(vars: GetFileVariables): QueryPromise<GetFileData, GetFileVariables>;

interface GetFileRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetFileVariables): QueryRef<GetFileData, GetFileVariables>;
}
export const getFileRef: GetFileRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getFile(dc: DataConnect, vars: GetFileVariables): QueryPromise<GetFileData, GetFileVariables>;

interface GetFileRef {
  ...
  (dc: DataConnect, vars: GetFileVariables): QueryRef<GetFileData, GetFileVariables>;
}
export const getFileRef: GetFileRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getFileRef:
```typescript
const name = getFileRef.operationName;
console.log(name);
```

### Variables
The `GetFile` query requires an argument of type `GetFileVariables`, which is defined in [file-dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetFileVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetFile` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetFileData`, which is defined in [file-dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetFileData {
  file?: {
    id: UUIDString;
    name: string;
    storagePath: string;
    mimeType?: string | null;
    size: Int64String;
    folderId?: UUIDString | null;
    folder?: {
      id: UUIDString;
      name: string;
    } & Folder_Key;
      uploadedBy: string;
      uploadedAt: TimestampString;
      updatedAt?: TimestampString | null;
      description?: string | null;
      tags?: string[] | null;
      isPublic?: boolean | null;
      downloadCount?: number | null;
  } & File_Key;
}
```
### Using `GetFile`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getFile, GetFileVariables } from '@file/dataconnect';

// The `GetFile` query requires an argument of type `GetFileVariables`:
const getFileVars: GetFileVariables = {
  id: ..., 
};

// Call the `getFile()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getFile(getFileVars);
// Variables can be defined inline as well.
const { data } = await getFile({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getFile(dataConnect, getFileVars);

console.log(data.file);

// Or, you can use the `Promise` API.
getFile(getFileVars).then((response) => {
  const data = response.data;
  console.log(data.file);
});
```

### Using `GetFile`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getFileRef, GetFileVariables } from '@file/dataconnect';

// The `GetFile` query requires an argument of type `GetFileVariables`:
const getFileVars: GetFileVariables = {
  id: ..., 
};

// Call the `getFileRef()` function to get a reference to the query.
const ref = getFileRef(getFileVars);
// Variables can be defined inline as well.
const ref = getFileRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getFileRef(dataConnect, getFileVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.file);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.file);
});
```

## ListFolders
You can execute the `ListFolders` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [file-dataconnect-sdk/index.d.ts](./index.d.ts):
```typescript
listFolders(vars?: ListFoldersVariables): QueryPromise<ListFoldersData, ListFoldersVariables>;

interface ListFoldersRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars?: ListFoldersVariables): QueryRef<ListFoldersData, ListFoldersVariables>;
}
export const listFoldersRef: ListFoldersRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listFolders(dc: DataConnect, vars?: ListFoldersVariables): QueryPromise<ListFoldersData, ListFoldersVariables>;

interface ListFoldersRef {
  ...
  (dc: DataConnect, vars?: ListFoldersVariables): QueryRef<ListFoldersData, ListFoldersVariables>;
}
export const listFoldersRef: ListFoldersRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listFoldersRef:
```typescript
const name = listFoldersRef.operationName;
console.log(name);
```

### Variables
The `ListFolders` query has an optional argument of type `ListFoldersVariables`, which is defined in [file-dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListFoldersVariables {
  parentFolderId?: UUIDString | null;
}
```
### Return Type
Recall that executing the `ListFolders` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListFoldersData`, which is defined in [file-dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListFoldersData {
  folders: ({
    id: UUIDString;
    name: string;
    parentFolderId?: UUIDString | null;
    createdBy: string;
    createdAt: TimestampString;
    description?: string | null;
    color?: string | null;
  } & Folder_Key)[];
}
```
### Using `ListFolders`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listFolders, ListFoldersVariables } from '@file/dataconnect';

// The `ListFolders` query has an optional argument of type `ListFoldersVariables`:
const listFoldersVars: ListFoldersVariables = {
  parentFolderId: ..., // optional
};

// Call the `listFolders()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listFolders(listFoldersVars);
// Variables can be defined inline as well.
const { data } = await listFolders({ parentFolderId: ..., });
// Since all variables are optional for this query, you can omit the `ListFoldersVariables` argument.
const { data } = await listFolders();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listFolders(dataConnect, listFoldersVars);

console.log(data.folders);

// Or, you can use the `Promise` API.
listFolders(listFoldersVars).then((response) => {
  const data = response.data;
  console.log(data.folders);
});
```

### Using `ListFolders`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listFoldersRef, ListFoldersVariables } from '@file/dataconnect';

// The `ListFolders` query has an optional argument of type `ListFoldersVariables`:
const listFoldersVars: ListFoldersVariables = {
  parentFolderId: ..., // optional
};

// Call the `listFoldersRef()` function to get a reference to the query.
const ref = listFoldersRef(listFoldersVars);
// Variables can be defined inline as well.
const ref = listFoldersRef({ parentFolderId: ..., });
// Since all variables are optional for this query, you can omit the `ListFoldersVariables` argument.
const ref = listFoldersRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listFoldersRef(dataConnect, listFoldersVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.folders);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.folders);
});
```

## GetFolder
You can execute the `GetFolder` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [file-dataconnect-sdk/index.d.ts](./index.d.ts):
```typescript
getFolder(vars: GetFolderVariables): QueryPromise<GetFolderData, GetFolderVariables>;

interface GetFolderRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetFolderVariables): QueryRef<GetFolderData, GetFolderVariables>;
}
export const getFolderRef: GetFolderRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getFolder(dc: DataConnect, vars: GetFolderVariables): QueryPromise<GetFolderData, GetFolderVariables>;

interface GetFolderRef {
  ...
  (dc: DataConnect, vars: GetFolderVariables): QueryRef<GetFolderData, GetFolderVariables>;
}
export const getFolderRef: GetFolderRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getFolderRef:
```typescript
const name = getFolderRef.operationName;
console.log(name);
```

### Variables
The `GetFolder` query requires an argument of type `GetFolderVariables`, which is defined in [file-dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetFolderVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetFolder` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetFolderData`, which is defined in [file-dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetFolderData {
  folder?: {
    id: UUIDString;
    name: string;
    parentFolderId?: UUIDString | null;
    parentFolder?: {
      id: UUIDString;
      name: string;
    } & Folder_Key;
      createdBy: string;
      createdAt: TimestampString;
      description?: string | null;
      color?: string | null;
  } & Folder_Key;
}
```
### Using `GetFolder`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getFolder, GetFolderVariables } from '@file/dataconnect';

// The `GetFolder` query requires an argument of type `GetFolderVariables`:
const getFolderVars: GetFolderVariables = {
  id: ..., 
};

// Call the `getFolder()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getFolder(getFolderVars);
// Variables can be defined inline as well.
const { data } = await getFolder({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getFolder(dataConnect, getFolderVars);

console.log(data.folder);

// Or, you can use the `Promise` API.
getFolder(getFolderVars).then((response) => {
  const data = response.data;
  console.log(data.folder);
});
```

### Using `GetFolder`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getFolderRef, GetFolderVariables } from '@file/dataconnect';

// The `GetFolder` query requires an argument of type `GetFolderVariables`:
const getFolderVars: GetFolderVariables = {
  id: ..., 
};

// Call the `getFolderRef()` function to get a reference to the query.
const ref = getFolderRef(getFolderVars);
// Variables can be defined inline as well.
const ref = getFolderRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getFolderRef(dataConnect, getFolderVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.folder);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.folder);
});
```

## SearchFiles
You can execute the `SearchFiles` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [file-dataconnect-sdk/index.d.ts](./index.d.ts):
```typescript
searchFiles(vars: SearchFilesVariables): QueryPromise<SearchFilesData, SearchFilesVariables>;

interface SearchFilesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: SearchFilesVariables): QueryRef<SearchFilesData, SearchFilesVariables>;
}
export const searchFilesRef: SearchFilesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
searchFiles(dc: DataConnect, vars: SearchFilesVariables): QueryPromise<SearchFilesData, SearchFilesVariables>;

interface SearchFilesRef {
  ...
  (dc: DataConnect, vars: SearchFilesVariables): QueryRef<SearchFilesData, SearchFilesVariables>;
}
export const searchFilesRef: SearchFilesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the searchFilesRef:
```typescript
const name = searchFilesRef.operationName;
console.log(name);
```

### Variables
The `SearchFiles` query requires an argument of type `SearchFilesVariables`, which is defined in [file-dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface SearchFilesVariables {
  searchTerm: string;
}
```
### Return Type
Recall that executing the `SearchFiles` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `SearchFilesData`, which is defined in [file-dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface SearchFilesData {
  files: ({
    id: UUIDString;
    name: string;
    storagePath: string;
    mimeType?: string | null;
    size: Int64String;
    folderId?: UUIDString | null;
    uploadedBy: string;
    uploadedAt: TimestampString;
    description?: string | null;
    tags?: string[] | null;
    downloadCount?: number | null;
  } & File_Key)[];
}
```
### Using `SearchFiles`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, searchFiles, SearchFilesVariables } from '@file/dataconnect';

// The `SearchFiles` query requires an argument of type `SearchFilesVariables`:
const searchFilesVars: SearchFilesVariables = {
  searchTerm: ..., 
};

// Call the `searchFiles()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await searchFiles(searchFilesVars);
// Variables can be defined inline as well.
const { data } = await searchFiles({ searchTerm: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await searchFiles(dataConnect, searchFilesVars);

console.log(data.files);

// Or, you can use the `Promise` API.
searchFiles(searchFilesVars).then((response) => {
  const data = response.data;
  console.log(data.files);
});
```

### Using `SearchFiles`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, searchFilesRef, SearchFilesVariables } from '@file/dataconnect';

// The `SearchFiles` query requires an argument of type `SearchFilesVariables`:
const searchFilesVars: SearchFilesVariables = {
  searchTerm: ..., 
};

// Call the `searchFilesRef()` function to get a reference to the query.
const ref = searchFilesRef(searchFilesVars);
// Variables can be defined inline as well.
const ref = searchFilesRef({ searchTerm: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = searchFilesRef(dataConnect, searchFilesVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.files);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.files);
});
```

## GetRecentFiles
You can execute the `GetRecentFiles` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [file-dataconnect-sdk/index.d.ts](./index.d.ts):
```typescript
getRecentFiles(vars?: GetRecentFilesVariables): QueryPromise<GetRecentFilesData, GetRecentFilesVariables>;

interface GetRecentFilesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars?: GetRecentFilesVariables): QueryRef<GetRecentFilesData, GetRecentFilesVariables>;
}
export const getRecentFilesRef: GetRecentFilesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getRecentFiles(dc: DataConnect, vars?: GetRecentFilesVariables): QueryPromise<GetRecentFilesData, GetRecentFilesVariables>;

interface GetRecentFilesRef {
  ...
  (dc: DataConnect, vars?: GetRecentFilesVariables): QueryRef<GetRecentFilesData, GetRecentFilesVariables>;
}
export const getRecentFilesRef: GetRecentFilesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getRecentFilesRef:
```typescript
const name = getRecentFilesRef.operationName;
console.log(name);
```

### Variables
The `GetRecentFiles` query has an optional argument of type `GetRecentFilesVariables`, which is defined in [file-dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetRecentFilesVariables {
  limit?: number | null;
}
```
### Return Type
Recall that executing the `GetRecentFiles` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetRecentFilesData`, which is defined in [file-dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetRecentFilesData {
  files: ({
    id: UUIDString;
    name: string;
    storagePath: string;
    mimeType?: string | null;
    size: Int64String;
    folderId?: UUIDString | null;
    uploadedBy: string;
    uploadedAt: TimestampString;
    description?: string | null;
    tags?: string[] | null;
    downloadCount?: number | null;
  } & File_Key)[];
}
```
### Using `GetRecentFiles`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getRecentFiles, GetRecentFilesVariables } from '@file/dataconnect';

// The `GetRecentFiles` query has an optional argument of type `GetRecentFilesVariables`:
const getRecentFilesVars: GetRecentFilesVariables = {
  limit: ..., // optional
};

// Call the `getRecentFiles()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getRecentFiles(getRecentFilesVars);
// Variables can be defined inline as well.
const { data } = await getRecentFiles({ limit: ..., });
// Since all variables are optional for this query, you can omit the `GetRecentFilesVariables` argument.
const { data } = await getRecentFiles();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getRecentFiles(dataConnect, getRecentFilesVars);

console.log(data.files);

// Or, you can use the `Promise` API.
getRecentFiles(getRecentFilesVars).then((response) => {
  const data = response.data;
  console.log(data.files);
});
```

### Using `GetRecentFiles`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getRecentFilesRef, GetRecentFilesVariables } from '@file/dataconnect';

// The `GetRecentFiles` query has an optional argument of type `GetRecentFilesVariables`:
const getRecentFilesVars: GetRecentFilesVariables = {
  limit: ..., // optional
};

// Call the `getRecentFilesRef()` function to get a reference to the query.
const ref = getRecentFilesRef(getRecentFilesVars);
// Variables can be defined inline as well.
const ref = getRecentFilesRef({ limit: ..., });
// Since all variables are optional for this query, you can omit the `GetRecentFilesVariables` argument.
const ref = getRecentFilesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getRecentFilesRef(dataConnect, getRecentFilesVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.files);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.files);
});
```

## GetUserStorageStats
You can execute the `GetUserStorageStats` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [file-dataconnect-sdk/index.d.ts](./index.d.ts):
```typescript
getUserStorageStats(): QueryPromise<GetUserStorageStatsData, undefined>;

interface GetUserStorageStatsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetUserStorageStatsData, undefined>;
}
export const getUserStorageStatsRef: GetUserStorageStatsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getUserStorageStats(dc: DataConnect): QueryPromise<GetUserStorageStatsData, undefined>;

interface GetUserStorageStatsRef {
  ...
  (dc: DataConnect): QueryRef<GetUserStorageStatsData, undefined>;
}
export const getUserStorageStatsRef: GetUserStorageStatsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getUserStorageStatsRef:
```typescript
const name = getUserStorageStatsRef.operationName;
console.log(name);
```

### Variables
The `GetUserStorageStats` query has no variables.
### Return Type
Recall that executing the `GetUserStorageStats` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetUserStorageStatsData`, which is defined in [file-dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetUserStorageStatsData {
  files: ({
    size: Int64String;
  })[];
}
```
### Using `GetUserStorageStats`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getUserStorageStats } from '@file/dataconnect';


// Call the `getUserStorageStats()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getUserStorageStats();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getUserStorageStats(dataConnect);

console.log(data.files);

// Or, you can use the `Promise` API.
getUserStorageStats().then((response) => {
  const data = response.data;
  console.log(data.files);
});
```

### Using `GetUserStorageStats`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getUserStorageStatsRef } from '@file/dataconnect';


// Call the `getUserStorageStatsRef()` function to get a reference to the query.
const ref = getUserStorageStatsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getUserStorageStatsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.files);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.files);
});
```

## ListArchivedFiles
You can execute the `ListArchivedFiles` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [file-dataconnect-sdk/index.d.ts](./index.d.ts):
```typescript
listArchivedFiles(): QueryPromise<ListArchivedFilesData, undefined>;

interface ListArchivedFilesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListArchivedFilesData, undefined>;
}
export const listArchivedFilesRef: ListArchivedFilesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listArchivedFiles(dc: DataConnect): QueryPromise<ListArchivedFilesData, undefined>;

interface ListArchivedFilesRef {
  ...
  (dc: DataConnect): QueryRef<ListArchivedFilesData, undefined>;
}
export const listArchivedFilesRef: ListArchivedFilesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listArchivedFilesRef:
```typescript
const name = listArchivedFilesRef.operationName;
console.log(name);
```

### Variables
The `ListArchivedFiles` query has no variables.
### Return Type
Recall that executing the `ListArchivedFiles` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListArchivedFilesData`, which is defined in [file-dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListArchivedFilesData {
  files: ({
    id: UUIDString;
    name: string;
    storagePath: string;
    mimeType?: string | null;
    size: Int64String;
    uploadedBy: string;
    uploadedAt: TimestampString;
    archivedAt?: TimestampString | null;
    description?: string | null;
    tags?: string[] | null;
    downloadCount?: number | null;
  } & File_Key)[];
}
```
### Using `ListArchivedFiles`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listArchivedFiles } from '@file/dataconnect';


// Call the `listArchivedFiles()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listArchivedFiles();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listArchivedFiles(dataConnect);

console.log(data.files);

// Or, you can use the `Promise` API.
listArchivedFiles().then((response) => {
  const data = response.data;
  console.log(data.files);
});
```

### Using `ListArchivedFiles`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listArchivedFilesRef } from '@file/dataconnect';


// Call the `listArchivedFilesRef()` function to get a reference to the query.
const ref = listArchivedFilesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listArchivedFilesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.files);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.files);
});
```

## GetArchivedFilesCount
You can execute the `GetArchivedFilesCount` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [file-dataconnect-sdk/index.d.ts](./index.d.ts):
```typescript
getArchivedFilesCount(): QueryPromise<GetArchivedFilesCountData, undefined>;

interface GetArchivedFilesCountRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetArchivedFilesCountData, undefined>;
}
export const getArchivedFilesCountRef: GetArchivedFilesCountRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getArchivedFilesCount(dc: DataConnect): QueryPromise<GetArchivedFilesCountData, undefined>;

interface GetArchivedFilesCountRef {
  ...
  (dc: DataConnect): QueryRef<GetArchivedFilesCountData, undefined>;
}
export const getArchivedFilesCountRef: GetArchivedFilesCountRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getArchivedFilesCountRef:
```typescript
const name = getArchivedFilesCountRef.operationName;
console.log(name);
```

### Variables
The `GetArchivedFilesCount` query has no variables.
### Return Type
Recall that executing the `GetArchivedFilesCount` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetArchivedFilesCountData`, which is defined in [file-dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetArchivedFilesCountData {
  files: ({
    id: UUIDString;
  } & File_Key)[];
}
```
### Using `GetArchivedFilesCount`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getArchivedFilesCount } from '@file/dataconnect';


// Call the `getArchivedFilesCount()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getArchivedFilesCount();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getArchivedFilesCount(dataConnect);

console.log(data.files);

// Or, you can use the `Promise` API.
getArchivedFilesCount().then((response) => {
  const data = response.data;
  console.log(data.files);
});
```

### Using `GetArchivedFilesCount`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getArchivedFilesCountRef } from '@file/dataconnect';


// Call the `getArchivedFilesCountRef()` function to get a reference to the query.
const ref = getArchivedFilesCountRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getArchivedFilesCountRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.files);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.files);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `file-connector` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateFile
You can execute the `CreateFile` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [file-dataconnect-sdk/index.d.ts](./index.d.ts):
```typescript
createFile(vars: CreateFileVariables): MutationPromise<CreateFileData, CreateFileVariables>;

interface CreateFileRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateFileVariables): MutationRef<CreateFileData, CreateFileVariables>;
}
export const createFileRef: CreateFileRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createFile(dc: DataConnect, vars: CreateFileVariables): MutationPromise<CreateFileData, CreateFileVariables>;

interface CreateFileRef {
  ...
  (dc: DataConnect, vars: CreateFileVariables): MutationRef<CreateFileData, CreateFileVariables>;
}
export const createFileRef: CreateFileRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createFileRef:
```typescript
const name = createFileRef.operationName;
console.log(name);
```

### Variables
The `CreateFile` mutation requires an argument of type `CreateFileVariables`, which is defined in [file-dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateFileVariables {
  name: string;
  storagePath: string;
  mimeType?: string | null;
  size: Int64String;
  folderId?: UUIDString | null;
  description?: string | null;
  tags?: string[] | null;
  isPublic?: boolean | null;
}
```
### Return Type
Recall that executing the `CreateFile` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateFileData`, which is defined in [file-dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateFileData {
  file_insert: File_Key;
}
```
### Using `CreateFile`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createFile, CreateFileVariables } from '@file/dataconnect';

// The `CreateFile` mutation requires an argument of type `CreateFileVariables`:
const createFileVars: CreateFileVariables = {
  name: ..., 
  storagePath: ..., 
  mimeType: ..., // optional
  size: ..., 
  folderId: ..., // optional
  description: ..., // optional
  tags: ..., // optional
  isPublic: ..., // optional
};

// Call the `createFile()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createFile(createFileVars);
// Variables can be defined inline as well.
const { data } = await createFile({ name: ..., storagePath: ..., mimeType: ..., size: ..., folderId: ..., description: ..., tags: ..., isPublic: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createFile(dataConnect, createFileVars);

console.log(data.file_insert);

// Or, you can use the `Promise` API.
createFile(createFileVars).then((response) => {
  const data = response.data;
  console.log(data.file_insert);
});
```

### Using `CreateFile`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createFileRef, CreateFileVariables } from '@file/dataconnect';

// The `CreateFile` mutation requires an argument of type `CreateFileVariables`:
const createFileVars: CreateFileVariables = {
  name: ..., 
  storagePath: ..., 
  mimeType: ..., // optional
  size: ..., 
  folderId: ..., // optional
  description: ..., // optional
  tags: ..., // optional
  isPublic: ..., // optional
};

// Call the `createFileRef()` function to get a reference to the mutation.
const ref = createFileRef(createFileVars);
// Variables can be defined inline as well.
const ref = createFileRef({ name: ..., storagePath: ..., mimeType: ..., size: ..., folderId: ..., description: ..., tags: ..., isPublic: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createFileRef(dataConnect, createFileVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.file_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.file_insert);
});
```

## UpdateFile
You can execute the `UpdateFile` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [file-dataconnect-sdk/index.d.ts](./index.d.ts):
```typescript
updateFile(vars: UpdateFileVariables): MutationPromise<UpdateFileData, UpdateFileVariables>;

interface UpdateFileRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateFileVariables): MutationRef<UpdateFileData, UpdateFileVariables>;
}
export const updateFileRef: UpdateFileRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateFile(dc: DataConnect, vars: UpdateFileVariables): MutationPromise<UpdateFileData, UpdateFileVariables>;

interface UpdateFileRef {
  ...
  (dc: DataConnect, vars: UpdateFileVariables): MutationRef<UpdateFileData, UpdateFileVariables>;
}
export const updateFileRef: UpdateFileRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateFileRef:
```typescript
const name = updateFileRef.operationName;
console.log(name);
```

### Variables
The `UpdateFile` mutation requires an argument of type `UpdateFileVariables`, which is defined in [file-dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateFileVariables {
  id: UUIDString;
  name?: string | null;
  description?: string | null;
  tags?: string[] | null;
  isPublic?: boolean | null;
  folderId?: UUIDString | null;
}
```
### Return Type
Recall that executing the `UpdateFile` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateFileData`, which is defined in [file-dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateFileData {
  file_update?: File_Key | null;
}
```
### Using `UpdateFile`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateFile, UpdateFileVariables } from '@file/dataconnect';

// The `UpdateFile` mutation requires an argument of type `UpdateFileVariables`:
const updateFileVars: UpdateFileVariables = {
  id: ..., 
  name: ..., // optional
  description: ..., // optional
  tags: ..., // optional
  isPublic: ..., // optional
  folderId: ..., // optional
};

// Call the `updateFile()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateFile(updateFileVars);
// Variables can be defined inline as well.
const { data } = await updateFile({ id: ..., name: ..., description: ..., tags: ..., isPublic: ..., folderId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateFile(dataConnect, updateFileVars);

console.log(data.file_update);

// Or, you can use the `Promise` API.
updateFile(updateFileVars).then((response) => {
  const data = response.data;
  console.log(data.file_update);
});
```

### Using `UpdateFile`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateFileRef, UpdateFileVariables } from '@file/dataconnect';

// The `UpdateFile` mutation requires an argument of type `UpdateFileVariables`:
const updateFileVars: UpdateFileVariables = {
  id: ..., 
  name: ..., // optional
  description: ..., // optional
  tags: ..., // optional
  isPublic: ..., // optional
  folderId: ..., // optional
};

// Call the `updateFileRef()` function to get a reference to the mutation.
const ref = updateFileRef(updateFileVars);
// Variables can be defined inline as well.
const ref = updateFileRef({ id: ..., name: ..., description: ..., tags: ..., isPublic: ..., folderId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateFileRef(dataConnect, updateFileVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.file_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.file_update);
});
```

## DeleteFile
You can execute the `DeleteFile` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [file-dataconnect-sdk/index.d.ts](./index.d.ts):
```typescript
deleteFile(vars: DeleteFileVariables): MutationPromise<DeleteFileData, DeleteFileVariables>;

interface DeleteFileRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteFileVariables): MutationRef<DeleteFileData, DeleteFileVariables>;
}
export const deleteFileRef: DeleteFileRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteFile(dc: DataConnect, vars: DeleteFileVariables): MutationPromise<DeleteFileData, DeleteFileVariables>;

interface DeleteFileRef {
  ...
  (dc: DataConnect, vars: DeleteFileVariables): MutationRef<DeleteFileData, DeleteFileVariables>;
}
export const deleteFileRef: DeleteFileRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteFileRef:
```typescript
const name = deleteFileRef.operationName;
console.log(name);
```

### Variables
The `DeleteFile` mutation requires an argument of type `DeleteFileVariables`, which is defined in [file-dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteFileVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteFile` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteFileData`, which is defined in [file-dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteFileData {
  file_delete?: File_Key | null;
}
```
### Using `DeleteFile`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteFile, DeleteFileVariables } from '@file/dataconnect';

// The `DeleteFile` mutation requires an argument of type `DeleteFileVariables`:
const deleteFileVars: DeleteFileVariables = {
  id: ..., 
};

// Call the `deleteFile()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteFile(deleteFileVars);
// Variables can be defined inline as well.
const { data } = await deleteFile({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteFile(dataConnect, deleteFileVars);

console.log(data.file_delete);

// Or, you can use the `Promise` API.
deleteFile(deleteFileVars).then((response) => {
  const data = response.data;
  console.log(data.file_delete);
});
```

### Using `DeleteFile`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteFileRef, DeleteFileVariables } from '@file/dataconnect';

// The `DeleteFile` mutation requires an argument of type `DeleteFileVariables`:
const deleteFileVars: DeleteFileVariables = {
  id: ..., 
};

// Call the `deleteFileRef()` function to get a reference to the mutation.
const ref = deleteFileRef(deleteFileVars);
// Variables can be defined inline as well.
const ref = deleteFileRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteFileRef(dataConnect, deleteFileVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.file_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.file_delete);
});
```

## IncrementDownloadCount
You can execute the `IncrementDownloadCount` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [file-dataconnect-sdk/index.d.ts](./index.d.ts):
```typescript
incrementDownloadCount(vars: IncrementDownloadCountVariables): MutationPromise<IncrementDownloadCountData, IncrementDownloadCountVariables>;

interface IncrementDownloadCountRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: IncrementDownloadCountVariables): MutationRef<IncrementDownloadCountData, IncrementDownloadCountVariables>;
}
export const incrementDownloadCountRef: IncrementDownloadCountRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
incrementDownloadCount(dc: DataConnect, vars: IncrementDownloadCountVariables): MutationPromise<IncrementDownloadCountData, IncrementDownloadCountVariables>;

interface IncrementDownloadCountRef {
  ...
  (dc: DataConnect, vars: IncrementDownloadCountVariables): MutationRef<IncrementDownloadCountData, IncrementDownloadCountVariables>;
}
export const incrementDownloadCountRef: IncrementDownloadCountRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the incrementDownloadCountRef:
```typescript
const name = incrementDownloadCountRef.operationName;
console.log(name);
```

### Variables
The `IncrementDownloadCount` mutation requires an argument of type `IncrementDownloadCountVariables`, which is defined in [file-dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface IncrementDownloadCountVariables {
  id: UUIDString;
  newCount: number;
}
```
### Return Type
Recall that executing the `IncrementDownloadCount` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `IncrementDownloadCountData`, which is defined in [file-dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface IncrementDownloadCountData {
  file_update?: File_Key | null;
}
```
### Using `IncrementDownloadCount`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, incrementDownloadCount, IncrementDownloadCountVariables } from '@file/dataconnect';

// The `IncrementDownloadCount` mutation requires an argument of type `IncrementDownloadCountVariables`:
const incrementDownloadCountVars: IncrementDownloadCountVariables = {
  id: ..., 
  newCount: ..., 
};

// Call the `incrementDownloadCount()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await incrementDownloadCount(incrementDownloadCountVars);
// Variables can be defined inline as well.
const { data } = await incrementDownloadCount({ id: ..., newCount: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await incrementDownloadCount(dataConnect, incrementDownloadCountVars);

console.log(data.file_update);

// Or, you can use the `Promise` API.
incrementDownloadCount(incrementDownloadCountVars).then((response) => {
  const data = response.data;
  console.log(data.file_update);
});
```

### Using `IncrementDownloadCount`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, incrementDownloadCountRef, IncrementDownloadCountVariables } from '@file/dataconnect';

// The `IncrementDownloadCount` mutation requires an argument of type `IncrementDownloadCountVariables`:
const incrementDownloadCountVars: IncrementDownloadCountVariables = {
  id: ..., 
  newCount: ..., 
};

// Call the `incrementDownloadCountRef()` function to get a reference to the mutation.
const ref = incrementDownloadCountRef(incrementDownloadCountVars);
// Variables can be defined inline as well.
const ref = incrementDownloadCountRef({ id: ..., newCount: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = incrementDownloadCountRef(dataConnect, incrementDownloadCountVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.file_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.file_update);
});
```

## CreateFolder
You can execute the `CreateFolder` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [file-dataconnect-sdk/index.d.ts](./index.d.ts):
```typescript
createFolder(vars: CreateFolderVariables): MutationPromise<CreateFolderData, CreateFolderVariables>;

interface CreateFolderRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateFolderVariables): MutationRef<CreateFolderData, CreateFolderVariables>;
}
export const createFolderRef: CreateFolderRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createFolder(dc: DataConnect, vars: CreateFolderVariables): MutationPromise<CreateFolderData, CreateFolderVariables>;

interface CreateFolderRef {
  ...
  (dc: DataConnect, vars: CreateFolderVariables): MutationRef<CreateFolderData, CreateFolderVariables>;
}
export const createFolderRef: CreateFolderRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createFolderRef:
```typescript
const name = createFolderRef.operationName;
console.log(name);
```

### Variables
The `CreateFolder` mutation requires an argument of type `CreateFolderVariables`, which is defined in [file-dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateFolderVariables {
  name: string;
  parentFolderId?: UUIDString | null;
  description?: string | null;
  color?: string | null;
}
```
### Return Type
Recall that executing the `CreateFolder` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateFolderData`, which is defined in [file-dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateFolderData {
  folder_insert: Folder_Key;
}
```
### Using `CreateFolder`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createFolder, CreateFolderVariables } from '@file/dataconnect';

// The `CreateFolder` mutation requires an argument of type `CreateFolderVariables`:
const createFolderVars: CreateFolderVariables = {
  name: ..., 
  parentFolderId: ..., // optional
  description: ..., // optional
  color: ..., // optional
};

// Call the `createFolder()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createFolder(createFolderVars);
// Variables can be defined inline as well.
const { data } = await createFolder({ name: ..., parentFolderId: ..., description: ..., color: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createFolder(dataConnect, createFolderVars);

console.log(data.folder_insert);

// Or, you can use the `Promise` API.
createFolder(createFolderVars).then((response) => {
  const data = response.data;
  console.log(data.folder_insert);
});
```

### Using `CreateFolder`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createFolderRef, CreateFolderVariables } from '@file/dataconnect';

// The `CreateFolder` mutation requires an argument of type `CreateFolderVariables`:
const createFolderVars: CreateFolderVariables = {
  name: ..., 
  parentFolderId: ..., // optional
  description: ..., // optional
  color: ..., // optional
};

// Call the `createFolderRef()` function to get a reference to the mutation.
const ref = createFolderRef(createFolderVars);
// Variables can be defined inline as well.
const ref = createFolderRef({ name: ..., parentFolderId: ..., description: ..., color: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createFolderRef(dataConnect, createFolderVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.folder_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.folder_insert);
});
```

## UpdateFolder
You can execute the `UpdateFolder` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [file-dataconnect-sdk/index.d.ts](./index.d.ts):
```typescript
updateFolder(vars: UpdateFolderVariables): MutationPromise<UpdateFolderData, UpdateFolderVariables>;

interface UpdateFolderRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateFolderVariables): MutationRef<UpdateFolderData, UpdateFolderVariables>;
}
export const updateFolderRef: UpdateFolderRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateFolder(dc: DataConnect, vars: UpdateFolderVariables): MutationPromise<UpdateFolderData, UpdateFolderVariables>;

interface UpdateFolderRef {
  ...
  (dc: DataConnect, vars: UpdateFolderVariables): MutationRef<UpdateFolderData, UpdateFolderVariables>;
}
export const updateFolderRef: UpdateFolderRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateFolderRef:
```typescript
const name = updateFolderRef.operationName;
console.log(name);
```

### Variables
The `UpdateFolder` mutation requires an argument of type `UpdateFolderVariables`, which is defined in [file-dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateFolderVariables {
  id: UUIDString;
  name?: string | null;
  description?: string | null;
  color?: string | null;
}
```
### Return Type
Recall that executing the `UpdateFolder` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateFolderData`, which is defined in [file-dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateFolderData {
  folder_update?: Folder_Key | null;
}
```
### Using `UpdateFolder`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateFolder, UpdateFolderVariables } from '@file/dataconnect';

// The `UpdateFolder` mutation requires an argument of type `UpdateFolderVariables`:
const updateFolderVars: UpdateFolderVariables = {
  id: ..., 
  name: ..., // optional
  description: ..., // optional
  color: ..., // optional
};

// Call the `updateFolder()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateFolder(updateFolderVars);
// Variables can be defined inline as well.
const { data } = await updateFolder({ id: ..., name: ..., description: ..., color: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateFolder(dataConnect, updateFolderVars);

console.log(data.folder_update);

// Or, you can use the `Promise` API.
updateFolder(updateFolderVars).then((response) => {
  const data = response.data;
  console.log(data.folder_update);
});
```

### Using `UpdateFolder`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateFolderRef, UpdateFolderVariables } from '@file/dataconnect';

// The `UpdateFolder` mutation requires an argument of type `UpdateFolderVariables`:
const updateFolderVars: UpdateFolderVariables = {
  id: ..., 
  name: ..., // optional
  description: ..., // optional
  color: ..., // optional
};

// Call the `updateFolderRef()` function to get a reference to the mutation.
const ref = updateFolderRef(updateFolderVars);
// Variables can be defined inline as well.
const ref = updateFolderRef({ id: ..., name: ..., description: ..., color: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateFolderRef(dataConnect, updateFolderVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.folder_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.folder_update);
});
```

## DeleteFolder
You can execute the `DeleteFolder` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [file-dataconnect-sdk/index.d.ts](./index.d.ts):
```typescript
deleteFolder(vars: DeleteFolderVariables): MutationPromise<DeleteFolderData, DeleteFolderVariables>;

interface DeleteFolderRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteFolderVariables): MutationRef<DeleteFolderData, DeleteFolderVariables>;
}
export const deleteFolderRef: DeleteFolderRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteFolder(dc: DataConnect, vars: DeleteFolderVariables): MutationPromise<DeleteFolderData, DeleteFolderVariables>;

interface DeleteFolderRef {
  ...
  (dc: DataConnect, vars: DeleteFolderVariables): MutationRef<DeleteFolderData, DeleteFolderVariables>;
}
export const deleteFolderRef: DeleteFolderRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteFolderRef:
```typescript
const name = deleteFolderRef.operationName;
console.log(name);
```

### Variables
The `DeleteFolder` mutation requires an argument of type `DeleteFolderVariables`, which is defined in [file-dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteFolderVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteFolder` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteFolderData`, which is defined in [file-dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteFolderData {
  folder_delete?: Folder_Key | null;
}
```
### Using `DeleteFolder`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteFolder, DeleteFolderVariables } from '@file/dataconnect';

// The `DeleteFolder` mutation requires an argument of type `DeleteFolderVariables`:
const deleteFolderVars: DeleteFolderVariables = {
  id: ..., 
};

// Call the `deleteFolder()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteFolder(deleteFolderVars);
// Variables can be defined inline as well.
const { data } = await deleteFolder({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteFolder(dataConnect, deleteFolderVars);

console.log(data.folder_delete);

// Or, you can use the `Promise` API.
deleteFolder(deleteFolderVars).then((response) => {
  const data = response.data;
  console.log(data.folder_delete);
});
```

### Using `DeleteFolder`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteFolderRef, DeleteFolderVariables } from '@file/dataconnect';

// The `DeleteFolder` mutation requires an argument of type `DeleteFolderVariables`:
const deleteFolderVars: DeleteFolderVariables = {
  id: ..., 
};

// Call the `deleteFolderRef()` function to get a reference to the mutation.
const ref = deleteFolderRef(deleteFolderVars);
// Variables can be defined inline as well.
const ref = deleteFolderRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteFolderRef(dataConnect, deleteFolderVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.folder_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.folder_delete);
});
```

## ArchiveFile
You can execute the `ArchiveFile` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [file-dataconnect-sdk/index.d.ts](./index.d.ts):
```typescript
archiveFile(vars: ArchiveFileVariables): MutationPromise<ArchiveFileData, ArchiveFileVariables>;

interface ArchiveFileRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ArchiveFileVariables): MutationRef<ArchiveFileData, ArchiveFileVariables>;
}
export const archiveFileRef: ArchiveFileRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
archiveFile(dc: DataConnect, vars: ArchiveFileVariables): MutationPromise<ArchiveFileData, ArchiveFileVariables>;

interface ArchiveFileRef {
  ...
  (dc: DataConnect, vars: ArchiveFileVariables): MutationRef<ArchiveFileData, ArchiveFileVariables>;
}
export const archiveFileRef: ArchiveFileRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the archiveFileRef:
```typescript
const name = archiveFileRef.operationName;
console.log(name);
```

### Variables
The `ArchiveFile` mutation requires an argument of type `ArchiveFileVariables`, which is defined in [file-dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ArchiveFileVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `ArchiveFile` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ArchiveFileData`, which is defined in [file-dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ArchiveFileData {
  file_update?: File_Key | null;
}
```
### Using `ArchiveFile`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, archiveFile, ArchiveFileVariables } from '@file/dataconnect';

// The `ArchiveFile` mutation requires an argument of type `ArchiveFileVariables`:
const archiveFileVars: ArchiveFileVariables = {
  id: ..., 
};

// Call the `archiveFile()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await archiveFile(archiveFileVars);
// Variables can be defined inline as well.
const { data } = await archiveFile({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await archiveFile(dataConnect, archiveFileVars);

console.log(data.file_update);

// Or, you can use the `Promise` API.
archiveFile(archiveFileVars).then((response) => {
  const data = response.data;
  console.log(data.file_update);
});
```

### Using `ArchiveFile`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, archiveFileRef, ArchiveFileVariables } from '@file/dataconnect';

// The `ArchiveFile` mutation requires an argument of type `ArchiveFileVariables`:
const archiveFileVars: ArchiveFileVariables = {
  id: ..., 
};

// Call the `archiveFileRef()` function to get a reference to the mutation.
const ref = archiveFileRef(archiveFileVars);
// Variables can be defined inline as well.
const ref = archiveFileRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = archiveFileRef(dataConnect, archiveFileVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.file_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.file_update);
});
```

## ArchiveOldFiles
You can execute the `ArchiveOldFiles` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [file-dataconnect-sdk/index.d.ts](./index.d.ts):
```typescript
archiveOldFiles(vars: ArchiveOldFilesVariables): MutationPromise<ArchiveOldFilesData, ArchiveOldFilesVariables>;

interface ArchiveOldFilesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ArchiveOldFilesVariables): MutationRef<ArchiveOldFilesData, ArchiveOldFilesVariables>;
}
export const archiveOldFilesRef: ArchiveOldFilesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
archiveOldFiles(dc: DataConnect, vars: ArchiveOldFilesVariables): MutationPromise<ArchiveOldFilesData, ArchiveOldFilesVariables>;

interface ArchiveOldFilesRef {
  ...
  (dc: DataConnect, vars: ArchiveOldFilesVariables): MutationRef<ArchiveOldFilesData, ArchiveOldFilesVariables>;
}
export const archiveOldFilesRef: ArchiveOldFilesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the archiveOldFilesRef:
```typescript
const name = archiveOldFilesRef.operationName;
console.log(name);
```

### Variables
The `ArchiveOldFiles` mutation requires an argument of type `ArchiveOldFilesVariables`, which is defined in [file-dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ArchiveOldFilesVariables {
  olderThan: TimestampString;
}
```
### Return Type
Recall that executing the `ArchiveOldFiles` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ArchiveOldFilesData`, which is defined in [file-dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ArchiveOldFilesData {
  file_updateMany: number;
}
```
### Using `ArchiveOldFiles`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, archiveOldFiles, ArchiveOldFilesVariables } from '@file/dataconnect';

// The `ArchiveOldFiles` mutation requires an argument of type `ArchiveOldFilesVariables`:
const archiveOldFilesVars: ArchiveOldFilesVariables = {
  olderThan: ..., 
};

// Call the `archiveOldFiles()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await archiveOldFiles(archiveOldFilesVars);
// Variables can be defined inline as well.
const { data } = await archiveOldFiles({ olderThan: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await archiveOldFiles(dataConnect, archiveOldFilesVars);

console.log(data.file_updateMany);

// Or, you can use the `Promise` API.
archiveOldFiles(archiveOldFilesVars).then((response) => {
  const data = response.data;
  console.log(data.file_updateMany);
});
```

### Using `ArchiveOldFiles`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, archiveOldFilesRef, ArchiveOldFilesVariables } from '@file/dataconnect';

// The `ArchiveOldFiles` mutation requires an argument of type `ArchiveOldFilesVariables`:
const archiveOldFilesVars: ArchiveOldFilesVariables = {
  olderThan: ..., 
};

// Call the `archiveOldFilesRef()` function to get a reference to the mutation.
const ref = archiveOldFilesRef(archiveOldFilesVars);
// Variables can be defined inline as well.
const ref = archiveOldFilesRef({ olderThan: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = archiveOldFilesRef(dataConnect, archiveOldFilesVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.file_updateMany);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.file_updateMany);
});
```

## RestoreFile
You can execute the `RestoreFile` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [file-dataconnect-sdk/index.d.ts](./index.d.ts):
```typescript
restoreFile(vars: RestoreFileVariables): MutationPromise<RestoreFileData, RestoreFileVariables>;

interface RestoreFileRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: RestoreFileVariables): MutationRef<RestoreFileData, RestoreFileVariables>;
}
export const restoreFileRef: RestoreFileRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
restoreFile(dc: DataConnect, vars: RestoreFileVariables): MutationPromise<RestoreFileData, RestoreFileVariables>;

interface RestoreFileRef {
  ...
  (dc: DataConnect, vars: RestoreFileVariables): MutationRef<RestoreFileData, RestoreFileVariables>;
}
export const restoreFileRef: RestoreFileRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the restoreFileRef:
```typescript
const name = restoreFileRef.operationName;
console.log(name);
```

### Variables
The `RestoreFile` mutation requires an argument of type `RestoreFileVariables`, which is defined in [file-dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface RestoreFileVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `RestoreFile` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `RestoreFileData`, which is defined in [file-dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface RestoreFileData {
  file_update?: File_Key | null;
}
```
### Using `RestoreFile`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, restoreFile, RestoreFileVariables } from '@file/dataconnect';

// The `RestoreFile` mutation requires an argument of type `RestoreFileVariables`:
const restoreFileVars: RestoreFileVariables = {
  id: ..., 
};

// Call the `restoreFile()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await restoreFile(restoreFileVars);
// Variables can be defined inline as well.
const { data } = await restoreFile({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await restoreFile(dataConnect, restoreFileVars);

console.log(data.file_update);

// Or, you can use the `Promise` API.
restoreFile(restoreFileVars).then((response) => {
  const data = response.data;
  console.log(data.file_update);
});
```

### Using `RestoreFile`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, restoreFileRef, RestoreFileVariables } from '@file/dataconnect';

// The `RestoreFile` mutation requires an argument of type `RestoreFileVariables`:
const restoreFileVars: RestoreFileVariables = {
  id: ..., 
};

// Call the `restoreFileRef()` function to get a reference to the mutation.
const ref = restoreFileRef(restoreFileVars);
// Variables can be defined inline as well.
const ref = restoreFileRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = restoreFileRef(dataConnect, restoreFileVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.file_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.file_update);
});
```

