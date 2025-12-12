import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface Actor_Key {
  id: UUIDString;
  __typename?: 'Actor_Key';
}

export interface ArchiveFileData {
  file_update?: File_Key | null;
}

export interface ArchiveFileVariables {
  id: UUIDString;
}

export interface ArchiveOldFilesData {
  file_updateMany: number;
}

export interface ArchiveOldFilesVariables {
  olderThan: TimestampString;
}

export interface CreateFileData {
  file_insert: File_Key;
}

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

export interface CreateFolderData {
  folder_insert: Folder_Key;
}

export interface CreateFolderVariables {
  name: string;
  parentFolderId?: UUIDString | null;
  description?: string | null;
  color?: string | null;
}

export interface DeleteFileData {
  file_delete?: File_Key | null;
}

export interface DeleteFileVariables {
  id: UUIDString;
}

export interface DeleteFolderData {
  folder_delete?: Folder_Key | null;
}

export interface DeleteFolderVariables {
  id: UUIDString;
}

export interface FavoriteMovie_Key {
  userId: string;
  movieId: UUIDString;
  __typename?: 'FavoriteMovie_Key';
}

export interface FileShare_Key {
  fileId: UUIDString;
  sharedWith: string;
  __typename?: 'FileShare_Key';
}

export interface File_Key {
  id: UUIDString;
  __typename?: 'File_Key';
}

export interface Folder_Key {
  id: UUIDString;
  __typename?: 'Folder_Key';
}

export interface GetArchivedFilesCountData {
  files: ({
    id: UUIDString;
  } & File_Key)[];
}

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

export interface GetFileVariables {
  id: UUIDString;
}

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

export interface GetFolderVariables {
  id: UUIDString;
}

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

export interface GetRecentFilesVariables {
  limit?: number | null;
}

export interface GetUserStorageStatsData {
  files: ({
    size: Int64String;
  })[];
}

export interface IncrementDownloadCountData {
  file_update?: File_Key | null;
}

export interface IncrementDownloadCountVariables {
  id: UUIDString;
  newCount: number;
}

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

export interface ListFilesVariables {
  folderId?: UUIDString | null;
}

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

export interface ListFoldersVariables {
  parentFolderId?: UUIDString | null;
}

export interface MovieActor_Key {
  movieId: UUIDString;
  actorId: UUIDString;
  __typename?: 'MovieActor_Key';
}

export interface MovieMetadata_Key {
  id: UUIDString;
  __typename?: 'MovieMetadata_Key';
}

export interface Movie_Key {
  id: UUIDString;
  __typename?: 'Movie_Key';
}

export interface RestoreFileData {
  file_update?: File_Key | null;
}

export interface RestoreFileVariables {
  id: UUIDString;
}

export interface Review_Key {
  userId: string;
  movieId: UUIDString;
  __typename?: 'Review_Key';
}

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

export interface SearchFilesVariables {
  searchTerm: string;
}

export interface UpdateFileData {
  file_update?: File_Key | null;
}

export interface UpdateFileVariables {
  id: UUIDString;
  name?: string | null;
  description?: string | null;
  tags?: string[] | null;
  isPublic?: boolean | null;
  folderId?: UUIDString | null;
}

export interface UpdateFolderData {
  folder_update?: Folder_Key | null;
}

export interface UpdateFolderVariables {
  id: UUIDString;
  name?: string | null;
  description?: string | null;
  color?: string | null;
}

export interface User_Key {
  id: string;
  __typename?: 'User_Key';
}

interface CreateFileRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateFileVariables): MutationRef<CreateFileData, CreateFileVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateFileVariables): MutationRef<CreateFileData, CreateFileVariables>;
  operationName: string;
}
export const createFileRef: CreateFileRef;

export function createFile(vars: CreateFileVariables): MutationPromise<CreateFileData, CreateFileVariables>;
export function createFile(dc: DataConnect, vars: CreateFileVariables): MutationPromise<CreateFileData, CreateFileVariables>;

interface UpdateFileRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateFileVariables): MutationRef<UpdateFileData, UpdateFileVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateFileVariables): MutationRef<UpdateFileData, UpdateFileVariables>;
  operationName: string;
}
export const updateFileRef: UpdateFileRef;

export function updateFile(vars: UpdateFileVariables): MutationPromise<UpdateFileData, UpdateFileVariables>;
export function updateFile(dc: DataConnect, vars: UpdateFileVariables): MutationPromise<UpdateFileData, UpdateFileVariables>;

interface DeleteFileRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteFileVariables): MutationRef<DeleteFileData, DeleteFileVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteFileVariables): MutationRef<DeleteFileData, DeleteFileVariables>;
  operationName: string;
}
export const deleteFileRef: DeleteFileRef;

