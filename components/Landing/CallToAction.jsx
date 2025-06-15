import React from "react";
import { ArrowRight, Play } from "lucide-react";

const CallToAction = ({ onGetStarted }) => {
  return (
    <section className="py-32 px-8 bg-gradient-to-br from-slate-50/20 via-blue-50/15 to-white dark:from-slate-700 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden">
      {/* Minimal Background Effects */}
      <div className="absolute top-20 left-20 w-80 h-80 bg-blue-100/15 dark:bg-blue-400/3 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-100/15 dark:bg-cyan-400/3 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <h2 className="text-5xl md:text-7xl font-extralight mb-12 leading-tight tracking-tight text-slate-800 dark:text-white">
          Begin Your Life Timeline
          <span className="block mt-4 font-light bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 dark:from-blue-400 dark:via-cyan-300 dark:to-blue-500 bg-clip-text text-transparent">
            Today
          </span>
        </h2>

        <p className="text-xl md:text-2xl mb-16 max-w-4xl mx-auto leading-relaxed font-light text-slate-600 dark:text-slate-300 tracking-wide">
          Your life story is unique and deserves to be celebrated. Start
          creating your visual timeline and discover the beauty in every week
          you've lived.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button
            onClick={onGetStarted}
            className="group bg-gradient-to-r from-blue-500 via-blue-600 to-cyan-600 hover:from-blue-600 hover:via-blue-700 hover:to-cyan-700 text-white px-10 py-5 rounded-2xl text-lg font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-4 tracking-wide"
          >
            Start Your Timeline
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>

          <button className="group bg-white/90 dark:bg-white/10 backdrop-blur-xl hover:bg-white dark:hover:bg-white/20 px-10 py-5 rounded-2xl text-lg font-medium border border-slate-200/40 dark:border-white/15 hover:border-slate-300/50 dark:hover:border-white/25 transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-4 shadow-sm hover:shadow-lg text-slate-700 dark:text-slate-200 tracking-wide">
            <Play className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            View Demo
          </button>
        </div>

        <div className="mt-16 pt-8 border-t border-slate-200/20 dark:border-white/10">
          <p className="font-light text-slate-500 dark:text-slate-400 tracking-wide">
            Free to start • Secure & private • Export anytime
          </p>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
