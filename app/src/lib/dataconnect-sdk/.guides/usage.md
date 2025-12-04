# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.





## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { upsertUser, addFavoritedMovie, deleteFavoritedMovie, addReview, deleteReview, createFile, updateFile, deleteFile, incrementDownloadCount, createFolder } from '@movie/dataconnect';


// Operation UpsertUser:  For variables, look at type UpsertUserVars in ../index.d.ts
const { data } = await UpsertUser(dataConnect, upsertUserVars);

// Operation AddFavoritedMovie:  For variables, look at type AddFavoritedMovieVars in ../index.d.ts
const { data } = await AddFavoritedMovie(dataConnect, addFavoritedMovieVars);

// Operation DeleteFavoritedMovie:  For variables, look at type DeleteFavoritedMovieVars in ../index.d.ts
const { data } = await DeleteFavoritedMovie(dataConnect, deleteFavoritedMovieVars);

// Operation AddReview:  For variables, look at type AddReviewVars in ../index.d.ts
const { data } = await AddReview(dataConnect, addReviewVars);

// Operation DeleteReview:  For variables, look at type DeleteReviewVars in ../index.d.ts
const { data } = await DeleteReview(dataConnect, deleteReviewVars);

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


```