import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;


export enum OrderDirection {
  ASC = "ASC",
  DESC = "DESC",
};



export interface Actor_Key {
  id: UUIDString;
  __typename?: 'Actor_Key';
}

export interface AddFavoritedMovieData {
  favorite_movie_upsert: FavoriteMovie_Key;
}

export interface AddFavoritedMovieVariables {
  movieId: UUIDString;
}

export interface AddReviewData {
  review_insert: Review_Key;
}

export interface AddReviewVariables {
  movieId: UUIDString;
  rating: number;
  reviewText: string;
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
  uploadedBy: string;
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
  createdBy: string;
  description?: string | null;
  color?: string | null;
}

export interface DeleteFavoritedMovieData {
  favorite_movie_delete?: FavoriteMovie_Key | null;
}

export interface DeleteFavoritedMovieVariables {
  movieId: UUIDString;
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

export interface DeleteReviewData {
  review_delete?: Review_Key | null;
}

export interface DeleteReviewVariables {
  movieId: UUIDString;
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

export interface GetActorByIdData {
  actor?: {
    id: UUIDString;
    name: string;
    imageUrl: string;
    mainActors: ({
      id: UUIDString;
      title: string;
      genre?: string | null;
      tags?: string[] | null;
      imageUrl: string;
    } & Movie_Key)[];
      supportingActors: ({
        id: UUIDString;
        title: string;
        genre?: string | null;
        tags?: string[] | null;
        imageUrl: string;
      } & Movie_Key)[];
  } & Actor_Key;
}

export interface GetActorByIdVariables {
  id: UUIDString;
}

export interface GetCurrentUserData {
  user?: {
    id: string;
    username: string;
    reviews: ({
      id: UUIDString;
      rating?: number | null;
      reviewDate: DateString;
      reviewText?: string | null;
      movie: {
        id: UUIDString;
        title: string;
      } & Movie_Key;
    })[];
      favoriteMovies: ({
        movie: {
          id: UUIDString;
          title: string;
          genre?: string | null;
          imageUrl: string;
          releaseYear?: number | null;
          rating?: number | null;
          description?: string | null;
          tags?: string[] | null;
          metadata: ({
            director?: string | null;
          })[];
        } & Movie_Key;
      })[];
  } & User_Key;
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

export interface GetIfFavoritedMovieData {
  favorite_movie?: {
    movieId: UUIDString;
  };
}

export interface GetIfFavoritedMovieVariables {
  movieId: UUIDString;
}

export interface GetMovieByIdData {
  movie?: {
    id: UUIDString;
    title: string;
    imageUrl: string;
    releaseYear?: number | null;
    genre?: string | null;
    rating?: number | null;
    description?: string | null;
    tags?: string[] | null;
    metadata: ({
      director?: string | null;
    })[];
      mainActors: ({
        id: UUIDString;
        name: string;
        imageUrl: string;
      } & Actor_Key)[];
        supportingActors: ({
          id: UUIDString;
          name: string;
          imageUrl: string;
        } & Actor_Key)[];
          reviews: ({
            id: UUIDString;
            reviewText?: string | null;
            reviewDate: DateString;
            rating?: number | null;
            user: {
              id: string;
              username: string;
            } & User_Key;
          })[];
  } & Movie_Key;
}

export interface GetMovieByIdVariables {
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

export interface GetUserStorageStatsVariables {
  userId: string;
}

export interface IncrementDownloadCountData {
  file_update?: File_Key | null;
}

export interface IncrementDownloadCountVariables {
  id: UUIDString;
  newCount: number;
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

export interface ListFilesByUserVariables {
  userId: string;
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

export interface ListMoviesByRatingData {
  movies: ({
    id: UUIDString;
    title: string;
    imageUrl: string;
    releaseYear?: number | null;
    genre?: string | null;
    rating?: number | null;
    tags?: string[] | null;
    description?: string | null;
  } & Movie_Key)[];
}

export interface ListMoviesByRatingVariables {
  orderByRating?: OrderDirection | null;
  limit?: number | null;
}

export interface ListMoviesData {
  movies: ({
    id: UUIDString;
    title: string;
    imageUrl: string;
    releaseYear?: number | null;
    genre?: string | null;
    rating?: number | null;
    tags?: string[] | null;
    description?: string | null;
  } & Movie_Key)[];
}

export interface ListMoviesVariables {
  orderByReleaseYear?: OrderDirection | null;
  limit?: number | null;
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

export interface Review_Key {
  userId: string;
  movieId: UUIDString;
  __typename?: 'Review_Key';
}

export interface SearchAllData {
  moviesMatchingTitle: ({
    id: UUIDString;
    title: string;
    genre?: string | null;
    rating?: number | null;
    imageUrl: string;
  } & Movie_Key)[];
    moviesMatchingDescription: ({
      id: UUIDString;
      title: string;
      genre?: string | null;
      rating?: number | null;
      imageUrl: string;
    } & Movie_Key)[];
      actorsMatchingName: ({
        id: UUIDString;
        name: string;
        imageUrl: string;
      } & Actor_Key)[];
        reviewsMatchingText: ({
          id: UUIDString;
          rating?: number | null;
          reviewText?: string | null;
          reviewDate: DateString;
          movie: {
            id: UUIDString;
            title: string;
          } & Movie_Key;
            user: {
              id: string;
              username: string;
            } & User_Key;
        })[];
}

export interface SearchAllVariables {
  input?: string | null;
  minYear: number;
  maxYear: number;
  minRating: number;
  maxRating: number;
  genre: string;
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

export interface UpsertUserData {
  user_upsert: User_Key;
}

export interface UpsertUserVariables {
  username: string;
}

export interface User_Key {
  id: string;
  __typename?: 'User_Key';
}

interface UpsertUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertUserVariables): MutationRef<UpsertUserData, UpsertUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpsertUserVariables): MutationRef<UpsertUserData, UpsertUserVariables>;
  operationName: string;
}
export const upsertUserRef: UpsertUserRef;

export function upsertUser(vars: UpsertUserVariables): MutationPromise<UpsertUserData, UpsertUserVariables>;
export function upsertUser(dc: DataConnect, vars: UpsertUserVariables): MutationPromise<UpsertUserData, UpsertUserVariables>;

interface AddFavoritedMovieRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddFavoritedMovieVariables): MutationRef<AddFavoritedMovieData, AddFavoritedMovieVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AddFavoritedMovieVariables): MutationRef<AddFavoritedMovieData, AddFavoritedMovieVariables>;
  operationName: string;
}
export const addFavoritedMovieRef: AddFavoritedMovieRef;

export function addFavoritedMovie(vars: AddFavoritedMovieVariables): MutationPromise<AddFavoritedMovieData, AddFavoritedMovieVariables>;
export function addFavoritedMovie(dc: DataConnect, vars: AddFavoritedMovieVariables): MutationPromise<AddFavoritedMovieData, AddFavoritedMovieVariables>;

interface DeleteFavoritedMovieRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteFavoritedMovieVariables): MutationRef<DeleteFavoritedMovieData, DeleteFavoritedMovieVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteFavoritedMovieVariables): MutationRef<DeleteFavoritedMovieData, DeleteFavoritedMovieVariables>;
  operationName: string;
}
export const deleteFavoritedMovieRef: DeleteFavoritedMovieRef;

