
import Dashboard from './Dashboard';

function Hero() {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between py-12 md:py-16">
      <div className="lg:w-1/2 mb-12 lg:mb-0">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          <span className="text-blue-400">AI-Powered</span>
          <br />
          <span className="text-white">Financial Data</span>
          <br />
          <span className="text-white">Platform</span>
        </h1>
        <p className="text-lg text-gray-400 mb-8 max-w-xl">
        AI-powered all-in-one financial insights platform for everyone!
        </p>
        <div className="flex flex-wrap gap-4">
          <button className="bg-blue-900 hover:bg-blue-800 text-white font-medium py-3 px-6  transition-colors">
            Try Demo
          </button>
          <button className="bg-blue-600  hover:bg-blue-700 text-white font-medium py-3 px-6 transition-colors">
            Sign Up
          </button>
        </div>
      </div>
      <div className="lg:w-1/2">
        <Dashboard />
      </div>
    </div>
  );
}

export default Hero;
