import { NextRequest, NextResponse } from 'next/server';
import { analyzeFinancialDocument } from '@/services/deepseekService';

export async function POST(req: NextRequest) {
  try {
    // Parse the incoming form data using the native formData() method
    const formData = await req.formData();
    const files = formData.getAll('files') as File[];
    
    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: 'No files uploaded' },
        { status: 400 }
      );
    }
    
    // Process only the first file for now
    const file = files[0];
    
    // Convert the File object to text content
    try {
      const fileContent = await file.text();
      
      // Analyze the document with DeepSeek API
      try {
        const analysisResult = await analyzeFinancialDocument(fileContent, file.name);
        return NextResponse.json(analysisResult);
      } catch (apiError: any) {
        // Handle specific DeepSeek API errors
        console.error('DeepSeek API error:', apiError.message);
        return NextResponse.json(
          { error: apiError.message },
          { status: 400 }  // Using 400 instead of 500 for API configuration issues
        );
      }
    } catch (fileError) {
      console.error('Error reading file:', fileError);
      return NextResponse.json(
        { error: 'Could not read the uploaded file. Please try another file.' },
        { status: 400 }
      );
    }
    
  } catch (error) {
    console.error('Error processing upload:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error occurred' },
      { status: 500 }
    );
  }
} 