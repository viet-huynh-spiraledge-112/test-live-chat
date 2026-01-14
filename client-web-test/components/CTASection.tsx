import React from 'react';

export default function CTASection() {
  return (
    <section className="py-20 bg-green-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)`
        }}></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">
          Elevate Every Acre.™
        </h2>
        <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
          Join thousands of growers who trust Tend to simplify their farm management and elevate their operations.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-green-600 text-white px-8 py-4 rounded-md text-lg font-medium hover:bg-green-700 transition-colors">
            Try Tend Free
          </button>
          <button className="border-2 border-green-600 text-white px-8 py-4 rounded-md text-lg font-medium hover:bg-green-800 transition-colors flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
            </svg>
            Book a Personalized Demo
          </button>
          <button className="border-2 border-green-600 text-white px-8 py-4 rounded-md text-lg font-medium hover:bg-green-800 transition-colors">
            Get a Free Quote
          </button>
        </div>
      </div>
    </section>
  );
}

