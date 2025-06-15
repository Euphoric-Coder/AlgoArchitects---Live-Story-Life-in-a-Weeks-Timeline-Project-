import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Zap, Heart, GraduationCap, Briefcase, MapPin, Award, Users, Plane } from 'lucide-react';

const Preview = () => {
  const [selectedYear, setSelectedYear] = useState(2020);
  const [hoveredEvent, setHoveredEvent] = useState(null);
  
  // Enhanced sample timeline data with more variety
  const timelineData = {
    2018: [
      { week: 12, type: 'milestone', title: 'Started University', description: 'Began Computer Science degree', icon: GraduationCap, color: 'from-purple-500 to-purple-600', bgColor: 'bg-purple-500' },
      { week: 28, type: 'career', title: 'Summer Internship', description: 'Software development internship', icon: Briefcase, color: 'from-emerald-500 to-emerald-600', bgColor: 'bg-emerald-500' },
      { week: 45, type: 'personal', title: 'First Hackathon', description: 'Won 2nd place in university hackathon', icon: Award, color: 'from-amber-500 to-amber-600', bgColor: 'bg-amber-500' },
    ],
    2019: [
      { week: 8, type: 'travel', title: 'Study Abroad', description: 'Semester in Tokyo, Japan', icon: Plane, color: 'from-cyan-500 to-cyan-600', bgColor: 'bg-cyan-500' },
      { week: 22, type: 'personal', title: 'Met Best Friend', description: 'Lifelong friendship began', icon: Users, color: 'from-pink-500 to-pink-600', bgColor: 'bg-pink-500' },
      { week: 35, type: 'career', title: 'First Job Offer', description: 'Received offer from tech startup', icon: Zap, color: 'from-emerald-500 to-emerald-600', bgColor: 'bg-emerald-500' },
    ],
    2020: [
      { week: 20, type: 'milestone', title: 'Graduated University', description: 'Bachelor of Computer Science', icon: GraduationCap, color: 'from-purple-500 to-purple-600', bgColor: 'bg-purple-500' },
      { week: 32, type: 'career', title: 'Started Career', description: 'Junior Software Developer', icon: Briefcase, color: 'from-emerald-500 to-emerald-600', bgColor: 'bg-emerald-500' },
      { week: 45, type: 'personal', title: 'Moved to New City', description: 'Relocated to San Francisco', icon: MapPin, color: 'from-blue-500 to-blue-600', bgColor: 'bg-blue-500' },
    ],
    2021: [
      { week: 15, type: 'personal', title: 'First Marathon', description: 'Completed SF Marathon in 4:12', icon: Award, color: 'from-amber-500 to-amber-600', bgColor: 'bg-amber-500' },
      { week: 28, type: 'travel', title: 'European Adventure', description: '3-week backpacking trip', icon: Plane, color: 'from-cyan-500 to-cyan-600', bgColor: 'bg-cyan-500' },
      { week: 40, type: 'career', title: 'Promotion', description: 'Senior Software Developer', icon: Briefcase, color: 'from-emerald-500 to-emerald-600', bgColor: 'bg-emerald-500' },
    ],
    2022: [
      { week: 22, type: 'milestone', title: 'Bought First Home', description: 'Purchased condo in Oakland', icon: Heart, color: 'from-rose-500 to-rose-600', bgColor: 'bg-rose-500' },
      { week: 35, type: 'personal', title: 'Started Photography', description: 'New creative hobby discovered', icon: Award, color: 'from-amber-500 to-amber-600', bgColor: 'bg-amber-500' },
      { week: 48, type: 'career', title: 'Side Project Launch', description: 'Mobile app reached 10K users', icon: Zap, color: 'from-emerald-500 to-emerald-600', bgColor: 'bg-emerald-500' },
    ],
    2023: [
      { week: 10, type: 'milestone', title: 'Career Change', description: 'Joined Fortune 500 company', icon: Briefcase, color: 'from-purple-500 to-purple-600', bgColor: 'bg-purple-500' },
      { week: 30, type: 'travel', title: 'Southeast Asia Trip', description: 'Solo travel through 6 countries', icon: Plane, color: 'from-cyan-500 to-cyan-600', bgColor: 'bg-cyan-500' },
      { week: 42, type: 'personal', title: 'Relationship Milestone', description: 'Moved in together', icon: Heart, color: 'from-rose-500 to-rose-600', bgColor: 'bg-rose-500' },
    ]
  };

  const years = Object.keys(timelineData).map(Number).sort();
  const currentYearEvents = timelineData[selectedYear] || [];

  const eventTypes = [
    { type: 'milestone', label: 'Major Milestone', color: 'from-purple-500 to-purple-600', bgColor: 'bg-purple-500' },
    { type: 'career', label: 'Career Event', color: 'from-emerald-500 to-emerald-600', bgColor: 'bg-emerald-500' },
    { type: 'personal', label: 'Personal Event', color: 'from-blue-500 to-blue-600', bgColor: 'bg-blue-500' },
    { type: 'travel', label: 'Travel & Adventure', color: 'from-cyan-500 to-cyan-600', bgColor: 'bg-cyan-500' },
  ];

  return (
    <section id="preview" className="py-32 px-4 bg-gradient-to-b from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23000000%22 fill-opacity=%220.01%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] dark:bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.01%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
      <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-blue-100/30 to-indigo-100/30 dark:from-blue-500/5 dark:to-indigo-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-purple-100/30 to-pink-100/30 dark:from-purple-500/5 dark:to-pink-500/5 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm px-6 py-3 rounded-full border border-slate-200/50 dark:border-slate-700/50 shadow-sm mb-8">
            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Interactive Preview</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-slate-800 dark:text-white mb-8 tracking-tight leading-tight">
            See Your Life
            <span className="block mt-2 font-medium bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-200 dark:via-purple-200 dark:to-indigo-200 bg-clip-text text-transparent">
              At a Glance
            </span>
          </h2>
          
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed font-light">
            Each square represents one week of your life. Navigate through years to see how your personal milestones 
            and memories create a unique visual story that's uniquely yours.
          </p>
        </div>
        
        <div className="relative">
          {/* Main Timeline Container */}
          <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-slate-200/50 dark:border-slate-700/50 shadow-2xl shadow-slate-200/20 dark:shadow-slate-900/20">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-12 pb-8 border-b border-slate-200/50 dark:border-slate-700/50">
              <div className="flex items-center gap-6 mb-6 lg:mb-0">
                <div className="relative">
                  <div className="p-4 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 rounded-2xl shadow-lg shadow-blue-500/25">
                    <Calendar className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full border-2 border-white dark:border-slate-800"></div>
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-semibold text-slate-800 dark:text-white mb-2">Life Timeline</h3>
                  <p className="text-slate-600 dark:text-slate-400 font-light">Interactive visualization of your journey</p>
                </div>
              </div>
              
              {/* Year Navigation */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSelectedYear(Math.max(years[0], selectedYear - 1))}
                  disabled={selectedYear <= years[0]}
                  className="group p-3 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 border border-slate-200/50 dark:border-slate-600/50 hover:border-slate-300/50 dark:hover:border-slate-500/50 shadow-sm hover:shadow-md"
                >
                  <ChevronLeft className="w-5 h-5 text-slate-600 dark:text-slate-300 group-hover:text-slate-800 dark:group-hover:text-white transition-colors duration-200" />
                </button>
                
                <div className="px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 text-white rounded-2xl font-bold text-xl min-w-[120px] text-center shadow-lg shadow-blue-500/25 border border-blue-400/20">
                  {selectedYear}
                </div>
                
                <button
                  onClick={() => setSelectedYear(Math.min(years[years.length - 1], selectedYear + 1))}
                  disabled={selectedYear >= years[years.length - 1]}
                  className="group p-3 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 border border-slate-200/50 dark:border-slate-600/50 hover:border-slate-300/50 dark:hover:border-slate-500/50 shadow-sm hover:shadow-md"
                >
                  <ChevronRight className="w-5 h-5 text-slate-600 dark:text-slate-300 group-hover:text-slate-800 dark:group-hover:text-white transition-colors duration-200" />
                </button>
              </div>
            </div>

            {/* Enhanced Legend */}
            <div className="mb-10">
              <h4 className="text-lg font-semibold text-slate-800 dark:text-white mb-6">Event Categories</h4>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {eventTypes.map((type, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 bg-slate-50/80 dark:bg-slate-700/50 rounded-xl border border-slate-200/30 dark:border-slate-600/30 backdrop-blur-sm">
                    <div className={`w-4 h-4 bg-gradient-to-r ${type.color} rounded-lg shadow-sm`}></div>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{type.label}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Month Labels */}
            <div className="grid grid-cols-12 gap-2 mb-6">
              {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(month => (
                <div key={month} className="text-center">
                  <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 tracking-wide">{month}</span>
                </div>
              ))}
            </div>
            
            {/* Enhanced Week Grid */}
            <div className="relative p-8 bg-gradient-to-br from-slate-50/80 to-slate-100/80 dark:from-slate-800/50 dark:to-slate-900/50 rounded-2xl border-2 border-blue-600 dark:border-blue-300 backdrop-blur-sm shadow-inner">
              <div className="grid grid-cols-12 gap-3">
                {Array.from({ length: 12 }, (_, monthIndex) => (
                  <div key={monthIndex} className="flex flex-col gap-2">
                    {Array.from({ length: 4 }, (_, weekInMonth) => {
                      const weekNumber = monthIndex * 4 + weekInMonth + 1;
                      if (weekNumber > 52) return null;
                      
                      const event = currentYearEvents.find(e => e.week === weekNumber);
                      const isEvent = !!event;
                      
                      return (
                        <div
                          key={weekNumber}
                          className={`relative group cursor-pointer transition-all duration-300 ${
                            isEvent 
                              ? `bg-gradient-to-br ${event.color} shadow-lg hover:shadow-xl transform hover:scale-125 hover:-translate-y-1 border border-white/20` 
                              : 'bg-slate-300/60 dark:bg-slate-600/60 hover:bg-slate-400/80 dark:hover:bg-slate-500/80 border border-slate-400/20 dark:border-slate-500/20 hover:border-slate-500/40 dark:hover:border-slate-400/40'
                          } w-full h-4 rounded-lg backdrop-blur-sm`}
                          onMouseEnter={() => setHoveredEvent(event)}
                          onMouseLeave={() => setHoveredEvent(null)}
                        >
                          {isEvent && (
                            <>
                              <div className="absolute inset-0 bg-white/20 rounded-lg"></div>
                              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 pointer-events-none">
                                <div className="bg-slate-900 dark:bg-slate-700 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap shadow-xl border border-slate-700 dark:border-slate-600 backdrop-blur-sm">
                                  <div className="font-semibold">{event.title}</div>
                                  <div className="text-slate-300 dark:text-slate-400 text-xs mt-1">{event.description}</div>
                                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900 dark:border-t-slate-700"></div>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Enhanced Events Summary */}
            <div className="mt-12 pt-8 border-t border-slate-200/50 dark:border-slate-700/50">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h4 className="text-2xl font-semibold text-slate-800 dark:text-white mb-2">
                    {selectedYear} Highlights
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 font-light">
                    {currentYearEvents.length} memorable {currentYearEvents.length === 1 ? 'moment' : 'moments'} this year
                  </p>
                </div>
                
                {currentYearEvents.length > 0 && (
                  <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-500/10 dark:to-emerald-600/10 rounded-full border border-emerald-200/50 dark:border-emerald-400/20">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Active Year</span>
                  </div>
                )}
              </div>
              
              {currentYearEvents.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentYearEvents.map((event, index) => (
                    <div 
                      key={index} 
                      className="group form-layout transform hover:-translate-y-1 cursor-pointer transition-all duration-200"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`relative p-3 bg-gradient-to-br ${event.color} rounded-xl shadow-lg shadow-slate-200/20 dark:shadow-slate-900/20 group-hover:scale-110 transition-transform duration-300`}>
                          <event.icon className="w-6 h-6 text-white" />
                          <div className="absolute inset-0 bg-white/20 rounded-xl"></div>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h5 className="font-semibold text-slate-800 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                            {event.title}
                          </h5>
                          <p className="text-sm text-slate-600 dark:text-slate-300 mb-3 leading-relaxed">
                            {event.description}
                          </p>
                          <div className="flex items-center gap-2">
                            <div className="px-3 py-1 bg-slate-100 dark:bg-slate-600 rounded-full">
                              <span className="text-xs font-medium text-slate-600 dark:text-slate-300">Week {event.week}</span>
                            </div>
                            <div className={`px-3 py-1 bg-gradient-to-r ${event.color} rounded-full`}>
                              <span className="text-xs font-medium text-white capitalize">{event.type}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Subtle background pattern */}
                      <div className="absolute top-0 right-0 w-32 h-32 opacity-5 dark:opacity-10">
                        <event.icon className="w-full h-full text-slate-600 dark:text-slate-400" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Calendar className="w-12 h-12 text-slate-400 dark:text-slate-500" />
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-lg font-light">
                    No events recorded for {selectedYear}
                  </p>
                  <p className="text-slate-400 dark:text-slate-500 text-sm mt-2">
                    This year is waiting for your memories
                  </p>
                </div>
              )}
            </div>
          </div>
          
          {/* Enhanced Year Navigation Dots */}
          <div className="flex justify-center mt-8 gap-3">
            {years.map(year => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`relative transition-all duration-300 ${
                  year === selectedYear 
                    ? 'w-12 h-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full shadow-lg shadow-blue-500/25' 
                    : 'w-3 h-3 bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500 rounded-full'
                }`}
              >
                {year === selectedYear && (
                  <div className="absolute inset-0 bg-white/30 rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Preview;