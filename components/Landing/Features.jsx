import React from 'react';
import { User, Calendar, Baseline as Timeline, Edit3, Download, Bell, Shield, Camera } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: User,
      title: "Secure Account System",
      description: "Sign up with confidence. Your birthdate and personal timeline are stored securely with full privacy controls."
    },
    {
      icon: Timeline,
      title: "Interactive Timeline Engine",
      description: "Auto-calculate every week you've lived. Scroll, zoom, and tap for details in a clean, responsive interface."
    },
    {
      icon: Calendar,
      title: "Personal & Historical Events",
      description: "Add your milestones while exploring significant world events that happened during your lifetime."
    },
    {
      icon: Edit3,
      title: "Full Event Management",
      description: "Complete CRUD functionality - create, read, update, and delete events with dates, titles, and categories."
    },
    {
      icon: Camera,
      title: "Rich Media Support",
      description: "Attach photos, files, and documents to your events to create a comprehensive visual story."
    },
    {
      icon: Bell,
      title: "Anniversary Reminders",
      description: "Optional notifications for meaningful dates - like '10th graduation anniversary in 3 weeks'."
    },
    {
      icon: Download,
      title: "Export & Share",
      description: "Save your timeline as beautiful images or PDFs to preserve and share your life story."
    },
    {
      icon: Shield,
      title: "Color-Coded Categories",
      description: "Organize and filter events by category with customizable colors for better visual organization."
    }
  ];

  return (
    <section id="features" className="py-32 px-8 bg-gradient-to-b from-blue-50/15 via-slate-50/20 to-white dark:from-slate-700 dark:to-slate-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-6xl font-extralight mb-8 tracking-tight text-slate-800 dark:text-white">
            Everything You Need
          </h2>
          <p className="text-xl max-w-4xl mx-auto leading-relaxed font-light text-slate-600 dark:text-slate-300 tracking-wide">
            Powerful features designed to help you capture, visualize, and cherish your life story.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white/80 dark:bg-white/5 backdrop-blur-xl rounded-3xl p-8 hover:bg-white/95 dark:hover:bg-white/10 border border-slate-100/40 dark:border-white/10 hover:border-slate-200/50 dark:hover:border-white/20 transform hover:-translate-y-2 transition-all duration-300 shadow-sm hover:shadow-lg"
            >
              <div className="mb-8">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-50/80 to-blue-100/80 dark:from-blue-500/10 dark:to-blue-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-blue-100/40 dark:border-blue-400/15 shadow-sm backdrop-blur-sm">
                  <feature.icon className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              
              <h3 className="text-lg font-medium mb-4 text-slate-800 dark:text-white tracking-tight">
                {feature.title}
              </h3>
              
              <p className="text-sm leading-relaxed font-light text-slate-600 dark:text-slate-300 tracking-wide">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;