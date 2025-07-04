"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Calendar,
  Home,
  User,
  Settings,
  Sun,
  Moon,
  Menu,
  LogOut,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { SignOutButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/dbConfig";
import { Users } from "@/lib/schema";
import { eq } from "drizzle-orm";

export default function DashboardLayout({ children }) {
  const { user } = useUser();
  const [isDark, setIsDark] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [dobMissing, setDobMissing] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    const checkDOB = async () => {
      if (!user?.primaryEmailAddress?.emailAddress) return;

      try {
        const userData = await db
          .select()
          .from(Users)
          .where(eq(Users.email, user?.primaryEmailAddress?.emailAddress));

        if (!userData || !userData[0]?.dob) {
          setDobMissing(true);
        }
      } catch (err) {
        console.error("Error checking DOB:", err);
      }
    };

    checkDOB();
  }, [user]);

  useEffect(() => {
    if (!dobMissing) return;

    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [dobMissing]);

  useEffect(() => {
    if (countdown === 0) {
      router.push("/onboarding");
    }
  }, [countdown, router]);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Event", href: "/dashboard/event", icon: Zap },
    { name: "Profile", href: "/dashboard/profile", icon: User },
  ];

  const isActive = (path) => {
    if (path === "/dashboard/event") {
      return pathname.startsWith("/dashboard/event");
    }
    return pathname === path;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border-r border-slate-200/50 dark:border-slate-700/50 transform transition-transform duration-300 lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center gap-3 p-6 border-b border-slate-200/50 dark:border-slate-700/50">
            <Image src={"/logo.png"} alt="logo" width={50} height={50} />
            <span className="text-xl font-semibold text-slate-800 dark:text-white">
              Life Timeline
            </span>
          </div>

          <nav className="flex-1 p-6 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsSidebarOpen(false)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                  isActive(item.href)
                    ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg"
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
          </nav>

          <div className="p-6 border-t border-slate-200/50 dark:border-slate-700/50">
            <div className="flex items-center gap-3 mb-4">
              <img
                src={user?.imageUrl || "/default-avatar.jpg"}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-800 dark:text-white truncate">
                  {user?.fullName || "John Doe"}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  {user?.primaryEmailAddress?.emailAddress}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="flex-1 p-2 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors duration-200 flex items-center justify-center"
              >
                {isDark ? (
                  <Sun className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                ) : (
                  <Moon className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                )}
              </button>

              <SignOutButton asChild>
                <Button
                  onClick={() => router.push("/")}
                  className="flex-1 p-2 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors duration-200 flex items-center justify-center"
                >
                  <LogOut className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                </Button>
              </SignOutButton>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:pl-64">
        <div className="sticky top-0 z-30 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-b border-slate-200/20 dark:border-slate-700/20 lg:hidden">
          <div className="flex items-center justify-between p-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors duration-200"
            >
              <Menu className="w-5 h-5 text-slate-600 dark:text-slate-300" />
            </button>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-sm">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-semibold text-slate-800 dark:text-white">
                Life Timeline
              </span>
            </div>

            <div className="w-10"></div>
          </div>
        </div>

        <main className="p-6 lg:p-8">
          {dobMissing ? (
            <div className="flex items-center justify-center min-h-[80vh]">
              <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl rounded-2xl p-8 w-full max-w-md text-center space-y-4">
                <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-400">
                  Onboarding Incomplete
                </h2>
                <p className="text-slate-600 dark:text-slate-300">
                  Redirecting you to onboarding in{" "}
                  <span className="font-semibold">{countdown}</span> second
                  {countdown !== 1 && "s"}...
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  If you're not redirected,
                </p>
                <Button
                  onClick={() => router.push("/onboarding")}
                  className="text-sm font-medium"
                >
                  Click here
                </Button>
              </div>
            </div>
          ) : (
            children
          )}
        </main>
      </div>
    </div>
  );
}
