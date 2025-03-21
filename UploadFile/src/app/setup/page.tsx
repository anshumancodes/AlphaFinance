'use client';

export default function SetupGuidePage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Setup Guide - Financial Document Analyzer
      </h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
        
        <div className="space-y-6">
          <section>
            <h3 className="text-xl font-medium mb-2">1. Get a DeepSeek API Key</h3>
            <p className="mb-4 text-gray-700">
              This application uses the DeepSeek AI API to analyze financial documents. You'll need to get an API key from DeepSeek to use this application.
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Go to <a href="https://platform.deepseek.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">DeepSeek Platform</a></li>
              <li>Create an account or log in if you already have one</li>
              <li>Navigate to the API section to create a new API key</li>
              <li>Copy your API key</li>
            </ol>
          </section>
          
          <section>
            <h3 className="text-xl font-medium mb-2">2. Set Up Your Environment</h3>
            <p className="mb-4 text-gray-700">
              Once you have your DeepSeek API key, you need to add it to your environment.
            </p>
            <div className="bg-gray-50 p-4 rounded-md">
              <h4 className="font-medium mb-2">Update your .env.local file:</h4>
              <pre className="bg-gray-800 text-white p-3 rounded overflow-x-auto">
                <code>DEEPSEEK_API_KEY=your_deepseek_api_key_here</code>
              </pre>
              <p className="mt-2 text-sm text-gray-600">Replace 'your_deepseek_api_key_here' with the actual API key you obtained.</p>
            </div>
          </section>
          
          <section>
            <h3 className="text-xl font-medium mb-2">3. Restart Your Application</h3>
            <p className="mb-4 text-gray-700">
              After updating your API key, restart your application for the changes to take effect.
            </p>
            <pre className="bg-gray-800 text-white p-3 rounded overflow-x-auto">
              <code>npm run dev</code>
            </pre>
          </section>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Using the Application</h2>
        
        <div className="space-y-6">
          <section>
            <h3 className="text-xl font-medium mb-2">Uploading Files</h3>
            <p className="mb-4 text-gray-700">
              The application supports various file formats for financial document analysis:
            </p>
            <ul className="list-disc pl-6 grid grid-cols-2 gap-2">
              <li>PDF (.pdf)</li>
              <li>Microsoft Word (.doc, .docx)</li>
              <li>Microsoft Excel (.xls, .xlsx)</li>
              <li>CSV (.csv)</li>
              <li>Text (.txt)</li>
            </ul>
            <p className="mt-4 text-gray-700">
              Simply drag and drop your files into the upload area, or click to select files from your device.
            </p>
          </section>
          
          <section>
            <h3 className="text-xl font-medium mb-2">Analysis Results</h3>
            <p className="mb-4 text-gray-700">
              After uploading your files, the application will analyze them using the DeepSeek API and provide you with comprehensive results, including:
            </p>
            <ul className="list-disc pl-6">
              <li><span className="font-medium">Summary:</span> An overview of the financial situation.</li>
              <li><span className="font-medium">Key Metrics:</span> Important financial figures and ratios.</li>
              <li><span className="font-medium">Insights:</span> Observations and implications from the data.</li>
              <li><span className="font-medium">Recommendations:</span> Strategic suggestions based on the analysis.</li>
              <li><span className="font-medium">Risks:</span> Potential vulnerabilities or concerns.</li>
            </ul>
          </section>
          
          <div className="mt-8 text-center">
            <a href="/" className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
              Go Back to Upload Page
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 