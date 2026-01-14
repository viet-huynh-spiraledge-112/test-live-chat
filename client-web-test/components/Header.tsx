import React from 'react';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xl">t</span>
          </div>
          <span className="text-green-600 font-semibold text-xl">tend</span>
        </div>
        
        <div className="hidden lg:flex items-center gap-8">
          <a href="#" className="text-gray-700 hover:text-green-600 transition-colors font-medium">Product</a>
          <a href="#" className="text-gray-700 hover:text-green-600 transition-colors font-medium">Solutions</a>
          <a href="#" className="text-gray-700 hover:text-green-600 transition-colors font-medium">Pricing</a>
          <a href="#" className="text-gray-700 hover:text-green-600 transition-colors font-medium">Resources</a>
          <a href="#" className="text-gray-700 hover:text-green-600 transition-colors font-medium">Company</a>
        </div>
        
        <div className="flex items-center gap-3 md:gap-4">
          <button className="text-green-600 font-medium hover:underline text-sm md:text-base">Log In</button>
          <button className="bg-green-600 text-white px-4 md:px-6 py-2 rounded-md hover:bg-green-700 transition-colors text-sm md:text-base whitespace-nowrap">
            Sign Up Free
          </button>
        </div>
      </nav>
    </header>
  );
}

