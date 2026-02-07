import React, { useState, useEffect } from "react";
import {
  Bell,
  User,
  Search,
  ChevronDown,
  HelpCircle,
  Sun,
  Moon,
  LogOut,
} from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function AdminHeader() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [notifications] = useState(3);
  const [darkMode, setDarkMode] = useState(false);

  // Component load होते ही theme check करें
  useEffect(() => {
    // 1. LocalStorage से theme लो (key: 'theme')
    const savedTheme = localStorage.getItem("theme");
    console.log("📱 Saved theme from localStorage:", savedTheme);

    // 2. System preference check करो
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    console.log("🌙 System prefers dark?", prefersDark);

    // 3. Priority: localStorage > system preference
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      console.log("✅ Setting DARK mode");
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    } else {
      console.log("✅ Setting LIGHT mode");
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
    }
  }, []);

  // SIMPLE & WORKING DARK MODE TOGGLE
  const toggleDarkMode = () => {
    console.log("🔄 Toggling theme...");

    // सीधे HTML element पर class toggle करो
    const htmlElement = document.documentElement;

    // Check current state
    const isDark = htmlElement.classList.contains("dark");
    console.log("Current is dark?", isDark);

    if (isDark) {
      // Dark से Light करो
      htmlElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDarkMode(false);
      console.log("🌞 Switched to LIGHT mode");
    } else {
      // Light से Dark करो
      htmlElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
      console.log("🌙 Switched to DARK mode");
    }

    // Debug info
    console.log("🏷️ HTML classes now:", htmlElement.className);
    console.log("💾 localStorage theme:", localStorage.getItem("theme"));
  };

  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    if (hour < 20) return "Good Evening";
    return "Hello Princess";
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-lg sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between px-4 lg:px-8 py-4">
        {/* Left Section */}
        <div className="flex-1 mb-4 lg:mb-0">
          <div className="flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-6">
            <div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl shadow-md">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
                    {getTimeOfDay()},{" "}
                    <span className="text-blue-600 dark:text-cyan-400">
                      {user?.name || "Admin"}
                    </span>
                  </h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2 mt-1">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                    System is running smoothly • Last login: Today
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-3 mt-2 lg:mt-0">
              <div className="px-3 py-1.5 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-100 dark:border-blue-800">
                <p className="text-xs text-blue-800 dark:text-blue-300 font-semibold">
                  Admin
                </p>
                <p className="text-xs text-blue-600 dark:text-blue-400">
                  Full Access
                </p>
              </div>
              <div className="px-3 py-1.5 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg border border-emerald-100 dark:border-emerald-800">
                <p className="text-xs text-emerald-800 dark:text-emerald-300 font-semibold">
                  Active
                </p>
                <p className="text-xs text-emerald-600 dark:text-emerald-400">
                  Online Now
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full lg:w-auto">
          {/* Search Bar */}
          <div className="relative flex-1 sm:flex-initial">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400 dark:text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search dashboard..."
              className="w-full sm:w-64 pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-500 focus:border-transparent text-sm dark:text-white dark:placeholder-gray-400"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Help */}
            <button
              className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-md"
              title="Help & Support"
            >
              <HelpCircle className="h-4 w-4 text-gray-600 dark:text-gray-300" />
            </button>

            {/* ✅✅✅ DARK MODE TOGGLE BUTTON - SIMPLE & WORKING ✅✅✅ */}
            <button
              onClick={toggleDarkMode}
              className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-md"
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? (
                <Sun className="h-4 w-4 text-amber-500" />
              ) : (
                <Moon className="h-4 w-4 text-gray-600 dark:text-gray-300" />
              )}
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-md group"
                title="Notifications"
              >
                <Bell className="h-4 w-4 text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-cyan-400" />
                {notifications > 0 && (
                  <>
                    <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold animate-pulse">
                      {notifications}
                    </span>
                    <span className="absolute top-0 right-0 h-5 w-5 bg-red-400 rounded-full opacity-75 animate-ping"></span>
                  </>
                )}
              </button>
            </div>

            {/* Profile */}
            <div className="relative group">
              <div className="flex items-center gap-3 p-2 pl-3 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-300 cursor-pointer">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white leading-tight">
                    {user?.name || "Admin User"}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 truncate max-w-[120px]">
                    {user?.email || "admin@example.com"}
                  </p>
                </div>
                <div className="relative">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center shadow-md">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-emerald-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-transform duration-300 group-hover:rotate-180" />
              </div>

              {/* Profile Dropdown */}
              <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {user?.name}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
                    {user?.email}
                  </p>
                  <div className="mt-2 px-2 py-1 bg-blue-50 dark:bg-blue-900/50 rounded-lg inline-block">
                    <span className="text-xs font-medium text-blue-700 dark:text-blue-300">
                      Administrator
                    </span>
                  </div>
                </div>
                <div className="p-2">
                  <button className="w-full text-left px-3 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors flex items-center gap-2">
                    <User className="h-4 w-4" />
                    My Profile
                  </button>
                  <button className="w-full text-left px-3 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors flex items-center gap-2">
                    <HelpCircle className="h-4 w-4" />
                    Help Center
                  </button>
                  <div className="border-t border-gray-100 dark:border-gray-700 my-2"></div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar Indicator */}
      <div className="h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-emerald-500 dark:from-blue-600 dark:via-cyan-600 dark:to-emerald-600"></div>
    </header>
  );
}
