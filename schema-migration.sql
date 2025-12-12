/** Install Postgres extension "uuid-ossp"*/
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

/** create enum type "share_permission"*/
CREATE TYPE "public"."share_permission" AS ENUM('VIEW', 'EDIT', 'ADMIN');

/** create "movie" table*/
CREATE TABLE "public"."movie" (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4 (),
  "description" text NULL,
  "genre" text NULL,
  "image_url" text NOT NULL,
  "rating" double precision NULL,
  "release_year" integer NULL,
  "tags" text[] NULL,
  "title" text NOT NULL,
  PRIMARY KEY ("id")
);

/** create "user" table*/
CREATE TABLE "public"."user" (
  "id" text NOT NULL,
  "username" character varying(50) NOT NULL,
  PRIMARY KEY ("id")
);

/** create "FavoriteMovies" table*/
CREATE TABLE "public"."FavoriteMovies" (
  "user_id" text NOT NULL,
  "movie_id" uuid NOT NULL,
  PRIMARY KEY ("user_id", "movie_id"),
  CONSTRAINT "FavoriteMovies_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "public"."movie" ("id") ON DELETE CASCADE,
  CONSTRAINT "FavoriteMovies_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user" ("id") ON DELETE CASCADE
);

/** create index "FavoriteMovies_movieId_idx" to table: "FavoriteMovies"*/
CREATE INDEX "FavoriteMovies_movieId_idx" ON "public"."FavoriteMovies" ("movie_id");

/** create index "FavoriteMovies_userId_idx" to table: "FavoriteMovies"*/
CREATE INDEX "FavoriteMovies_userId_idx" ON "public"."FavoriteMovies" ("user_id");

/** create "Reviews" table*/
CREATE TABLE "public"."Reviews" (
  "movie_id" uuid NOT NULL,
  "user_id" text NOT NULL,
  "id" uuid NOT NULL DEFAULT uuid_generate_v4 (),
  "rating" integer NULL,
  "review_date" date NOT NULL,
  "review_text" text NULL,
  PRIMARY KEY ("movie_id", "user_id"),
  CONSTRAINT "Reviews_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "public"."movie" ("id") ON DELETE CASCADE,
  CONSTRAINT "Reviews_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user" ("id") ON DELETE CASCADE
);

/** create index "Reviews_movieId_idx" to table: "Reviews"*/
CREATE INDEX "Reviews_movieId_idx" ON "public"."Reviews" ("movie_id");

/** create index "Reviews_userId_idx" to table: "Reviews"*/
CREATE INDEX "Reviews_userId_idx" ON "public"."Reviews" ("user_id");

/** create "folder" table*/
CREATE TABLE "public"."folder" (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4 (),
  "parent_folder_id" uuid NULL,
  "color" character varying(20) NULL,
  "created_at" timestamptz NOT NULL,
  "created_by" character varying(100) NOT NULL,
  "description" text NULL,
  "name" character varying(255) NOT NULL,
  "updated_at" timestamptz NULL,
  PRIMARY KEY ("id"),
  CONSTRAINT "folder_parent_folder_id_fkey" FOREIGN KEY ("parent_folder_id") REFERENCES "public"."folder" ("id") ON DELETE SET NULL
);

/** create index "folder_parentFolderId_idx" to table: "folder"*/
CREATE INDEX "folder_parentFolderId_idx" ON "public"."folder" ("parent_folder_id");

/** create "file" table*/
CREATE TABLE "public"."file" (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4 (),
  "folder_id" uuid NULL,
  "archived_at" timestamptz NULL,
  "description" text NULL,
  "download_count" integer NULL DEFAULT 0,
  "is_archived" boolean NULL DEFAULT false,
  "is_public" boolean NULL DEFAULT false,
  "mime_type" character varying(100) NULL,
  "name" character varying(255) NOT NULL,
  "size" bigint NOT NULL,
  "storage_path" character varying(500) NOT NULL,
  "tags" text[] NULL,
  "updated_at" timestamptz NULL,
  "uploaded_at" timestamptz NOT NULL,
  "uploaded_by" character varying(100) NOT NULL,
  PRIMARY KEY ("id"),
  CONSTRAINT "file_folder_id_fkey" FOREIGN KEY ("folder_id") REFERENCES "public"."folder" ("id") ON DELETE SET NULL
);

/** create index "file_folderId_idx" to table: "file"*/
CREATE INDEX "file_folderId_idx" ON "public"."file" ("folder_id");

/** create "file_share" table*/
CREATE TABLE "public"."file_share" (
  "file_id" uuid NOT NULL,
  "shared_with" character varying(100) NOT NULL,
  "permission" "public"."share_permission" NOT NULL,
  "shared_at" timestamptz NOT NULL,
  "shared_by" character varying(100) NOT NULL,
  PRIMARY KEY ("file_id", "shared_with"),
  CONSTRAINT "file_share_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "public"."file" ("id") ON DELETE CASCADE
);

/** create index "file_share_fileId_idx" to table: "file_share"*/
CREATE INDEX "file_share_fileId_idx" ON "public"."file_share" ("file_id");

/** create "actor" table*/
CREATE TABLE "public"."actor" (
  "id" uuid NOT NULL,
  "image_url" text NOT NULL,
  "name" character varying(30) NOT NULL,
  PRIMARY KEY ("id")
);

/** create "movie_actor" table*/
CREATE TABLE "public"."movie_actor" (
  "movie_id" uuid NOT NULL,
  "actor_id" uuid NOT NULL,
  "role" text NOT NULL,
  PRIMARY KEY ("movie_id", "actor_id"),
  CONSTRAINT "movie_actor_actor_id_fkey" FOREIGN KEY ("actor_id") REFERENCES "public"."actor" ("id") ON DELETE CASCADE,
  CONSTRAINT "movie_actor_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "public"."movie" ("id") ON DELETE CASCADE
);

/** create index "movie_actor_actorId_idx" to table: "movie_actor"*/
CREATE INDEX "movie_actor_actorId_idx" ON "public"."movie_actor" ("actor_id");

/** create index "movie_actor_movieId_idx" to table: "movie_actor"*/
CREATE INDEX "movie_actor_movieId_idx" ON "public"."movie_actor" ("movie_id");

/** create "movie_metadata" table*/
CREATE TABLE "public"."movie_metadata" (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4 (),
  "movie_id" uuid NOT NULL,
  "director" text NULL,
  PRIMARY KEY ("id"),
  CONSTRAINT "movie_metadata_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "public"."movie" ("id") ON DELETE CASCADE
);

/** create index "movie_metadata_movieId_idx" to table: "movie_metadata"*/
CREATE INDEX "movie_metadata_movieId_idx" ON "public"."movie_metadata" ("movie_id");
