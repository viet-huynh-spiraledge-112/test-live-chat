import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-green-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div>
            <p className="text-green-200 mb-2">hello@tend.com</p>
            <p className="text-green-200 mb-2 font-semibold">Tend</p>
            <p className="text-green-200 mb-2">PO Box 1504</p>
            <p className="text-green-200 mb-4">Sonoma, CA 95473</p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 bg-green-800 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors text-sm font-semibold">f</a>
              <a href="#" className="w-9 h-9 bg-green-800 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors">📷</a>
              <a href="#" className="w-9 h-9 bg-green-800 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors text-sm font-semibold">in</a>
              <a href="#" className="w-9 h-9 bg-green-800 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors">▶</a>
            </div>
          </div>
          
          <div>
            <p className="font-semibold mb-4">Download Our App</p>
            <div className="space-y-2">
              <a href="#" className="block text-green-200 hover:text-white">Google Play</a>
              <a href="#" className="block text-green-200 hover:text-white">App Store</a>
            </div>
          </div>
          
          <div>
            <p className="font-semibold mb-4">Never miss an update!</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 rounded bg-green-800 text-white placeholder-green-300 border border-green-700 focus:outline-none focus:border-green-600"
              />
              <button className="bg-green-600 px-6 py-2 rounded hover:bg-green-700 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-green-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">t</span>
              </div>
              <span className="text-white font-semibold text-xl">tend</span>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 flex-1 max-w-3xl">
              <div>
                <p className="font-semibold mb-3">Product</p>
                <ul className="space-y-2 text-sm text-green-200">
                  <li><a href="#" className="hover:text-white">Features</a></li>
                  <li><a href="#" className="hover:text-white">Mobile App</a></li>
                  <li><a href="#" className="hover:text-white">Integrations</a></li>
                  <li><a href="#" className="hover:text-white">Pricing</a></li>
                  <li><a href="#" className="hover:text-white">Security</a></li>
                  <li><a href="#" className="hover:text-white">Support</a></li>
                </ul>
              </div>
              
              <div>
                <p className="font-semibold mb-3">Who We Serve</p>
                <ul className="space-y-2 text-sm text-green-200">
                  <li><a href="#" className="hover:text-white">Market Farms</a></li>
                  <li><a href="#" className="hover:text-white">CSA Farms</a></li>
                  <li><a href="#" className="hover:text-white">Greenhouses</a></li>
                  <li><a href="#" className="hover:text-white">Orchards & Vineyards</a></li>
                  <li><a href="#" className="hover:text-white">Nurseries</a></li>
                  <li><a href="#" className="hover:text-white">Hemp Growers</a></li>
                </ul>
              </div>
              
              <div>
                <p className="font-semibold mb-3">Resources</p>
                <ul className="space-y-2 text-sm text-green-200">
                  <li><a href="#" className="hover:text-white">Blog</a></li>
                  <li><a href="#" className="hover:text-white">Case Studies</a></li>
                  <li><a href="#" className="hover:text-white">Webinars</a></li>
                  <li><a href="#" className="hover:text-white">Help Center</a></li>
                  <li><a href="#" className="hover:text-white">FAQs</a></li>
                </ul>
              </div>
              
              <div>
                <p className="font-semibold mb-3">Company</p>
                <ul className="space-y-2 text-sm text-green-200">
                  <li><a href="#" className="hover:text-white">About Us</a></li>
                  <li><a href="#" className="hover:text-white">Careers</a></li>
                  <li><a href="#" className="hover:text-white">Contact</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-green-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-green-200">
            <p>© 2023 Tend. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="fixed bottom-6 right-6 z-50">
        <button className="w-14 h-14 bg-green-600 rounded-full shadow-lg flex items-center justify-center hover:bg-green-700 transition-colors">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
      </div>
    </footer>
  );
}