export function deleteFile(vars: DeleteFileVariables): MutationPromise<DeleteFileData, DeleteFileVariables>;
export function deleteFile(dc: DataConnect, vars: DeleteFileVariables): MutationPromise<DeleteFileData, DeleteFileVariables>;

interface IncrementDownloadCountRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: IncrementDownloadCountVariables): MutationRef<IncrementDownloadCountData, IncrementDownloadCountVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: IncrementDownloadCountVariables): MutationRef<IncrementDownloadCountData, IncrementDownloadCountVariables>;
  operationName: string;
}
export const incrementDownloadCountRef: IncrementDownloadCountRef;

export function incrementDownloadCount(vars: IncrementDownloadCountVariables): MutationPromise<IncrementDownloadCountData, IncrementDownloadCountVariables>;
export function incrementDownloadCount(dc: DataConnect, vars: IncrementDownloadCountVariables): MutationPromise<IncrementDownloadCountData, IncrementDownloadCountVariables>;

interface CreateFolderRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateFolderVariables): MutationRef<CreateFolderData, CreateFolderVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateFolderVariables): MutationRef<CreateFolderData, CreateFolderVariables>;
  operationName: string;
}
export const createFolderRef: CreateFolderRef;

export function createFolder(vars: CreateFolderVariables): MutationPromise<CreateFolderData, CreateFolderVariables>;
export function createFolder(dc: DataConnect, vars: CreateFolderVariables): MutationPromise<CreateFolderData, CreateFolderVariables>;

interface UpdateFolderRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateFolderVariables): MutationRef<UpdateFolderData, UpdateFolderVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateFolderVariables): MutationRef<UpdateFolderData, UpdateFolderVariables>;
  operationName: string;
}
export const updateFolderRef: UpdateFolderRef;

export function updateFolder(vars: UpdateFolderVariables): MutationPromise<UpdateFolderData, UpdateFolderVariables>;
export function updateFolder(dc: DataConnect, vars: UpdateFolderVariables): MutationPromise<UpdateFolderData, UpdateFolderVariables>;

interface DeleteFolderRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteFolderVariables): MutationRef<DeleteFolderData, DeleteFolderVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteFolderVariables): MutationRef<DeleteFolderData, DeleteFolderVariables>;
  operationName: string;
}
export const deleteFolderRef: DeleteFolderRef;

export function deleteFolder(vars: DeleteFolderVariables): MutationPromise<DeleteFolderData, DeleteFolderVariables>;
export function deleteFolder(dc: DataConnect, vars: DeleteFolderVariables): MutationPromise<DeleteFolderData, DeleteFolderVariables>;

interface ArchiveFileRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ArchiveFileVariables): MutationRef<ArchiveFileData, ArchiveFileVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ArchiveFileVariables): MutationRef<ArchiveFileData, ArchiveFileVariables>;
  operationName: string;
}
export const archiveFileRef: ArchiveFileRef;

export function archiveFile(vars: ArchiveFileVariables): MutationPromise<ArchiveFileData, ArchiveFileVariables>;
export function archiveFile(dc: DataConnect, vars: ArchiveFileVariables): MutationPromise<ArchiveFileData, ArchiveFileVariables>;

interface ArchiveOldFilesRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ArchiveOldFilesVariables): MutationRef<ArchiveOldFilesData, ArchiveOldFilesVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ArchiveOldFilesVariables): MutationRef<ArchiveOldFilesData, ArchiveOldFilesVariables>;
  operationName: string;
}
export const archiveOldFilesRef: ArchiveOldFilesRef;

export function archiveOldFiles(vars: ArchiveOldFilesVariables): MutationPromise<ArchiveOldFilesData, ArchiveOldFilesVariables>;
export function archiveOldFiles(dc: DataConnect, vars: ArchiveOldFilesVariables): MutationPromise<ArchiveOldFilesData, ArchiveOldFilesVariables>;

interface RestoreFileRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: RestoreFileVariables): MutationRef<RestoreFileData, RestoreFileVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: RestoreFileVariables): MutationRef<RestoreFileData, RestoreFileVariables>;
  operationName: string;
}
export const restoreFileRef: RestoreFileRef;

export function restoreFile(vars: RestoreFileVariables): MutationPromise<RestoreFileData, RestoreFileVariables>;
export function restoreFile(dc: DataConnect, vars: RestoreFileVariables): MutationPromise<RestoreFileData, RestoreFileVariables>;

