import { BarChart3, BrainCircuit, LayoutDashboard } from "lucide-react";

type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
};

function Features() {
  return (
    <div className="text-white py-12 px-6 md:px-12">
      <h2 className="text-4xl font-bold text-center mb-6">
        Powerful Features
      </h2>
      <p className="text-center text-gray-400 mb-12">
        Our AI-powered platform transforms India's complex financial data into actionable insights, making it accessible to professionals, researchers, and policymakers.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <FeatureCard 
          icon={<BarChart3 size={32} className="text-blue-400" />} 
          title="Comprehensive Data Integration"
          description="Bringing together diverse financial datasets from across India's economy to provide a holistic view."
          features={["Real-time data aggregation", "Multiple source integration", "Automated data cleansing"]}
        />

        <FeatureCard 
          icon={<BrainCircuit size={32} className="text-purple-400" />} 
          title="AI-Powered Analytics"
          description="Leveraging machine learning to uncover hidden trends and meaningful financial insights."
          features={["Predictive trend analysis", "Anomaly detection", "Custom AI-driven insights"]}
        />

        <FeatureCard 
          icon={<LayoutDashboard size={32} className="text-green-400" />} 
          title="Intuitive Visualizations"
          description="Making financial data more accessible with customizable dashboards and easy-to-understand reports."
          features={["Drag-and-drop interface", "Custom visualizations", "Interactive financial reports"]}
        />
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description, features }: FeatureCardProps) {
  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow border border-gray-700">
      <div className="flex items-center space-x-4 mb-4">
        <div className="p-3 bg-gray-700 rounded-full">{icon}</div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <p className="text-gray-400 mb-4">{description}</p>
      <ul className="text-gray-300 space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <span className="text-green-400 mr-2">✔</span>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Features;
