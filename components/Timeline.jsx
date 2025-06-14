import React, { use, useEffect, useState } from "react";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Plus,
} from "lucide-react";

const TimelineView = ({ selectedYear, onYearChange, onEventClick, timelineData }) => {
  const [hoveredWeek, setHoveredWeek] = useState(null);
  const [selectedWeek, setSelectedWeek] = useState(null);

  const years = Object.keys(timelineData).map(Number).sort();
  const currentYearEvents = timelineData[selectedYear] || [];

  // Group events by week
  const eventsByWeek = currentYearEvents.reduce((acc, event) => {
    if (!acc[event.week]) {
      acc[event.week] = [];
    }
    acc[event.week].push(event);
    return acc;
  }, {});

  const eventTypes = [
    {
      type: "milestone",
      label: "Major Milestone",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-500",
    },
    {
      type: "career",
      label: "Career Event",
      color: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-500",
    },
    {
      type: "personal",
      label: "Personal Event",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-500",
    },
    {
      type: "travel",
      label: "Travel & Adventure",
      color: "from-cyan-500 to-cyan-600",
      bgColor: "bg-cyan-500",
    },
    {
      type: "global",
      label: "Global Event",
      color: "from-amber-500 to-amber-600",
      bgColor: "bg-amber-500",
    },
  ];

  const getWeekEvents = (weekNumber) => {
    return eventsByWeek[weekNumber] || [];
  };

  const getPrimaryEventColor = (events) => {
    if (events.length === 0) return "";
    // Use the first event's color as primary
    return events[0].color;
  };

  const handleWeekClick = (weekNumber, events) => {
    if (events.length === 0) return;

    if (events.length === 1) {
      onEventClick(events[0].id);
    } else {
      setSelectedWeek(selectedWeek === weekNumber ? null : weekNumber);
    }
  };

  return (
    <div className="space-y-8">
      {/* Timeline Container */}
      <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50 shadow-xl p-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 pb-6 border-b border-slate-200/50 dark:border-slate-700/50">
          <div className="flex items-center gap-4 mb-6 lg:mb-0">
            <div className="relative">
              <div className="p-3 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 rounded-xl shadow-lg shadow-blue-500/25">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full border-2 border-white dark:border-slate-800"></div>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-slate-800 dark:text-white mb-1">
                Timeline View
              </h2>
              <p className="text-slate-600 dark:text-slate-400 font-light">
                Your life story, week by week
              </p>
            </div>
          </div>

          {/* Year Navigation */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onYearChange(Math.max(years[0], selectedYear - 1))}
              disabled={selectedYear <= years[0]}
              className="group p-3 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 border border-slate-200/50 dark:border-slate-600/50 hover:border-slate-300/50 dark:hover:border-slate-500/50 shadow-sm hover:shadow-md"
            >
              <ChevronLeft className="w-5 h-5 text-slate-600 dark:text-slate-300 group-hover:text-slate-800 dark:group-hover:text-white transition-colors duration-200" />
            </button>

            <div className="px-6 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 text-white rounded-xl font-bold text-lg min-w-[100px] text-center shadow-lg shadow-blue-500/25 border border-blue-400/20">
              {selectedYear}
            </div>

            <button
              onClick={() =>
                onYearChange(
                  Math.min(years[years.length - 1], selectedYear + 1)
                )
              }
              disabled={selectedYear >= years[years.length - 1]}
              className="group p-3 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 border border-slate-200/50 dark:border-slate-600/50 hover:border-slate-300/50 dark:hover:border-slate-500/50 shadow-sm hover:shadow-md"
            >
              <ChevronRight className="w-5 h-5 text-slate-600 dark:text-slate-300 group-hover:text-slate-800 dark:group-hover:text-white transition-colors duration-200" />
            </button>
          </div>
        </div>

        {/* Legend */}
        <div className="mb-8">
          <h4 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">
            Event Categories
          </h4>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
            {eventTypes.map((type, index) => (
              <div
                key={index}
                className="flex items-center gap-2 p-3 bg-slate-50/80 dark:bg-slate-700/50 rounded-lg border border-slate-200/30 dark:border-slate-600/30 backdrop-blur-sm"
              >
                <div
                  className={`w-3 h-3 bg-gradient-to-r ${type.color} rounded-full shadow-sm`}
                ></div>
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                  {type.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Month Labels */}
        <div className="grid grid-cols-12 gap-2 mb-4">
          {[
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ].map((month) => (
            <div key={month} className="text-center">
              <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 tracking-wide">
                {month}
              </span>
            </div>
          ))}
        </div>

        {/* Week Grid */}
        <div className="relative p-6 bg-gradient-to-br from-slate-50/80 to-slate-100/80 dark:from-slate-800/50 dark:to-slate-900/50 rounded-xl border border-slate-200/30 dark:border-slate-700/30 backdrop-blur-sm shadow-inner">
          <div className="grid grid-cols-12 gap-2">
            {Array.from({ length: 12 }, (_, monthIndex) => (
              <div key={monthIndex} className="flex flex-col gap-1.5">
                {Array.from({ length: 4 }, (_, weekInMonth) => {
                  const weekNumber = monthIndex * 4 + weekInMonth + 1;
                  if (weekNumber > 52) return null;

                  const weekEvents = getWeekEvents(weekNumber);
                  const hasEvents = weekEvents.length > 0;
                  const hasMultipleEvents = weekEvents.length > 1;

                  return (
                    <div
                      key={weekNumber}
                      className={`relative group cursor-pointer transition-all duration-300 ${
                        hasEvents
                          ? `bg-gradient-to-br ${getPrimaryEventColor(
                              weekEvents
                            )} shadow-lg hover:shadow-xl transform hover:scale-125 hover:-translate-y-1 border border-white/20`
                          : "bg-slate-300/60 dark:bg-slate-600/60 hover:bg-slate-400/80 dark:hover:bg-slate-500/80 border border-slate-400/20 dark:border-slate-500/20 hover:border-slate-500/40 dark:hover:border-slate-400/40"
                      } w-full h-3.5 rounded-md backdrop-blur-sm`}
                      onMouseEnter={() => setHoveredWeek(weekNumber)}
                      onMouseLeave={() => setHoveredWeek(null)}
                      onClick={() => handleWeekClick(weekNumber, weekEvents)}
                    >
                      {hasEvents && (
                        <>
                          <div className="absolute inset-0 bg-white/20 rounded-md"></div>

                          {/* Multiple events indicator */}
                          {hasMultipleEvents && (
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-white dark:bg-slate-800 rounded-full border-2 border-current flex items-center justify-center">
                              <span className="text-xs font-bold text-slate-800 dark:text-white">
                                {weekEvents.length}
                              </span>
                            </div>
                          )}

                          {/* Hover tooltip */}
                          {hoveredWeek === weekNumber && (
                            <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 opacity-100 transition-all duration-300 z-30 pointer-events-none">
                              <div className="bg-slate-900 dark:bg-slate-700 text-white text-xs px-3 py-2 rounded-lg shadow-xl border border-slate-700 dark:border-slate-600 backdrop-blur-sm min-w-48 max-w-64">
                                <div className="font-semibold mb-1">
                                  Week {weekNumber} • {weekEvents.length} event
                                  {weekEvents.length > 1 ? "s" : ""}
                                </div>
                                {weekEvents.slice(0, 3).map((event, idx) => (
                                  <div
                                    key={idx}
                                    className="text-slate-300 dark:text-slate-400 text-xs mb-1 last:mb-0"
                                  >
                                    • {event.title}
                                  </div>
                                ))}
                                {weekEvents.length > 3 && (
                                  <div className="text-slate-400 dark:text-slate-500 text-xs">
                                    +{weekEvents.length - 3} more...
                                  </div>
                                )}
                                <div className="text-slate-400 dark:text-slate-500 text-xs mt-1">
                                  {weekEvents.length === 1
                                    ? "Click to view"
                                    : "Click to see all"}
                                </div>
                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900 dark:border-t-slate-700"></div>
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Multiple Events Popup */}
        {selectedWeek &&
          eventsByWeek[selectedWeek] &&
          eventsByWeek[selectedWeek].length > 1 && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={() => setSelectedWeek(null)}
              />
              <div className="relative bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xl p-6 max-w-md w-full max-h-96 overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
                    Week {selectedWeek} Events
                  </h3>
                  <button
                    onClick={() => setSelectedWeek(null)}
                    className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-200"
                  >
                    <Plus className="w-4 h-4 text-slate-500 dark:text-slate-400 rotate-45" />
                  </button>
                </div>

                <div className="space-y-3">
                  {eventsByWeek[selectedWeek].map((event, index) => (
                    <div
                      key={index}
                      className="group p-4 bg-slate-50 dark:bg-slate-700 rounded-xl border border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500 transition-all duration-200 cursor-pointer"
                      onClick={() => {
                        onEventClick(event.id);
                        setSelectedWeek(null);
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`p-2 bg-gradient-to-br ${event.color} rounded-lg shadow-sm group-hover:scale-105 transition-transform duration-200`}
                        >
                          <event.icon className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-slate-800 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                            {event.title}
                          </h4>
                          <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2">
                            {event.description}
                          </p>
                          <div
                            className={`inline-block px-2 py-0.5 bg-gradient-to-r ${event.color} rounded-full mt-2`}
                          >
                            <span className="text-xs font-medium text-white capitalize">
                              {event.type}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        {/* Events Summary */}
        <div className="mt-8 pt-6 border-t border-slate-200/50 dark:border-slate-700/50">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h4 className="text-xl font-semibold text-slate-800 dark:text-white mb-1">
                {selectedYear} Events
              </h4>
              <p className="text-slate-600 dark:text-slate-400 font-light">
                {currentYearEvents.length} memorable{" "}
                {currentYearEvents.length === 1 ? "moment" : "moments"} this
                year
              </p>
            </div>

            {currentYearEvents.length > 0 && (
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-500/10 dark:to-emerald-600/10 rounded-full border border-emerald-200/50 dark:border-emerald-400/20">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-emerald-700 dark:text-emerald-300">
                  Active Year
                </span>
              </div>
            )}
          </div>

          {currentYearEvents.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentYearEvents.map((event, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden bg-white/80 dark:bg-slate-700/50 rounded-xl p-4 border border-slate-200/50 dark:border-slate-600/50 hover:border-slate-300/50 dark:hover:border-slate-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-slate-200/20 dark:hover:shadow-slate-900/20 backdrop-blur-sm transform hover:-translate-y-1 cursor-pointer"
                  onClick={() => onEventClick(event.id)}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`relative p-2.5 bg-gradient-to-br ${event.color} rounded-lg shadow-md shadow-slate-200/20 dark:shadow-slate-900/20 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <event.icon className="w-5 h-5 text-white" />
                      <div className="absolute inset-0 bg-white/20 rounded-lg"></div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h5 className="font-semibold text-slate-800 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 line-clamp-1">
                        {event.title}
                      </h5>
                      <p className="text-sm text-slate-600 dark:text-slate-300 mb-2 leading-relaxed line-clamp-2">
                        {event.description}
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="px-2 py-0.5 bg-slate-100 dark:bg-slate-600 rounded-full">
                          <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
                            Week {event.week}
                          </span>
                        </div>
                        <div
                          className={`px-2 py-0.5 bg-gradient-to-r ${event.color} rounded-full`}
                        >
                          <span className="text-xs font-medium text-white capitalize">
                            {event.type}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Subtle background pattern */}
                  <div className="absolute top-0 right-0 w-16 h-16 opacity-5 dark:opacity-10">
                    <event.icon className="w-full h-full text-slate-600 dark:text-slate-400" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-slate-400 dark:text-slate-500" />
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-lg font-light">
                No events recorded for {selectedYear}
              </p>
              <p className="text-slate-400 dark:text-slate-500 text-sm mt-1">
                This year is waiting for your memories
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Year Navigation Dots */}
      <div className="flex justify-center gap-2">
        {years.map((year) => (
          <button
            key={year}
            onClick={() => onYearChange(year)}
            className={`relative transition-all duration-300 ${
              year === selectedYear
                ? "w-8 h-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full shadow-lg shadow-blue-500/25"
                : "w-2 h-2 bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500 rounded-full"
            }`}
          >
            {year === selectedYear && (
              <div className="absolute inset-0 bg-white/30 rounded-full"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimelineView;
