'use client';

interface AnalysisResultProps {
  result: any;
}

export default function AnalysisResult({ result }: AnalysisResultProps) {
  if (!result) return null;
  
  return (
    <div className="border-t border-gray-100">
      <div className="p-6">
        <h2 className="text-base font-medium mb-4 text-gray-800">Analysis Results</h2>
        
        {result.summary && (
          <div className="mb-5">
            <h3 className="text-sm font-medium mb-2 text-gray-700">Summary</h3>
            <div className="p-3 bg-gray-50 rounded text-sm">
              <p className="text-gray-600 whitespace-pre-line">{result.summary}</p>
            </div>
          </div>
        )}
        
        {result.keyMetrics && result.keyMetrics.length > 0 && (
          <div className="mb-5">
            <h3 className="text-sm font-medium mb-2 text-gray-700">Key Metrics</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {result.keyMetrics.map((metric: any, index: number) => (
                <div key={index} className="p-3 bg-gray-50 rounded">
                  <div className="text-xs font-medium text-gray-600">{metric.name}</div>
                  <div className="mt-1 text-base font-semibold text-gray-800">{metric.value}</div>
                  {metric.trend && (
                    <div className={`mt-1 text-xs ${getTrendColor(metric.trend)}`}>
                      {metric.trend}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {result.insights && result.insights.length > 0 && (
            <div>
              <h3 className="text-sm font-medium mb-2 text-gray-700">Insights</h3>
              <ul className="space-y-2">
                {result.insights.map((insight: string, index: number) => (
                  <li key={index} className="p-3 bg-gray-50 rounded text-xs text-gray-600">
                    {insight}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {result.recommendations && result.recommendations.length > 0 && (
            <div>
              <h3 className="text-sm font-medium mb-2 text-gray-700">Recommendations</h3>
              <ul className="space-y-2">
                {result.recommendations.map((recommendation: string, index: number) => (
                  <li key={index} className="p-3 bg-gray-50 rounded text-xs text-gray-600">
                    {recommendation}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        {result.risks && result.risks.length > 0 && (
          <div className="mt-5">
            <h3 className="text-sm font-medium mb-2 text-gray-700">Potential Risks</h3>
            <ul className="space-y-2">
              {result.risks.map((risk: string, index: number) => (
                <li key={index} className="p-3 bg-gray-50 rounded text-xs text-gray-600">
                  {risk}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

function getTrendColor(trend: string) {
  if (trend.includes('positive') || trend.includes('increase') || trend.includes('up')) {
    return 'text-green-600';
  } else if (trend.includes('negative') || trend.includes('decrease') || trend.includes('down')) {
    return 'text-red-600';
  }
  return 'text-gray-500';
} 