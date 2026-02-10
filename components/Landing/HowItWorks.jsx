import React from 'react';
import { UserPlus, Calendar, Heart, Zap, Target, TrendingUp } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      number: '1',
      title: 'Enter Your Birthdate',
      description: 'Start by telling us when your journey began. We will calculate your life in weeks.',
      icon: Calendar,
      color: 'blue'
    },
    {
      number: '2',
      title: 'Add Milestones and Goals',
      description: 'Mark important achievements from your past and set goals for your future.',
      icon: Target,
      color: 'indigo'
    },
    {
      number: '3',
      title: 'View Your Life in Weeks',
      description: 'See your entire life visualized in a beautiful grid. Track progress and stay inspired.',
      icon: TrendingUp,
      color: 'cyan'
    }
  ];

  const colorMap = {
    blue: 'from-blue-600 to-indigo-600',
    indigo: 'from-indigo-600 to-purple-600',
    cyan: 'from-cyan-500 to-blue-600'
  };

  return (
    <section id="how-it-works" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 dark:bg-blue-900/10 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-100 dark:bg-indigo-900/10 rounded-full blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <div className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full border border-blue-200 dark:border-blue-700">
              <p className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                3 Simple Steps
              </p>
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Get started in three simple steps and begin your journey of self-reflection and growth.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-4">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />

              <div className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-4 border border-gray-100 dark:border-gray-700 h-full flex flex-col">
                <div className={`flex items-center justify-center w-20 h-20 bg-gradient-to-r ${colorMap[step.color]} text-white text-3xl font-bold rounded-2xl mb-8 mx-auto group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                  {step.number}
                </div>

                <div className="flex justify-center mb-6">
                  <step.icon className={`w-12 h-12 text-blue-600 dark:text-blue-400 group-hover:scale-125 transition-transform duration-300`} />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {step.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 text-center leading-relaxed flex-grow">
                  {step.description}
                </p>

                <div className="mt-6 h-1 w-0 bg-gradient-to-r from-blue-600 to-cyan-400 group-hover:w-full transition-all duration-300 mx-auto" />
              </div>

              {index < steps.length - 1 && (
                <div className="hidden md:flex absolute top-1/3 -right-8 items-center justify-center pointer-events-none">
                  <svg className="w-16 h-12 text-gray-300 dark:text-gray-600 group-hover:text-blue-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;