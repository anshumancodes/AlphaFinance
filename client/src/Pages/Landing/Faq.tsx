import { useState } from "react";
import { ChevronDown, ChevronUp, ChevronRight } from "lucide-react";

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

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null); // ✅ Corrected type

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto py-12 text-white">
      <h2 className="text-3xl font-bold text-center mb-6">How Our AI Works</h2>
      <div className="space-y-4">
        {faqs.map((faq, index: number) => (
          <div key={index} className="bg-gray-800 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center px-6 py-4 text-left font-medium focus:outline-none"
            >
              {faq.question}
              {openIndex === index ? (
                <ChevronUp className="text-blue-400" />
              ) : (
                <ChevronDown className="text-blue-400" />
              )}
            </button>
            {openIndex === index && (
              <div className="px-6 pb-4 text-gray-300">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center mx-auto">
          See AI in Action <ChevronRight className="ml-2" />
        </button>
      </div>
    </div>
  );
}

