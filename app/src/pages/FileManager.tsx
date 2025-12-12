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

import { useState, useEffect } from 'react';
import { onAuthStateChanged, User, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../lib/firebase';
import {
  handleListFiles,
  handleListFolders,
  handleUploadFile,
  handleDownloadFile,
  handleDeleteFile,
  handleCreateFolder,
  handleGetStorageStats,
  formatFileSize,
  UploadProgress,
} from '../lib/FileService';

interface FileItem {
  id: string;
  name: string;
  storagePath: string;
  mimeType?: string;
  size: string;
  uploadedAt: string;
  downloadCount?: number;
  description?: string;
  tags?: string[];
}

interface FolderItem {
  id: string;
  name: string;
  color?: string;
  description?: string;
  createdAt: string;
  parentFolderId?: string;
}

interface BreadcrumbItem {
  id?: string;
  name: string;
}

export default function FileManager() {
  const [user, setUser] = useState<User | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [files, setFiles] = useState<FileItem[]>([]);
  const [filteredFiles, setFilteredFiles] = useState<FileItem[]>([]);
  const [folders, setFolders] = useState<FolderItem[]>([]);
  const [allFolders, setAllFolders] = useState<FolderItem[]>([]); // All folders for breadcrumb
  const [currentFolderId, setCurrentFolderId] = useState<string | undefined>();
  const [uploadProgress, setUploadProgress] = useState<Map<string, UploadProgress>>(new Map());
  const [storageStats, setStorageStats] = useState({ totalSize: 0, fileCount: 0, formattedSize: '0 Bytes' });
  const [showNewFolderModal, setShowNewFolderModal] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'images' | 'videos' | 'documents' | 'audio'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'size'>('date');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([{ name: 'Home' }]);

  // Monitor auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        loadData();
      }
    });
    return () => unsubscribe();
  }, []);

  const userId = user?.uid || 'demo-user'; // Fallback for backward compatibility

  // Build breadcrumb path whenever currentFolderId or allFolders change
  useEffect(() => {
    if (!currentFolderId) {
      setBreadcrumbs([{ name: 'Home' }]);
      return;
    }

    const buildPath = (folderId: string): BreadcrumbItem[] => {
      const folder = allFolders.find(f => f.id === folderId);
      if (!folder) return [];

      const path: BreadcrumbItem[] = [{ id: folder.id, name: folder.name }];
      
      if (folder.parentFolderId) {
        const parentPath = buildPath(folder.parentFolderId);
        return [...parentPath, ...path];
      }

      return path;
    };

    const path = buildPath(currentFolderId);
    setBreadcrumbs([{ name: 'Home' }, ...path]);
  }, [currentFolderId, allFolders]);

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [currentFolderId, user]);

  useEffect(() => {
    applyFiltersAndSort();
  }, [files, searchTerm, filterType, sortBy]);

  const applyFiltersAndSort = () => {
    let filtered = [...files];

    // Apply search
    if (searchTerm) {
      filtered = filtered.filter(file =>
        file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        file.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        file.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply type filter
    if (filterType !== 'all') {
      filtered = filtered.filter(file => {
        if (!file.mimeType) return false;
        switch (filterType) {
          case 'images': return file.mimeType.startsWith('image/');
          case 'videos': return file.mimeType.startsWith('video/');
          case 'audio': return file.mimeType.startsWith('audio/');
          case 'documents': return file.mimeType.includes('pdf') || file.mimeType.includes('document') || file.mimeType.includes('text');
          default: return true;
        }
      });
    }

    // Apply sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'size':
          return Number(b.size) - Number(a.size);
        case 'date':
        default:
          return new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime();
      }
    });

    setFilteredFiles(filtered);
  };

  const loadData = async () => {
    setLoading(true);
    await Promise.all([loadFiles(), loadFolders(), loadStats()]);
    setLoading(false);
  };

  const loadFiles = async () => {
    const fileList = await handleListFiles(currentFolderId);
    if (fileList) setFiles(fileList as FileItem[]);
  };

  const loadFolders = async () => {
    // Load child folders for display
    const folderList = await handleListFolders(currentFolderId);
    if (folderList) setFolders(folderList as FolderItem[]);
    
    // Also load all folders to build breadcrumb path
    const allFoldersList = await handleListFolders(undefined);
    if (allFoldersList) setAllFolders(allFoldersList as FolderItem[]);
  };

  const loadStats = async () => {
    const stats = await handleGetStorageStats(userId);
    setStorageStats(stats);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (!fileList) return;

    for (const file of Array.from(fileList)) {
      const fileId = `${Date.now()}-${file.name}`;
      setUploadProgress(prev => new Map(prev).set(fileId, { progress: 0, state: 'running' }));

      try {
        await handleUploadFile(
          file,
          userId,
          currentFolderId,
          (progress) => {
            setUploadProgress(prev => new Map(prev).set(fileId, progress));
          }
        );

        // Remove progress after success
        setTimeout(() => {
          setUploadProgress(prev => {
            const newMap = new Map(prev);
            newMap.delete(fileId);
            return newMap;
          });
        }, 2000);

        await loadData();
      } catch (error) {
        console.error('Upload failed:', error);
        setUploadProgress(prev => new Map(prev).set(fileId, { progress: 0, state: 'error', error: 'Upload failed' }));
      }
    }
  };

  const handleDownload = async (file: FileItem) => {
    try {
      await handleDownloadFile(file.storagePath, file.name, file.id);
      await loadFiles(); // Refresh to update download count
    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to download file');
    }
  };

  const handleDelete = async (file: FileItem) => {
    if (!confirm(`Delete ${file.name}?`)) return;

    try {
      await handleDeleteFile(file.id, file.storagePath);
      await loadData();
    } catch (error) {
      console.error('Delete failed:', error);
      alert('Failed to delete file');
    }
  };

  const handleNewFolder = async () => {
    if (!newFolderName.trim()) return;

    try {
      await handleCreateFolder(newFolderName, currentFolderId);
      setNewFolderName('');
      setShowNewFolderModal(false);
      await loadData();
    } catch (error) {
      console.error('Create folder failed:', error);
      alert('Failed to create folder');
    }
  };

  const getFileIcon = (mimeType?: string) => {
    if (!mimeType) return '📄';
    if (mimeType.startsWith('image/')) return '🖼️';
    if (mimeType.startsWith('video/')) return '🎥';
    if (mimeType.startsWith('audio/')) return '🎵';
    if (mimeType.includes('pdf')) return '📕';
    if (mimeType.includes('zip') || mimeType.includes('rar')) return '📦';
    if (mimeType.includes('word')) return '📝';
    if (mimeType.includes('sheet') || mimeType.includes('excel')) return '📊';
    return '📄';
  };

  const handleSignIn = async () => {
    if (isSigningIn) return; // Prevent multiple simultaneous sign-in attempts
    
    try {
      setIsSigningIn(true);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      // Ignore popup cancelled errors (user closed popup)
      if (error?.code !== 'auth/popup-closed-by-user' && error?.code !== 'auth/cancelled-popup-request') {
        console.error('Sign in error:', error);
      }
    } finally {
      setIsSigningIn(false);
    }
  };

  // Show login screen if not authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <div className="text-center">
              <div className="mx-auto h-24 w-24 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-6">
                <svg className="h-12 w-12 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                File Manager
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Sign in to access your files and folders
              </p>
              <button
                onClick={handleSignIn}
                disabled={isSigningIn}
                className="w-full flex items-center justify-center gap-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                {isSigningIn ? 'Signing in...' : 'Sign in with Google'}
              </button>
              <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
                Firebase Data Connect + Storage Demo
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">📁 File Manager</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">Firebase Data Connect + Storage Demo</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600 dark:text-gray-400">Storage Used</div>
              <div className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                {storageStats.formattedSize}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-500">{storageStats.fileCount} files</div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Folders */}
          <aside className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Folders</h2>
                <button
                  onClick={() => setShowNewFolderModal(true)}
                  className="text-blue-600 hover:text-blue-700 text-2xl"
                  title="New Folder"
                >
                  +
                </button>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => setCurrentFolderId(undefined)}
                  className={`w-full text-left px-3 py-2 rounded ${
                    !currentFolderId
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  🏠 All Files
                </button>

                {folders.map((folder) => (
                  <button
                    key={folder.id}
                    onClick={() => setCurrentFolderId(folder.id)}
                    className={`w-full text-left px-3 py-2 rounded ${
                      currentFolderId === folder.id
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <span style={{ color: folder.color || '#6B7280' }}>📁</span> {folder.name}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Breadcrumb Navigation */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow px-6 py-3">
              <nav className="flex items-center text-sm">
                {breadcrumbs.map((crumb, index) => (
                  <div key={crumb.id || 'home'} className="flex items-center">
                    {index > 0 && <span className="mx-2 text-gray-400">/</span>}
                    <button
                      onClick={() => setCurrentFolderId(crumb.id)}
                      className={`hover:text-blue-600 transition-colors ${
                        index === breadcrumbs.length - 1
                          ? 'text-blue-600 dark:text-blue-400 font-semibold'
                          : 'text-gray-600 dark:text-gray-400'
                      }`}
                    >
                      {index === 0 ? '🏠 ' : '📁 '}
                      {crumb.name}
                    </button>
                  </div>
                ))}
              </nav>
            </div>

            {/* Upload Area */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Upload Files</h2>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <span className="text-4xl mb-2">📤</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Click to upload files
                  </span>
                </label>
              </div>

              {/* Upload Progress */}
              {uploadProgress.size > 0 && (
                <div className="mt-4 space-y-2">
                  {Array.from(uploadProgress.entries()).map(([fileId, progress]) => (
                    <div key={fileId} className="bg-gray-100 dark:bg-gray-700 rounded p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm truncate">{fileId.split('-').slice(1).join('-')}</span>
                        <span className="text-sm">{Math.round(progress.progress)}%</span>
                      </div>
                      <div className="w-full bg-gray-300 dark:bg-gray-600 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all ${
                            progress.state === 'success'
                              ? 'bg-green-500'
                              : progress.state === 'error'
                              ? 'bg-red-500'
                              : 'bg-blue-500'
                          }`}
                          style={{ width: `${progress.progress}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Files Grid */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 gap-4">
                <h2 className="text-lg font-semibold">
                  Files {currentFolderId && `in ${folders.find(f => f.id === currentFolderId)?.name}`}
                </h2>

                {/* Search and Filters */}
                <div className="flex flex-col sm:flex-row gap-3 flex-1 lg:max-w-2xl">
                  {/* Search */}
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search files..."
                      className="w-full px-4 py-2 pl-10 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      🔍
                    </span>
                    {searchTerm && (
                      <button
                        onClick={() => setSearchTerm('')}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  {/* Filter Type */}
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value as any)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  >
                    <option value="all">All Types</option>
                    <option value="images">🖼️ Images</option>
                    <option value="videos">🎥 Videos</option>
                    <option value="audio">🎵 Audio</option>
                    <option value="documents">📄 Documents</option>
                  </select>

                  {/* Sort */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  >
                    <option value="date">📅 Date</option>
                    <option value="name">🔤 Name</option>
                    <option value="size">📊 Size</option>
                  </select>

                  {/* View Mode */}
                  <div className="flex border border-gray-300 dark:border-gray-600 rounded overflow-hidden">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`px-3 py-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-700'}`}
                      title="Grid View"
                    >
                      ⊞
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`px-3 py-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-700'}`}
                      title="List View"
                    >
                      ☰
                    </button>
                  </div>
                </div>
              </div>

              {/* Results Count */}
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {filteredFiles.length} {filteredFiles.length === 1 ? 'file' : 'files'}
                {searchTerm && ` matching "${searchTerm}"`}
                {filterType !== 'all' && ` (${filterType})`}
              </div>

              {loading ? (
                <div className="text-center py-12 text-gray-500">Loading...</div>
              ) : filteredFiles.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  {searchTerm || filterType !== 'all' ? 'No files match your search criteria' : 'No files found'}
                </div>
              ) : viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredFiles.map((file) => (
                    <div
                      key={file.id}
                      className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-3xl">{getFileIcon(file.mimeType)}</span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleDownload(file)}
                            className="text-blue-600 hover:text-blue-700"
                            title="Download"
                          >
                            ⬇️
                          </button>
                          <button
                            onClick={() => handleDelete(file)}
                            className="text-red-600 hover:text-red-700"
                            title="Delete"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                      <h3 className="font-medium truncate mb-1" title={file.name}>
                        {file.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {formatFileSize(Number(file.size))}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        {file.downloadCount || 0} downloads
                      </p>
                      {file.tags && file.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {file.tags.map((tag, i) => (
                            <span key={i} className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-0.5 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredFiles.map((file) => (
                    <div
                      key={file.id}
                      className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-4"
                    >
                      <span className="text-2xl">{getFileIcon(file.mimeType)}</span>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium truncate" title={file.name}>
                          {file.name}
                        </h3>
                        <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400">
                          <span>{formatFileSize(Number(file.size))}</span>
                          <span>{new Date(file.uploadedAt).toLocaleDateString()}</span>
                          <span>{file.downloadCount || 0} downloads</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleDownload(file)}
                          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                          Download
                        </button>
                        <button
                          onClick={() => handleDelete(file)}
                          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* New Folder Modal */}
      {showNewFolderModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Create New Folder</h3>
            <input
              type="text"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              placeholder="Folder name"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 mb-4"
              onKeyPress={(e) => e.key === 'Enter' && handleNewFolder()}
            />
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowNewFolderModal(false);
                  setNewFolderName('');
                }}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleNewFolder}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
