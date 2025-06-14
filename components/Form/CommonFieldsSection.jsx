"use client";

import React, { useState } from "react";
import {
  MapPin,
  User2,
  LinkedinIcon,
  Hourglass,
  Globe2,
  Trash2,
  Plus,
  Cake,
} from "lucide-react";
import FormSelect from "./UI/FormSelect";
import FormInput from "./UI/FormInput";
import FormTextarea from "./UI/FormTextArea";
import FormBackgroundEffect from "../Effect/FormBackgroundEffect";
import { Button } from "../ui/button";

const CommonFieldsSection = ({
  formState,
  formErrors,
  handleChange,
  willSkip,
}) => {
  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];

  // Handle website updates
  const handleWebsiteChange = (index, field, value) => {
    const updatedWebsites = [...(formState.websites || [])];
    updatedWebsites[index] = { ...updatedWebsites[index], [field]: value };
    handleChange("websites", updatedWebsites);
  };

  const addWebsite = () => {
    const updatedWebsites = [
      ...(formState.websites || []),
      { name: "", url: "" },
    ];
    handleChange("websites", updatedWebsites);
  };

  const removeWebsite = (index) => {
    const updatedWebsites = [...(formState.websites || [])];
    updatedWebsites.splice(index, 1);
    handleChange("websites", updatedWebsites);
  };

  return (
    <div className="form-layout mb-10">
      <FormBackgroundEffect />

      <h2 className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-500 dark:from-blue-500 dark:via-indigo-500 dark:to-cyan-400">
        Personal Details
      </h2>

      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Please fill in your personal details. This information will help us
        understand your background and preferences better.
      </p>

      <div>
        <FormSelect
          id="gender"
          label="Gender"
          value={formState.gender}
          onChange={handleChange}
          options={genderOptions}
          error={formErrors.gender}
          required
          icon={<User2 size={18} />}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {/* Date of Birth Input */}
          <FormInput
            id="dob"
            label="DOB"
            type="date"
            value={formState.dob}
            onChange={(e) => {
              const dob = new Date(e.target.value);
              const today = new Date();

              let years = today.getFullYear() - dob.getFullYear();
              let months = today.getMonth() - dob.getMonth();
              let days = today.getDate() - dob.getDate();

              if (days < 0) {
                months -= 1;
                const prevMonth = new Date(
                  today.getFullYear(),
                  today.getMonth(),
                  0
                );
                days += prevMonth.getDate();
              }

              if (months < 0) {
                years -= 1;
                months += 12;
              }

              const ageString = `${years} years ${months} months ${days} days`;
              const msInWeek = 1000 * 60 * 60 * 24 * 7;
              const weeksLived = Math.floor(
                (today.getTime() - dob.getTime()) / msInWeek
              );

              handleChange("dob", e.target.value);
              handleChange("age", ageString);
              handleChange("weeksLived", weeksLived);
            }}
            error={formErrors.dob}
            required
            icon={<Cake size={24} />}
            min={18}
            max={100}
          />

          {/* Age Display */}
          <FormInput
            id="age"
            label="Age"
            type="text"
            value={formState.age}
            required
            disabled
            icon={<Hourglass size={24} />}
          />

          {/* Weeks Lived Display Card */}
          {/* Weeks Lived Display */}
          <div className="md:col-span-2">
            <div className="input-field flex flex-col items-center justify-center p-4">
              <p className="text-sm text-muted-foreground mb-1">
                Weeks Lived Since Birth{" "}
                <span className="italic">(approximately)</span>
              </p>
              <p className="text-2xl font-bold text-primary">
                {formState.weeksLived === "" ? "--" : formState.weeksLived}{" "}
                <span className="text-base font-medium">weeks</span>
              </p>
            </div>
            <p className="text-xs text-muted-foreground mt-1 text-center italic">
              Note: This is an approximate value. For example, someone who has
              lived for 11 days will still show as 1 week lived.
            </p>
          </div>
        </div>

        {!willSkip && (
          <>
            <div className="md:col-span-2">
              <FormInput
                id="location"
                label="Location"
                value={formState.location}
                onChange={(e) => handleChange("location", e.target.value)}
                error={formErrors.location}
                required
                placeholder="City, State, Country"
                icon={<MapPin size={24} />}
              />
            </div>

            <div className="md:col-span-2">
              <FormTextarea
                id="bio"
                label="Bio"
                value={formState.bio}
                onChange={(e) => handleChange("bio", e.target.value)}
                error={formErrors.bio}
                required
                placeholder="Tell us about yourself..."
                rows={4}
              />
            </div>

            <div className="md:col-span-2">
              <FormInput
                id="linkedInUrl"
                label="LinkedIn Profile URL"
                type="url"
                value={formState.linkedInUrl}
                onChange={(e) => handleChange("linkedInUrl", e.target.value)}
                error={formErrors.linkedInUrl}
                placeholder="https://linkedin.com/in/yourprofile"
                icon={<LinkedinIcon size={24} />}
              />
            </div>
          </>
        )}
      </div>

      {/* 🌐 Websites Section */}
      {!willSkip && (
        <div className="md:col-span-2 mt-6">
          <h3 className="text-md font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
            <Globe2 size={18} />
            Websites
          </h3>

          {(formState.websites || []).map((website, index) => (
            <div
              key={index}
              className="flex items-center justify-between gap-4"
            >
              <div className="flex-1 min-w-[200px]">
                <FormInput
                  id={`website-name-${index}`}
                  label="Website Name"
                  value={website.name}
                  onChange={(e) =>
                    handleWebsiteChange(index, "name", e.target.value)
                  }
                  placeholder="e.g. Portfolio, GitHub"
                  required
                />
              </div>

              <div className="flex-1 min-w-[200px]">
                <FormInput
                  id={`website-url-${index}`}
                  label="Website URL"
                  type="url"
                  value={website.url}
                  onChange={(e) =>
                    handleWebsiteChange(index, "url", e.target.value)
                  }
                  placeholder="https://example.com"
                  required
                />
              </div>

              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  onClick={() =>
                    website.url &&
                    window.open(
                      website.url.startsWith("http")
                        ? website.url
                        : `https://${website.url}`,
                      "_blank"
                    )
                  }
                  title="Preview link"
                  className="bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 text-blue-600 dark:text-blue-400 rounded-md px-3 py-2 text-sm h-fit"
                >
                  Preview
                </Button>
                <Button
                  type="button"
                  onClick={() => removeWebsite(index)}
                  title="Remove website"
                  className="bg-red-100 hover:bg-red-200 dark:bg-red-900 dark:hover:bg-red-800 text-red-600 dark:text-red-400 rounded-md px-3 py-2 text-sm h-fit"
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}

          <Button
            onClick={addWebsite}
            className="mt-2 px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-white text-sm font-medium flex items-center gap-2"
          >
            <Plus size={16} />
            Add Website
          </Button>
        </div>
      )}
    </div>
  );
};

export default CommonFieldsSection;
