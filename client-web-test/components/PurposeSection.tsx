import React from 'react';

export default function PurposeSection() {
  return (
    <section className="relative py-32 bg-gradient-to-b from-green-800 to-green-900">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=1920')] bg-cover bg-center opacity-10"></div>
      
      <div className="relative z-10 container mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
          Purposefully Built for Farms Like Yours.
        </h2>
        <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
          Tend is trusted by thousands of growers worldwide, from small-scale market gardens to large-scale commercial operations. We're committed to building the best farm management software for you.
        </p>
        <button className="bg-green-600 text-white px-8 py-4 rounded-md text-lg font-medium hover:bg-green-700 transition-colors">
          Our Story
        </button>
      </div>
    </section>
  );
}

