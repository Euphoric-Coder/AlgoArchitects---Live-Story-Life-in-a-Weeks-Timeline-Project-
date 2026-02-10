import React from "react";
import { Calendar, ArrowRight, Play } from "lucide-react";

const Hero = ({ onGetStarted }) => {
  const scrollToNext = () => {
    const nextSection = document.getElementById("why-this-matters");
    nextSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-blue-50 to-transparent dark:from-gray-900 dark:via-gray-800 dark:to-transparent transition-colors duration-300">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 dark:bg-blue-900/20 rounded-full blur-3xl opacity-30 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-200 dark:bg-indigo-900/20 rounded-full blur-3xl opacity-30 animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-cyan-200 dark:bg-cyan-900/20 rounded-full blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-block">
              <div className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full border border-blue-200 dark:border-blue-700">
                <p className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  ✨ Visualize Your Life Journey
                </p>
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
              Visualize Your Life,{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400 bg-clip-text text-transparent">
                One Week at a Time
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              Track your milestones, achievements, and goals across an
              interactive weekly life grid. See your journey unfold and plan
              what comes next.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400 text-white rounded-full font-semibold overflow-hidden transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105">
                <span className="relative z-10">Start Free</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
              <button className="group px-8 py-4 border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 rounded-full font-semibold hover:bg-blue-50 dark:hover:bg-blue-950/50 transition-all duration-300 hover:scale-105 relative overflow-hidden">
                <span className="relative z-10 flex items-center justify-center">
                  View Demo
                  <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </span>
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 transform hover:scale-105 transition-all duration-500 border border-blue-100 dark:border-gray-700 backdrop-blur-sm">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/5 to-cyan-500/5 pointer-events-none" />

              <div className="grid grid-cols-12 gap-1 relative z-10">
                {Array.from({ length: 52 * 4 }).map((_, i) => (
                  <div
                    key={i}
                    className={`aspect-square rounded-sm transition-all duration-300 cursor-pointer hover:scale-150 hover:z-50 ${
                      i < 52 * 2
                        ? "bg-gradient-to-br from-blue-500 to-indigo-600"
                        : i < 52 * 3
                          ? "bg-gradient-to-br from-cyan-400 to-blue-500"
                          : "bg-gray-200 dark:bg-gray-700"
                    }`}
                    style={{
                      animationDelay: `${i * 2}ms`,
                      animation: "fadeIn 0.5s ease-in-out forwards",
                    }}
                  />
                ))}
              </div>
              <p className="text-center mt-6 text-sm font-medium text-gray-600 dark:text-gray-400">
                Your life in weeks • 4 years ahead
              </p>
            </div>
            <div className="absolute -top-8 -right-8 w-40 h-40 bg-blue-400 dark:bg-blue-600/30 rounded-full blur-3xl opacity-30 animate-pulse" />
            <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-indigo-400 dark:bg-indigo-600/30 rounded-full blur-3xl opacity-30 animate-pulse" />
            <div className="absolute top-1/3 -right-12 w-32 h-32 bg-cyan-400 dark:bg-cyan-600/30 rounded-full blur-3xl opacity-20 animate-blob" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
