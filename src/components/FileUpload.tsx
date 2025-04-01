import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import DatasetChat from './DatasetChat';

const FileUpload = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setUploadedFile(acceptedFiles[0]);
      handleFileUpload(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/json': ['.json'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
    },
    multiple: false
  });

  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 500);

    try {
      // Here you would typically send the file to your backend
      // const formData = new FormData();
      // formData.append('file', file);
      // await fetch('/api/upload', { method: 'POST', body: formData });
      
      await new Promise(resolve => setTimeout(resolve, 5000)); // Simulate API call
      clearInterval(interval);
      setUploadProgress(100);
      
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 dark:text-white">Upload Dataset</h2>
      
      <div 
        {...getRootProps()} 
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive 
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
            : 'border-gray-300 hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500'
          }`}
      >
        <input {...getInputProps()} />
        
        {isUploading ? (
          <div className="space-y-4">
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div 
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Uploading... {uploadProgress}%
            </p>
          </div>
        ) : (
          <>
            <svg 
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M24 8v24m0-24l-8 8m8-8l8 8m-8 16H12a4 4 0 01-4-4V12a4 4 0 014-4h24a4 4 0 014 4v20a4 4 0 01-4 4H24z"
              />
            </svg>
            
            <p className="mt-2 text-base text-gray-600 dark:text-gray-400">
              Drop your dataset here, or click to select
            </p>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-500">
              CSV, JSON, XLS, or XLSX files
            </p>
          </>
        )}
      </div>

      {uploadedFile && !isUploading && (
        <>
          <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <p className="text-sm text-green-600 dark:text-green-400">
              File "{uploadedFile.name}" uploaded successfully!
            </p>
          </div>
          <div className="mt-8">
            <DatasetChat dataset={uploadedFile} />
          </div>
        </>
      )}
    </div>
  );
};

export default FileUpload;
