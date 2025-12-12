const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'file-connector',
  service: 'file-manager-fdc',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

const createFileRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateFile', inputVars);
}
createFileRef.operationName = 'CreateFile';
exports.createFileRef = createFileRef;

exports.createFile = function createFile(dcOrVars, vars) {
  return executeMutation(createFileRef(dcOrVars, vars));
};

const updateFileRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateFile', inputVars);
}
updateFileRef.operationName = 'UpdateFile';
exports.updateFileRef = updateFileRef;

exports.updateFile = function updateFile(dcOrVars, vars) {
  return executeMutation(updateFileRef(dcOrVars, vars));
};

const deleteFileRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteFile', inputVars);
}
deleteFileRef.operationName = 'DeleteFile';
exports.deleteFileRef = deleteFileRef;

exports.deleteFile = function deleteFile(dcOrVars, vars) {
  return executeMutation(deleteFileRef(dcOrVars, vars));
};

const incrementDownloadCountRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'IncrementDownloadCount', inputVars);
}
incrementDownloadCountRef.operationName = 'IncrementDownloadCount';
exports.incrementDownloadCountRef = incrementDownloadCountRef;

exports.incrementDownloadCount = function incrementDownloadCount(dcOrVars, vars) {
  return executeMutation(incrementDownloadCountRef(dcOrVars, vars));
};

const createFolderRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateFolder', inputVars);
}
createFolderRef.operationName = 'CreateFolder';
exports.createFolderRef = createFolderRef;

exports.createFolder = function createFolder(dcOrVars, vars) {
  return executeMutation(createFolderRef(dcOrVars, vars));
};

const updateFolderRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateFolder', inputVars);
}
updateFolderRef.operationName = 'UpdateFolder';
exports.updateFolderRef = updateFolderRef;

exports.updateFolder = function updateFolder(dcOrVars, vars) {
  return executeMutation(updateFolderRef(dcOrVars, vars));
};

const deleteFolderRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteFolder', inputVars);
}
deleteFolderRef.operationName = 'DeleteFolder';
exports.deleteFolderRef = deleteFolderRef;

exports.deleteFolder = function deleteFolder(dcOrVars, vars) {
  return executeMutation(deleteFolderRef(dcOrVars, vars));
};

const archiveFileRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ArchiveFile', inputVars);
}
archiveFileRef.operationName = 'ArchiveFile';
exports.archiveFileRef = archiveFileRef;

exports.archiveFile = function archiveFile(dcOrVars, vars) {
  return executeMutation(archiveFileRef(dcOrVars, vars));
};

const archiveOldFilesRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ArchiveOldFiles', inputVars);
}
archiveOldFilesRef.operationName = 'ArchiveOldFiles';
exports.archiveOldFilesRef = archiveOldFilesRef;

exports.archiveOldFiles = function archiveOldFiles(dcOrVars, vars) {
  return executeMutation(archiveOldFilesRef(dcOrVars, vars));
};

const restoreFileRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RestoreFile', inputVars);
}
restoreFileRef.operationName = 'RestoreFile';
exports.restoreFileRef = restoreFileRef;

exports.restoreFile = function restoreFile(dcOrVars, vars) {
  return executeMutation(restoreFileRef(dcOrVars, vars));
};

const listFilesRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListFiles', inputVars);
}
listFilesRef.operationName = 'ListFiles';
exports.listFilesRef = listFilesRef;

exports.listFiles = function listFiles(dcOrVars, vars) {
  return executeQuery(listFilesRef(dcOrVars, vars));
};

const listFilesByUserRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListFilesByUser');
}
listFilesByUserRef.operationName = 'ListFilesByUser';
exports.listFilesByUserRef = listFilesByUserRef;

exports.listFilesByUser = function listFilesByUser(dc) {
  return executeQuery(listFilesByUserRef(dc));
};

const getFileRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetFile', inputVars);
}
getFileRef.operationName = 'GetFile';
exports.getFileRef = getFileRef;

exports.getFile = function getFile(dcOrVars, vars) {
  return executeQuery(getFileRef(dcOrVars, vars));
};

const listFoldersRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListFolders', inputVars);
}
listFoldersRef.operationName = 'ListFolders';
exports.listFoldersRef = listFoldersRef;

exports.listFolders = function listFolders(dcOrVars, vars) {
  return executeQuery(listFoldersRef(dcOrVars, vars));
};

const getFolderRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetFolder', inputVars);
}
getFolderRef.operationName = 'GetFolder';
exports.getFolderRef = getFolderRef;

exports.getFolder = function getFolder(dcOrVars, vars) {
  return executeQuery(getFolderRef(dcOrVars, vars));
};

const searchFilesRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'SearchFiles', inputVars);
}
searchFilesRef.operationName = 'SearchFiles';
exports.searchFilesRef = searchFilesRef;

exports.searchFiles = function searchFiles(dcOrVars, vars) {
  return executeQuery(searchFilesRef(dcOrVars, vars));
};

const getRecentFilesRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetRecentFiles', inputVars);
}
getRecentFilesRef.operationName = 'GetRecentFiles';
exports.getRecentFilesRef = getRecentFilesRef;

exports.getRecentFiles = function getRecentFiles(dcOrVars, vars) {
  return executeQuery(getRecentFilesRef(dcOrVars, vars));
};

const getUserStorageStatsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetUserStorageStats');
}
getUserStorageStatsRef.operationName = 'GetUserStorageStats';
exports.getUserStorageStatsRef = getUserStorageStatsRef;

exports.getUserStorageStats = function getUserStorageStats(dc) {
  return executeQuery(getUserStorageStatsRef(dc));
};

const listArchivedFilesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListArchivedFiles');
}
listArchivedFilesRef.operationName = 'ListArchivedFiles';
exports.listArchivedFilesRef = listArchivedFilesRef;

exports.listArchivedFiles = function listArchivedFiles(dc) {
  return executeQuery(listArchivedFilesRef(dc));
};

const getArchivedFilesCountRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetArchivedFilesCount');
}
getArchivedFilesCountRef.operationName = 'GetArchivedFilesCount';
exports.getArchivedFilesCountRef = getArchivedFilesCountRef;

exports.getArchivedFilesCount = function getArchivedFilesCount(dc) {
  return executeQuery(getArchivedFilesCountRef(dc));
};
