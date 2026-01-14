import React from 'react';

export default function MobileSection() {
  return (
    <section className="relative py-32 bg-gradient-to-b from-green-100 to-green-50">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1920')] bg-cover bg-center opacity-20"></div>
      
      <div className="relative z-10 container mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-serif text-green-900 mb-6">
          Manage Your Farm From the Field.
        </h2>
        <p className="text-xl text-green-800 mb-8 max-w-3xl mx-auto">
          Tend's mobile app puts all your farm management tools at your fingertips, allowing you to access and update data from anywhere, even without an internet connection.
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
    </section>
  );
}

