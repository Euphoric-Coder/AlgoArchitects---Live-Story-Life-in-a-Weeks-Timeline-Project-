"use client";

import React, { useMemo, useState } from "react";
import { Calendar, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import FormBackgroundEffect from "./Effect/FormBackgroundEffect";
import AnniversaryList from "./AnniversaryList";

import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const MONTHS = [
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
];

/** Map 1..52 → { monthIndex, weekIndexInMonth(0..3) } */
function mapWeekToMonth(weekNumber) {
  const zeroBased = weekNumber - 1;
  const monthIndex = Math.floor(zeroBased / 4); // 0..12
  const weekIndexInMonth = zeroBased % 4; // 0..3
  return { monthIndex, weekIndexInMonth };
}

const TimelineView = ({
  selectedYear,
  onYearChange,
  onEventClick,
  timelineData,
  refreshData,
}) => {
  const [selectedWeek, setSelectedWeek] = useState(null); // desktop multi-events modal
  const [mobileWeek, setMobileWeek] = useState(null); // mobile sheet week number

  const years = useMemo(
    () =>
      Object.keys(timelineData)
        .map(Number)
        .sort((a, b) => a - b),
    [timelineData]
  );
  const currentYearEvents = timelineData[selectedYear] || [];

  // group events by week
  const eventsByWeek = useMemo(() => {
    const acc = {};
    for (const ev of currentYearEvents) {
      (acc[ev.week] ||= []).push(ev);
    }
    return acc;
  }, [currentYearEvents]);

  // precompute month buckets for mobile
  const eventsByMonth = useMemo(() => {
    const buckets = Array.from({ length: 12 }, () => [[], [], [], []]); // 12 months × 4 weeks
    Object.entries(eventsByWeek).forEach(([wk, events]) => {
      const weekNumber = Number(wk);
      if (weekNumber < 1 || weekNumber > 52) return;
      const { monthIndex, weekIndexInMonth } = mapWeekToMonth(weekNumber);
      if (monthIndex <= 11) buckets[monthIndex][weekIndexInMonth] = events;
    });
    return buckets;
  }, [eventsByWeek]);

  const eventTypes = [
    {
      type: "milestone",
      label: "Major Milestone",
      color: "from-purple-500 to-purple-600",
    },
    {
      type: "career",
      label: "Career Event",
      color: "from-emerald-500 to-emerald-600",
    },
    {
      type: "personal",
      label: "Personal Event",
      color: "from-rose-500 to-rose-600",
    },
    {
      type: "travel",
      label: "Travel & Adventure",
      color: "from-cyan-500 to-cyan-600",
    },
    {
      type: "global",
      label: "Global Event",
      color: "from-amber-500 to-amber-600",
    },
    {
      type: "historical",
      label: "Historical Events",
      color: "from-yellow-500 to-yellow-600",
    },
  ];

  const getWeekEvents = (weekNumber) => eventsByWeek[weekNumber] || [];
  const getPrimaryEventColor = (events) =>
    events.length ? events[0].color : "";

  const handleWeekClickDesktop = (weekNumber, events) => {
    if (!events.length) return;
    if (events.length === 1) onEventClick(events[0].id);
    else setSelectedWeek(selectedWeek === weekNumber ? null : weekNumber);
  };

  const handleWeekClickMobile = (weekNumber, events) => {
    if (!events.length) return;
    setMobileWeek(weekNumber);
  };

  return (
    <div className="space-y-8">
      {/* Container */}
      <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl border-4 border-blue-600 dark:border-blue-300 shadow-xl p-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 pb-6 border-b border-slate-200/50 dark:border-slate-700/50">
          <div className="flex items-center gap-4 mb-6 lg:mb-0">
            <div className="relative">
              <div className="p-3 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 rounded-xl shadow-lg shadow-blue-500/25">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full border-2 border-white dark:border-slate-800" />
            </div>
            <div>
              <h2 className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-500 dark:from-blue-500 dark:via-indigo-500 dark:to-cyan-400">
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
                />
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                  {type.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ---------- DESKTOP (md+) GRID WITH HOVERCARD ---------- */}
        <div className="hidden md:block">
          {/* Month Labels */}
          <div className="grid grid-cols-12 gap-2 mb-4">
            {MONTHS.map((month) => (
              <div key={month} className="text-center">
                <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 tracking-wide">
                  {month}
                </span>
              </div>
            ))}
          </div>

          {/* Week Grid */}
          <div className="relative p-6 bg-gradient-to-br from-slate-50/80 to-slate-100/80 dark:from-slate-800/50 dark:to-slate-900/50 rounded-xl border border-blue-600 dark:border-blue-300 backdrop-blur-sm shadow-inner">
            <div className="grid grid-cols-12 gap-2">
              {Array.from({ length: 12 }, (_, monthIndex) => (
                <div key={monthIndex} className="flex flex-col gap-1.5">
                  {Array.from({ length: 4 }, (_, weekInMonth) => {
                    const weekNumber = monthIndex * 4 + weekInMonth + 1;
                    if (weekNumber > 52) return null;

                    const weekEvents = getWeekEvents(weekNumber);
                    const hasEvents = weekEvents.length > 0;
                    const hasMultipleEvents = weekEvents.length > 1;

                    const Cell = (
                      <div
                        className={`relative transition-all duration-300 ${
                          hasEvents
                            ? `bg-gradient-to-br ${getPrimaryEventColor(weekEvents)} shadow-lg hover:shadow-xl transform hover:scale-125 hover:-translate-y-1 border border-white/20`
                            : "bg-slate-300/60 dark:bg-slate-600/60 hover:bg-slate-400/80 dark:hover:bg-slate-500/80 border border-slate-400/20 dark:border-slate-500/20 hover:border-slate-500/40 dark:hover:border-slate-400/40"
                        } w-full h-3.5 rounded-md backdrop-blur-sm cursor-pointer`}
                        onClick={() =>
                          handleWeekClickDesktop(weekNumber, weekEvents)
                        }
                        aria-label={`Week ${weekNumber}${hasEvents ? `, ${weekEvents.length} event${hasMultipleEvents ? "s" : ""}` : ""}`}
                      >
                        {hasEvents && (
                          <>
                            <div className="absolute inset-0 bg-white/20 rounded-md" />
                            {hasMultipleEvents && (
                              <div className="absolute -top-1 -right-1 w-4 h-4 bg-white dark:bg-slate-800 rounded-full border-2 border-current flex items-center justify-center">
                                <span className="text-xs font-bold text-slate-800 dark:text-white">
                                  {weekEvents.length}
                                </span>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    );

                    if (!hasEvents) return <div key={weekNumber}>{Cell}</div>;

                    return (
                      <HoverCard
                        key={weekNumber}
                        openDelay={120}
                        closeDelay={80}
                      >
                        <HoverCardTrigger asChild>{Cell}</HoverCardTrigger>
                        <HoverCardContent
                          side="top"
                          align="center"
                          className="w-64 p-3 rounded-3xl"
                        >
                          <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                            Week {weekNumber} • {weekEvents.length} event
                            {hasMultipleEvents ? "s" : ""}
                          </div>
                          <div className="space-y-1.5">
                            {weekEvents.slice(0, 4).map((event, idx) => (
                              <button
                                key={idx}
                                onClick={() => onEventClick(event.id)}
                                className="w-full text-left text-[13px] px-2 py-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700/70 transition"
                              >
                                <div className="flex items-start gap-2">
                                  <div
                                    className={`mt-0.5 w-2 h-2 rounded-full bg-gradient-to-r ${event.color}`}
                                  />
                                  <span className="line-clamp-2 text-slate-800 dark:text-slate-100">
                                    {event.title}
                                  </span>
                                </div>
                              </button>
                            ))}
                          </div>
                          {weekEvents.length > 4 && (
                            <div className="mt-2 text-[12px] text-slate-500 dark:text-slate-400">
                              +{weekEvents.length - 4} more…
                            </div>
                          )}
                          <div className="mt-2 text-[12px] text-slate-500 dark:text-slate-400">
                            {hasMultipleEvents
                              ? "Click cell to see all"
                              : "Click to open"}
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ---------- MOBILE ( < md ) MONTH LIST WITH WEEK CHIPS + SHEET ---------- */}
        <div className="md:hidden">
          <Accordion type="single" collapsible className="w-full">
            {Array.from({ length: 12 }, (_, monthIdx) => {
              // compute how many events this month
              const monthWeeks = eventsByMonth[monthIdx];
              const monthCount = monthWeeks.flat().length;
              const monthHasAny = monthCount > 0;

              return (
                <AccordionItem key={MONTHS[monthIdx]} value={MONTHS[monthIdx]}>
                  <AccordionTrigger className="text-base">
                    <div className="flex items-center justify-between w-full pr-2">
                      <span className="font-medium">{MONTHS[monthIdx]}</span>
                      <span
                        className={`ml-3 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${
                          monthHasAny
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
                            : "bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-300"
                        }`}
                      >
                        {monthCount} {monthCount === 1 ? "event" : "events"}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-4 gap-2 py-2">
                      {Array.from({ length: 4 }, (_, w) => {
                        const weekNumber = monthIdx * 4 + w + 1;
                        if (weekNumber > 52) return null;
                        const weekEvents = getWeekEvents(weekNumber);
                        const hasEvents = weekEvents.length > 0;
                        const multiple = weekEvents.length > 1;
                        const color = hasEvents
                          ? getPrimaryEventColor(weekEvents)
                          : "";

                        return (
                          <button
                            key={weekNumber}
                            onClick={() =>
                              handleWeekClickMobile(weekNumber, weekEvents)
                            }
                            className={`relative h-9 rounded-lg border text-xs px-1.5 transition ${
                              hasEvents
                                ? `bg-gradient-to-br ${color} text-white border-white/20 shadow-sm active:scale-95`
                                : "bg-slate-200/70 dark:bg-slate-700/70 text-slate-700 dark:text-slate-200 border-slate-300/50 dark:border-slate-600/50 active:scale-95"
                            }`}
                            aria-label={`Week ${weekNumber}${hasEvents ? `, ${weekEvents.length} events` : ""}`}
                          >
                            <span className="font-medium">
                              W{weekNumber - monthIdx * 4}
                            </span>
                            {hasEvents && (
                              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-white dark:bg-slate-800 border-2 border-current text-[10px] font-bold flex items-center justify-center">
                                {weekEvents.length}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>

          {/* Mobile sheet for a week's events */}
          <Sheet
            open={!!mobileWeek}
            onOpenChange={(open) => !open && setMobileWeek(null)}
          >
            <SheetContent
              side="bottom"
              className="max-h-[70vh] overflow-y-auto"
            >
              <SheetHeader>
                <SheetTitle>
                  {mobileWeek ? (
                    <>
                      {(() => {
                        const { monthIndex, weekIndexInMonth } =
                          mapWeekToMonth(mobileWeek);
                        return `${MONTHS[monthIndex]} • Week ${weekIndexInMonth + 1}`;
                      })()}
                    </>
                  ) : (
                    "Week"
                  )}
                </SheetTitle>
                <SheetDescription>
                  {mobileWeek ? `Week ${mobileWeek} of ${selectedYear}` : ""}
                </SheetDescription>
              </SheetHeader>

              <div className="mt-4 space-y-3">
                {mobileWeek &&
                  getWeekEvents(mobileWeek).map((event, idx) => (
                    <div
                      key={idx}
                      className="group p-4 bg-slate-50 dark:bg-slate-700 rounded-xl border border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500 transition-all duration-200"
                      onClick={() => {
                        onEventClick(event.id);
                        setMobileWeek(null);
                      }}
                      role="button"
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`p-2 bg-gradient-to-br ${event.color} rounded-lg shadow-sm group-active:scale-95 transition-transform duration-200`}
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

                {mobileWeek && getWeekEvents(mobileWeek).length === 0 && (
                  <p className="text-center text-sm text-slate-500 dark:text-slate-400 py-6">
                    No events in this week.
                  </p>
                )}
              </div>

              <SheetFooter className="mt-4">
                <SheetClose asChild>
                  <Button variant="outline" className="w-full">
                    Close
                  </Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>

        {/* Events Summary */}
        <div className="mt-8 pt-6 border-t border-slate-200/50 dark:border-slate-700/50">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h4 className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-500 dark:from-blue-500 dark:via-indigo-500 dark:to-cyan-400">
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
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
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
                  className="group form-layout transform hover:-translate-y-1 cursor-pointer"
                  onClick={() => onEventClick(event.id)}
                >
                  <FormBackgroundEffect />
                  <div className="flex items-start gap-3">
                    <div
                      className={`relative p-2.5 bg-gradient-to-br ${event.color} rounded-lg shadow-md shadow-slate-200/20 dark:shadow-slate-900/20 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <event.icon className="w-5 h-5 text-white" />
                      <div className="absolute inset-0 bg-white/20 rounded-lg" />
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

        <AnniversaryList selectedYear={selectedYear} />
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
              <div className="absolute inset-0 bg-white/30 rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Desktop multi-events popup reuses your existing block */}
      {selectedWeek &&
        eventsByWeek[selectedWeek] &&
        eventsByWeek[selectedWeek].length > 1 && (
          <div className="fixed inset-0 z-50 hidden md:flex items-center justify-center p-4">
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
    </div>
  );
};

export default TimelineView;
