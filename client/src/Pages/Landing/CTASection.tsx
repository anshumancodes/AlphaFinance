

const CTASection = () => {
  return (
    <div className="w-full bg-black text-white py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Financial Data?</h2>
        
        <p className="text-gray-300 mb-8">
          Experience the full power of AlphaFinance with a personalized demo or start your free trial today.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-8 rounded-md transition-colors">
            Start Free Trial
          </button>
          
          <button className="bg-transparent hover:bg-gray-800 text-white font-medium py-3 px-8 border border-gray-600 rounded-md transition-colors">
            Request a Demo
          </button>
        </div>
      </div>
    </div>
  );
};

export default CTASection;