import React from 'react';

const blogPosts = [
  {
    title: 'Growing Microgreens for Profit',
    description: 'Learn how to grow and market microgreens for a successful farm business.',
    image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=400',
  },
  {
    title: 'The Benefits of Crop Rotation',
    description: 'Discover how crop rotation can improve soil health and increase yields.',
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400',
  },
  {
    title: 'Harvesting and Packing Strawberries',
    description: 'Tips for harvesting, packing, and storing strawberries to maximize freshness.',
    image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=400',
  },
];

export default function BlogSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-4xl font-serif text-green-900">Field Notes Blog.</h2>
          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-full border-2 border-green-600 text-green-600 hover:bg-green-50 flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button className="w-10 h-10 rounded-full border-2 border-green-600 text-green-600 hover:bg-green-50 flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {blogPosts.map((post, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gray-200 bg-cover bg-center" style={{ backgroundImage: `url(${post.image})` }}></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-green-900 mb-2">{post.title}</h3>
                <p className="text-gray-700">{post.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

