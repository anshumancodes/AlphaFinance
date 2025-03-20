import { useState } from 'react';

function Dashboard() {
  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden shadow-2xl border border-gray-800">
      {/* Window Controls */}
      <div className="bg-gray-800 px-4 py-2 flex items-center">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="ml-4 text-sm text-gray-400">Indian Stock Market Dashboard</div>
      </div>
      
      {/* Dashboard Content */}
      <div className="p-4 grid grid-cols-2 gap-4">
        {/* Top Row */}
        <DashboardItem title="NIFTY 50" value="₹22,500" />
        <DashboardItem title="SENSEX" value="₹75,000" />
        
        {/* Middle Row */}
        <DashboardItem title="GDP Growth" value="6.8%" />
        <DashboardItem title="Inflation Rate" value="4.5%" />
        
        {/* Bottom Row - Metrics */}
        <div className="col-span-2 grid grid-cols-3 gap-4 mt-2">
          <DashboardItem title="Forex Reserves" value="$640B" color="bg-blue-500" />
          <DashboardItem title="FDI Inflows" value="$85B" color="bg-green-500" />
          <DashboardItem title="Fiscal Deficit" value="5.9%" color="bg-purple-500" />
        </div>
      </div>
    </div>
  );
}
interface DashBoardItemTypes{
    title:string,
    value:string,
    color?:string
    
}

function DashboardItem({ title, value, color= "bg-gray-800" }:DashBoardItemTypes) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative ${color} rounded-lg p-4 h-24 cursor-pointer transition-transform hover:scale-105`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="text-white font-semibold">{title}</div>
      <div className="text-lg font-bold mt-2">{value}</div>
      
      {isHovered && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full bg-gray-800 text-white text-sm p-2 rounded-lg shadow-lg w-36 text-center">
          {`More details on ${title}`}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
