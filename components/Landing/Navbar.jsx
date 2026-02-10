import React, { useState, useEffect } from "react";
import { Calendar, Sun, Moon, Menu, X } from "lucide-react";
import Image from "next/image";
import { SignOutButton, useUser } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { ModeToggle } from "../theme-btn";

const Navbar = ({ onGetStarted }) => {
  const [isDark, setIsDark] = useState(false);
  const { isSignedIn } = useUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

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

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800 transition-colors duration-300 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 group cursor-pointer">
            <div className="relative">
              <Image
                src="/logo.png"
                alt="Live Story"
                width={36}
                height={36}
                className="group-hover:scale-110 transition-transform"
              />
            </div>

            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400 bg-clip-text text-transparent">
              Live Story
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {[
              { id: "why-this-matters", label: "Why It Matters" },
              { id: "features", label: "Features" },
              { id: "preview", label: "Preview" },
              { id: "how-it-works", label: "How It Works" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors relative group font-medium"
              >
                {item.label}

                {/* Hover underline */}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-400 group-hover:w-full transition-all duration-300" />
              </button>
            ))}

            {/* CTA */}
            {isSignedIn ? (
              <SignOutButton>
                <button
                  onClick={onGetStarted}
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400 text-white rounded-full hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Sign Out
                </button>
              </SignOutButton>
            ) : (
              <button
                onClick={onGetStarted}
                className="px-6 py-2 bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400 text-white rounded-full hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Get Started
              </button>
            )}
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            {/* <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all hover:scale-110"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-yellow-500 animate-spin-slow" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              )}
            </button> */}
            <ModeToggle />

            {/* Mobile Menu */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              ) : (
                <Menu className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-6 border-t border-gray-200 dark:border-gray-800">
            <div className="flex flex-col gap-5">
              {[
                { id: "why-this-matters", label: "Why It Matters" },
                { id: "features", label: "Features" },
                { id: "preview", label: "Preview" },
                { id: "how-it-works", label: "How It Works" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                >
                  {item.label}
                </button>
              ))}

              <button
                onClick={onGetStarted}
                className="w-fit px-6 py-2 bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400 text-white rounded-full hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
