import React from 'react';

const testimonials = [
  {
    title: 'The Agrarian Kitchen',
    location: 'Tasmania, Australia',
    description: 'With a holistic approach to food and farming, The Agrarian Kitchen is a working farm, cooking school, and restaurant dedicated to growing, harvesting, and preparing seasonal produce.',
    image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=400',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-serif text-center text-green-900 mb-4">
          Efficient Farms Run on Tend.
        </h2>
        <p className="text-xl text-center text-gray-700 mb-12 max-w-2xl mx-auto">
          Hear from growers who are using Tend to streamline their operations and grow their businesses.
        </p>
        
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-64 bg-gray-200 bg-cover bg-center" style={{ backgroundImage: `url(${testimonial.image})` }}></div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-green-900 mb-2">{testimonial.title}</h3>
                <p className="text-green-700 mb-4">{testimonial.location}</p>
                <p className="text-gray-700 mb-6">{testimonial.description}</p>
                <button className="bg-green-600 text-white px-6 py-2 rounded-md font-medium hover:bg-green-700 transition-colors">
                  Read Story
                </button>
              </div>
            </div>
          ))}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="h-64 bg-gray-200"></div>
            <div className="p-6">
              <div className="h-6 bg-gray-200 rounded mb-2 w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded mb-4 w-1/2"></div>
              <div className="space-y-2 mb-6">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="h-64 bg-gray-200"></div>
            <div className="p-6">
              <div className="h-6 bg-gray-200 rounded mb-2 w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded mb-4 w-1/2"></div>
              <div className="space-y-2 mb-6">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

