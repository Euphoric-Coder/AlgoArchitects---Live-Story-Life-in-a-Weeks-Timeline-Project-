import React from "react";
import { Clock, Heart, Globe } from "lucide-react";

const WhyThisMatters = () => {
  const benefits = [
    {
      icon: Clock,
      title: "Grasp Time's Flow",
      description:
        "It's hard to grasp how quickly weeks fly by. See your life at a glance and understand the pace of your journey.",
    },
    {
      icon: Heart,
      title: "Celebrate Your Story",
      description:
        "Turn every week since birth into a visual story. Mark personal milestones and meaningful moments that shaped you.",
    },
    {
      icon: Globe,
      title: "Connect with History",
      description:
        "Discover the world events that happened during key moments of your life, creating a richer personal narrative.",
    },
  ];

  return (
    <section
      id="why-this-matters"
      className="py-32 px-6 bg-blue-50 dark:bg-gray-800 transition-colors duration-300 relative overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-300/30 dark:bg-blue-600/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-300/30 dark:bg-indigo-600/20 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-24">
          {/* Badge */}
          <div className="inline-flex items-center gap-3 bg-white dark:bg-gray-700 px-6 py-3 rounded-full border border-blue-200 dark:border-blue-700 shadow-sm mb-6">
            <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full animate-pulse" />
            <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Why It Matters
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Why Your Timeline{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400 bg-clip-text text-transparent">
              Matters
            </span>
          </h2>

          <p className="text-xl max-w-3xl mx-auto text-gray-600 dark:text-gray-300 leading-relaxed">
            A clear, visual timeline helps you celebrate memories and understand
            the world events that shaped those moments.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;

            return (
              <div key={index} className="group relative">
                {/* Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-indigo-500 to-cyan-400 opacity-10 blur-xl rounded-3xl group-hover:opacity-20 transition-all duration-300 pointer-events-none" />

                {/* Card */}
                <div className="relative bg-white/90 dark:bg-gray-700/90 backdrop-blur-xl rounded-3xl p-8 border border-gray-100 dark:border-gray-600 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-center">
                  {/* Icon */}
                  <div className="mb-8 flex justify-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-600 via-indigo-500 to-cyan-400 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                      <Icon className="w-9 h-9 text-white" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                    {benefit.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyThisMatters;
