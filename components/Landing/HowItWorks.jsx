import React from 'react';
import { UserPlus, Calendar, Heart, Zap } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: UserPlus,
      title: "Create Your Account",
      description: "Sign up securely and enter your birthdate to generate your personal timeline foundation.",
      step: "01"
    },
    {
      icon: Calendar,
      title: "Explore Your Timeline",
      description: "Watch as every week you've lived appears as a visual story, ready for your personal touch.",
      step: "02"
    },
    {
      icon: Heart,
      title: "Add Your Memories",
      description: "Mark special moments, upload photos, and explore world events that shaped your journey.",
      step: "03"
    },
    {
      icon: Zap,
      title: "Share & Reflect",
      description: "Export your timeline, set reminders for anniversaries, and continue building your story.",
      step: "04"
    }
  ];

  return (
    <section id="how-it-works" className="py-32 px-8 bg-gradient-to-b from-white via-blue-50/15 to-slate-50/20 dark:from-slate-800 dark:to-slate-700">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-6xl font-extralight mb-8 tracking-tight text-slate-800 dark:text-white">
            How It Works
          </h2>
          <p className="text-xl max-w-4xl mx-auto leading-relaxed font-light text-slate-600 dark:text-slate-300 tracking-wide">
            Start your visual life story in four simple steps. Your timeline is waiting to be discovered.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {steps.map((step, index) => (
            <div key={index} className="text-center group relative">
              {/* Step Number & Icon */}
              <div className="relative mb-10">
                <div className="w-24 h-24 bg-white/90 dark:bg-slate-700/60 backdrop-blur-xl rounded-3xl flex items-center justify-center mx-auto border border-slate-100/40 dark:border-slate-600/40 group-hover:border-blue-200/50 transition-all duration-300 shadow-sm group-hover:shadow-lg">
                  <step.icon className="w-10 h-10 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="absolute -bottom-3 -right-3 w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-sm font-bold text-white">{step.step}</span>
                </div>
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-medium mb-6 text-slate-800 dark:text-white tracking-tight">
                {step.title}
              </h3>
              
              <p className="leading-relaxed text-sm font-light text-slate-600 dark:text-slate-300 tracking-wide">
                {step.description}
              </p>
              
              {/* Connector Line (except for last item on desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-px bg-gradient-to-r from-blue-200/60 dark:from-blue-600/40 to-transparent -translate-x-6 opacity-40"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;