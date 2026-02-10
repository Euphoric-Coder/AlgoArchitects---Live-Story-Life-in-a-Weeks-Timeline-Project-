import React from "react";
import {
  User,
  Calendar,
  Baseline as Timeline,
  Edit3,
  Download,
  Bell,
  Shield,
  Camera,
  Grid3x3,
  Target,
  Palette,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Grid3x3,
      title: "Weekly Life Grid",
      description:
        "Visualize every week of your life in a compact timeline. See the past, present, and future at a glance.",
      gradient: "from-blue-500 to-indigo-600",
    },
    {
      icon: Target,
      title: "Milestone Tracker",
      description:
        "Add personal goals and achievements effortlessly. Mark important moments and watch your story unfold.",
      gradient: "from-indigo-500 to-purple-600",
    },
    {
      icon: Download,
      title: "Export as PDF",
      description:
        "Save and share your timeline easily. Create beautiful reports of your life journey in seconds.",
      gradient: "from-cyan-500 to-blue-600",
    },
    {
      icon: Palette,
      title: "Custom Themes",
      description:
        "Switch between light and dark modes. Personalize your experience with beautiful color schemes.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: TrendingUp,
      title: "Progress Tracking",
      description:
        "Monitor your growth over time. Set goals and visualize how far you have come on your journey.",
      gradient: "from-cyan-400 to-indigo-600",
    },
    {
      icon: CheckCircle2,
      title: "Goal Planning",
      description:
        "Plan future milestones and achievements. Stay motivated with clear visualization of your aspirations.",
      gradient: "from-blue-600 to-cyan-400",
    },
  ];

  return (
    <section
      id="features"
      className="py-20 bg-blue-50 dark:bg-gray-800 transition-colors duration-300 relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg
          className="absolute w-full h-full opacity-10 dark:opacity-5"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <pattern
              id="grid"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <circle
                cx="10"
                cy="10"
                r="1"
                fill="currentColor"
                className="text-blue-600"
              />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <div className="px-4 py-2 bg-white dark:bg-gray-700 rounded-full border border-blue-200 dark:border-blue-800">
              <p className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Powerful Features
              </p>
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Everything You Need to{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400 bg-clip-text text-transparent">
              Track Your Journey
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Powerful features designed to help you visualize and plan your life
            story with clarity and purpose.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group relative">
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-xl`}
              />
              <div className="relative p-8 bg-white dark:bg-gray-700 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-600 h-full">
                <div
                  className={`w-14 h-14 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}
                >
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
                <div className="mt-6 flex items-center text-blue-600 dark:text-blue-400 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-sm">Learn more</span>
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
