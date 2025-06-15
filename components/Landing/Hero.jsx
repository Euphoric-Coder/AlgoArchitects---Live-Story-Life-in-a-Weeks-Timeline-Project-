import React from "react";
import { Calendar, ArrowRight, Play } from "lucide-react";

const Hero = ({ onGetStarted }) => {
  const scrollToNext = () => {
    const nextSection = document.getElementById("why-this-matters");
    nextSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-8 overflow-hidden pt-20">
      {/* Ultra clean gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50/20 via-blue-50/10 to-white dark:from-slate-900 dark:via-blue-900/5 dark:to-slate-800"></div>

      {/* Minimal floating elements */}
      <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-blue-100/15 dark:bg-blue-400/3 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 left-1/3 w-80 h-80 bg-cyan-100/10 dark:bg-cyan-400/3 rounded-full blur-3xl"></div>

      <div className="relative z-10 text-center max-w-7xl mx-auto">
        {/* Refined Badge */}
        <div className="inline-flex items-center gap-3 bg-blue-50/60 dark:bg-blue-900/15 backdrop-blur-xl px-6 py-3 rounded-full border border-blue-100/40 dark:border-blue-800/20 shadow-sm mb-12">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-blue-700 dark:text-blue-300 tracking-wide">
            Stay Ahead in Life & Innovation
          </span>
        </div>

        {/* Enhanced Headline */}
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-extralight mb-12 leading-tight tracking-tight">
          <span className="text-slate-800 dark:text-white">Stay Ahead in</span>
          <span className="block mt-3 font-light bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 dark:from-blue-400 dark:via-cyan-300 dark:to-blue-500 bg-clip-text text-transparent">
            Life & Timeline
          </span>
        </h1>

        {/* Refined Subtext */}
        <p className="text-xl md:text-2xl mb-8 max-w-5xl mx-auto leading-relaxed font-light text-slate-600 dark:text-slate-300 tracking-wide">
          Explore the latest{" "}
          <span className="text-blue-600 dark:text-blue-400 font-medium">
            memories and milestones
          </span>{" "}
          in the world of your life. From{" "}
          <span className="text-blue-600 dark:text-blue-400 font-medium">
            Personal Development
          </span>{" "}
          to the{" "}
          <span className="text-blue-600 dark:text-blue-400 font-medium">
            future of AI
          </span>
          , our expert insights keep you informed and ready for the next big
          thing.
        </p>

        <p className="text-lg mb-16 max-w-4xl mx-auto leading-relaxed text-slate-500 dark:text-slate-400 font-light tracking-wide">
          Stay updated on the latest in{" "}
          <span className="text-blue-600 dark:text-blue-400">Life Events</span>,{" "}
          <span className="text-cyan-600 dark:text-cyan-400">Milestones</span>,
          and{" "}
          <span className="text-blue-600 dark:text-blue-400">
            Personal Growth
          </span>{" "}
          to elevate your life journey with us.
        </p>

        {/* Premium CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
          <button
            onClick={onGetStarted}
            className="group bg-gradient-to-r from-blue-500 via-blue-600 to-cyan-600 hover:from-blue-600 hover:via-blue-700 hover:to-cyan-700 text-white px-10 py-5 rounded-2xl text-lg font-medium transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-4 shadow-lg hover:shadow-xl tracking-wide"
          >
            Explore Timeline
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>

          <button
            onClick={scrollToNext}
            className="group bg-white/90 dark:bg-white/10 backdrop-blur-xl hover:bg-white dark:hover:bg-white/20 px-10 py-5 rounded-2xl text-lg font-medium border border-slate-200/40 dark:border-white/15 hover:border-slate-300/50 dark:hover:border-white/25 transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-4 shadow-sm hover:shadow-lg text-slate-700 dark:text-slate-200 tracking-wide"
          >
            <Play className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            Watch Demo
          </button>
        </div>

        {/* Elegant Stats */}
        <div className="grid grid-cols-3 gap-12 max-w-lg mx-auto mb-20">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-light text-slate-800 dark:text-white mb-2 tracking-tight">
              50+
            </div>
            <div className="text-sm text-slate-500 dark:text-slate-400 font-medium tracking-wide">
              Life Events
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-light text-slate-800 dark:text-white mb-2 tracking-tight">
              10K+
            </div>
            <div className="text-sm text-slate-500 dark:text-slate-400 font-medium tracking-wide">
              Memories
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-light text-slate-800 dark:text-white mb-2 tracking-tight">
              99%
            </div>
            <div className="text-sm text-slate-500 dark:text-slate-400 font-medium tracking-wide">
              Satisfaction
            </div>
          </div>
        </div>

        {/* Minimal scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce opacity-30">
          <div className="w-6 h-10 border-2 border-slate-300/50 dark:border-white/20 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-slate-400/50 dark:bg-white/40 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