interface ListFilesRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars?: ListFilesVariables): QueryRef<ListFilesData, ListFilesVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars?: ListFilesVariables): QueryRef<ListFilesData, ListFilesVariables>;
  operationName: string;
}
export const listFilesRef: ListFilesRef;

export function listFiles(vars?: ListFilesVariables): QueryPromise<ListFilesData, ListFilesVariables>;
export function listFiles(dc: DataConnect, vars?: ListFilesVariables): QueryPromise<ListFilesData, ListFilesVariables>;

interface ListFilesByUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListFilesByUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListFilesByUserData, undefined>;
  operationName: string;
}
export const listFilesByUserRef: ListFilesByUserRef;

export function listFilesByUser(): QueryPromise<ListFilesByUserData, undefined>;
export function listFilesByUser(dc: DataConnect): QueryPromise<ListFilesByUserData, undefined>;

interface GetFileRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetFileVariables): QueryRef<GetFileData, GetFileVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetFileVariables): QueryRef<GetFileData, GetFileVariables>;
  operationName: string;
}
export const getFileRef: GetFileRef;

export function getFile(vars: GetFileVariables): QueryPromise<GetFileData, GetFileVariables>;
export function getFile(dc: DataConnect, vars: GetFileVariables): QueryPromise<GetFileData, GetFileVariables>;

interface ListFoldersRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars?: ListFoldersVariables): QueryRef<ListFoldersData, ListFoldersVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars?: ListFoldersVariables): QueryRef<ListFoldersData, ListFoldersVariables>;
  operationName: string;
}
export const listFoldersRef: ListFoldersRef;

export function listFolders(vars?: ListFoldersVariables): QueryPromise<ListFoldersData, ListFoldersVariables>;
export function listFolders(dc: DataConnect, vars?: ListFoldersVariables): QueryPromise<ListFoldersData, ListFoldersVariables>;

interface GetFolderRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetFolderVariables): QueryRef<GetFolderData, GetFolderVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetFolderVariables): QueryRef<GetFolderData, GetFolderVariables>;
  operationName: string;
}
export const getFolderRef: GetFolderRef;

export function getFolder(vars: GetFolderVariables): QueryPromise<GetFolderData, GetFolderVariables>;
export function getFolder(dc: DataConnect, vars: GetFolderVariables): QueryPromise<GetFolderData, GetFolderVariables>;

interface SearchFilesRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: SearchFilesVariables): QueryRef<SearchFilesData, SearchFilesVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: SearchFilesVariables): QueryRef<SearchFilesData, SearchFilesVariables>;
  operationName: string;
}
export const searchFilesRef: SearchFilesRef;

export function searchFiles(vars: SearchFilesVariables): QueryPromise<SearchFilesData, SearchFilesVariables>;
export function searchFiles(dc: DataConnect, vars: SearchFilesVariables): QueryPromise<SearchFilesData, SearchFilesVariables>;

interface GetRecentFilesRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars?: GetRecentFilesVariables): QueryRef<GetRecentFilesData, GetRecentFilesVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars?: GetRecentFilesVariables): QueryRef<GetRecentFilesData, GetRecentFilesVariables>;
  operationName: string;
}
export const getRecentFilesRef: GetRecentFilesRef;

export function getRecentFiles(vars?: GetRecentFilesVariables): QueryPromise<GetRecentFilesData, GetRecentFilesVariables>;
export function getRecentFiles(dc: DataConnect, vars?: GetRecentFilesVariables): QueryPromise<GetRecentFilesData, GetRecentFilesVariables>;

interface GetUserStorageStatsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetUserStorageStatsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetUserStorageStatsData, undefined>;
  operationName: string;
}
export const getUserStorageStatsRef: GetUserStorageStatsRef;

export function getUserStorageStats(): QueryPromise<GetUserStorageStatsData, undefined>;
export function getUserStorageStats(dc: DataConnect): QueryPromise<GetUserStorageStatsData, undefined>;

interface ListArchivedFilesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListArchivedFilesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListArchivedFilesData, undefined>;
  operationName: string;
}
export const listArchivedFilesRef: ListArchivedFilesRef;

export function listArchivedFiles(): QueryPromise<ListArchivedFilesData, undefined>;
export function listArchivedFiles(dc: DataConnect): QueryPromise<ListArchivedFilesData, undefined>;

interface GetArchivedFilesCountRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetArchivedFilesCountData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetArchivedFilesCountData, undefined>;
  operationName: string;
}
export const getArchivedFilesCountRef: GetArchivedFilesCountRef;

export function getArchivedFilesCount(): QueryPromise<GetArchivedFilesCountData, undefined>;
export function getArchivedFilesCount(dc: DataConnect): QueryPromise<GetArchivedFilesCountData, undefined>;

