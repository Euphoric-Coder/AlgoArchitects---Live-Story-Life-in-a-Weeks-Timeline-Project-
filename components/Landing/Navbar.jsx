import React, { useState, useEffect } from "react";
import { Calendar, Sun, Moon, Menu, X } from "lucide-react";
import Image from "next/image";
import { SignOutButton, useUser } from "@clerk/nextjs";
import { Button } from "../ui/button";

const Navbar = ({ onGetStarted }) => {
  const [isDark, setIsDark] = useState(false);
  const { isSignedIn } = useUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/98 dark:bg-slate-900/98 backdrop-blur-xl border-b border-slate-100/30 dark:border-slate-700/20">
      <div className="max-w-7xl mx-auto px-8 lg:px-12">
        <div className="flex justify-between items-center h-18">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Image
              src={"/logo.png"}
              alt="Live Story"
              width={48}
              height={48}
              className=""
            />
            <span className="text-xl font-medium text-slate-800 dark:text-white tracking-tight">
              Live Story
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            <button
              onClick={() => scrollToSection("why-this-matters")}
              className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 font-medium text-sm tracking-wide"
            >
              Why It Matters
            </button>
            <button
              onClick={() => scrollToSection("features")}
              className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 font-medium text-sm tracking-wide"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("preview")}
              className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 font-medium text-sm tracking-wide"
            >
              Preview
            </button>
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 font-medium text-sm tracking-wide"
            >
              How It Works
            </button>
          </div>

          {/* Theme Toggle & CTA */}
          <div className="flex items-center gap-5">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-300 backdrop-blur-sm"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-slate-600 dark:text-slate-300" />
              ) : (
                <Moon className="w-4 h-4 text-slate-600 dark:text-slate-300" />
              )}
            </button>

            {isSignedIn ? (
              <SignOutButton aschild>
                <Button
                  onClick={onGetStarted}
                  className="btn3"
                >
                  Sign Out
                </Button>
              </SignOutButton>
            ) : (
              <Button
                onClick={onGetStarted}
                className="btn3"
              >
                Get Started
              </Button>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2.5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-300 backdrop-blur-sm"
            >
              {isMobileMenuOpen ? (
                <X className="w-4 h-4 text-slate-600 dark:text-slate-300" />
              ) : (
                <Menu className="w-4 h-4 text-slate-600 dark:text-slate-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-6 border-t border-slate-100/30 dark:border-slate-700/20">
            <div className="flex flex-col gap-5">
              <button
                onClick={() => scrollToSection("why-this-matters")}
                className="text-left text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 font-medium text-sm tracking-wide"
              >
                Why It Matters
              </button>
              <button
                onClick={() => scrollToSection("features")}
                className="text-left text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 font-medium text-sm tracking-wide"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection("preview")}
                className="text-left text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 font-medium text-sm tracking-wide"
              >
                Preview
              </button>
              <button
                onClick={() => scrollToSection("how-it-works")}
                className="text-left text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 font-medium text-sm tracking-wide"
              >
                How It Works
              </button>
              <button
                onClick={onGetStarted}
                className="text-left bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-5 py-2.5 rounded-2xl text-sm font-medium transition-all duration-300 w-fit tracking-wide"
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