export function deleteFavoritedMovie(vars: DeleteFavoritedMovieVariables): MutationPromise<DeleteFavoritedMovieData, DeleteFavoritedMovieVariables>;
export function deleteFavoritedMovie(dc: DataConnect, vars: DeleteFavoritedMovieVariables): MutationPromise<DeleteFavoritedMovieData, DeleteFavoritedMovieVariables>;

interface AddReviewRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddReviewVariables): MutationRef<AddReviewData, AddReviewVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AddReviewVariables): MutationRef<AddReviewData, AddReviewVariables>;
  operationName: string;
}
export const addReviewRef: AddReviewRef;

export function addReview(vars: AddReviewVariables): MutationPromise<AddReviewData, AddReviewVariables>;
export function addReview(dc: DataConnect, vars: AddReviewVariables): MutationPromise<AddReviewData, AddReviewVariables>;

interface DeleteReviewRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteReviewVariables): MutationRef<DeleteReviewData, DeleteReviewVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteReviewVariables): MutationRef<DeleteReviewData, DeleteReviewVariables>;
  operationName: string;
}
export const deleteReviewRef: DeleteReviewRef;

export function deleteReview(vars: DeleteReviewVariables): MutationPromise<DeleteReviewData, DeleteReviewVariables>;
export function deleteReview(dc: DataConnect, vars: DeleteReviewVariables): MutationPromise<DeleteReviewData, DeleteReviewVariables>;

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

interface ListMoviesRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars?: ListMoviesVariables): QueryRef<ListMoviesData, ListMoviesVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars?: ListMoviesVariables): QueryRef<ListMoviesData, ListMoviesVariables>;
  operationName: string;
}
export const listMoviesRef: ListMoviesRef;

export function listMovies(vars?: ListMoviesVariables): QueryPromise<ListMoviesData, ListMoviesVariables>;
export function listMovies(dc: DataConnect, vars?: ListMoviesVariables): QueryPromise<ListMoviesData, ListMoviesVariables>;

