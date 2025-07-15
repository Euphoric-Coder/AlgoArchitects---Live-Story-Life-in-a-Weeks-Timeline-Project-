"use client";

import BasicInfoSection from "@/components/Form/BasicInfoSection";
import CommonFieldsSection from "@/components/Form/CommonFieldsSection";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState, useRef } from "react";

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

  const [initialData, setInitialData] = useState({});
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const checkUser = async () => {
      if (!user) return;

      const result = await fetch("/api/user-data");
      const resp = await result.json();

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

      const updatedData = {
        fullName: user?.fullName || "",
        email: user?.primaryEmailAddress?.emailAddress || "",
        profileImage: user?.imageUrl || "",
        gender: resp.gender || "",
        dob: resp.dob || "",
        weeksLived,
        age,
        location: resp.location || "",
        bio: resp.bio || "",
        linkedInUrl: resp.linkedInUrl || "",
        websites: resp.websites || [],
        hasOnboarded: resp.isOnboarded || false,
      };

      setFormData(updatedData);
      setInitialData(updatedData); // store initial data
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

  const isDataChanged = () => {
    return JSON.stringify(formData) !== JSON.stringify(initialData);
  };

  const handleSave = () => {
    console.log("Updated formData:", formData);
    setInitialData(formData); // Update initial to current after save
  };

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
        {isDataChanged() && (
          <Button
            className="btn7"
            onClick={handleSave}
          >
            Save
          </Button>
        )}
      </div>
    </div>
  );
};

export default page;
