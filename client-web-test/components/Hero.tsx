import React from 'react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20">
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-b from-green-100 to-green-50">
          <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1920')] bg-cover bg-center opacity-30"></div>
        </div>
      </div>
      
      <div className="relative z-10 container mx-auto px-6 text-center pt-20">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-green-900 mb-6 max-w-4xl mx-auto leading-tight">
          The Leading Farm Management Software for Modern Growers.
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-green-800 mb-8 max-w-3xl mx-auto">
          Simplify every aspect of your farm – crop planning, task management, sales, accounting, and inventory – all powered by our intuitive, easy-to-use platform.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-green-600 text-white px-8 py-4 rounded-md text-lg font-medium hover:bg-green-700 transition-colors">
            Try Tend Free
          </button>
          <button className="border-2 border-green-600 text-green-600 px-8 py-4 rounded-md text-lg font-medium hover:bg-green-50 transition-colors flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
            </svg>
            Book a Personalized Demo
          </button>
        </div>
      </div>
      
      <div className="absolute bottom-4 left-6 z-10">
        <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-xl">t</span>
        </div>
      </div>
    </section>
  );
}

