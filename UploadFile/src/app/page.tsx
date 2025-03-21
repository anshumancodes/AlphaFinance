'use client';

import { useState } from 'react';
import FileUpload from '@/components/FileUpload';
import AnalysisResult from '@/components/AnalysisResult';
import Link from 'next/link';

export default function Home() {
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalysisComplete = (result: any) => {
    setAnalysisResult(result);
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-medium mb-2 text-center">
        Financial Document Analyzer
      </h1>
      
      <div className="mb-8 text-center">
        <p className="text-sm text-gray-500">
          Upload financial documents for AI analysis
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6">
          <FileUpload 
            onUploadStart={() => {
              setLoading(true);
              setError(null);
              setAnalysisResult(null);
            }}
            onUploadComplete={handleAnalysisComplete}
            onError={(errMsg) => {
              setError(errMsg);
              setLoading(false);
            }}
          />
        </div>
        
        {loading && (
          <div className="p-6 border-t border-gray-100 text-center">
            <div className="inline-block animate-spin rounded-full h-6 w-6 border-2 border-blue-500 border-t-transparent"></div>
            <p className="mt-2 text-sm text-gray-500">Analyzing your document...</p>
          </div>
        )}
        
        {error && (
          <div className="p-6 border-t border-gray-100 bg-red-50">
            <p className="text-sm font-medium text-red-700 mb-1">Error</p>
            <p className="text-sm text-red-600">{error}</p>
            {error.includes('API key') && (
              <div className="mt-3">
                <Link href="/setup" className="text-xs text-blue-600 hover:underline">
                  View setup guide
                </Link>
              </div>
            )}
          </div>
        )}
        
        {analysisResult && <AnalysisResult result={analysisResult} />}
      </div>
      
      <div className="mt-4 text-center">
        <Link href="/setup" className="text-xs text-gray-500 hover:text-gray-700">
          Setup Guide
        </Link>
      </div>
    </div>
  );
} 