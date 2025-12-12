import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'file-connector',
  service: 'file-manager-fdc',
  location: 'us-central1'
};

export const listFilesRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListFiles', inputVars);
}
listFilesRef.operationName = 'ListFiles';

export function listFiles(dcOrVars, vars) {
  return executeQuery(listFilesRef(dcOrVars, vars));
}

export const listFilesByUserRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListFilesByUser');
}
listFilesByUserRef.operationName = 'ListFilesByUser';

export function listFilesByUser(dc) {
  return executeQuery(listFilesByUserRef(dc));
}

export const getFileRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetFile', inputVars);
}
getFileRef.operationName = 'GetFile';

export function getFile(dcOrVars, vars) {
  return executeQuery(getFileRef(dcOrVars, vars));
}

export const listFoldersRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListFolders', inputVars);
}
listFoldersRef.operationName = 'ListFolders';

export function listFolders(dcOrVars, vars) {
  return executeQuery(listFoldersRef(dcOrVars, vars));
}

export const getFolderRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetFolder', inputVars);
}
getFolderRef.operationName = 'GetFolder';

export function getFolder(dcOrVars, vars) {
  return executeQuery(getFolderRef(dcOrVars, vars));
}

export const searchFilesRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'SearchFiles', inputVars);
}
searchFilesRef.operationName = 'SearchFiles';

export function searchFiles(dcOrVars, vars) {
  return executeQuery(searchFilesRef(dcOrVars, vars));
}

export const getRecentFilesRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetRecentFiles', inputVars);
}
getRecentFilesRef.operationName = 'GetRecentFiles';

export function getRecentFiles(dcOrVars, vars) {
  return executeQuery(getRecentFilesRef(dcOrVars, vars));
}

export const getUserStorageStatsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetUserStorageStats');
}
getUserStorageStatsRef.operationName = 'GetUserStorageStats';

export function getUserStorageStats(dc) {
  return executeQuery(getUserStorageStatsRef(dc));
}

export const listArchivedFilesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListArchivedFiles');
}
listArchivedFilesRef.operationName = 'ListArchivedFiles';

export function listArchivedFiles(dc) {
  return executeQuery(listArchivedFilesRef(dc));
}

export const getArchivedFilesCountRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetArchivedFilesCount');
}
getArchivedFilesCountRef.operationName = 'GetArchivedFilesCount';

export function getArchivedFilesCount(dc) {
  return executeQuery(getArchivedFilesCountRef(dc));
}

export const createFileRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateFile', inputVars);
}
createFileRef.operationName = 'CreateFile';

export function createFile(dcOrVars, vars) {
  return executeMutation(createFileRef(dcOrVars, vars));
}

export const updateFileRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateFile', inputVars);
}
updateFileRef.operationName = 'UpdateFile';

export function updateFile(dcOrVars, vars) {
  return executeMutation(updateFileRef(dcOrVars, vars));
}

export const deleteFileRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteFile', inputVars);
}
deleteFileRef.operationName = 'DeleteFile';

export function deleteFile(dcOrVars, vars) {
  return executeMutation(deleteFileRef(dcOrVars, vars));
}

export const incrementDownloadCountRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'IncrementDownloadCount', inputVars);
}
incrementDownloadCountRef.operationName = 'IncrementDownloadCount';

export function incrementDownloadCount(dcOrVars, vars) {
  return executeMutation(incrementDownloadCountRef(dcOrVars, vars));
}

export const createFolderRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateFolder', inputVars);
}
createFolderRef.operationName = 'CreateFolder';

export function createFolder(dcOrVars, vars) {
  return executeMutation(createFolderRef(dcOrVars, vars));
}

export const updateFolderRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateFolder', inputVars);
}
updateFolderRef.operationName = 'UpdateFolder';

export function updateFolder(dcOrVars, vars) {
  return executeMutation(updateFolderRef(dcOrVars, vars));
}

export const deleteFolderRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteFolder', inputVars);
}
deleteFolderRef.operationName = 'DeleteFolder';

export function deleteFolder(dcOrVars, vars) {
  return executeMutation(deleteFolderRef(dcOrVars, vars));
}

export const archiveFileRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ArchiveFile', inputVars);
}
archiveFileRef.operationName = 'ArchiveFile';

export function archiveFile(dcOrVars, vars) {
  return executeMutation(archiveFileRef(dcOrVars, vars));
}

export const archiveOldFilesRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ArchiveOldFiles', inputVars);
}
archiveOldFilesRef.operationName = 'ArchiveOldFiles';

export function archiveOldFiles(dcOrVars, vars) {
  return executeMutation(archiveOldFilesRef(dcOrVars, vars));
}

export const restoreFileRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RestoreFile', inputVars);
}
restoreFileRef.operationName = 'RestoreFile';

export function restoreFile(dcOrVars, vars) {
  return executeMutation(restoreFileRef(dcOrVars, vars));
}

