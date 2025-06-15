"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import BasicInfoSection from "@/components/Form/BasicInfoSection";
import CommonFieldsSection from "@/components/Form/CommonFieldsSection";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import OnboardingSuccess from "@/components/Onboarding/OnboardingSuccessPage";
import RedirectPage from "@/components/Onboarding/RedirectPage";
import { db } from "@/lib/dbConfig";
import { Users } from "@/lib/schema";
import { eq } from "drizzle-orm";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { ModeToggle } from "@/components/theme-btn";
import FormBackgroundEffect from "@/components/Effect/FormBackgroundEffect";

const Page = () => {
  const { user, isSignedIn } = useUser();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
    aboutMe: {},

    isOnboarded: false,
  });

  const [currentPage, setCurrentPage] = useState(1);

  const [willSkip, setWillSkip] = useState(false);
  const [skipAlert, setskipAlert] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const [submitted, setSubmitted] = useState(false);

  const [onboarded, setOnboarded] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const result = await fetch("/api/add-user");
      const resp = await result.json();
      console.log(resp.userAdded);
      setIsLoggedIn(resp.userAdded ? true : false);
      setFormData((prev) => ({
        ...prev,
        isOnboarded: resp.isOnboarded,
      }));
      setOnboarded(resp.isOnboarded);
    };

    if (isSignedIn && user) {
      checkUser();
      setFormData((prev) => ({
        ...prev,
        email: user?.primaryEmailAddress?.emailAddress,
        fullName: user?.fullName,
        profileImage: user?.imageUrl,
      }));
    } else {
      redirect("/sign-in");
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Submitted form data:", formData);

    // const loadingToastId = toast.loading("Submitting your profile...");

    // try {
    //   setFormData((prev) => ({
    //     ...prev,
    //     // isOnboarded: true,
    //   }));

    //   const result = await db
    //     .update(Users)
    //     .set(formData)
    //     .where(eq(Users.email, formData.email))
    //     .returning();

    //   if (result) {
    //     setTimeout(() => {
    //       toast.dismiss(loadingToastId);
    //       toast.success("Profile submitted successfully!");
    //       console.log("Form submitted:", formData);
    //       // setSubmitted(true);
    //     }, 1000);
    //   } else {
    //     setTimeout(() => {
    //       toast.dismiss(loadingToastId);
    //       toast.error("Something went wrong. Please try again.");
    //     }, 1000);
    //   }
    // } catch (error) {
    //   toast.dismiss(loadingToastId);
    //   toast.error("Something went wrong. Please try again.", error);
    // }
  };

  if (!isLoggedIn)
    return (
      <div className="flex items-center justify-center h-full">
        <span className="animate-pulse text-blue-500 text-lg">Loading...</span>
      </div>
    );

  if (onboarded && isLoggedIn)
    return (
      <div>
        <RedirectPage redirectTo="/" userName={user.firstName} />
      </div>
    );
  if (submitted)
    return (
      <div>
        <OnboardingSuccess />
      </div>
    );

  return (
    <div className="min-h-screen w-full bg-gradient-to-tr from-[#e0f2ff] to-[#f8fbff] dark:from-[#0b1625] dark:to-[#112030] transition-colors duration-500 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl bg-[#e8f4ff]/60 dark:bg-[#1e2e44]/60 backdrop-blur-xl border border-blue-200 dark:border-blue-800 rounded-3xl shadow-2xl p-8 md:p-12">
        {/* Step Header */}
        <header className="flex justify-between items-start mb-10">
          <div>
            <h1 className="text-3xl font-extrabold text-blue-900 dark:text-blue-200">
              {currentPage === 1 ? "Let Us Know You" : "Review Your Details"}
            </h1>
            <p className="text-gray-700 dark:text-gray-300 mt-2 text-sm md:text-base">
              {currentPage === 1
                ? "Tell us about yourself to personalize your journey."
                : "Here's a preview of your profile before we save it."}
            </p>
          </div>
          <ModeToggle />
        </header>

        {/* Page Indicator */}
        <div className="mb-6 text-right">
          <span className="inline-block px-4 py-1 text-xs font-medium rounded-full bg-blue-200 text-blue-900 dark:bg-blue-800 dark:text-blue-100">
            Page {currentPage} of 2
          </span>
        </div>

        {/* Form Body */}
        <div className="space-y-10 transition-opacity duration-500 ease-in-out animate-fade-in">
          {currentPage === 1 && (
            <>
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
            </>
          )}

          {currentPage === 2 && (
            // Shows the preview of the content
            <div className="form-layout">
              <FormBackgroundEffect />
              <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-4">
                Preview Your Profile
              </h2>

              {/* Profile Image & Basic Info */}
              <div className="flex items-center gap-6">
                <img
                  src={formData.profileImage}
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover border-4 border-blue-300 dark:border-blue-700 shadow-md"
                />
                <div>
                  <p className="text-lg font-bold text-blue-800 dark:text-blue-200">
                    {formData.fullName}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {formData.email}
                  </p>
                </div>
              </div>

              {/* Age & Weeks */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 mt-6">
                <div className="input-field items-center text-center p-4">
                  <p className="text-sm text-muted-foreground">Age</p>
                  <p className="text-xl font-semibold text-primary">
                    {formData.age || "--"}
                  </p>
                </div>
                <div className="input-field items-center text-center p-4">
                  <p className="text-sm text-muted-foreground">
                    Weeks Lived (approximately)
                  </p>
                  <p className="text-xl font-semibold text-primary">
                    {formData.weeksLived ?? "--"}{" "}
                    <span className="text-sm font-medium">weeks</span>
                  </p>
                  <p className="text-xs text-muted-foreground italic mt-1">
                    This is approximate. E.g., someone who lived 11 days will
                    still show 1 week.
                  </p>
                </div>
              </div>

              {/* Bio & Other Info */}
              <div className="space-y-4">
                {formData.bio && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                      Bio
                    </h3>
                    <p className="text-gray-800 dark:text-gray-100">
                      {formData.bio}
                    </p>
                  </div>
                )}

                {formData.location && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                      Location
                    </h3>
                    <p className="text-gray-800 dark:text-gray-100">
                      {formData.location}
                    </p>
                  </div>
                )}

                {formData.linkedInUrl && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                      LinkedIn
                    </h3>
                    <a
                      href={formData.linkedInUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-300 hover:underline break-words"
                    >
                      {formData.linkedInUrl}
                    </a>
                  </div>
                )}

                {formData.websites?.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                      Websites
                    </h3>
                    <ul className="list-disc pl-5 space-y-1 text-gray-800 dark:text-gray-100">
                      {formData.websites.map((site, idx) => (
                        <li key={idx}>
                          <span className="font-medium">{site.name}: </span>
                          <a
                            href={
                              site.url.startsWith("http")
                                ? site.url
                                : `https://${site.url}`
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 dark:text-blue-300 hover:underline break-words"
                          >
                            {site.url}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          <AlertDialog open={skipAlert} onOpenChange={setskipAlert}>
            <AlertDialogContent className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-white via-blue-50 to-cyan-200 dark:from-gray-800 dark:via-gray-900 dark:to-blue-800 p-8 rounded-3xl shadow-[0_0_40px_rgba(0,150,255,0.3)] dark:shadow-[0_0_40px_rgba(0,75,150,0.5)] w-[95%] max-w-lg">
              {/* Background Effects */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-10 -left-10 w-60 h-60 bg-gradient-radial from-blue-500 via-blue-400 to-transparent dark:from-blue-900 dark:via-gray-800 dark:to-transparent opacity-25 blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-radial from-cyan-400 via-blue-300 to-transparent dark:from-cyan-800 dark:via-blue-900 dark:to-transparent opacity-30 blur-[120px]"></div>
              </div>

              {/* Dialog Header */}
              <AlertDialogHeader>
                <AlertDialogTitle className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-400 dark:from-blue-300 dark:via-cyan-400 dark:to-blue-500">
                  Date of Birth is Required
                </AlertDialogTitle>
                <AlertDialogDescription className="text-sm text-gray-600 dark:text-gray-300 mt-2 space-y-2">
                  <span className="inline-block">
                    You're about to{" "}
                    <strong className="text-red-500">skip the form</strong>{" "}
                    without telling us when your journey began.
                  </span>
                  <span className="inline-block">
                    But to show you a timeline of your life, we need to know
                    your{" "}
                    <strong className="text-blue-600 dark:text-blue-300">
                      date of birth
                    </strong>
                    . Without it, your weeks remain a mystery — uncounted,
                    unmarked.
                  </span>
                  <span>
                    <em className="text-blue-700 dark:text-blue-200 font-medium">
                      Don't leave your story blank. Just one date. We'll take
                      care of the rest.
                    </em>
                  </span>
                </AlertDialogDescription>
              </AlertDialogHeader>

              {/* Dialog Footer */}
              <AlertDialogFooter className="flex gap-4 mt-6">
                <AlertDialogCancel className="w-full py-3 rounded-2xl border border-blue-300 bg-gradient-to-r from-white to-blue-50 text-blue-600 font-semibold shadow-sm hover:shadow-md hover:bg-blue-100 transition-transform transform hover:scale-105 active:scale-95 dark:border-blue-500 dark:bg-gradient-to-r dark:from-gray-800 dark:to-blue-900 dark:text-blue-300 dark:hover:bg-blue-800 hover:text-indigo-500 dark:hover:text-indigo-200">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    setWillSkip(true);
                  }}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-700 text-white font-bold shadow-lg hover:shadow-[0_0_20px_rgba(100,180,255,0.4)] hover:scale-105 active:scale-95 transition-transform transform dark:from-blue-700 dark:via-blue-800 dark:to-cyan-900 dark:shadow-[0_0_20px_rgba(80,160,255,0.4)] dark:hover:shadow-[0_0_30px_rgba(80,160,255,0.6)]"
                >
                  I'll Enter It
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        {/* Navigation Buttons */}
        <div className="mt-10 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex gap-4 w-full md:w-auto">
            {currentPage > 1 && (
              <Button
                variant="outline"
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className="rounded-full border-blue-500 text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900"
              >
                Back
              </Button>
            )}
            {willSkip && currentPage === 1 ? (
              <Button
                variant="ghost"
                onClick={() => setWillSkip(false)}
                className="rounded-full text-blue-700 dark:text-blue-400 hover:underline"
              >
                Revert to Filling
              </Button>
            ) : (
              <Button
                variant="ghost"
                onClick={() => setskipAlert(true)}
                className="rounded-full text-blue-700 dark:text-blue-400 hover:underline"
              >
                Skip for now
              </Button>
            )}
          </div>

          {currentPage < 2 ? (
            <Button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="btn9"
            >
              Proceed to Submit
            </Button>
          ) : (
            <Button onClick={handleSubmit} className="btn7">
              Submit
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
