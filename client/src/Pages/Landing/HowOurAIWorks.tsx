import { useState } from 'react';
import { ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';

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
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="flex flex-col md:flex-row justify-between gap-8 p-8 bg-black text-white">
      <div className="flex flex-col space-y-4 md:w-1/2">
        <h2 className="text-2xl font-bold mb-4">How Our AI Works</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="p-4 bg-gray-800 rounded-lg border border-gray-700 cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg">{faq.question}</h3>
                {openIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
              {openIndex === index && <p className="mt-2 text-gray-300">{faq.answer}</p>}
            </div>
          ))}
        </div>
        <div className="mt-4">
          <button className="bg-blue-900 text-white px-6 py-3 rounded-lg flex items-center space-x-2 hover:bg-blue-800 transition">
            <span>See AI in Action</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
      <div className="md:w-1/2">
        <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
          <div className="bg-blue-900 p-3 flex items-center relative">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <h3 className="text-center w-full">AI Analytics Dashboard</h3>
          </div>
          <div className="p-4 bg-gray-800 m-4 rounded">
            <div className="flex justify-between mb-2">
              <span>Market Prediction Model</span>
              <span className="px-2 py-1 bg-green-800 text-green-400 rounded text-xs">85% Accuracy</span>
            </div>
            <div className="h-32 w-full bg-gray-900 relative rounded-sm overflow-hidden">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full h-1 border-b border-dashed border-gray-600"></div>
                <svg height="100%" width="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d="M0,50 Q30,40 50,30 T100,10" stroke="#3B82F6" strokeWidth="3" fill="none" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowOurAIWorks;


