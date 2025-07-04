"use client";

import React, { use, useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Zap,
  Heart,
  GraduationCap,
  Briefcase,
  MapPin,
  Award,
  Users,
  Plane,
  Globe,
  ScrollText,
  Plus,
  Download,
} from "lucide-react";
import TimelineView from "@/components/Timeline";
import { useRouter } from "next/navigation";
import AddEvent from "@/components/AddEvent";
import { db } from "@/lib/dbConfig";
import { eq } from "drizzle-orm";
import { Events, Users as UsersTable } from "@/lib/schema";
import { transformHistoricalEvents } from "@/lib/seedHistoricalData";
import { toast } from "sonner";
import ExportModal from "@/components/ExportModal";

const page = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [userData, setUserData] = useState([]);
  const [eventData, setEventData] = useState(null);
  const [historicalEvents, sethistoricalEvents] = useState([]);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [timelineData, setTimelineData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  const iconMap = {
    Calendar,
    ChevronLeft,
    ChevronRight,
    Zap,
    Heart,
    GraduationCap,
    Briefcase,
    MapPin,
    Award,
    Users,
    Plane,
    Globe,
    ScrollText,
    Plus,
  };

  useEffect(() => {
    fetchUserData();
    setIsLoaded(true);
  }, [user]);

  useEffect(() => {
    processTimelineData();
  }, [userData, eventData]);

  // useEffect(() => {
  //   if (!userData) return; // wait for data to load

  //   if (userData?.[0]?.hasOnboarded === true) {
  //     console.log("hasOnboarded", userData[0].hasOnboarded);
  //   } else {
  //     console.log("hasOnboarded", userData?.[0]?.hasOnboarded);
  //     router.push("/onboarding");
  //   }
  // }, [ userData]);

  // useEffect(() => {
  //   const retrieveHistoricalEvents = async () => {
  //     const userData = await db
  //       .select()
  //       .from(UsersTable)
  //       .where(eq(UsersTable.email, user?.primaryEmailAddress?.emailAddress));

  //     setUserData(userData);

  //     const dob = userData[0]?.dob;

  //     if (dob) {
  //       fetch("/historical_event.csv")
  //         .then((res) => res.text())
  //         .then((csvText) => {
  //           const result = transformHistoricalEvents(
  //             csvText,
  //             user?.primaryEmailAddress?.emailAddress,
  //             dob
  //           );
  //           sethistoricalEvents(result);
  //         });
  //     }
  //   };

  //   retrieveHistoricalEvents();
  // }, [user]);

  useEffect(() => {
    // For seeding historical events initially
    const addHistoricalEvents = async () => {
      if (
        historicalEvents.length > 0 &&
        userData[0]?.dob &&
        userData[0]?.autoSeededHistoricalEvents === false
      ) {
        console.log(historicalEvents);
        const result = await db
          .insert(Events)
          .values(historicalEvents)
          .returning({ insertedId: Events.id });
        const resul1 = await db
          .update(UsersTable)
          .set({
            autoSeededHistoricalEvents: true,
          })
          .where(eq(UsersTable.email, user?.primaryEmailAddress?.emailAddress));
      }
    };

    addHistoricalEvents();
  }, [historicalEvents]);

  const processTimelineData = () => {
    if (userData && eventData) {
      const dob = new Date(userData.dob);
      const birthYear = dob.getFullYear();
      const currentYear = new Date().getFullYear();

      const timelineMap = {};

      // Step 1: Initialize empty arrays for all years from DOB to now
      for (let year = birthYear; year <= currentYear; year++) {
        timelineMap[year.toString()] = [];
      }

      // Step 2: Insert events into their respective years
      eventData.forEach((event) => {
        const yearKey = event.year.toString();

        if (!timelineMap[yearKey]) {
          timelineMap[yearKey] = [];
        }
        const Icon = iconMap[event.icon] || Calendar; // fallback to Calendar

        timelineMap[yearKey].push({
          id: event.id,
          week: event.week,
          type: event.type,
          title: event.title,
          description: event.description,
          icon: Icon,
          color: event.color,
        });
      });

      setTimelineData(timelineMap);
    }
  };

  const fetchUserData = async () => {
    if (!user?.primaryEmailAddress?.emailAddress) return;

    try {
      const result = await fetch("/api/fetch-timeline");

      const { user: userData, events: eventData } = await result.json();
      if (!userData || !eventData) {
        console.error("No user or event data found");
        return;
      }

      console.log(userData);
      setUserData(userData);
      setEventData(eventData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const refreshData = () => {
    fetchUserData();
    processTimelineData();
  };

  const handleEventClick = (eventId) => {
    router.push(`/dashboard/event/${eventId}`);
  };

  const handleAddEvent = async (eventData) => {
    console.log("Adding event:", eventData);
    const result = await db
      .insert(Events)
      .values({
        year: eventData.year,
        date: eventData.date,
        week: eventData.week,
        type: eventData.type,
        title: eventData.title,
        description: eventData.description,
        coverImage: eventData.coverImage,
        coverImageId: eventData.coverImageId,
        notes: eventData.notes,
        icon: eventData.icon,
        color: eventData.color,
        links: eventData.links,
        createdBy: user?.primaryEmailAddress?.emailAddress,
      })
      .returning({ insertedId: Events.id });
    refreshData();
    toast.success("Event added successfully!");
  };

  if (!isLoaded)
    return (
      <div className="flex items-center justify-center h-full">
        <span className="animate-pulse text-blue-500 text-lg">Loading...</span>
      </div>
    );

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6">
        <div>
          <h1 className="font-bold text-4xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-500 dark:from-blue-500 dark:via-indigo-500 dark:to-cyan-400">
            Your Life Timeline
          </h1>
          <p className="text-slate-600 dark:text-slate-400 font-light">
            Every week of your journey, beautifully visualized
          </p>
        </div>

        <div className="flex gap-4 items-center">
          <button
            onClick={() => setIsExportModalOpen(true)}
            className="group bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl border border-slate-200 dark:border-slate-600 flex items-center gap-2"
          >
            <Download className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            Export PDF
          </button>

          <AddEvent onSubmit={handleAddEvent} />
        </div>
      </div>

      {/* Export Modal */}
      {eventData && (
        <ExportModal
          isOpen={isExportModalOpen}
          onClose={() => setIsExportModalOpen(false)}
          events={eventData}
        />
      )}

      <TimelineView
        selectedYear={selectedYear}
        onYearChange={setSelectedYear}
        onEventClick={handleEventClick}
        timelineData={timelineData}
        refreshData={refreshData}
      />
    </div>
  );
};

export default page;
