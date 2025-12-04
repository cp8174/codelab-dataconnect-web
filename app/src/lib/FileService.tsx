/**
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  listFiles,
  listFilesByUser,
  getFile,
  listFolders,
  getFolder,
  searchFiles,
  getRecentFiles,
  getUserStorageStats,
  createFile,
  updateFile,
  deleteFile,
  incrementDownloadCount,
  createFolder,
  updateFolder,
  deleteFolder,
  ListFilesData,
  GetFileData,
  ListFoldersData,
  GetRecentFilesData,
  GetUserStorageStatsData,
} from '@movie/dataconnect';

import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';

const storage = getStorage();

export interface UploadProgress {
  progress: number;
  state: 'running' | 'paused' | 'success' | 'error';
  error?: string;
}

// List files in a folder
export const handleListFiles = async (
  folderId?: string
): Promise<ListFilesData['files'] | null> => {
  try {
    const result = await listFiles({ folderId: folderId || null });
    return result.data.files;
  } catch (error) {
    console.error('Error fetching files:', error);
    return null;
  }
};

// List files by user
export const handleListFilesByUser = async (
  userId: string
): Promise<ListFilesData['files'] | null> => {
  try {
    const result = await listFilesByUser({ userId });
    return result.data.files;
  } catch (error) {
    console.error('Error fetching user files:', error);
    return null;
  }
};

// Get file by ID
export const handleGetFile = async (
  fileId: string
): Promise<GetFileData['file'] | null> => {
  try {
    const result = await getFile({ id: fileId });
    return result.data.file;
  } catch (error) {
    console.error('Error fetching file:', error);
    return null;
  }
};

// List folders
export const handleListFolders = async (
  parentFolderId?: string
): Promise<ListFoldersData['folders'] | null> => {
  try {
    const result = await listFolders({ parentFolderId: parentFolderId || null });
    return result.data.folders;
  } catch (error) {
    console.error('Error fetching folders:', error);
    return null;
  }
};

// Search files
export const handleSearchFiles = async (
  searchTerm: string
): Promise<ListFilesData['files'] | null> => {
  try {
    const result = await searchFiles({ searchTerm });
    return result.data.files;
  } catch (error) {
    console.error('Error searching files:', error);
    return null;
  }
};

// Get recent files
export const handleGetRecentFiles = async (
  limit: number = 20
): Promise<GetRecentFilesData['files'] | null> => {
  try {
    const result = await getRecentFiles({ limit });
    return result.data.files;
  } catch (error) {
    console.error('Error fetching recent files:', error);
    return null;
  }
};

// Get storage stats
export const handleGetStorageStats = async (
  userId: string
) => {
  try {
    const result = await getUserStorageStats({ userId });
    const files = result.data.files;
    
    const totalSize = files.reduce((acc, file) => acc + Number(file.size || 0), 0);
    const fileCount = files.length;
    
    return {
      totalSize,
      fileCount,
      formattedSize: formatFileSize(totalSize)
    };
  } catch (error) {
    console.error('Error fetching storage stats:', error);
    return { totalSize: 0, fileCount: 0, formattedSize: '0 Bytes' };
  }
};

// Upload file to Firebase Storage and create metadata
export const handleUploadFile = async (
  file: File,
  userId: string,
  folderId?: string,
  onProgress?: (progress: UploadProgress) => void
): Promise<string | null> => {
  try {
    const storagePath = `files/${userId}/${Date.now()}_${file.name}`;
    const storageRef = ref(storage, storagePath);
    
    const uploadTask = uploadBytesResumable(storageRef, file);
    
    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          onProgress?.({ progress, state: 'running' });
        },
        (error) => {
          console.error('Upload error:', error);
          onProgress?.({ progress: 0, state: 'error', error: error.message });
          reject(error);
        },
        async () => {
          try {
            // Create file metadata in Data Connect
            const result = await createFile({
              name: file.name,
              storagePath,
              mimeType: file.type || 'application/octet-stream',
              size: file.size.toString(),
              folderId: folderId || null,
              uploadedBy: userId,
              description: null,
              tags: [],
              isPublic: false,
            });
            
            onProgress?.({ progress: 100, state: 'success' });
            resolve(result.data.file_insert.id);
          } catch (error) {
            console.error('Error creating file metadata:', error);
            reject(error);
          }
        }
      );
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return null;
  }
};

// Download file
export const handleDownloadFile = async (
  storagePath: string,
  fileName: string,
  fileId: string
): Promise<void> => {
  try {
    // Get current file data to increment count
    const fileData = await getFile({ id: fileId });
    const currentCount = fileData.data.file?.downloadCount || 0;
    
    const storageRef = ref(storage, storagePath);
    const url = await getDownloadURL(storageRef);
    
    // Increment download count
    await incrementDownloadCount({ id: fileId, newCount: currentCount + 1 });
    
    // Trigger download
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Error downloading file:', error);
    throw error;
  }
};

// Delete file from storage and metadata
export const handleDeleteFile = async (
  fileId: string,
  storagePath: string
): Promise<void> => {
  try {
    // Delete from storage
    const storageRef = ref(storage, storagePath);
    await deleteObject(storageRef);
    
    // Delete metadata
    await deleteFile({ id: fileId });
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
};

// Update file metadata
export const handleUpdateFile = async (
  fileId: string,
  updates: {
    name?: string;
    description?: string;
    tags?: string[];
    isPublic?: boolean;
    folderId?: string;
  }
): Promise<void> => {
  try {
    await updateFile({
      id: fileId,
      name: updates.name || null,
      description: updates.description || null,
      tags: updates.tags || null,
      isPublic: updates.isPublic ?? null,
      folderId: updates.folderId || null,
    });
  } catch (error) {
    console.error('Error updating file:', error);
    throw error;
  }
};

// Create folder
export const handleCreateFolder = async (
  name: string,
  userId: string,
  parentFolderId?: string,
  description?: string,
  color?: string
): Promise<string | null> => {
  try {
    const result = await createFolder({
      name,
      parentFolderId: parentFolderId || null,
      createdBy: userId,
      description: description || null,
      color: color || null,
    });
    return result.data.folder_insert.id;
  } catch (error) {
    console.error('Error creating folder:', error);
    return null;
  }
};

// Update folder
export const handleUpdateFolder = async (
  folderId: string,
  updates: {
    name?: string;
    description?: string;
    color?: string;
  }
): Promise<void> => {
  try {
    await updateFolder({
      id: folderId,
      name: updates.name || null,
      description: updates.description || null,
      color: updates.color || null,
    });
  } catch (error) {
    console.error('Error updating folder:', error);
    throw error;
  }
};

// Delete folder
export const handleDeleteFolder = async (folderId: string): Promise<void> => {
  try {
    await deleteFolder({ id: folderId });
  } catch (error) {
    console.error('Error deleting folder:', error);
    throw error;
  }
};

// Utility: Format file size
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};
