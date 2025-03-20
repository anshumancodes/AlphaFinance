
import { Facebook, Twitter, Github, Youtube, Instagram, Mail, Phone, MapPin, ArrowUp } from 'lucide-react';

const AlphaFinanceFooter = () => {
  return (
    <footer className="bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <h2 className="text-2xl font-bold mb-3">AlphaFinance</h2>
            <p className="text-gray-300 mb-6">
            AI-powered all-in-one financial insights platform for everyone!
            </p>
            
            {/* Social Icons */}
            <div className="flex space-x-3">
              <a href="#" className="bg-gray-700 p-2 rounded-full hover:bg-gray-600 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="bg-gray-700 p-2 rounded-full hover:bg-gray-600 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://github.com/anshumancodes/AlphaFinance?" className="bg-gray-700 p-2 rounded-full hover:bg-gray-600 transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="bg-gray-700 p-2 rounded-full hover:bg-gray-600 transition-colors">
                <Youtube size={20} />
              </a>
              <a href="#" className="bg-gray-700 p-2 rounded-full hover:bg-gray-600 transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-blue-500 transition-colors">Features</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-500 transition-colors">Use Cases</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-500 transition-colors">Pricing</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-500 transition-colors">Demo</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-500 transition-colors">FAQ</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-500 transition-colors">Contact</a></li>
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-blue-500 transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-500 transition-colors">Documentation</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-500 transition-colors">API Reference</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-500 transition-colors">Developer Tools</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-500 transition-colors">Knowledge Base</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-500 transition-colors">Webinars</a></li>
            </ul>
          </div>
          
          {/* Contact Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin className="mr-2 text-gray-400 flex-shrink-0 mt-1" size={18} />
                <span className="text-gray-300">123 Financial District, Bhubaneswar, Odisha 10004</span>
              </div>
              <div className="flex items-center">
                <Mail className="mr-2 text-gray-400" size={18} />
                <a href="mailto:info@alphafinance.com" className="text-gray-300 hover:text-blue-500 transition-colors">info@alphafinance.com</a>
              </div>
              <div className="flex items-center">
                <Phone className="mr-2 text-gray-400" size={18} />
                <a href="tel:+18005551234" className="text-gray-300 hover:text-blue-500 transition-colors">+91 9348601205</a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Newsletter Section */}
        <div className="border-t border-gray-800 pt-8 pb-12">
          <h3 className="text-xl font-semibold text-center mb-2">Subscribe to Our Newsletter</h3>
          <p className="text-center text-gray-300 mb-6">
            Stay updated with the latest features, use cases, and financial data insights.
          </p>
          <div className="flex max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="bg-gray-800 text-white flex-grow px-4 py-2 rounded-l focus:outline-none"
            />
            <button className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-r font-medium transition-colors">
              Subscribe
            </button>
          </div>
        </div>
        
        {/* Bottom Footer */}
        <div className="border-t border-gray-800 pt-6 pb-4 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-400">© 2025 AlphaFinance. All rights reserved.</p>
          </div>
          <div className="flex flex-wrap justify-center space-x-4">
            <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors mb-2 md:mb-0">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors mb-2 md:mb-0">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors mb-2 md:mb-0">Cookie Policy</a>
            <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors mb-2 md:mb-0">Sitemap</a>
          </div>
        </div>
      </div>
      
      {/* Scroll to top button */}
      <div className="fixed bottom-6 right-6">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg transition-colors"
        >
          <ArrowUp size={20} />
        </button>
      </div>
    </footer>
  );
};

export default AlphaFinanceFooter;