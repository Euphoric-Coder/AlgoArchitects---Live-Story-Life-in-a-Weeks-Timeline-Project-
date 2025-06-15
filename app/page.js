"use client";

import CallToAction from "@/components/Landing/CallToAction";
import Features from "@/components/Landing/Features";
import Hero from "@/components/Landing/Hero";
import HowItWorks from "@/components/Landing/HowItWorks";
import Navbar from "@/components/Landing/Navbar";
import Preview from "@/components/Landing/Preview";
import WhyThisMatters from "@/components/Landing/WhyThisMatters";
import { useRouter } from "next/navigation";
import React from "react";

const page = () => {
  const navigate = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50/20 via-blue-50/10 to-white dark:from-slate-900 dark:to-slate-800">
      <Navbar onGetStarted={() => navigate.push("/sign-in")} />
      <Hero onGetStarted={() => navigate.push("/sign-in")} />
      <WhyThisMatters />
      <Features />
      <Preview />
      <HowItWorks />
      <CallToAction onGetStarted={() => navigate.push("/sign-in")} />
    </div>
  );
};

export default page;