interface ListMoviesByRatingRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars?: ListMoviesByRatingVariables): QueryRef<ListMoviesByRatingData, ListMoviesByRatingVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars?: ListMoviesByRatingVariables): QueryRef<ListMoviesByRatingData, ListMoviesByRatingVariables>;
  operationName: string;
}
export const listMoviesByRatingRef: ListMoviesByRatingRef;

export function listMoviesByRating(vars?: ListMoviesByRatingVariables): QueryPromise<ListMoviesByRatingData, ListMoviesByRatingVariables>;
export function listMoviesByRating(dc: DataConnect, vars?: ListMoviesByRatingVariables): QueryPromise<ListMoviesByRatingData, ListMoviesByRatingVariables>;

interface GetMovieByIdRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetMovieByIdVariables): QueryRef<GetMovieByIdData, GetMovieByIdVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetMovieByIdVariables): QueryRef<GetMovieByIdData, GetMovieByIdVariables>;
  operationName: string;
}
export const getMovieByIdRef: GetMovieByIdRef;

export function getMovieById(vars: GetMovieByIdVariables): QueryPromise<GetMovieByIdData, GetMovieByIdVariables>;
export function getMovieById(dc: DataConnect, vars: GetMovieByIdVariables): QueryPromise<GetMovieByIdData, GetMovieByIdVariables>;

interface GetActorByIdRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetActorByIdVariables): QueryRef<GetActorByIdData, GetActorByIdVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetActorByIdVariables): QueryRef<GetActorByIdData, GetActorByIdVariables>;
  operationName: string;
}
export const getActorByIdRef: GetActorByIdRef;

export function getActorById(vars: GetActorByIdVariables): QueryPromise<GetActorByIdData, GetActorByIdVariables>;
export function getActorById(dc: DataConnect, vars: GetActorByIdVariables): QueryPromise<GetActorByIdData, GetActorByIdVariables>;

interface GetCurrentUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetCurrentUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetCurrentUserData, undefined>;
  operationName: string;
}
export const getCurrentUserRef: GetCurrentUserRef;

export function getCurrentUser(): QueryPromise<GetCurrentUserData, undefined>;
export function getCurrentUser(dc: DataConnect): QueryPromise<GetCurrentUserData, undefined>;

interface GetIfFavoritedMovieRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetIfFavoritedMovieVariables): QueryRef<GetIfFavoritedMovieData, GetIfFavoritedMovieVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetIfFavoritedMovieVariables): QueryRef<GetIfFavoritedMovieData, GetIfFavoritedMovieVariables>;
  operationName: string;
}
export const getIfFavoritedMovieRef: GetIfFavoritedMovieRef;

export function getIfFavoritedMovie(vars: GetIfFavoritedMovieVariables): QueryPromise<GetIfFavoritedMovieData, GetIfFavoritedMovieVariables>;
export function getIfFavoritedMovie(dc: DataConnect, vars: GetIfFavoritedMovieVariables): QueryPromise<GetIfFavoritedMovieData, GetIfFavoritedMovieVariables>;

interface SearchAllRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: SearchAllVariables): QueryRef<SearchAllData, SearchAllVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: SearchAllVariables): QueryRef<SearchAllData, SearchAllVariables>;
  operationName: string;
}
export const searchAllRef: SearchAllRef;

export function searchAll(vars: SearchAllVariables): QueryPromise<SearchAllData, SearchAllVariables>;
export function searchAll(dc: DataConnect, vars: SearchAllVariables): QueryPromise<SearchAllData, SearchAllVariables>;

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
  (vars: ListFilesByUserVariables): QueryRef<ListFilesByUserData, ListFilesByUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListFilesByUserVariables): QueryRef<ListFilesByUserData, ListFilesByUserVariables>;
  operationName: string;
}
export const listFilesByUserRef: ListFilesByUserRef;

export function listFilesByUser(vars: ListFilesByUserVariables): QueryPromise<ListFilesByUserData, ListFilesByUserVariables>;
export function listFilesByUser(dc: DataConnect, vars: ListFilesByUserVariables): QueryPromise<ListFilesByUserData, ListFilesByUserVariables>;

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
  (vars: GetUserStorageStatsVariables): QueryRef<GetUserStorageStatsData, GetUserStorageStatsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetUserStorageStatsVariables): QueryRef<GetUserStorageStatsData, GetUserStorageStatsVariables>;
  operationName: string;
}
export const getUserStorageStatsRef: GetUserStorageStatsRef;

export function getUserStorageStats(vars: GetUserStorageStatsVariables): QueryPromise<GetUserStorageStatsData, GetUserStorageStatsVariables>;
export function getUserStorageStats(dc: DataConnect, vars: GetUserStorageStatsVariables): QueryPromise<GetUserStorageStatsData, GetUserStorageStatsVariables>;

