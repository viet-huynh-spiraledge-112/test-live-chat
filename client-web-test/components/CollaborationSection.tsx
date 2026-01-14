import React from 'react';

export default function CollaborationSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-serif text-green-900 mb-4">
              Powerful Collaboration Tools.
            </h2>
            <h3 className="text-2xl font-semibold text-green-800 mb-4">
              Keep Your Crew Aligned and Productive.
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Tend provides your team with the tools they need to communicate, collaborate, and stay on track, whether they're in the field or the office.
            </p>
            <ul className="space-y-4 mb-8">
              {[
                'Assign tasks and track progress in real-time.',
                'Share notes, photos, and documents with your team.',
                'Communicate directly with crew members.',
                'Set permissions and roles for different users.',
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
              Explore All Features
            </button>
          </div>
          
          <div className="relative">
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-200 rounded-full"></div>
                  <div className="flex-1 bg-green-50 rounded-lg p-4">
                    <p className="text-gray-700">Great work on the harvest today!</p>
                  </div>
                </div>
                <div className="flex items-center justify-between bg-gray-100 rounded-lg p-4">
                  <span className="text-gray-700 font-medium">Task Timer</span>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-mono">00:30</span>
                    <button className="bg-green-600 text-white px-4 py-2 rounded">Done</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

