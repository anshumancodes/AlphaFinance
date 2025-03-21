/**
 * Extracts text content from different file types
 */
export async function extractTextFromFile(file: File): Promise<string> {
  const fileType = getFileType(file.name);
  
  // For now, we'll use a simple text extraction approach
  // In a production app, you might want to use specialized libraries
  // for different file types like PDF.js for PDFs, xlsx for Excel, etc.
  
  try {
    // For plain text files
    if (['txt', 'csv'].includes(fileType)) {
      return await file.text();
    }
    
    // For other file types, we'll just use the text() method
    // but in a real app, you would use specialized parsers
    return await file.text();
    
  } catch (error) {
    console.error(`Error extracting text from ${file.name}:`, error);
    throw new Error(`Failed to extract text from ${file.name}`);
  }
}

/**
 * Gets the file extension from filename
 */
export function getFileType(fileName: string): string {
  return fileName.split('.').pop()?.toLowerCase() || '';
}

/**
 * Validates if the file is of an acceptable type
 */
export function isValidFileType(fileName: string): boolean {
  const acceptedTypes = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'csv', 'txt'];
  const fileType = getFileType(fileName);
  
  return acceptedTypes.includes(fileType);
}

/**
 * Formats file size in a human-readable format
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
} 