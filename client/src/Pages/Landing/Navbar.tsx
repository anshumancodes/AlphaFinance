import { useState } from 'react';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-black py-4 px-4 md:px-8 lg:px-16">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <div className="flex items-center">
          <span className="text-blue-400 font-bold text-xl mr-1">Alpha</span>
          <span className="text-white font-bold text-xl">Finance</span>
        </div>
        
        <button 
          className="md:hidden text-white"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
        
        <div className={`w-full md:flex md:w-auto md:items-center ${isMenuOpen ? 'block' : 'hidden'}`}>
          <div className="flex flex-col mt-4 md:mt-0 md:flex-row md:items-center md:space-x-6">
            <NavLink text="Features" link="#" />
            <NavLink text="Use Cases" link="#" />
            <NavLink text="FAQ" link="#"/>
            <NavLink text="GitHub" link="https://github.com/anshumancodes/AlphaFinance"/>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 mt-4 md:mt-0">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
interface NavLinkProps {
    text: string;
    link: string;
  }
  
function NavLink({ text, link }:NavLinkProps) {
  return (
    <a 
      href={link} 
      className="text-gray-300 hover:text-white transition-colors py-2 md:py-0"
    >
      {text}
    </a>
  );
}

export default Navbar;