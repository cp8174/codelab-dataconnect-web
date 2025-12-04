# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `movie-connector`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*ListMovies*](#listmovies)
  - [*ListMoviesByRating*](#listmoviesbyrating)
  - [*GetMovieById*](#getmoviebyid)
  - [*GetActorById*](#getactorbyid)
  - [*GetCurrentUser*](#getcurrentuser)
  - [*GetIfFavoritedMovie*](#getiffavoritedmovie)
  - [*SearchAll*](#searchall)
  - [*ListFiles*](#listfiles)
  - [*ListFilesByUser*](#listfilesbyuser)
  - [*GetFile*](#getfile)
  - [*ListFolders*](#listfolders)
  - [*GetFolder*](#getfolder)
  - [*SearchFiles*](#searchfiles)
  - [*GetRecentFiles*](#getrecentfiles)
  - [*GetUserStorageStats*](#getuserstoragestats)
- [**Mutations**](#mutations)
  - [*UpsertUser*](#upsertuser)
  - [*AddFavoritedMovie*](#addfavoritedmovie)
  - [*DeleteFavoritedMovie*](#deletefavoritedmovie)
  - [*AddReview*](#addreview)
  - [*DeleteReview*](#deletereview)
  - [*CreateFile*](#createfile)
  - [*UpdateFile*](#updatefile)
  - [*DeleteFile*](#deletefile)
  - [*IncrementDownloadCount*](#incrementdownloadcount)
  - [*CreateFolder*](#createfolder)
  - [*UpdateFolder*](#updatefolder)
  - [*DeleteFolder*](#deletefolder)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `movie-connector`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@movie/dataconnect` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@movie/dataconnect';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@movie/dataconnect';

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

Below are examples of how to use the `movie-connector` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## ListMovies
You can execute the `ListMovies` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-sdk/index.d.ts](./index.d.ts):
```typescript
listMovies(vars?: ListMoviesVariables): QueryPromise<ListMoviesData, ListMoviesVariables>;

interface ListMoviesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars?: ListMoviesVariables): QueryRef<ListMoviesData, ListMoviesVariables>;
}
export const listMoviesRef: ListMoviesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listMovies(dc: DataConnect, vars?: ListMoviesVariables): QueryPromise<ListMoviesData, ListMoviesVariables>;

interface ListMoviesRef {
  ...
  (dc: DataConnect, vars?: ListMoviesVariables): QueryRef<ListMoviesData, ListMoviesVariables>;
}
export const listMoviesRef: ListMoviesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listMoviesRef:
```typescript
const name = listMoviesRef.operationName;
console.log(name);
```

### Variables
The `ListMovies` query has an optional argument of type `ListMoviesVariables`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListMoviesVariables {
  orderByReleaseYear?: OrderDirection | null;
  limit?: number | null;
}
```
### Return Type
Recall that executing the `ListMovies` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListMoviesData`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListMovies`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listMovies, ListMoviesVariables } from '@movie/dataconnect';

// The `ListMovies` query has an optional argument of type `ListMoviesVariables`:
const listMoviesVars: ListMoviesVariables = {
  orderByReleaseYear: ..., // optional
  limit: ..., // optional
};

// Call the `listMovies()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listMovies(listMoviesVars);
// Variables can be defined inline as well.
const { data } = await listMovies({ orderByReleaseYear: ..., limit: ..., });
// Since all variables are optional for this query, you can omit the `ListMoviesVariables` argument.
const { data } = await listMovies();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listMovies(dataConnect, listMoviesVars);

console.log(data.movies);

// Or, you can use the `Promise` API.
listMovies(listMoviesVars).then((response) => {
  const data = response.data;
  console.log(data.movies);
});
```

### Using `ListMovies`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listMoviesRef, ListMoviesVariables } from '@movie/dataconnect';

// The `ListMovies` query has an optional argument of type `ListMoviesVariables`:
const listMoviesVars: ListMoviesVariables = {
  orderByReleaseYear: ..., // optional
  limit: ..., // optional
};

// Call the `listMoviesRef()` function to get a reference to the query.
const ref = listMoviesRef(listMoviesVars);
// Variables can be defined inline as well.
const ref = listMoviesRef({ orderByReleaseYear: ..., limit: ..., });
// Since all variables are optional for this query, you can omit the `ListMoviesVariables` argument.
const ref = listMoviesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listMoviesRef(dataConnect, listMoviesVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.movies);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.movies);
});
```

## ListMoviesByRating
You can execute the `ListMoviesByRating` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-sdk/index.d.ts](./index.d.ts):
```typescript
listMoviesByRating(vars?: ListMoviesByRatingVariables): QueryPromise<ListMoviesByRatingData, ListMoviesByRatingVariables>;

interface ListMoviesByRatingRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars?: ListMoviesByRatingVariables): QueryRef<ListMoviesByRatingData, ListMoviesByRatingVariables>;
}
export const listMoviesByRatingRef: ListMoviesByRatingRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listMoviesByRating(dc: DataConnect, vars?: ListMoviesByRatingVariables): QueryPromise<ListMoviesByRatingData, ListMoviesByRatingVariables>;

interface ListMoviesByRatingRef {
  ...
  (dc: DataConnect, vars?: ListMoviesByRatingVariables): QueryRef<ListMoviesByRatingData, ListMoviesByRatingVariables>;
}
export const listMoviesByRatingRef: ListMoviesByRatingRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listMoviesByRatingRef:
```typescript
const name = listMoviesByRatingRef.operationName;
console.log(name);
```

### Variables
The `ListMoviesByRating` query has an optional argument of type `ListMoviesByRatingVariables`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListMoviesByRatingVariables {
  orderByRating?: OrderDirection | null;
  limit?: number | null;
}
```
### Return Type
Recall that executing the `ListMoviesByRating` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListMoviesByRatingData`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListMoviesByRating`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listMoviesByRating, ListMoviesByRatingVariables } from '@movie/dataconnect';

// The `ListMoviesByRating` query has an optional argument of type `ListMoviesByRatingVariables`:
const listMoviesByRatingVars: ListMoviesByRatingVariables = {
  orderByRating: ..., // optional
  limit: ..., // optional
};

// Call the `listMoviesByRating()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listMoviesByRating(listMoviesByRatingVars);
// Variables can be defined inline as well.
const { data } = await listMoviesByRating({ orderByRating: ..., limit: ..., });
// Since all variables are optional for this query, you can omit the `ListMoviesByRatingVariables` argument.
const { data } = await listMoviesByRating();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listMoviesByRating(dataConnect, listMoviesByRatingVars);

console.log(data.movies);

// Or, you can use the `Promise` API.
listMoviesByRating(listMoviesByRatingVars).then((response) => {
  const data = response.data;
  console.log(data.movies);
});
```

### Using `ListMoviesByRating`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listMoviesByRatingRef, ListMoviesByRatingVariables } from '@movie/dataconnect';

// The `ListMoviesByRating` query has an optional argument of type `ListMoviesByRatingVariables`:
const listMoviesByRatingVars: ListMoviesByRatingVariables = {
  orderByRating: ..., // optional
  limit: ..., // optional
};

// Call the `listMoviesByRatingRef()` function to get a reference to the query.
const ref = listMoviesByRatingRef(listMoviesByRatingVars);
// Variables can be defined inline as well.
const ref = listMoviesByRatingRef({ orderByRating: ..., limit: ..., });
// Since all variables are optional for this query, you can omit the `ListMoviesByRatingVariables` argument.
const ref = listMoviesByRatingRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listMoviesByRatingRef(dataConnect, listMoviesByRatingVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.movies);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.movies);
});
```

## GetMovieById
You can execute the `GetMovieById` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-sdk/index.d.ts](./index.d.ts):
```typescript
getMovieById(vars: GetMovieByIdVariables): QueryPromise<GetMovieByIdData, GetMovieByIdVariables>;

interface GetMovieByIdRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetMovieByIdVariables): QueryRef<GetMovieByIdData, GetMovieByIdVariables>;
}
export const getMovieByIdRef: GetMovieByIdRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getMovieById(dc: DataConnect, vars: GetMovieByIdVariables): QueryPromise<GetMovieByIdData, GetMovieByIdVariables>;

interface GetMovieByIdRef {
  ...
  (dc: DataConnect, vars: GetMovieByIdVariables): QueryRef<GetMovieByIdData, GetMovieByIdVariables>;
}
export const getMovieByIdRef: GetMovieByIdRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getMovieByIdRef:
```typescript
const name = getMovieByIdRef.operationName;
console.log(name);
```

### Variables
The `GetMovieById` query requires an argument of type `GetMovieByIdVariables`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetMovieByIdVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetMovieById` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetMovieByIdData`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetMovieById`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getMovieById, GetMovieByIdVariables } from '@movie/dataconnect';

// The `GetMovieById` query requires an argument of type `GetMovieByIdVariables`:
const getMovieByIdVars: GetMovieByIdVariables = {
  id: ..., 
};

// Call the `getMovieById()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getMovieById(getMovieByIdVars);
// Variables can be defined inline as well.
const { data } = await getMovieById({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getMovieById(dataConnect, getMovieByIdVars);

console.log(data.movie);

// Or, you can use the `Promise` API.
getMovieById(getMovieByIdVars).then((response) => {
  const data = response.data;
  console.log(data.movie);
});
```

### Using `GetMovieById`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getMovieByIdRef, GetMovieByIdVariables } from '@movie/dataconnect';

// The `GetMovieById` query requires an argument of type `GetMovieByIdVariables`:
const getMovieByIdVars: GetMovieByIdVariables = {
  id: ..., 
};

// Call the `getMovieByIdRef()` function to get a reference to the query.
const ref = getMovieByIdRef(getMovieByIdVars);
// Variables can be defined inline as well.
const ref = getMovieByIdRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getMovieByIdRef(dataConnect, getMovieByIdVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.movie);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.movie);
});
```

## GetActorById
You can execute the `GetActorById` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-sdk/index.d.ts](./index.d.ts):
```typescript
getActorById(vars: GetActorByIdVariables): QueryPromise<GetActorByIdData, GetActorByIdVariables>;

interface GetActorByIdRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetActorByIdVariables): QueryRef<GetActorByIdData, GetActorByIdVariables>;
}
export const getActorByIdRef: GetActorByIdRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getActorById(dc: DataConnect, vars: GetActorByIdVariables): QueryPromise<GetActorByIdData, GetActorByIdVariables>;

interface GetActorByIdRef {
  ...
  (dc: DataConnect, vars: GetActorByIdVariables): QueryRef<GetActorByIdData, GetActorByIdVariables>;
}
export const getActorByIdRef: GetActorByIdRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getActorByIdRef:
```typescript
const name = getActorByIdRef.operationName;
console.log(name);
```

### Variables
The `GetActorById` query requires an argument of type `GetActorByIdVariables`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetActorByIdVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetActorById` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetActorByIdData`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetActorById`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getActorById, GetActorByIdVariables } from '@movie/dataconnect';

// The `GetActorById` query requires an argument of type `GetActorByIdVariables`:
const getActorByIdVars: GetActorByIdVariables = {
  id: ..., 
};

// Call the `getActorById()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getActorById(getActorByIdVars);
// Variables can be defined inline as well.
const { data } = await getActorById({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getActorById(dataConnect, getActorByIdVars);

console.log(data.actor);

// Or, you can use the `Promise` API.
getActorById(getActorByIdVars).then((response) => {
  const data = response.data;
  console.log(data.actor);
});
```

### Using `GetActorById`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getActorByIdRef, GetActorByIdVariables } from '@movie/dataconnect';

// The `GetActorById` query requires an argument of type `GetActorByIdVariables`:
const getActorByIdVars: GetActorByIdVariables = {
  id: ..., 
};

// Call the `getActorByIdRef()` function to get a reference to the query.
const ref = getActorByIdRef(getActorByIdVars);
// Variables can be defined inline as well.
const ref = getActorByIdRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getActorByIdRef(dataConnect, getActorByIdVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.actor);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.actor);
});
```

## GetCurrentUser
You can execute the `GetCurrentUser` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-sdk/index.d.ts](./index.d.ts):
```typescript
getCurrentUser(): QueryPromise<GetCurrentUserData, undefined>;

interface GetCurrentUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetCurrentUserData, undefined>;
}
export const getCurrentUserRef: GetCurrentUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getCurrentUser(dc: DataConnect): QueryPromise<GetCurrentUserData, undefined>;

interface GetCurrentUserRef {
  ...
  (dc: DataConnect): QueryRef<GetCurrentUserData, undefined>;
}
export const getCurrentUserRef: GetCurrentUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getCurrentUserRef:
```typescript
const name = getCurrentUserRef.operationName;
console.log(name);
```

### Variables
The `GetCurrentUser` query has no variables.
### Return Type
Recall that executing the `GetCurrentUser` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetCurrentUserData`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetCurrentUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getCurrentUser } from '@movie/dataconnect';


// Call the `getCurrentUser()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getCurrentUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getCurrentUser(dataConnect);

console.log(data.user);

// Or, you can use the `Promise` API.
getCurrentUser().then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

### Using `GetCurrentUser`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getCurrentUserRef } from '@movie/dataconnect';


// Call the `getCurrentUserRef()` function to get a reference to the query.
const ref = getCurrentUserRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getCurrentUserRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.user);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

## GetIfFavoritedMovie
You can execute the `GetIfFavoritedMovie` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-sdk/index.d.ts](./index.d.ts):
```typescript
getIfFavoritedMovie(vars: GetIfFavoritedMovieVariables): QueryPromise<GetIfFavoritedMovieData, GetIfFavoritedMovieVariables>;

interface GetIfFavoritedMovieRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetIfFavoritedMovieVariables): QueryRef<GetIfFavoritedMovieData, GetIfFavoritedMovieVariables>;
}
export const getIfFavoritedMovieRef: GetIfFavoritedMovieRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getIfFavoritedMovie(dc: DataConnect, vars: GetIfFavoritedMovieVariables): QueryPromise<GetIfFavoritedMovieData, GetIfFavoritedMovieVariables>;

interface GetIfFavoritedMovieRef {
  ...
  (dc: DataConnect, vars: GetIfFavoritedMovieVariables): QueryRef<GetIfFavoritedMovieData, GetIfFavoritedMovieVariables>;
}
export const getIfFavoritedMovieRef: GetIfFavoritedMovieRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getIfFavoritedMovieRef:
```typescript
const name = getIfFavoritedMovieRef.operationName;
console.log(name);
```

### Variables
The `GetIfFavoritedMovie` query requires an argument of type `GetIfFavoritedMovieVariables`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetIfFavoritedMovieVariables {
  movieId: UUIDString;
}
```
### Return Type
Recall that executing the `GetIfFavoritedMovie` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetIfFavoritedMovieData`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetIfFavoritedMovieData {
  favorite_movie?: {
    movieId: UUIDString;
  };
}
```
### Using `GetIfFavoritedMovie`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getIfFavoritedMovie, GetIfFavoritedMovieVariables } from '@movie/dataconnect';

// The `GetIfFavoritedMovie` query requires an argument of type `GetIfFavoritedMovieVariables`:
const getIfFavoritedMovieVars: GetIfFavoritedMovieVariables = {
  movieId: ..., 
};

// Call the `getIfFavoritedMovie()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getIfFavoritedMovie(getIfFavoritedMovieVars);
// Variables can be defined inline as well.
const { data } = await getIfFavoritedMovie({ movieId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getIfFavoritedMovie(dataConnect, getIfFavoritedMovieVars);

console.log(data.favorite_movie);

// Or, you can use the `Promise` API.
getIfFavoritedMovie(getIfFavoritedMovieVars).then((response) => {
  const data = response.data;
  console.log(data.favorite_movie);
});
```

### Using `GetIfFavoritedMovie`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getIfFavoritedMovieRef, GetIfFavoritedMovieVariables } from '@movie/dataconnect';

// The `GetIfFavoritedMovie` query requires an argument of type `GetIfFavoritedMovieVariables`:
const getIfFavoritedMovieVars: GetIfFavoritedMovieVariables = {
  movieId: ..., 
};

// Call the `getIfFavoritedMovieRef()` function to get a reference to the query.
const ref = getIfFavoritedMovieRef(getIfFavoritedMovieVars);
// Variables can be defined inline as well.
const ref = getIfFavoritedMovieRef({ movieId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getIfFavoritedMovieRef(dataConnect, getIfFavoritedMovieVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.favorite_movie);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.favorite_movie);
});
```

## SearchAll
You can execute the `SearchAll` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-sdk/index.d.ts](./index.d.ts):
```typescript
searchAll(vars: SearchAllVariables): QueryPromise<SearchAllData, SearchAllVariables>;

interface SearchAllRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: SearchAllVariables): QueryRef<SearchAllData, SearchAllVariables>;
}
export const searchAllRef: SearchAllRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
searchAll(dc: DataConnect, vars: SearchAllVariables): QueryPromise<SearchAllData, SearchAllVariables>;

interface SearchAllRef {
  ...
  (dc: DataConnect, vars: SearchAllVariables): QueryRef<SearchAllData, SearchAllVariables>;
}
export const searchAllRef: SearchAllRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the searchAllRef:
```typescript
const name = searchAllRef.operationName;
console.log(name);
```

### Variables
The `SearchAll` query requires an argument of type `SearchAllVariables`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface SearchAllVariables {
  input?: string | null;
  minYear: number;
  maxYear: number;
  minRating: number;
  maxRating: number;
  genre: string;
}
```
### Return Type
Recall that executing the `SearchAll` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `SearchAllData`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `SearchAll`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, searchAll, SearchAllVariables } from '@movie/dataconnect';

// The `SearchAll` query requires an argument of type `SearchAllVariables`:
const searchAllVars: SearchAllVariables = {
  input: ..., // optional
  minYear: ..., 
  maxYear: ..., 
  minRating: ..., 
  maxRating: ..., 
  genre: ..., 
};

// Call the `searchAll()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await searchAll(searchAllVars);
// Variables can be defined inline as well.
const { data } = await searchAll({ input: ..., minYear: ..., maxYear: ..., minRating: ..., maxRating: ..., genre: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await searchAll(dataConnect, searchAllVars);

console.log(data.moviesMatchingTitle);
console.log(data.moviesMatchingDescription);
console.log(data.actorsMatchingName);
console.log(data.reviewsMatchingText);

// Or, you can use the `Promise` API.
searchAll(searchAllVars).then((response) => {
  const data = response.data;
  console.log(data.moviesMatchingTitle);
  console.log(data.moviesMatchingDescription);
  console.log(data.actorsMatchingName);
  console.log(data.reviewsMatchingText);
});
```

### Using `SearchAll`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, searchAllRef, SearchAllVariables } from '@movie/dataconnect';

// The `SearchAll` query requires an argument of type `SearchAllVariables`:
const searchAllVars: SearchAllVariables = {
  input: ..., // optional
  minYear: ..., 
  maxYear: ..., 
  minRating: ..., 
  maxRating: ..., 
  genre: ..., 
};

// Call the `searchAllRef()` function to get a reference to the query.
const ref = searchAllRef(searchAllVars);
// Variables can be defined inline as well.
const ref = searchAllRef({ input: ..., minYear: ..., maxYear: ..., minRating: ..., maxRating: ..., genre: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = searchAllRef(dataConnect, searchAllVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.moviesMatchingTitle);
console.log(data.moviesMatchingDescription);
console.log(data.actorsMatchingName);
console.log(data.reviewsMatchingText);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.moviesMatchingTitle);
  console.log(data.moviesMatchingDescription);
  console.log(data.actorsMatchingName);
  console.log(data.reviewsMatchingText);
});
```

## ListFiles
You can execute the `ListFiles` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-sdk/index.d.ts](./index.d.ts):
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
The `ListFiles` query has an optional argument of type `ListFilesVariables`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListFilesVariables {
  folderId?: UUIDString | null;
}
```
### Return Type
Recall that executing the `ListFiles` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListFilesData`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:
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
import { connectorConfig, listFiles, ListFilesVariables } from '@movie/dataconnect';

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
import { connectorConfig, listFilesRef, ListFilesVariables } from '@movie/dataconnect';

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
You can execute the `ListFilesByUser` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-sdk/index.d.ts](./index.d.ts):
```typescript
listFilesByUser(vars: ListFilesByUserVariables): QueryPromise<ListFilesByUserData, ListFilesByUserVariables>;

interface ListFilesByUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListFilesByUserVariables): QueryRef<ListFilesByUserData, ListFilesByUserVariables>;
}
export const listFilesByUserRef: ListFilesByUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listFilesByUser(dc: DataConnect, vars: ListFilesByUserVariables): QueryPromise<ListFilesByUserData, ListFilesByUserVariables>;

interface ListFilesByUserRef {
  ...
  (dc: DataConnect, vars: ListFilesByUserVariables): QueryRef<ListFilesByUserData, ListFilesByUserVariables>;
}
export const listFilesByUserRef: ListFilesByUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listFilesByUserRef:
```typescript
const name = listFilesByUserRef.operationName;
console.log(name);
```

### Variables
The `ListFilesByUser` query requires an argument of type `ListFilesByUserVariables`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListFilesByUserVariables {
  userId: string;
}
```
### Return Type
Recall that executing the `ListFilesByUser` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListFilesByUserData`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:
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
import { connectorConfig, listFilesByUser, ListFilesByUserVariables } from '@movie/dataconnect';

// The `ListFilesByUser` query requires an argument of type `ListFilesByUserVariables`:
const listFilesByUserVars: ListFilesByUserVariables = {
  userId: ..., 
};

// Call the `listFilesByUser()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listFilesByUser(listFilesByUserVars);
// Variables can be defined inline as well.
const { data } = await listFilesByUser({ userId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listFilesByUser(dataConnect, listFilesByUserVars);

console.log(data.files);

// Or, you can use the `Promise` API.
listFilesByUser(listFilesByUserVars).then((response) => {
  const data = response.data;
  console.log(data.files);
});
```

### Using `ListFilesByUser`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listFilesByUserRef, ListFilesByUserVariables } from '@movie/dataconnect';

// The `ListFilesByUser` query requires an argument of type `ListFilesByUserVariables`:
const listFilesByUserVars: ListFilesByUserVariables = {
  userId: ..., 
};

// Call the `listFilesByUserRef()` function to get a reference to the query.
const ref = listFilesByUserRef(listFilesByUserVars);
// Variables can be defined inline as well.
const ref = listFilesByUserRef({ userId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listFilesByUserRef(dataConnect, listFilesByUserVars);

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
You can execute the `GetFile` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-sdk/index.d.ts](./index.d.ts):
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
The `GetFile` query requires an argument of type `GetFileVariables`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetFileVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetFile` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetFileData`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:
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
import { connectorConfig, getFile, GetFileVariables } from '@movie/dataconnect';

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
import { connectorConfig, getFileRef, GetFileVariables } from '@movie/dataconnect';

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
You can execute the `ListFolders` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-sdk/index.d.ts](./index.d.ts):
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
The `ListFolders` query has an optional argument of type `ListFoldersVariables`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListFoldersVariables {
  parentFolderId?: UUIDString | null;
}
```
### Return Type
Recall that executing the `ListFolders` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListFoldersData`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:
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
import { connectorConfig, listFolders, ListFoldersVariables } from '@movie/dataconnect';

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
import { connectorConfig, listFoldersRef, ListFoldersVariables } from '@movie/dataconnect';

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
You can execute the `GetFolder` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-sdk/index.d.ts](./index.d.ts):
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
The `GetFolder` query requires an argument of type `GetFolderVariables`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetFolderVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetFolder` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetFolderData`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:
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
import { connectorConfig, getFolder, GetFolderVariables } from '@movie/dataconnect';

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
import { connectorConfig, getFolderRef, GetFolderVariables } from '@movie/dataconnect';

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
You can execute the `SearchFiles` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-sdk/index.d.ts](./index.d.ts):
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
The `SearchFiles` query requires an argument of type `SearchFilesVariables`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface SearchFilesVariables {
  searchTerm: string;
}
```
### Return Type
Recall that executing the `SearchFiles` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `SearchFilesData`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:
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
import { connectorConfig, searchFiles, SearchFilesVariables } from '@movie/dataconnect';

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
import { connectorConfig, searchFilesRef, SearchFilesVariables } from '@movie/dataconnect';

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
You can execute the `GetRecentFiles` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-sdk/index.d.ts](./index.d.ts):
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
The `GetRecentFiles` query has an optional argument of type `GetRecentFilesVariables`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetRecentFilesVariables {
  limit?: number | null;
}
```
### Return Type
Recall that executing the `GetRecentFiles` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetRecentFilesData`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:
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
import { connectorConfig, getRecentFiles, GetRecentFilesVariables } from '@movie/dataconnect';

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
import { connectorConfig, getRecentFilesRef, GetRecentFilesVariables } from '@movie/dataconnect';

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
You can execute the `GetUserStorageStats` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-sdk/index.d.ts](./index.d.ts):
```typescript
getUserStorageStats(vars: GetUserStorageStatsVariables): QueryPromise<GetUserStorageStatsData, GetUserStorageStatsVariables>;

interface GetUserStorageStatsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserStorageStatsVariables): QueryRef<GetUserStorageStatsData, GetUserStorageStatsVariables>;
}
export const getUserStorageStatsRef: GetUserStorageStatsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getUserStorageStats(dc: DataConnect, vars: GetUserStorageStatsVariables): QueryPromise<GetUserStorageStatsData, GetUserStorageStatsVariables>;

interface GetUserStorageStatsRef {
  ...
  (dc: DataConnect, vars: GetUserStorageStatsVariables): QueryRef<GetUserStorageStatsData, GetUserStorageStatsVariables>;
}
export const getUserStorageStatsRef: GetUserStorageStatsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getUserStorageStatsRef:
```typescript
const name = getUserStorageStatsRef.operationName;
console.log(name);
```

### Variables
The `GetUserStorageStats` query requires an argument of type `GetUserStorageStatsVariables`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetUserStorageStatsVariables {
  userId: string;
}
```
### Return Type
Recall that executing the `GetUserStorageStats` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetUserStorageStatsData`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:
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
import { connectorConfig, getUserStorageStats, GetUserStorageStatsVariables } from '@movie/dataconnect';

// The `GetUserStorageStats` query requires an argument of type `GetUserStorageStatsVariables`:
const getUserStorageStatsVars: GetUserStorageStatsVariables = {
  userId: ..., 
};

// Call the `getUserStorageStats()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getUserStorageStats(getUserStorageStatsVars);
// Variables can be defined inline as well.
const { data } = await getUserStorageStats({ userId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getUserStorageStats(dataConnect, getUserStorageStatsVars);

console.log(data.files);

// Or, you can use the `Promise` API.
getUserStorageStats(getUserStorageStatsVars).then((response) => {
  const data = response.data;
  console.log(data.files);
});
```

### Using `GetUserStorageStats`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getUserStorageStatsRef, GetUserStorageStatsVariables } from '@movie/dataconnect';

// The `GetUserStorageStats` query requires an argument of type `GetUserStorageStatsVariables`:
const getUserStorageStatsVars: GetUserStorageStatsVariables = {
  userId: ..., 
};

// Call the `getUserStorageStatsRef()` function to get a reference to the query.
const ref = getUserStorageStatsRef(getUserStorageStatsVars);
// Variables can be defined inline as well.
const ref = getUserStorageStatsRef({ userId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getUserStorageStatsRef(dataConnect, getUserStorageStatsVars);

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

Below are examples of how to use the `movie-connector` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## UpsertUser
You can execute the `UpsertUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-sdk/index.d.ts](./index.d.ts):
```typescript
upsertUser(vars: UpsertUserVariables): MutationPromise<UpsertUserData, UpsertUserVariables>;

interface UpsertUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertUserVariables): MutationRef<UpsertUserData, UpsertUserVariables>;
}
export const upsertUserRef: UpsertUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
upsertUser(dc: DataConnect, vars: UpsertUserVariables): MutationPromise<UpsertUserData, UpsertUserVariables>;

interface UpsertUserRef {
  ...
  (dc: DataConnect, vars: UpsertUserVariables): MutationRef<UpsertUserData, UpsertUserVariables>;
}
export const upsertUserRef: UpsertUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the upsertUserRef:
```typescript
const name = upsertUserRef.operationName;
console.log(name);
```

### Variables
The `UpsertUser` mutation requires an argument of type `UpsertUserVariables`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpsertUserVariables {
  username: string;
}
```
### Return Type
Recall that executing the `UpsertUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpsertUserData`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpsertUserData {
  user_upsert: User_Key;
}
```
### Using `UpsertUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, upsertUser, UpsertUserVariables } from '@movie/dataconnect';

// The `UpsertUser` mutation requires an argument of type `UpsertUserVariables`:
const upsertUserVars: UpsertUserVariables = {
  username: ..., 
};

// Call the `upsertUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await upsertUser(upsertUserVars);
// Variables can be defined inline as well.
const { data } = await upsertUser({ username: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await upsertUser(dataConnect, upsertUserVars);

console.log(data.user_upsert);

// Or, you can use the `Promise` API.
upsertUser(upsertUserVars).then((response) => {
  const data = response.data;
  console.log(data.user_upsert);
});
```

### Using `UpsertUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, upsertUserRef, UpsertUserVariables } from '@movie/dataconnect';

// The `UpsertUser` mutation requires an argument of type `UpsertUserVariables`:
const upsertUserVars: UpsertUserVariables = {
  username: ..., 
};

// Call the `upsertUserRef()` function to get a reference to the mutation.
const ref = upsertUserRef(upsertUserVars);
// Variables can be defined inline as well.
const ref = upsertUserRef({ username: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = upsertUserRef(dataConnect, upsertUserVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_upsert);
});
```

## AddFavoritedMovie
You can execute the `AddFavoritedMovie` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-sdk/index.d.ts](./index.d.ts):
```typescript
addFavoritedMovie(vars: AddFavoritedMovieVariables): MutationPromise<AddFavoritedMovieData, AddFavoritedMovieVariables>;

interface AddFavoritedMovieRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddFavoritedMovieVariables): MutationRef<AddFavoritedMovieData, AddFavoritedMovieVariables>;
}
export const addFavoritedMovieRef: AddFavoritedMovieRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
addFavoritedMovie(dc: DataConnect, vars: AddFavoritedMovieVariables): MutationPromise<AddFavoritedMovieData, AddFavoritedMovieVariables>;

interface AddFavoritedMovieRef {
  ...
  (dc: DataConnect, vars: AddFavoritedMovieVariables): MutationRef<AddFavoritedMovieData, AddFavoritedMovieVariables>;
}
export const addFavoritedMovieRef: AddFavoritedMovieRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the addFavoritedMovieRef:
```typescript
const name = addFavoritedMovieRef.operationName;
console.log(name);
```

### Variables
The `AddFavoritedMovie` mutation requires an argument of type `AddFavoritedMovieVariables`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AddFavoritedMovieVariables {
  movieId: UUIDString;
}
```
### Return Type
Recall that executing the `AddFavoritedMovie` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AddFavoritedMovieData`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AddFavoritedMovieData {
  favorite_movie_upsert: FavoriteMovie_Key;
}
```
### Using `AddFavoritedMovie`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, addFavoritedMovie, AddFavoritedMovieVariables } from '@movie/dataconnect';

// The `AddFavoritedMovie` mutation requires an argument of type `AddFavoritedMovieVariables`:
const addFavoritedMovieVars: AddFavoritedMovieVariables = {
  movieId: ..., 
};

// Call the `addFavoritedMovie()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await addFavoritedMovie(addFavoritedMovieVars);
// Variables can be defined inline as well.
const { data } = await addFavoritedMovie({ movieId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await addFavoritedMovie(dataConnect, addFavoritedMovieVars);

console.log(data.favorite_movie_upsert);

// Or, you can use the `Promise` API.
addFavoritedMovie(addFavoritedMovieVars).then((response) => {
  const data = response.data;
  console.log(data.favorite_movie_upsert);
});
```

### Using `AddFavoritedMovie`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, addFavoritedMovieRef, AddFavoritedMovieVariables } from '@movie/dataconnect';

// The `AddFavoritedMovie` mutation requires an argument of type `AddFavoritedMovieVariables`:
const addFavoritedMovieVars: AddFavoritedMovieVariables = {
  movieId: ..., 
};

// Call the `addFavoritedMovieRef()` function to get a reference to the mutation.
const ref = addFavoritedMovieRef(addFavoritedMovieVars);
// Variables can be defined inline as well.
const ref = addFavoritedMovieRef({ movieId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = addFavoritedMovieRef(dataConnect, addFavoritedMovieVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.favorite_movie_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.favorite_movie_upsert);
});
```

## DeleteFavoritedMovie
You can execute the `DeleteFavoritedMovie` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-sdk/index.d.ts](./index.d.ts):
```typescript
deleteFavoritedMovie(vars: DeleteFavoritedMovieVariables): MutationPromise<DeleteFavoritedMovieData, DeleteFavoritedMovieVariables>;

interface DeleteFavoritedMovieRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteFavoritedMovieVariables): MutationRef<DeleteFavoritedMovieData, DeleteFavoritedMovieVariables>;
}
export const deleteFavoritedMovieRef: DeleteFavoritedMovieRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteFavoritedMovie(dc: DataConnect, vars: DeleteFavoritedMovieVariables): MutationPromise<DeleteFavoritedMovieData, DeleteFavoritedMovieVariables>;

interface DeleteFavoritedMovieRef {
  ...
  (dc: DataConnect, vars: DeleteFavoritedMovieVariables): MutationRef<DeleteFavoritedMovieData, DeleteFavoritedMovieVariables>;
}
export const deleteFavoritedMovieRef: DeleteFavoritedMovieRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteFavoritedMovieRef:
```typescript
const name = deleteFavoritedMovieRef.operationName;
console.log(name);
```

### Variables
The `DeleteFavoritedMovie` mutation requires an argument of type `DeleteFavoritedMovieVariables`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteFavoritedMovieVariables {
  movieId: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteFavoritedMovie` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteFavoritedMovieData`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteFavoritedMovieData {
  favorite_movie_delete?: FavoriteMovie_Key | null;
}
```
### Using `DeleteFavoritedMovie`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteFavoritedMovie, DeleteFavoritedMovieVariables } from '@movie/dataconnect';

// The `DeleteFavoritedMovie` mutation requires an argument of type `DeleteFavoritedMovieVariables`:
const deleteFavoritedMovieVars: DeleteFavoritedMovieVariables = {
  movieId: ..., 
};

// Call the `deleteFavoritedMovie()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteFavoritedMovie(deleteFavoritedMovieVars);
// Variables can be defined inline as well.
const { data } = await deleteFavoritedMovie({ movieId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteFavoritedMovie(dataConnect, deleteFavoritedMovieVars);

console.log(data.favorite_movie_delete);

// Or, you can use the `Promise` API.
deleteFavoritedMovie(deleteFavoritedMovieVars).then((response) => {
  const data = response.data;
  console.log(data.favorite_movie_delete);
});
```

### Using `DeleteFavoritedMovie`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteFavoritedMovieRef, DeleteFavoritedMovieVariables } from '@movie/dataconnect';

// The `DeleteFavoritedMovie` mutation requires an argument of type `DeleteFavoritedMovieVariables`:
const deleteFavoritedMovieVars: DeleteFavoritedMovieVariables = {
  movieId: ..., 
};

// Call the `deleteFavoritedMovieRef()` function to get a reference to the mutation.
const ref = deleteFavoritedMovieRef(deleteFavoritedMovieVars);
// Variables can be defined inline as well.
const ref = deleteFavoritedMovieRef({ movieId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteFavoritedMovieRef(dataConnect, deleteFavoritedMovieVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.favorite_movie_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.favorite_movie_delete);
});
```

## AddReview
You can execute the `AddReview` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-sdk/index.d.ts](./index.d.ts):
```typescript
addReview(vars: AddReviewVariables): MutationPromise<AddReviewData, AddReviewVariables>;

interface AddReviewRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddReviewVariables): MutationRef<AddReviewData, AddReviewVariables>;
}
export const addReviewRef: AddReviewRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
addReview(dc: DataConnect, vars: AddReviewVariables): MutationPromise<AddReviewData, AddReviewVariables>;

interface AddReviewRef {
  ...
  (dc: DataConnect, vars: AddReviewVariables): MutationRef<AddReviewData, AddReviewVariables>;
}
export const addReviewRef: AddReviewRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the addReviewRef:
```typescript
const name = addReviewRef.operationName;
console.log(name);
```

### Variables
The `AddReview` mutation requires an argument of type `AddReviewVariables`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AddReviewVariables {
  movieId: UUIDString;
  rating: number;
  reviewText: string;
}
```
### Return Type
Recall that executing the `AddReview` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AddReviewData`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AddReviewData {
  review_insert: Review_Key;
}
```
### Using `AddReview`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, addReview, AddReviewVariables } from '@movie/dataconnect';

// The `AddReview` mutation requires an argument of type `AddReviewVariables`:
const addReviewVars: AddReviewVariables = {
  movieId: ..., 
  rating: ..., 
  reviewText: ..., 
};

// Call the `addReview()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await addReview(addReviewVars);
// Variables can be defined inline as well.
const { data } = await addReview({ movieId: ..., rating: ..., reviewText: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await addReview(dataConnect, addReviewVars);

console.log(data.review_insert);

// Or, you can use the `Promise` API.
addReview(addReviewVars).then((response) => {
  const data = response.data;
  console.log(data.review_insert);
});
```

### Using `AddReview`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, addReviewRef, AddReviewVariables } from '@movie/dataconnect';

// The `AddReview` mutation requires an argument of type `AddReviewVariables`:
const addReviewVars: AddReviewVariables = {
  movieId: ..., 
  rating: ..., 
  reviewText: ..., 
};

// Call the `addReviewRef()` function to get a reference to the mutation.
const ref = addReviewRef(addReviewVars);
// Variables can be defined inline as well.
const ref = addReviewRef({ movieId: ..., rating: ..., reviewText: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = addReviewRef(dataConnect, addReviewVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.review_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.review_insert);
});
```

## DeleteReview
You can execute the `DeleteReview` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-sdk/index.d.ts](./index.d.ts):
```typescript
deleteReview(vars: DeleteReviewVariables): MutationPromise<DeleteReviewData, DeleteReviewVariables>;

interface DeleteReviewRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteReviewVariables): MutationRef<DeleteReviewData, DeleteReviewVariables>;
}
export const deleteReviewRef: DeleteReviewRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteReview(dc: DataConnect, vars: DeleteReviewVariables): MutationPromise<DeleteReviewData, DeleteReviewVariables>;

interface DeleteReviewRef {
  ...
  (dc: DataConnect, vars: DeleteReviewVariables): MutationRef<DeleteReviewData, DeleteReviewVariables>;
}
export const deleteReviewRef: DeleteReviewRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteReviewRef:
```typescript
const name = deleteReviewRef.operationName;
console.log(name);
```

### Variables
The `DeleteReview` mutation requires an argument of type `DeleteReviewVariables`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteReviewVariables {
  movieId: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteReview` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteReviewData`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteReviewData {
  review_delete?: Review_Key | null;
}
```
### Using `DeleteReview`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteReview, DeleteReviewVariables } from '@movie/dataconnect';

// The `DeleteReview` mutation requires an argument of type `DeleteReviewVariables`:
const deleteReviewVars: DeleteReviewVariables = {
  movieId: ..., 
};

// Call the `deleteReview()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteReview(deleteReviewVars);
// Variables can be defined inline as well.
const { data } = await deleteReview({ movieId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteReview(dataConnect, deleteReviewVars);

console.log(data.review_delete);

// Or, you can use the `Promise` API.
deleteReview(deleteReviewVars).then((response) => {
  const data = response.data;
  console.log(data.review_delete);
});
```

### Using `DeleteReview`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteReviewRef, DeleteReviewVariables } from '@movie/dataconnect';

// The `DeleteReview` mutation requires an argument of type `DeleteReviewVariables`:
const deleteReviewVars: DeleteReviewVariables = {
  movieId: ..., 
};

// Call the `deleteReviewRef()` function to get a reference to the mutation.
const ref = deleteReviewRef(deleteReviewVars);
// Variables can be defined inline as well.
const ref = deleteReviewRef({ movieId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteReviewRef(dataConnect, deleteReviewVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.review_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.review_delete);
});
```

## CreateFile
You can execute the `CreateFile` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-sdk/index.d.ts](./index.d.ts):
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
The `CreateFile` mutation requires an argument of type `CreateFileVariables`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `CreateFile` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateFileData`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateFileData {
  file_insert: File_Key;
}
```
### Using `CreateFile`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createFile, CreateFileVariables } from '@movie/dataconnect';

// The `CreateFile` mutation requires an argument of type `CreateFileVariables`:
const createFileVars: CreateFileVariables = {
  name: ..., 
  storagePath: ..., 
  mimeType: ..., // optional
  size: ..., 
  folderId: ..., // optional
  uploadedBy: ..., 
  description: ..., // optional
  tags: ..., // optional
  isPublic: ..., // optional
};

// Call the `createFile()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createFile(createFileVars);
// Variables can be defined inline as well.
const { data } = await createFile({ name: ..., storagePath: ..., mimeType: ..., size: ..., folderId: ..., uploadedBy: ..., description: ..., tags: ..., isPublic: ..., });

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
import { connectorConfig, createFileRef, CreateFileVariables } from '@movie/dataconnect';

// The `CreateFile` mutation requires an argument of type `CreateFileVariables`:
const createFileVars: CreateFileVariables = {
  name: ..., 
  storagePath: ..., 
  mimeType: ..., // optional
  size: ..., 
  folderId: ..., // optional
  uploadedBy: ..., 
  description: ..., // optional
  tags: ..., // optional
  isPublic: ..., // optional
};

// Call the `createFileRef()` function to get a reference to the mutation.
const ref = createFileRef(createFileVars);
// Variables can be defined inline as well.
const ref = createFileRef({ name: ..., storagePath: ..., mimeType: ..., size: ..., folderId: ..., uploadedBy: ..., description: ..., tags: ..., isPublic: ..., });

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
You can execute the `UpdateFile` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-sdk/index.d.ts](./index.d.ts):
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
The `UpdateFile` mutation requires an argument of type `UpdateFileVariables`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:

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

The `data` property is an object of type `UpdateFileData`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateFileData {
  file_update?: File_Key | null;
}
```
### Using `UpdateFile`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateFile, UpdateFileVariables } from '@movie/dataconnect';

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
import { connectorConfig, updateFileRef, UpdateFileVariables } from '@movie/dataconnect';

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
You can execute the `DeleteFile` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-sdk/index.d.ts](./index.d.ts):
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
The `DeleteFile` mutation requires an argument of type `DeleteFileVariables`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteFileVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteFile` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteFileData`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteFileData {
  file_delete?: File_Key | null;
}
```
### Using `DeleteFile`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteFile, DeleteFileVariables } from '@movie/dataconnect';

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
import { connectorConfig, deleteFileRef, DeleteFileVariables } from '@movie/dataconnect';

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
You can execute the `IncrementDownloadCount` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-sdk/index.d.ts](./index.d.ts):
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
The `IncrementDownloadCount` mutation requires an argument of type `IncrementDownloadCountVariables`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface IncrementDownloadCountVariables {
  id: UUIDString;
  newCount: number;
}
```
### Return Type
Recall that executing the `IncrementDownloadCount` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `IncrementDownloadCountData`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface IncrementDownloadCountData {
  file_update?: File_Key | null;
}
```
### Using `IncrementDownloadCount`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, incrementDownloadCount, IncrementDownloadCountVariables } from '@movie/dataconnect';

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
import { connectorConfig, incrementDownloadCountRef, IncrementDownloadCountVariables } from '@movie/dataconnect';

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
You can execute the `CreateFolder` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-sdk/index.d.ts](./index.d.ts):
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
The `CreateFolder` mutation requires an argument of type `CreateFolderVariables`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateFolderVariables {
  name: string;
  parentFolderId?: UUIDString | null;
  createdBy: string;
  description?: string | null;
  color?: string | null;
}
```
### Return Type
Recall that executing the `CreateFolder` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateFolderData`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateFolderData {
  folder_insert: Folder_Key;
}
```
### Using `CreateFolder`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createFolder, CreateFolderVariables } from '@movie/dataconnect';

// The `CreateFolder` mutation requires an argument of type `CreateFolderVariables`:
const createFolderVars: CreateFolderVariables = {
  name: ..., 
  parentFolderId: ..., // optional
  createdBy: ..., 
  description: ..., // optional
  color: ..., // optional
};

// Call the `createFolder()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createFolder(createFolderVars);
// Variables can be defined inline as well.
const { data } = await createFolder({ name: ..., parentFolderId: ..., createdBy: ..., description: ..., color: ..., });

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
import { connectorConfig, createFolderRef, CreateFolderVariables } from '@movie/dataconnect';

// The `CreateFolder` mutation requires an argument of type `CreateFolderVariables`:
const createFolderVars: CreateFolderVariables = {
  name: ..., 
  parentFolderId: ..., // optional
  createdBy: ..., 
  description: ..., // optional
  color: ..., // optional
};

// Call the `createFolderRef()` function to get a reference to the mutation.
const ref = createFolderRef(createFolderVars);
// Variables can be defined inline as well.
const ref = createFolderRef({ name: ..., parentFolderId: ..., createdBy: ..., description: ..., color: ..., });

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
You can execute the `UpdateFolder` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-sdk/index.d.ts](./index.d.ts):
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
The `UpdateFolder` mutation requires an argument of type `UpdateFolderVariables`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:

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

The `data` property is an object of type `UpdateFolderData`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateFolderData {
  folder_update?: Folder_Key | null;
}
```
### Using `UpdateFolder`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateFolder, UpdateFolderVariables } from '@movie/dataconnect';

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
import { connectorConfig, updateFolderRef, UpdateFolderVariables } from '@movie/dataconnect';

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
You can execute the `DeleteFolder` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-sdk/index.d.ts](./index.d.ts):
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
The `DeleteFolder` mutation requires an argument of type `DeleteFolderVariables`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteFolderVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteFolder` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteFolderData`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteFolderData {
  folder_delete?: Folder_Key | null;
}
```
### Using `DeleteFolder`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteFolder, DeleteFolderVariables } from '@movie/dataconnect';

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
import { connectorConfig, deleteFolderRef, DeleteFolderVariables } from '@movie/dataconnect';

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

