import React from 'react';

const highlights = [
  { icon: '💻📱', text: 'Web & Mobile' },
  { icon: '☁️', text: 'Cloud-based' },
  { icon: '🚫☁️', text: 'Offline Mode' },
];

export default function FeatureHighlights() {
  return (
    <section className="py-12 bg-orange-500">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 lg:gap-20">
          {highlights.map((highlight, index) => (
            <div key={index} className="flex flex-col items-center gap-3">
              <div className="text-4xl md:text-5xl">{highlight.icon}</div>
              <span className="text-white font-medium text-base md:text-lg">{highlight.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

