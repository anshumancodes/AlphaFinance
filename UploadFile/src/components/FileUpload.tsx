'use client';

import { useState, useRef, ChangeEvent, DragEvent } from 'react';
import axios from 'axios';
import { isValidFileType } from '@/utils/fileUtils';

interface FileUploadProps {
  onUploadStart: () => void;
  onUploadComplete: (result: any) => void;
  onError: (error: string) => void;
}

export default function FileUpload({ onUploadStart, onUploadComplete, onError }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files);
      
      // Validate file types
      const invalidFiles = newFiles.filter(file => !isValidFileType(file.name));
      if (invalidFiles.length > 0) {
        onError(`Unsupported file type(s): ${invalidFiles.map(f => f.name).join(', ')}. Please upload only PDF, DOC, DOCX, XLS, XLSX, CSV, or TXT files.`);
        return;
      }
      
      setFiles(prevFiles => [...prevFiles, ...newFiles]);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      
      // Validate file types
      const invalidFiles = newFiles.filter(file => !isValidFileType(file.name));
      if (invalidFiles.length > 0) {
        onError(`Unsupported file type(s): ${invalidFiles.map(f => f.name).join(', ')}. Please upload only PDF, DOC, DOCX, XLS, XLSX, CSV, or TXT files.`);
        return;
      }
      
      setFiles(prevFiles => [...prevFiles, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      onError('Please select at least one file to upload');
      return;
    }

    if (isUploading) {
      return; // Prevent multiple uploads
    }

    onUploadStart();
    setIsUploading(true);

    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });

    try {
      const response = await axios.post('/api/analyze', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      onUploadComplete(response.data);
      setFiles([]);
    } catch (error: any) {
      console.error('Upload error:', error);
      // Extract error message from API response if available
      const errorMessage = error.response?.data?.error || 
                          (error instanceof Error ? error.message : 'An error occurred during file upload');
      
      onError(errorMessage);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <div
        className={`border border-dashed p-6 text-center rounded-md cursor-pointer transition-all ${
          isDragging ? 'border-blue-400 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          type="file"
          multiple
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.txt"
        />
        <div className="text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 mx-auto text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <p className="mt-2 text-sm font-medium">Drop files here or click to browse</p>
          <p className="mt-1 text-xs text-gray-400">
            PDF, DOC, DOCX, XLS, XLSX, CSV, TXT
          </p>
        </div>
      </div>

      {files.length > 0 && (
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-gray-500">Selected files ({files.length})</p>
          </div>
          <ul className="space-y-1.5 max-h-40 overflow-auto pr-1">
            {files.map((file, index) => (
              <li
                key={`${file.name}-${index}`}
                className="flex items-center justify-between py-1.5 px-3 bg-gray-50 rounded text-sm"
              >
                <div className="flex items-center overflow-hidden">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <span className="text-xs truncate max-w-[180px]">{file.name}</span>
                  <span className="text-xs text-gray-400 ml-1.5 flex-shrink-0">
                    ({(file.size / 1024).toFixed(0)} KB)
                  </span>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                  className="text-gray-400 hover:text-gray-600 ml-2 flex-shrink-0"
                  disabled={isUploading}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-4">
        <button
          onClick={handleUpload}
          disabled={files.length === 0 || isUploading}
          className={`w-full py-2 px-4 rounded text-sm font-medium text-white transition-colors ${
            files.length > 0 && !isUploading
              ? 'bg-blue-500 hover:bg-blue-600'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          {isUploading ? 'Analyzing...' : 'Analyze Files'}
        </button>
      </div>
    </div>
  );
} 