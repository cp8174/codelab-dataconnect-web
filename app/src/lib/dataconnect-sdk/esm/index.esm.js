import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const OrderDirection = {
  ASC: "ASC",
  DESC: "DESC",
}

export const connectorConfig = {
  connector: 'movie-connector',
  service: 'file-manager-fdc',
  location: 'us-central1'
};

export const upsertUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertUser', inputVars);
}
upsertUserRef.operationName = 'UpsertUser';

export function upsertUser(dcOrVars, vars) {
  return executeMutation(upsertUserRef(dcOrVars, vars));
}

export const addFavoritedMovieRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddFavoritedMovie', inputVars);
}
addFavoritedMovieRef.operationName = 'AddFavoritedMovie';

export function addFavoritedMovie(dcOrVars, vars) {
  return executeMutation(addFavoritedMovieRef(dcOrVars, vars));
}

export const deleteFavoritedMovieRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteFavoritedMovie', inputVars);
}
deleteFavoritedMovieRef.operationName = 'DeleteFavoritedMovie';

export function deleteFavoritedMovie(dcOrVars, vars) {
  return executeMutation(deleteFavoritedMovieRef(dcOrVars, vars));
}

export const addReviewRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddReview', inputVars);
}
addReviewRef.operationName = 'AddReview';

export function addReview(dcOrVars, vars) {
  return executeMutation(addReviewRef(dcOrVars, vars));
}

export const deleteReviewRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteReview', inputVars);
}
deleteReviewRef.operationName = 'DeleteReview';

export function deleteReview(dcOrVars, vars) {
  return executeMutation(deleteReviewRef(dcOrVars, vars));
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

export const listMoviesRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListMovies', inputVars);
}
listMoviesRef.operationName = 'ListMovies';

export function listMovies(dcOrVars, vars) {
  return executeQuery(listMoviesRef(dcOrVars, vars));
}

export const listMoviesByRatingRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListMoviesByRating', inputVars);
}
listMoviesByRatingRef.operationName = 'ListMoviesByRating';

export function listMoviesByRating(dcOrVars, vars) {
  return executeQuery(listMoviesByRatingRef(dcOrVars, vars));
}

export const getMovieByIdRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMovieById', inputVars);
}
getMovieByIdRef.operationName = 'GetMovieById';

export function getMovieById(dcOrVars, vars) {
  return executeQuery(getMovieByIdRef(dcOrVars, vars));
}

export const getActorByIdRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetActorById', inputVars);
}
getActorByIdRef.operationName = 'GetActorById';

export function getActorById(dcOrVars, vars) {
  return executeQuery(getActorByIdRef(dcOrVars, vars));
}

export const getCurrentUserRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetCurrentUser');
}
getCurrentUserRef.operationName = 'GetCurrentUser';

export function getCurrentUser(dc) {
  return executeQuery(getCurrentUserRef(dc));
}

export const getIfFavoritedMovieRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetIfFavoritedMovie', inputVars);
}
getIfFavoritedMovieRef.operationName = 'GetIfFavoritedMovie';

export function getIfFavoritedMovie(dcOrVars, vars) {
  return executeQuery(getIfFavoritedMovieRef(dcOrVars, vars));
}

export const searchAllRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'SearchAll', inputVars);
}
searchAllRef.operationName = 'SearchAll';

export function searchAll(dcOrVars, vars) {
  return executeQuery(searchAllRef(dcOrVars, vars));
}

export const listFilesRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListFiles', inputVars);
}
listFilesRef.operationName = 'ListFiles';

export function listFiles(dcOrVars, vars) {
  return executeQuery(listFilesRef(dcOrVars, vars));
}

export const listFilesByUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListFilesByUser', inputVars);
}
listFilesByUserRef.operationName = 'ListFilesByUser';

export function listFilesByUser(dcOrVars, vars) {
  return executeQuery(listFilesByUserRef(dcOrVars, vars));
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

export const getUserStorageStatsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetUserStorageStats', inputVars);
}
getUserStorageStatsRef.operationName = 'GetUserStorageStats';

export function getUserStorageStats(dcOrVars, vars) {
  return executeQuery(getUserStorageStatsRef(dcOrVars, vars));
}

