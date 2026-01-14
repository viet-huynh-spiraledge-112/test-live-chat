'use client';

import React, { useState } from 'react';

const tabs = ['Crop Planning', 'Task Management', 'Field Notes', 'Sales & Marketing', 'Inventory', 'Accounting', 'Analytics'];

export default function TabbedSection() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-serif text-center text-green-900 mb-12">
          One Centralized Place to Manage Your Farm.
        </h2>
        
        <div className="bg-green-600 rounded-t-lg overflow-x-auto">
          <div className="flex min-w-max">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-6 py-4 text-white font-medium whitespace-nowrap transition-colors ${
                  activeTab === index ? 'bg-green-700' : 'hover:bg-green-700/50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-b-lg shadow-lg p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-serif text-green-900 mb-4">Your Crops, Your Way.</h3>
              <p className="text-lg text-gray-700 mb-6">
                Plan your entire season, from seed to sale, with Tend's intuitive crop planning tools.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  'Create custom crop plans for any crop or variety.',
                  'Track planting dates, harvest windows, and yields.',
                  'Manage multiple fields and locations with ease.',
                  'Integrate with your inventory and sales.',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <button className="bg-green-600 text-white px-8 py-3 rounded-md font-medium hover:bg-green-700 transition-colors">
                Explore Crop Library
              </button>
            </div>
            
            <div className="bg-gray-100 rounded-lg p-6 h-96 flex items-center justify-center">
              <div className="w-full h-full bg-white rounded shadow-inner p-6">
                <div className="flex gap-4 mb-6">
                  <div className="w-48 bg-gray-50 rounded p-4">
                    <div className="space-y-2">
                      <div className="h-4 bg-green-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {['Beets', 'Cabbage', 'Kale', 'Lettuce', 'Spinach'].map((crop) => (
                    <div key={crop} className="bg-green-50 rounded p-4 text-center">
                      <div className="w-16 h-16 bg-green-200 rounded-full mx-auto mb-2"></div>
                      <p className="text-sm font-medium text-green-900">{crop}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

