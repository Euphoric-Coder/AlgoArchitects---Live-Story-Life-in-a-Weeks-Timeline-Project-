"use client";

import React, { useState, useMemo } from "react";
import {
  Calendar,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  Zap,
  Heart,
  GraduationCap,
  Briefcase,
  MapPin,
  Award,
  Users,
  Plane,
  Globe,
  Plus,
  Clock,
  Tag,
  Eye,
} from "lucide-react";
import { useRouter } from "next/navigation";

const Events = () => {
  const navigate = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedYears, setExpandedYears] = useState(new Set([2023])); 

  const [sortBy, setSortBy] = useState("date"); 

  const [sortOrder, setSortOrder] = useState("desc"); 

  // Enhanced sample events data
  const allEvents = [
    // 2023 Events
    {
      id: "22",
      year: 2023,
      week: 10,
      date: "2023-03-10",
      type: "milestone",
      title: "Career Change",
      description: "Joined Fortune 500 company as Tech Lead",
      icon: Briefcase,
      color: "from-purple-500 to-purple-600",
    },
    {
      id: "23",
      year: 2023,
      week: 30,
      date: "2023-07-28",
      type: "travel",
      title: "Southeast Asia Trip",
      description: "Solo travel through Thailand, Vietnam, Cambodia",
      icon: Plane,
      color: "from-cyan-500 to-cyan-600",
    },
    {
      id: "24",
      year: 2023,
      week: 42,
      date: "2023-10-20",
      type: "personal",
      title: "Relationship Milestone",
      description: "Moved in together after 2 years dating",
      icon: Heart,
      color: "from-rose-500 to-rose-600",
    },
    {
      id: "25",
      year: 2023,
      week: 42,
      date: "2023-10-22",
      type: "milestone",
      title: "Adopted a Pet",
      description: "Welcomed rescue dog Max into our home",
      icon: Heart,
      color: "from-rose-500 to-rose-600",
    },

    // 2022 Events
    {
      id: "17",
      year: 2022,
      week: 22,
      date: "2022-06-01",
      type: "milestone",
      title: "Bought First Home",
      description: "Purchased 2BR condo in Oakland",
      icon: Heart,
      color: "from-rose-500 to-rose-600",
    },
    {
      id: "18",
      year: 2022,
      week: 35,
      date: "2022-08-30",
      type: "personal",
      title: "Started Photography",
      description: "New creative hobby discovered during pandemic",
      icon: Award,
      color: "from-amber-500 to-amber-600",
    },
    {
      id: "19",
      year: 2022,
      week: 48,
      date: "2022-12-01",
      type: "career",
      title: "Side Project Launch",
      description: "Mobile app reached 10K users in first month",
      icon: Zap,
      color: "from-emerald-500 to-emerald-600",
    },
    {
      id: "20",
      year: 2022,
      week: 48,
      date: "2022-12-05",
      type: "milestone",
      title: "Tech Conference Speaker",
      description: "First speaking engagement at DevCon 2022",
      icon: Award,
      color: "from-amber-500 to-amber-600",
    },
    {
      id: "21",
      year: 2022,
      week: 48,
      date: "2022-12-07",
      type: "personal",
      title: "Met Life Partner",
      description: "Met future partner at the tech conference",
      icon: Heart,
      color: "from-rose-500 to-rose-600",
    },

    // 2021 Events
    {
      id: "12",
      year: 2021,
      week: 15,
      date: "2021-04-15",
      type: "personal",
      title: "First Marathon",
      description: "Completed SF Marathon in 4:12:33",
      icon: Award,
      color: "from-amber-500 to-amber-600",
    },
    {
      id: "13",
      year: 2021,
      week: 28,
      date: "2021-07-10",
      type: "travel",
      title: "European Adventure",
      description: "3-week backpacking trip through 8 countries",
      icon: Plane,
      color: "from-cyan-500 to-cyan-600",
    },
    {
      id: "14",
      year: 2021,
      week: 28,
      date: "2021-07-15",
      type: "personal",
      title: "Photography Passion",
      description: "Discovered love for travel photography",
      icon: Award,
      color: "from-amber-500 to-amber-600",
    },
    {
      id: "15",
      year: 2021,
      week: 40,
      date: "2021-10-05",
      type: "career",
      title: "Promotion",
      description: "Promoted to Senior Software Developer",
      icon: Briefcase,
      color: "from-emerald-500 to-emerald-600",
    },
    {
      id: "16",
      year: 2021,
      week: 40,
      date: "2021-10-08",
      type: "milestone",
      title: "Team Lead Role",
      description: "Started leading a team of 4 developers",
      icon: Users,
      color: "from-pink-500 to-pink-600",
    },

    // 2020 Events
    {
      id: "7",
      year: 2020,
      week: 20,
      date: "2020-05-15",
      type: "milestone",
      title: "Graduated University",
      description: "Bachelor of Computer Science with honors",
      icon: GraduationCap,
      color: "from-purple-500 to-purple-600",
    },
    {
      id: "8",
      year: 2020,
      week: 20,
      date: "2020-05-16",
      type: "personal",
      title: "Graduation Party",
      description: "Celebrated with family and friends",
      icon: Heart,
      color: "from-rose-500 to-rose-600",
    },
    {
      id: "9",
      year: 2020,
      week: 32,
      date: "2020-08-10",
      type: "career",
      title: "Started Career",
      description: "Junior Software Developer at InnovateTech",
      icon: Briefcase,
      color: "from-emerald-500 to-emerald-600",
    },
    {
      id: "10",
      year: 2020,
      week: 45,
      date: "2020-11-05",
      type: "personal",
      title: "Moved to New City",
      description: "Relocated to San Francisco for work",
      icon: MapPin,
      color: "from-blue-500 to-blue-600",
    },
    {
      id: "11",
      year: 2020,
      week: 45,
      date: "2020-11-07",
      type: "milestone",
      title: "First Apartment",
      description: "Signed lease for first solo apartment",
      icon: Heart,
      color: "from-rose-500 to-rose-600",
    },

    // 2019 Events
    {
      id: "4",
      year: 2019,
      week: 8,
      date: "2019-02-20",
      type: "travel",
      title: "Study Abroad",
      description: "Semester in Tokyo, Japan",
      icon: Plane,
      color: "from-cyan-500 to-cyan-600",
    },
    {
      id: "5",
      year: 2019,
      week: 22,
      date: "2019-06-01",
      type: "personal",
      title: "Met Best Friend",
      description: "Lifelong friendship began at coffee shop",
      icon: Users,
      color: "from-pink-500 to-pink-600",
    },
    {
      id: "6",
      year: 2019,
      week: 35,
      date: "2019-09-01",
      type: "career",
      title: "First Job Offer",
      description: "Received offer from tech startup",
      icon: Zap,
      color: "from-emerald-500 to-emerald-600",
    },

    // 2018 Events
    {
      id: "1",
      year: 2018,
      week: 12,
      date: "2018-03-20",
      type: "milestone",
      title: "Started University",
      description: "Began Computer Science degree at State University",
      icon: GraduationCap,
      color: "from-purple-500 to-purple-600",
    },
    {
      id: "2",
      year: 2018,
      week: 28,
      date: "2018-07-10",
      type: "career",
      title: "Summer Internship",
      description: "Software development internship at TechCorp",
      icon: Briefcase,
      color: "from-emerald-500 to-emerald-600",
    },
    {
      id: "3",
      year: 2018,
      week: 45,
      date: "2018-11-15",
      type: "personal",
      title: "First Hackathon",
      description: "Won 2nd place in university hackathon",
      icon: Award,
      color: "from-amber-500 to-amber-600",
    },
  ];

  const categories = [
    { value: "all", label: "All Categories", icon: Globe },
    {
      value: "milestone",
      label: "Major Milestone",
      icon: Award,
      color: "from-purple-500 to-purple-600",
    },
    {
      value: "career",
      label: "Career Event",
      icon: Briefcase,
      color: "from-emerald-500 to-emerald-600",
    },
    {
      value: "personal",
      label: "Personal Event",
      icon: Heart,
      color: "from-blue-500 to-blue-600",
    },
    {
      value: "travel",
      label: "Travel & Adventure",
      icon: Plane,
      color: "from-cyan-500 to-cyan-600",
    },
    {
      value: "global",
      label: "Global Event",
      icon: Globe,
      color: "from-amber-500 to-amber-600",
    },
  ];

  // Filter and sort events
  const filteredAndSortedEvents = useMemo(() => {
    let filtered = allEvents.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || event.type === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    // Sort events
    filtered.sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case "date":
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
        case "title":
          comparison = a.title.localeCompare(b.title);
          break;
        case "category":
          comparison = a.type.localeCompare(b.type);
          break;
      }

      return sortOrder === "desc" ? -comparison : comparison;
    });

    return filtered;
  }, [allEvents, searchQuery, selectedCategory, sortBy, sortOrder]);

  // Group events by year
  const eventsByYear = useMemo(() => {
    const grouped = filteredAndSortedEvents.reduce((acc, event) => {
      if (!acc[event.year]) {
        acc[event.year] = [];
      }
      acc[event.year].push(event);
      return acc;
    }, {});

    // Sort years in descending order (latest first)
    const sortedYears = Object.keys(grouped)
      .map(Number)
      .sort((a, b) => b - a);

    return sortedYears.map((year) => ({
      year,
      events: grouped[year],
    }));
  }, [filteredAndSortedEvents]);

  const toggleYear = (year) => {
    const newExpanded = new Set(expandedYears);
    if (newExpanded.has(year)) {
      newExpanded.delete(year);
    } else {
      newExpanded.add(year);
    }
    setExpandedYears(newExpanded);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getTotalEvents = () => allEvents.length;
  const getFilteredCount = () => filteredAndSortedEvents.length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-light text-slate-800 dark:text-white mb-2">
            All Events
          </h1>
          <p className="text-slate-600 dark:text-slate-400 font-light">
            {getFilteredCount()} of {getTotalEvents()} events • Organized by
            year
          </p>
        </div>

        <button
          onClick={() => navigate.push("/dashboard")}
          className="group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl flex items-center gap-2"
        >
          <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
          Add Event
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50 shadow-xl p-6">
        <div className="grid lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="lg:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none"
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500 pointer-events-none" />
            </div>
          </div>

          {/* Sort */}
          <div>
            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="flex-1 px-3 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                <option value="date">Date</option>
                <option value="title">Title</option>
                <option value="category">Category</option>
              </select>
              <button
                onClick={() =>
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                }
                className="px-3 py-3 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 border border-slate-200 dark:border-slate-600 rounded-xl transition-colors duration-200"
              >
                {sortOrder === "desc" ? (
                  <ChevronDown className="w-5 h-5" />
                ) : (
                  <ChevronUp className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Active Filters */}
        {(searchQuery || selectedCategory !== "all") && (
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-200/50 dark:border-slate-700/50">
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Active filters:
            </span>
            {searchQuery && (
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm">
                Search: "{searchQuery}"
              </span>
            )}
            {selectedCategory !== "all" && (
              <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm">
                {categories.find((c) => c.value === selectedCategory)?.label}
              </span>
            )}
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 transition-colors duration-200"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Events by Year */}
      <div className="space-y-6">
        {eventsByYear.length > 0 ? (
          eventsByYear.map(({ year, events }) => (
            <div
              key={year}
              className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50 shadow-xl overflow-hidden"
            >
              {/* Year Header */}
              <button
                onClick={() => toggleYear(year)}
                className="w-full px-6 py-4 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800 hover:from-slate-100 hover:to-slate-200 dark:hover:from-slate-600 dark:hover:to-slate-700 transition-all duration-200 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 rounded-xl shadow-lg shadow-blue-500/25">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <h2 className="text-2xl font-semibold text-slate-800 dark:text-white">
                      {year}
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 font-light">
                      {events.length} event{events.length !== 1 ? "s" : ""}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-white/70 dark:bg-slate-600/50 rounded-full border border-slate-200/50 dark:border-slate-500/50">
                    <Clock className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                      {events.length} memories
                    </span>
                  </div>
                  {expandedYears.has(year) ? (
                    <ChevronUp className="w-6 h-6 text-slate-500 dark:text-slate-400" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-slate-500 dark:text-slate-400" />
                  )}
                </div>
              </button>

              {/* Events List */}
              {expandedYears.has(year) && (
                <div className="p-6 space-y-4">
                  {events.map((event, index) => (
                    <div
                      key={event.id}
                      className="group relative overflow-hidden bg-slate-50/80 dark:bg-slate-700/50 rounded-xl p-6 border border-slate-200/50 dark:border-slate-600/50 hover:border-slate-300/50 dark:hover:border-slate-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-slate-200/20 dark:hover:shadow-slate-900/20 backdrop-blur-sm transform hover:-translate-y-1 cursor-pointer"
                      onClick={() => navigate.push(`/event/${event.id}`)}
                    >
                      <div className="flex items-start gap-4">
                        {/* Event Icon */}
                        <div
                          className={`relative p-3 bg-gradient-to-br ${event.color} rounded-xl shadow-lg shadow-slate-200/20 dark:shadow-slate-900/20 group-hover:scale-110 transition-transform duration-300`}
                        >
                          <event.icon className="w-6 h-6 text-white" />
                          <div className="absolute inset-0 bg-white/20 rounded-xl"></div>
                        </div>

                        {/* Event Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1 min-w-0">
                              <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                                {event.title}
                              </h3>
                              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                                {event.description}
                              </p>
                            </div>

                            <div className="flex items-center gap-2 ml-4">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigate.push(`/event/${event.id}`);
                                }}
                                className="p-2 rounded-lg bg-white/70 dark:bg-slate-600/50 hover:bg-white dark:hover:bg-slate-600 border border-slate-200/50 dark:border-slate-500/50 hover:border-slate-300/50 dark:hover:border-slate-400/50 transition-all duration-200 opacity-0 group-hover:opacity-100"
                              >
                                <Eye className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                              </button>
                            </div>
                          </div>

                          {/* Event Meta */}
                          <div className="flex items-center gap-3 flex-wrap">
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/70 dark:bg-slate-600/50 rounded-full border border-slate-200/50 dark:border-slate-500/50">
                              <Calendar className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                              <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                {formatDate(event.date)}
                              </span>
                            </div>

                            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/70 dark:bg-slate-600/50 rounded-full border border-slate-200/50 dark:border-slate-500/50">
                              <Clock className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                              <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                Week {event.week}
                              </span>
                            </div>

                            <div
                              className={`flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r ${event.color} rounded-full shadow-sm`}
                            >
                              <Tag className="w-4 h-4 text-white" />
                              <span className="text-sm font-medium text-white capitalize">
                                {event.type.replace("_", " ")}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Subtle background pattern */}
                      <div className="absolute top-0 right-0 w-24 h-24 opacity-5 dark:opacity-10">
                        <event.icon className="w-full h-full text-slate-600 dark:text-slate-400" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50 shadow-xl p-12 text-center">
            <div className="w-24 h-24 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-slate-400 dark:text-slate-500" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">
              No events found
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              {searchQuery || selectedCategory !== "all"
                ? "Try adjusting your search or filters to find more events."
                : "Start adding events to build your timeline story."}
            </p>
            {(searchQuery || selectedCategory !== "all") && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors duration-200"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}
      </div>

      {/* Summary Stats */}
      {eventsByYear.length > 0 && (
        <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50 shadow-xl p-6">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">
            Timeline Summary
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-slate-50 dark:bg-slate-700 rounded-xl">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                {eventsByYear.length}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Years Covered
              </div>
            </div>
            <div className="text-center p-4 bg-slate-50 dark:bg-slate-700 rounded-xl">
              <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">
                {getTotalEvents()}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Total Events
              </div>
            </div>
            <div className="text-center p-4 bg-slate-50 dark:bg-slate-700 rounded-xl">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                {allEvents.filter((e) => e.type === "milestone").length}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Milestones
              </div>
            </div>
            <div className="text-center p-4 bg-slate-50 dark:bg-slate-700 rounded-xl">
              <div className="text-2xl font-bold text-cyan-600 dark:text-cyan-400 mb-1">
                {Math.max(...eventsByYear.map((y) => y.year)) -
                  Math.min(...eventsByYear.map((y) => y.year)) +
                  1}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Year Span
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
