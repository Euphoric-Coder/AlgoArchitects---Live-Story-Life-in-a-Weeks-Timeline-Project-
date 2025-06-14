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
  Plus,
} from "lucide-react";
import TimelineView from "@/components/Timeline";
import { useRouter } from "next/navigation";
import AddEvent from "@/components/AddEvent";

const page = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [userData, setUserData] = useState(null);
  const [eventData, setEventData] = useState(null);
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
    Plus,
  };

  useEffect(() => {
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

    fetchUserData();
  }, [user]);

  useEffect(() => {
    processTimelineData();
  }, [userData, eventData]);

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
          bgColor: event.bgColor,
        });
      });

      setTimelineData(timelineMap);
    }
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
      />
    </div>
  );
};

export default page;
