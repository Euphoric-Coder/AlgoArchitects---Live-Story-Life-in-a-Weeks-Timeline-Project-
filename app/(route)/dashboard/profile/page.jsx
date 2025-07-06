"use client";

import BasicInfoSection from "@/components/Form/BasicInfoSection";
import CommonFieldsSection from "@/components/Form/CommonFieldsSection";
import { db } from "@/lib/dbConfig";
import { Users } from "@/lib/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const { user, isSignedIn } = useUser();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [onboarded, setOnboarded] = useState(false);
  const [willSkip, setWillSkip] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    profileImage: "",
    gender: "",
    dob: "",
    weeksLived: "",
    age: "",
    location: "",
    bio: "",
    linkedInUrl: "",
    websites: [],

    hasOnboarded: false,
  });

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const checkUser = async () => {
      if (!user) return;

      const result = await fetch("/api/user-data");
      const resp = await result.json();

      console.log(resp);

      let weeksLived = "";
      let age = "";

      if (resp.dob) {
        const dobDate = new Date(resp.dob);
        const today = new Date();

        const msInWeek = 1000 * 60 * 60 * 24 * 7;
        weeksLived = Math.floor((today - dobDate) / msInWeek);

        let years = today.getFullYear() - dobDate.getFullYear();
        let months = today.getMonth() - dobDate.getMonth();
        let days = today.getDate() - dobDate.getDate();

        if (days < 0) {
          months -= 1;
          days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
        }
        if (months < 0) {
          years -= 1;
          months += 12;
        }

        age = `${years} years ${months} months ${days} days`;
      }

      console.log({
        fullName: user?.fullName || "",
        email: user?.primaryEmailAddress?.emailAddress || "",
        profileImage: user?.imageUrl || "",
        gender: resp.gender || "",
        dob: resp.dob || "", // no fallback
        weeksLived,
        age,
        location: resp.location || "",
        bio: resp.bio || "",
        linkedInUrl: resp.linkedInUrl || "",
        websites: resp.websites || [],
        hasOnboarded: resp.isOnboarded || false,
      });

      setFormData({
        fullName: user?.fullName || "",
        email: user?.primaryEmailAddress?.emailAddress || "",
        profileImage: user?.imageUrl || "",
        gender: resp.gender || "",
        dob: resp.dob || "", // no fallback
        weeksLived,
        age,
        location: resp.location || "",
        bio: resp.bio || "",
        linkedInUrl: resp.linkedInUrl || "",
        websites: resp.websites || [],
        hasOnboarded: resp.isOnboarded || false,
      });

      setIsLoggedIn(!!resp.userAdded);
      setOnboarded(!!resp.isOnboarded);
    };

    if (isSignedIn && user) {
      checkUser();
    }
  }, [isSignedIn, user]);

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  console.log(formData);

  return (
    <div>
      <div className="flex flex-col gap-4">
        <BasicInfoSection
          fullName={formData.fullName}
          email={formData.email}
          profileImage={formData.profileImage}
          user={user}
        />
        <CommonFieldsSection
          formState={formData}
          formErrors={formErrors}
          handleChange={handleChange}
          willSkip={willSkip}
        />
      </div>
    </div>
  );
};

export default page;
