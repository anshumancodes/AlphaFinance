import { useState } from 'react';
import { ArrowRight, ChevronDown, ChevronUp, ThumbsUp, AlertTriangle } from 'lucide-react';

const faqs = [
  {
    question: "How does AI collect and preprocess financial data?",
    answer:
      "Our AI aggregates data from various sources, cleanses inconsistencies, and structures it for accurate analysis."
  },
  {
    question: "What techniques are used for model training and optimization?",
    answer:
      "We leverage machine learning algorithms, neural networks, and statistical models to ensure high accuracy and performance."
  },
  {
    question: "How does AI recognize patterns and generate insights?",
    answer:
      "By analyzing historical trends, sentiment data, and correlations, our AI uncovers hidden financial patterns to provide actionable insights."
  },
  {
    question: "How does the system continuously learn and adapt?",
    answer:
      "Our AI models update dynamically based on new data, refining their predictions and improving accuracy over time."
  }
];

const HowOurAIWorks = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex((prevIndex: number | null) => (prevIndex === index ? null : index));
  };

  return (
    <div className="bg-black text-white p-8 w-full">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
        {/* Left column - FAQs */}
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold mb-6">How Our AI Works</h2>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700"
                onClick={() => toggleFAQ(index)}
              >
                <div className="flex justify-between items-center p-4 cursor-pointer">
                  <h3 className="font-medium text-white">{faq.question}</h3>
                  {openIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
                {openIndex === index && <div className="p-4 border-t border-gray-700">{faq.answer}</div>}
              </div>
            ))}
          </div>
          
          <div className="mt-8">
            <button className="flex items-center gap-2 px-6 py-3 bg-blue-800 text-white rounded-lg hover:bg-blue-700 transition">
              See AI in Action
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
        
        {/* Right column - Dashboard */}
        <div className="md:w-1/2">
          <div className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden">
            {/* Browser header */}
            <div className="bg-blue-900 p-2 flex items-center">
              <div className="flex gap-1 ml-1">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="text-center text-white flex-1">AI Analytics Dashboard</div>
            </div>
            
            {/* Main chart area */}
            <div className="p-4 border-b border-gray-700">
              <div className="flex justify-between mb-2">
                <span>Market Prediction Model</span>
                <span className="bg-green-700 text-white px-2 py-0.5 rounded text-xs">85% Accuracy</span>
              </div>
              <div className="h-32 relative">
                <div className="h-px bg-gray-600 absolute left-0 right-0 top-1/2 w-full"></div>
                
                <svg height="100%" width="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d="M0,50 Q30,40 50,30 T100,10" stroke="#3B82F6" strokeWidth="3" fill="none" />
                </svg>
              </div>
            </div>
            
            {/* Bottom panels */}
            <div className="grid grid-cols-2 gap-4 p-4">
              {/* Sentiment analysis panel */}
              <div className="bg-blue-900 bg-opacity-50 p-4 rounded-lg">
                <div className="uppercase text-xs mb-2 font-semibold">Sentiment Analysis</div>
                <div className="flex items-center">
                  <div className="bg-blue-700 p-2 rounded-full mr-3">
                    <ThumbsUp size={20} />
                  </div>
                  <div>
                    <div className="font-medium">Positive</div>
                    <div className="text-xs text-gray-300">Tech sector trending upward</div>
                  </div>
                </div>
              </div>
              
              {/* Anomaly alert panel */}
              <div className="bg-purple-900 bg-opacity-50 p-4 rounded-lg">
                <div className="uppercase text-xs mb-2 font-semibold">Anomaly Alert</div>
                <div className="flex items-center">
                  <div className="bg-purple-700 p-2 rounded-full mr-3">
                    <AlertTriangle size={20} />
                  </div>
                  <div>
                    <div className="font-medium">Detected</div>
                    <div className="text-xs text-gray-300">Unusual trading volume</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowOurAIWorks;



