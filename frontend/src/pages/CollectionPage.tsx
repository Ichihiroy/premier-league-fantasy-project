import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

interface CollectionItem {
  id: string;
  name: string;
  type: 'image' | 'document' | 'other';
  size: number;
  url: string;
  thumbnail_url?: string;
  uploaded_at: string;
}

interface CollectionResponse {
  data: CollectionItem[];
  meta: {
    total: number;
    page: number;
    per_page: number;
    total_pages: number;
  };
}

export default function CollectionPage() {
  const [items, setItems] = useState<CollectionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    fetchCollection();
  }, []);

  const fetchCollection = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:4000/api/collection', {
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch collection');
      }

      const data: CollectionResponse = await response.json();
      setItems(data.data);
    } catch (error) {
      console.error('Error fetching collection:', error);
      toast.error('Failed to load collection');
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await fetch('http://localhost:4000/api/files/upload', {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      await response.json();
      toast.success('File uploaded successfully!');
      setSelectedFile(null);
      fetchCollection(); // Refresh the collection
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Failed to upload file');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (itemId: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      const response = await fetch(`http://localhost:4000/api/files/${itemId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to delete item');
      }

      toast.success('Item deleted successfully');
      fetchCollection(); // Refresh the collection
    } catch (error) {
      console.error('Error deleting item:', error);
      toast.error('Failed to delete item');
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image':
        return (
          <svg className="w-12 h-12 text-accent-lime" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
          </svg>
        );
      case 'document':
        return (
          <svg className="w-12 h-12 text-accent-teal" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
          </svg>
        );
      default:
        return (
          <svg className="w-12 h-12 text-accent-magenta" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-accent-magenta border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-white text-lg">Loading your collection...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-6 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 fade-up">
          <h1 className="text-display text-white font-bold">My Collection</h1>
          <p className="text-body-lg text-neutral-300 mt-2">
            Upload and manage your fantasy football assets
          </p>
        </div>

        {/* Upload Section */}
        <div className="card mb-8 fade-up fade-up-delay-1">
          <h2 className="text-h3 text-white font-bold mb-6">Upload Files</h2>
          
          {/* Drag and Drop Area */}
          <div
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
              dragActive
                ? 'border-accent-teal bg-accent-teal/10 scale-105'
                : 'border-neutral-600 hover:border-neutral-500'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {selectedFile ? (
              <div className="space-y-6">
                <div className="flex items-center justify-center space-x-3">
                  {getFileIcon('other')}
                  <div className="text-left">
                    <div className="text-white font-semibold">{selectedFile.name}</div>
                    <div className="text-neutral-400 text-sm">({formatFileSize(selectedFile.size)})</div>
                  </div>
                </div>
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={handleUpload}
                    disabled={uploading}
                    className="btn-primary disabled:opacity-50"
                  >
                    {uploading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                        </svg>
                        Uploading...
                      </>
                    ) : (
                      'Upload File'
                    )}
                  </button>
                  <button
                    onClick={() => setSelectedFile(null)}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-accent-magenta to-accent-teal flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-white"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-white text-lg mb-2">Drag and drop your files here</p>
                  <p className="text-neutral-400 mb-4">or</p>
                  <label className="btn-primary cursor-pointer">
                    Choose Files
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                      multiple={false}
                    />
                  </label>
                </div>
                <p className="text-xs text-neutral-500">
                  Support for images, documents, and other file types
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Collection Grid */}
        {items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item, index) => (
              <div key={item.id} className={`card card-hover fade-up fade-up-delay-${(index % 4) + 1}`}>
                {/* Preview */}
                <div className="h-48 bg-gradient-to-br from-neutral-700 to-neutral-800 rounded-t-xl flex items-center justify-center">
                  {item.type === 'image' && item.thumbnail_url ? (
                    <img
                      src={item.thumbnail_url}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-t-xl"
                    />
                  ) : (
                    getFileIcon(item.type)
                  )}
                </div>

                {/* Details */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-white truncate mb-2">
                    {item.name}
                  </h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-neutral-400">Size</span>
                      <span className="text-sm text-accent-teal">
                        {formatFileSize(item.size)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-neutral-400">Uploaded</span>
                      <span className="text-sm text-neutral-300">
                        {new Date(item.uploaded_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary flex-1 text-center text-sm py-2"
                    >
                      View
                    </a>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="btn-danger flex-1 text-sm py-2"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 fade-up fade-up-delay-2">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-accent-magenta to-accent-teal flex items-center justify-center">
              <svg
                className="w-12 h-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <h3 className="text-h3 text-white font-bold mb-2">
              Your collection is empty
            </h3>
            <p className="text-neutral-300 mb-6 max-w-md mx-auto">
              Upload your first files to start building your fantasy football collection
            </p>
            <div className="inline-block bg-gradient-to-r from-accent-magenta to-accent-teal p-px rounded-lg">
              <div className="bg-neutral-900 rounded-lg px-6 py-3 hover:bg-transparent transition-colors duration-300 cursor-pointer">
                <span className="text-gradient font-semibold">Start uploading files</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}