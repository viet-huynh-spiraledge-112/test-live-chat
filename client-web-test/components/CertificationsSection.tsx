import React from 'react';

export default function CertificationsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center">
            <div className="flex items-center gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-24 h-32 bg-green-100 rounded-lg mb-2 flex items-center justify-center">
                    <div className="w-16 h-16 bg-green-200 rounded"></div>
                  </div>
                  {i < 4 && <div className="w-8 h-0.5 bg-green-300"></div>}
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-4xl font-serif text-green-900 mb-6">
              Streamline Farm Certifications With Traceability.
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Tend makes it easy to track and report on your farm's activities, ensuring compliance with organic, GAP, and other certifications.
            </p>
            <ul className="space-y-4 mb-8">
              {[
                'Automate data collection for compliance reporting.',
                'Generate custom reports for auditors and certifiers.',
                'Track inputs, outputs, and activities for full traceability.',
                'Reduce paperwork and administrative burden.',
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
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

