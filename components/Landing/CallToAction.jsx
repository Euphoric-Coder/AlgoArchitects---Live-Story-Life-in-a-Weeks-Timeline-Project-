import React from "react";
import { ArrowRight, Play } from "lucide-react";

const CallToAction = ({ onGetStarted }) => {
  return (
    <section
      id="get-started"
      className="py-28 bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400 relative overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" preserveAspectRatio="none">
            <defs>
              <pattern
                id="waves"
                x="0"
                y="0"
                width="100"
                height="100"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M0,50 Q25,0 50,50 T100,50"
                  stroke="white"
                  strokeWidth="2"
                  fill="none"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#waves)" />
          </svg>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl opacity-10 animate-blob" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl opacity-10 animate-blob animation-delay-2000" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-block mb-6 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
          <p className="text-sm font-semibold text-white">
            Ready to transform your life?
          </p>
        </div>

        <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Start Visualizing
          <br />
          Your Journey Today
        </h2>

        <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
          Join thousands of people who are already mapping their life stories,
          tracking milestones, and achieving their dreams with clarity and
          purpose.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button className="group relative px-12 py-5 bg-white text-blue-600 rounded-full font-bold text-lg overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
            <span className="relative z-10 flex items-center">
              Get Started Free
              <span className="inline-block ml-3 group-hover:translate-x-1 transition-transform">
                →
              </span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-cyan-50 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>

          <button className="group px-12 py-5 bg-white/20 backdrop-blur-sm text-white rounded-full font-bold text-lg border-2 border-white/50 hover:border-white hover:bg-white/30 transition-all duration-300 hover:scale-105">
            <span className="flex items-center">
              Watch Demo
              <span className="inline-block ml-3 group-hover:translate-x-1 transition-transform">
                ▶
              </span>
            </span>
          </button>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center text-blue-100 text-sm font-medium">
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-white/60 rounded-full" />
            No credit card required
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-white/60 rounded-full" />
            Free forever plan
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-white/60 rounded-full" />
            Instant access
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
