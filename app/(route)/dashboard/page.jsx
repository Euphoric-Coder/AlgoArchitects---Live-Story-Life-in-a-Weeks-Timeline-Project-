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
} from "lucide-react";
import TimelineView from "@/components/Timeline";
import { useRouter } from "next/navigation";
import AddEvent from "@/components/AddEvent";
import { db } from "@/lib/dbConfig";
import { eq } from "drizzle-orm";
import { Events, Users as UsersTable } from "@/lib/schema";
import { transformHistoricalEvents } from "@/lib/seedHistoricalData";

const page = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [userData, setUserData] = useState(null);
  const [eventData, setEventData] = useState(null);
  const [historicalEvents, sethistoricalEvents] = useState([]);
  const [timelineData, setTimelineData] = useState([]);
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
  }, [user]);

  useEffect(() => {
    processTimelineData();
  }, [userData, eventData]);

  useEffect(() => {
    const retrieveHistoricalEvents = async () => {
      const userData = await db
        .select()
        .from(UsersTable)
        .where(eq(UsersTable.email, user?.primaryEmailAddress?.emailAddress));

      setUserData(userData);

      const dob = userData[0]?.dob;

      if (dob) {
        fetch("/historical_event.csv")
          .then((res) => res.text())
          .then((csvText) => {
            const result = transformHistoricalEvents(
              csvText,
              user?.primaryEmailAddress?.emailAddress,
              dob
            );
            sethistoricalEvents(result);
          });
      }
    };

    retrieveHistoricalEvents();
  }, [user]);

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

  const handleAddEvent = (eventData) => {
    console.log("Adding event:", eventData);
  };

  return (
    <div>
      <AddEvent onSubmit={handleAddEvent} />

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
