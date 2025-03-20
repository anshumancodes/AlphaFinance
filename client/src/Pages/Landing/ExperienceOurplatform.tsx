import { useState } from 'react';
import { 
  Maximize2, 
  MoreVertical,
  ArrowRight 
} from 'lucide-react';

const ExperienceOurplatform = () => {
  // Removed unused state and function
  const [loading, setLoading] = useState(false);

  const handleButtonClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1100);
  };

  return (
    <div className="min-h-screen bg-black text-white p-8 flex flex-col items-center justify-center">
      {/* Header */}
      <h1 className="text-4xl font-bold mb-4 text-center">Experience AlphaFinance in Action</h1>
      <p className="text-lg text-center text-gray-300 mb-16 max-w-2xl">
        See how our platform transforms raw financial data into actionable insights with our interactive demo.
      </p>
      
      {/* Main Content */}
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-6">
        {/* Left Panel - Controls */}
        <div className="w-full md:w-2/5 bg-gray-900 bg-opacity-50 rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-6">Interactive Demo</h2>
          
          <p className="text-gray-300 mb-8">
            Select options below to see how AlphaFinance processes different types of financial data.
          </p>
          
          {/* Data Source Dropdown */}
          <div className="mb-6">
            <label className="block text-gray-300 mb-2">Data Source</label>
            <div className="relative">
              <select className="w-full bg-gray-800 text-gray-400 py-3 px-4 rounded appearance-none focus:outline-none">
                <option>Financial News</option>
                <option>Stock Market Data</option>
                <option>Economics Indicators</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Analysis Type Dropdown */}
          <div className="mb-6">
            <label className="block text-gray-300 mb-2">Analysis Type</label>
            <div className="relative">
              <select className="w-full bg-gray-800 text-gray-400 py-3 px-4 rounded appearance-none focus:outline-none">
                <option>Anomaly Detection</option>
                <option>Trend Analysis </option>
                <option>Predictive Modeling</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Time Period Dropdown */}
          <div className="mb-8">
            <label className="block text-gray-300 mb-2">Time Period</label>
            <div className="relative">
              <select className="w-full bg-gray-800 text-gray-400 py-3 px-4 rounded appearance-none focus:outline-none">
                <option>Last week</option>
                <option>Last Month</option>
                <option>Last Year</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Run Analysis Button */}
          <button onClick={handleButtonClick} className="w-full bg-blue-900 hover:bg-blue-800 text-white font-medium py-3 px-6 rounded flex items-center justify-center gap-2 transition-colors">
            Run Analysis
            <ArrowRight size={18} />
          </button>
        </div>
        
        {/* Right Panel - Dashboard */}
        <div className="w-full md:w-4/5">
          <div className="bg-gray-900 bg-opacity-50 rounded-lg overflow-hidden flex flex-col relative">
            {/* Dashboard Header */}
            <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                <span className="ml-2 text-gray-300">AlphaFinance Dashboard</span>
              </div>
              <div className="flex items-center gap-2">
                <button className="text-gray-400 hover:text-white">
                  <Maximize2 size={16} />
                </button>
                <button className="text-gray-400 hover:text-white">
                  <MoreVertical size={16} />
                </button>
              </div>
            </div>
            
            {/* Dashboard Content */}
            <div className="relative h-[420px]">
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70 z-10">
                  <div className="text-gray-200 text-sm flex flex-col items-center">
                    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-2"></div>
                    Loading...
                  </div>
                </div>
              )}
              
              <div className="p-4 h-full overflow-auto">
                {/* Stats Cards */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {/* Analyzed Card */}
                  <div className="bg-blue-900 bg-opacity-40 rounded-lg p-4 flex flex-col items-center justify-center">
                    <span className="text-xs uppercase text-blue-300">ANALYZED</span>
                    <span className="text-2xl font-bold">8.2M</span>
                    <span className="text-xs text-blue-300">Data Points</span>
                  </div>
                  
                  {/* Trend Card */}
                  <div className="bg-green-900 bg-opacity-30 rounded-lg p-4 flex flex-col items-center justify-center">
                    <span className="text-xs uppercase text-green-300">TREND</span>
                    <span className="text-2xl font-bold">+8.4%</span>
                    <span className="text-xs text-green-300">Upward Movement</span>
                  </div>
                  
                  {/* Confidence Card */}
                  <div className="bg-purple-900 bg-opacity-30 rounded-lg p-4 flex flex-col items-center justify-center">
                    <span className="text-xs uppercase text-purple-300">CONFIDENCE</span>
                    <span className="text-2xl font-bold">92%</span>
                    <span className="text-xs text-purple-300">Prediction Accuracy</span>
                  </div>
                </div>
                
                {/* Chart Section */}
                <div className="bg-gray-800 bg-opacity-60 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">Market Trend Analysis</h3>
                    <div className="flex gap-2">
                      <button className="bg-blue-700 text-white text-xs py-1 px-2 rounded">1D</button>
                      <button className="bg-gray-700 text-white text-xs py-1 px-2 rounded">1W</button>
                      <button className="bg-gray-700 text-white text-xs py-1 px-2 rounded">1M</button>
                      <button className="bg-gray-700 text-white text-xs py-1 px-2 rounded">1Y</button>
                    </div>
                  </div>
                  
                  {/* Chart */}
                  <div className="h-48 w-full relative">
                    <svg width="100%" height="100%" viewBox="0 0 500 150" preserveAspectRatio="none">
                      <path
                        d="M0,150 C50,120 100,100 150,80 C200,60 250,90 300,70 C350,50 400,60 450,40 C500,20 500,0 500,0"
                        fill="none"
                        stroke="#60A5FA"
                        strokeWidth="2"
                      />
                      <circle cx="75" cy="110" r="3" fill="#60A5FA" />
                      <circle cx="150" cy="80" r="3" fill="#60A5FA" />
                      <circle cx="225" cy="90" r="3" fill="#60A5FA" />
                      <circle cx="300" cy="70" r="3" fill="#60A5FA" />
                      <circle cx="375" cy="50" r="3" fill="#60A5FA" />
                      <circle cx="450" cy="40" r="3" fill="#60A5FA" />
                      <circle cx="480" cy="20" r="3" fill="#60A5FA" />
                    </svg>
                    <div className="absolute bottom-0 w-full grid grid-cols-6 text-xs text-gray-500">
                      <div className="text-center">9:30</div>
                      <div className="text-center">10:30</div>
                      <div className="text-center">11:30</div>
                      <div className="text-center">12:30</div>
                      <div className="text-center">13:30</div>
                      <div className="text-center">14:30</div>
                    </div>
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

export default ExperienceOurplatform;