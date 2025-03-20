
import { MessageSquare, TrendingUp, AlertTriangle } from "lucide-react";

type AnalyticsCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

function FinancialAnalytics() {
  return (
    <div className="text-white px-4 sm:px-6 md:px-8 max-w-7xl mx-auto py-10">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
        <span className="text-blue-400">AI-Powered</span> Financial Analytics
      </h2>
      <p className="text-center text-gray-400 mb-8 sm:mb-12 max-w-3xl mx-auto text-lg">
        Discover hidden insights and patterns in financial data with our sophisticated machine learning algorithms.
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        <AnalyticsCard 
          icon={<MessageSquare size={36} className="text-blue-400" />} 
          title="Natural Language Processing"
          description="Analyze news, reports, and social media to extract sentiment and relevant insights that impact financial markets."
        />

        <AnalyticsCard 
          icon={<TrendingUp size={36} className="text-purple-400" />} 
          title="Predictive Analytics"
          description="Forecast market trends, identify potential risks, and discover investment opportunities with machine learning models."
        />

        <AnalyticsCard 
          icon={<AlertTriangle size={36} className="text-red-400" />} 
          title="Anomaly Detection"
          description="Identify unusual patterns, fraudulent activities, and market irregularities before they impact your investments."
        />
      </div>
    </div>
  );
}

function AnalyticsCard({ icon, title, description }: AnalyticsCardProps) {
  return (
    <div className="bg-gray-800 p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow border border-gray-700 h-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-4 sm:mb-6">
        <div className="p-3 sm:p-4 bg-gray-700 rounded-full mb-3 sm:mb-0 inline-flex self-start">
          {icon}
        </div>
        <h3 className="text-xl sm:text-2xl font-semibold">{title}</h3>
      </div>
      <p className="text-base sm:text-lg text-gray-400 leading-relaxed">{description}</p>
    </div>
  );
}

export default FinancialAnalytics;
