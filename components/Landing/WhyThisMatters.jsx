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
      className="py-32 px-8 bg-gradient-to-b from-white via-slate-50/20 to-blue-50/15 dark:from-slate-800 dark:to-slate-900"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-6xl font-extralight mb-8 tracking-tight text-slate-800 dark:text-white">
            Why Your Timeline Matters
          </h2>
          <p className="text-xl max-w-4xl mx-auto leading-relaxed font-light text-slate-600 dark:text-slate-300 tracking-wide">
            A clear, visual timeline helps you celebrate memories and understand
            the world events that shaped those moments.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-16">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div key={index} className="group text-center">
                <div className="mb-10 flex justify-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-50/80 to-blue-100/80 dark:from-blue-500/10 dark:to-blue-500/20 rounded-3xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300 border border-blue-100/40 dark:border-blue-400/15 shadow-sm backdrop-blur-sm">
                    <Icon className="w-9 h-9 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>

                <h3 className="text-2xl font-light mb-6 text-slate-800 dark:text-white tracking-tight">
                  {benefit.title}
                </h3>

                <p className="leading-relaxed font-light text-slate-600 dark:text-slate-300 tracking-wide">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyThisMatters;
