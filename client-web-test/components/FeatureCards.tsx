import React from 'react';

const features = [
  { title: 'Crop Planning', image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400' },
  { title: 'Task Management', image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=400' },
  { title: 'Harvest Management', image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400' },
  { title: 'Sales & Marketing', image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=400' },
  { title: 'Inventory Management', image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=400' },
  { title: 'Accounting & Reporting', image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=400' },
];

export default function FeatureCards() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-serif text-center text-green-900 mb-12">
          Farm Management software designed for every Grower.
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="aspect-square rounded-lg overflow-hidden mb-4 bg-gray-200">
                <div 
                  className="w-full h-full bg-cover bg-center transition-transform group-hover:scale-105"
                  style={{ backgroundImage: `url(${feature.image})` }}
                ></div>
              </div>
              <h3 className="text-xl font-semibold text-green-900 text-center">{feature.title}</h3>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <button className="bg-green-600 text-white px-8 py-4 rounded-md text-lg font-medium hover:bg-green-700 transition-colors inline-flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
            </svg>
            See How it Works
          </button>
        </div>
      </div>
    </section>
  );
}

