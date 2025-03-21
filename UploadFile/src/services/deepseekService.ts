import axios from 'axios';

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY || '';
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1';
const USE_MOCK_SERVICE = true; // Set to true to use mock service instead of real API

export interface AnalysisResult {
  summary: string;
  keyMetrics?: Array<{
    name: string;
    value: string;
    trend?: string;
  }>;
  insights?: string[];
  recommendations?: string[];
  risks?: string[];
}

export async function analyzeFinancialDocument(fileContent: string, fileName: string): Promise<AnalysisResult> {
  try {
    // If USE_MOCK_SERVICE is true, return mock data instead of calling the API
    if (USE_MOCK_SERVICE) {
      console.log('Using mock service instead of DeepSeek API');
      return getMockAnalysisResult(fileName);
    }
    
    // Check if API key is configured
    if (!DEEPSEEK_API_KEY || DEEPSEEK_API_KEY === 'your_deepseek_api_key_here') {
      throw new Error('DeepSeek API key is not configured. Please update your .env.local file with a valid API key.');
    }
    
    // Determine document type based on filename extension
    const fileExtension = fileName.split('.').pop()?.toLowerCase();
    const documentType = getDocumentType(fileExtension);
    
    // Create prompt for DeepSeek API based on document type
    const prompt = createPromptForDocumentType(documentType, fileContent);
    
    // Make API request to DeepSeek
    try {
      const response = await axios.post(
        `${DEEPSEEK_API_URL}/chat/completions`,
        {
          model: 'deepseek-chat',
          messages: [
            {
              role: 'system',
              content: 'You are a professional financial analyst with expertise in analyzing financial documents. Your task is to provide a comprehensive analysis of the financial document provided, including summary, key metrics, insights, recommendations, and potential risks.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.2
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
          }
        }
      );
      
      // Parse the AI response into structured format
      const analysisResult = parseAIResponse(response.data.choices[0].message.content);
      return analysisResult;
    } catch (apiError: any) {
      if (apiError.response && apiError.response.status === 401) {
        throw new Error('Invalid or expired DeepSeek API key. Please check your API key and try again.');
      } else if (apiError.response) {
        throw new Error(`DeepSeek API error (${apiError.response.status}): ${apiError.response.data.error?.message || 'Unknown API error'}`);
      } else {
        throw apiError;
      }
    }
    
  } catch (error) {
    console.error('Error calling DeepSeek API:', error);
    throw error; // Re-throw to allow handling at the API route level
  }
}

// Function to generate mock analysis result
function getMockAnalysisResult(fileName: string): AnalysisResult {
  const fileType = fileName.split('.').pop()?.toLowerCase() || 'unknown';
  const isFinancialStatement = fileName.toLowerCase().includes('financial') || 
                              fileName.toLowerCase().includes('balance') ||
                              fileName.toLowerCase().includes('income') ||
                              fileName.toLowerCase().includes('cash');
  
  return {
    summary: `This ${fileType} document appears to be a ${isFinancialStatement ? 'financial statement' : 'financial document'} from 2023. Overall, the financial position shows moderate growth with some areas of concern. Revenue has increased by 12% year-over-year, while expenses have grown at a slightly higher rate of 15%. The cash position remains strong, though the debt-to-equity ratio has increased slightly.`,
    
    keyMetrics: [
      {
        name: 'Revenue',
        value: '$5.4M',
        trend: 'Increased by 12% from previous year'
      },
      {
        name: 'Net Profit',
        value: '$1.2M',
        trend: 'Increased by 8% from previous year'
      },
      {
        name: 'Operating Margin',
        value: '22.5%',
        trend: 'Decreased by 1.5% from previous year'
      },
      {
        name: 'Cash Reserves',
        value: '$3.2M',
        trend: 'Increased by 15% from previous year'
      },
      {
        name: 'Debt-to-Equity Ratio',
        value: '0.42',
        trend: 'Increased by 0.05 from previous year'
      },
      {
        name: 'Current Ratio',
        value: '2.1',
        trend: 'Stable compared to previous year'
      }
    ],
    
    insights: [
      'Revenue growth is solid at 12%, indicating strong market performance and increased customer acquisition.',
      'Rising operational costs have slightly outpaced revenue growth, suggesting potential inefficiencies in operations.',
      'The cash position has improved significantly, providing better liquidity for future investments or contingencies.',
      'The increase in debt-to-equity ratio signals higher financial leverage, which could be concerning if the trend continues.',
      'Product line A shows the highest profitability with a 35% margin, while product line C is underperforming with only 15% margin.'
    ],
    
    recommendations: [
      'Implement cost-cutting measures focused on operational efficiency to address the growing expense ratio.',
      'Consider investing the increased cash reserves in expansion or research and development to drive future growth.',
      'Develop a strategy to improve the performance of product line C or consider phasing it out if improvements cannot be made.',
      'Monitor the increasing debt-to-equity ratio and potentially develop a debt reduction plan if it exceeds 0.5.',
      'Explore new market opportunities in the Asia-Pacific region, which shows the highest growth potential based on market analysis.'
    ],
    
    risks: [
      'The increasing operational expenses could impact profitability if revenue growth slows down.',
      'Rising interest rates may increase the cost of servicing the company\'s debt.',
      'Market competition is intensifying, particularly in the North American region, threatening market share.',
      'Regulatory changes expected in Q3 2023 may impact compliance costs and operational procedures.',
      'Supply chain disruptions remain a concern, with potential impacts on inventory management and production costs.'
    ]
  };
}

function getDocumentType(fileExtension?: string): string {
  switch (fileExtension) {
    case 'xls':
    case 'xlsx':
      return 'spreadsheet';
    case 'pdf':
      return 'pdf';
    case 'doc':
    case 'docx':
      return 'document';
    case 'csv':
      return 'csv';
    case 'txt':
    default:
      return 'text';
  }
}

function createPromptForDocumentType(documentType: string, content: string): string {
  let basePrompt = `Please analyze the following financial ${documentType}:\n\n${content}\n\n`;
  
  basePrompt += `Provide a detailed analysis with the following structure:
1. Summary: A comprehensive overview of the financial situation.
2. Key Metrics: Extract important financial figures, ratios, and their trends.
3. Key Insights: Important observations and implications.
4. Recommendations: Strategic suggestions based on the financial data.
5. Potential Risks: Any concerning trends or vulnerabilities.

Format your response as a JSON object with these sections as keys. For key metrics, include an array of objects with 'name', 'value', and 'trend' properties. For insights, recommendations, and risks, provide arrays of strings.`;
  
  return basePrompt;
}

function parseAIResponse(aiResponse: string): AnalysisResult {
  try {
    // Try to parse as JSON first
    return JSON.parse(aiResponse);
  } catch (error) {
    // If not valid JSON, extract sections manually
    const summary = extractSection(aiResponse, 'Summary', 'Key Metrics') || 
                    extractSection(aiResponse, 'Summary', 'Key Insights') ||
                    'No summary provided';
    
    const keyMetricsText = extractSection(aiResponse, 'Key Metrics', 'Key Insights') || '';
    const keyMetrics = keyMetricsText
      .split('\n')
      .filter(line => line.trim().length > 0 && line.includes(':'))
      .map(line => {
        const [name, valueWithTrend] = line.split(':', 2);
        const valueMatch = valueWithTrend.match(/([^(]+)(\(([^)]+)\))?/);
        
        return {
          name: name.trim(),
          value: valueMatch ? valueMatch[1].trim() : valueWithTrend.trim(),
          trend: valueMatch && valueMatch[3] ? valueMatch[3].trim() : undefined
        };
      });
    
    const insights = extractListItems(extractSection(aiResponse, 'Key Insights', 'Recommendations'));
    const recommendations = extractListItems(extractSection(aiResponse, 'Recommendations', 'Potential Risks'));
    const risks = extractListItems(extractSection(aiResponse, 'Potential Risks', null));
    
    return {
      summary,
      keyMetrics: keyMetrics.length > 0 ? keyMetrics : undefined,
      insights: insights.length > 0 ? insights : undefined,
      recommendations: recommendations.length > 0 ? recommendations : undefined,
      risks: risks.length > 0 ? risks : undefined
    };
  }
}

function extractSection(text: string, startSection: string, endSection: string | null): string | null {
  const startRegex = new RegExp(`${startSection}[:\\s]*`, 'i');
  const startMatch = text.match(startRegex);
  
  if (!startMatch) return null;
  
  const startIndex = startMatch.index! + startMatch[0].length;
  
  let endIndex = text.length;
  if (endSection) {
    const endRegex = new RegExp(`${endSection}[:\\s]*`, 'i');
    const endMatch = text.substr(startIndex).match(endRegex);
    if (endMatch) {
      endIndex = startIndex + endMatch.index!;
    }
  }
  
  return text.substring(startIndex, endIndex).trim();
}

function extractListItems(text: string | null): string[] {
  if (!text) return [];
  
  // Try to extract numbered or bulleted list items
  const listItemRegex = /(?:^|\n)[\s-]*(?:\d+\.|\*|\-|\•)\s*(.+)/g;
  // Fix for TS error: Use Array.from with a callback instead of spread
  const matches = Array.from(text.matchAll(listItemRegex), match => match);
  
  if (matches.length > 0) {
    return matches.map(match => match[1].trim());
  }
  
  // If no list items found, split by newlines
  return text
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0);
} 