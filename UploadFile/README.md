# Financial Document Analyzer

This is a web application that allows users to upload financial documents and analyze them using the DeepSeek AI API. The application can analyze various types of financial documents such as balance sheets, income statements, cash flow statements, and other financial reports.

## Features

- Upload financial documents (PDF, DOC, DOCX, XLS, XLSX, CSV, TXT)
- AI-powered analysis using DeepSeek API
- Comprehensive financial analysis results including:
  - Summary of the financial situation
  - Key financial metrics with trends
  - Insights and observations
  - Recommendations based on the data
  - Potential risks and vulnerabilities

## Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- A DeepSeek API key (you can obtain this from the DeepSeek platform)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/financial-document-analyzer.git
cd financial-document-analyzer
```

2. Install the dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory and add your DeepSeek API key:
```
DEEPSEEK_API_KEY=your_deepseek_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:3000`

## Usage

1. Open the web application in your browser.
2. Drag and drop your financial documents into the upload area, or click to select files from your device.
3. Click the "Analyze Files" button to start the analysis process.
4. Wait for the analysis to complete. This might take a few moments depending on the size and complexity of the documents.
5. Review the comprehensive analysis results, including the summary, key metrics, insights, recommendations, and potential risks.

## Technology Stack

- Next.js - React framework for building the web application
- TypeScript - For type-safe code
- Tailwind CSS - For styling the UI
- DeepSeek API - For AI-powered financial document analysis

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- DeepSeek for providing the AI API for document analysis
- Next.js team for the incredible React framework 