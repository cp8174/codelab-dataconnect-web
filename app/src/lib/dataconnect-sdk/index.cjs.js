const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const OrderDirection = {
  ASC: "ASC",
  DESC: "DESC",
}
exports.OrderDirection = OrderDirection;

const connectorConfig = {
  connector: 'movie-connector',
  service: 'file-manager-fdc',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

const upsertUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertUser', inputVars);
}
upsertUserRef.operationName = 'UpsertUser';
exports.upsertUserRef = upsertUserRef;

exports.upsertUser = function upsertUser(dcOrVars, vars) {
  return executeMutation(upsertUserRef(dcOrVars, vars));
};

const addFavoritedMovieRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddFavoritedMovie', inputVars);
}
addFavoritedMovieRef.operationName = 'AddFavoritedMovie';
exports.addFavoritedMovieRef = addFavoritedMovieRef;

exports.addFavoritedMovie = function addFavoritedMovie(dcOrVars, vars) {
  return executeMutation(addFavoritedMovieRef(dcOrVars, vars));
};

const deleteFavoritedMovieRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteFavoritedMovie', inputVars);
}
deleteFavoritedMovieRef.operationName = 'DeleteFavoritedMovie';
exports.deleteFavoritedMovieRef = deleteFavoritedMovieRef;

exports.deleteFavoritedMovie = function deleteFavoritedMovie(dcOrVars, vars) {
  return executeMutation(deleteFavoritedMovieRef(dcOrVars, vars));
};

const addReviewRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddReview', inputVars);
}
addReviewRef.operationName = 'AddReview';
exports.addReviewRef = addReviewRef;

exports.addReview = function addReview(dcOrVars, vars) {
  return executeMutation(addReviewRef(dcOrVars, vars));
};

const deleteReviewRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteReview', inputVars);
}
deleteReviewRef.operationName = 'DeleteReview';
exports.deleteReviewRef = deleteReviewRef;

exports.deleteReview = function deleteReview(dcOrVars, vars) {
  return executeMutation(deleteReviewRef(dcOrVars, vars));
};

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

const listMoviesRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListMovies', inputVars);
}
listMoviesRef.operationName = 'ListMovies';
exports.listMoviesRef = listMoviesRef;

exports.listMovies = function listMovies(dcOrVars, vars) {
  return executeQuery(listMoviesRef(dcOrVars, vars));
};

const listMoviesByRatingRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListMoviesByRating', inputVars);
}
listMoviesByRatingRef.operationName = 'ListMoviesByRating';
exports.listMoviesByRatingRef = listMoviesByRatingRef;

exports.listMoviesByRating = function listMoviesByRating(dcOrVars, vars) {
  return executeQuery(listMoviesByRatingRef(dcOrVars, vars));
};

const getMovieByIdRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMovieById', inputVars);
}
getMovieByIdRef.operationName = 'GetMovieById';
exports.getMovieByIdRef = getMovieByIdRef;

exports.getMovieById = function getMovieById(dcOrVars, vars) {
  return executeQuery(getMovieByIdRef(dcOrVars, vars));
};

const getActorByIdRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetActorById', inputVars);
}
getActorByIdRef.operationName = 'GetActorById';
exports.getActorByIdRef = getActorByIdRef;

exports.getActorById = function getActorById(dcOrVars, vars) {
  return executeQuery(getActorByIdRef(dcOrVars, vars));
};

const getCurrentUserRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetCurrentUser');
}
getCurrentUserRef.operationName = 'GetCurrentUser';
exports.getCurrentUserRef = getCurrentUserRef;

exports.getCurrentUser = function getCurrentUser(dc) {
  return executeQuery(getCurrentUserRef(dc));
};

const getIfFavoritedMovieRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetIfFavoritedMovie', inputVars);
}
getIfFavoritedMovieRef.operationName = 'GetIfFavoritedMovie';
exports.getIfFavoritedMovieRef = getIfFavoritedMovieRef;

exports.getIfFavoritedMovie = function getIfFavoritedMovie(dcOrVars, vars) {
  return executeQuery(getIfFavoritedMovieRef(dcOrVars, vars));
};

const searchAllRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'SearchAll', inputVars);
}
searchAllRef.operationName = 'SearchAll';
exports.searchAllRef = searchAllRef;

exports.searchAll = function searchAll(dcOrVars, vars) {
  return executeQuery(searchAllRef(dcOrVars, vars));
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

const listFilesByUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListFilesByUser', inputVars);
}
listFilesByUserRef.operationName = 'ListFilesByUser';
exports.listFilesByUserRef = listFilesByUserRef;

exports.listFilesByUser = function listFilesByUser(dcOrVars, vars) {
  return executeQuery(listFilesByUserRef(dcOrVars, vars));
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

const getUserStorageStatsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetUserStorageStats', inputVars);
}
getUserStorageStatsRef.operationName = 'GetUserStorageStats';
exports.getUserStorageStatsRef = getUserStorageStatsRef;

exports.getUserStorageStats = function getUserStorageStats(dcOrVars, vars) {
  return executeQuery(getUserStorageStatsRef(dcOrVars, vars));
};
