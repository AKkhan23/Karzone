import {
  Bell,
  User,
  Search,
  ChevronDown,
  Settings,
  HelpCircle,
  Sun,
  Moon,
} from "lucide-react";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function AdminHeader() {
  const { user } = useSelector((state) => state.auth);
  const [notifications] = useState(3); // Mock notification count
  const [darkMode, setDarkMode] = useState(false);

  // Get current time for greeting
  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    if (hour < 20) return "Good Evening";
    return "Hello-Princess";
  };

  return (
    <header className="bg-gradient-to-r from-white to-gray-50 shadow-lg sticky top-0 z-50 border-b border-gray-100">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between px-4 lg:px-8 py-4 lg:py-4">
        {/* Left Section - Welcome & Stats */}
        <div className="flex-1 mb-4 lg:mb-0">
          <div className="flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-6">
            <div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl shadow-md">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl lg:text-2xl font-bold text-gray-900">
                    {getTimeOfDay()},{" "}
                    <span className="text-blue-600">
                      {user?.name || "Admin"}
                    </span>
                  </h1>
                  <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                    System is running smoothly • Last login: Today
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-3 mt-2 lg:mt-0">
              <div className="px-3 py-1.5 bg-blue-50 rounded-lg border border-blue-100">
                <p className="text-xs text-blue-800 font-semibold">Admin</p>
                <p className="text-xs text-blue-600">Full Access</p>
              </div>
              <div className="px-3 py-1.5 bg-emerald-50 rounded-lg border border-emerald-100">
                <p className="text-xs text-emerald-800 font-semibold">Active</p>
                <p className="text-xs text-emerald-600">Online Now</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Search, Controls, Profile */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full lg:w-auto">
          {/* Search Bar */}
          <div className="relative flex-1 sm:flex-initial">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search dashboard..."
              className="w-full sm:w-64 pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all duration-300"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200 transition-all duration-300 hover:shadow-md"
              title="Toggle theme"
            >
              {darkMode ? (
                <Sun className="h-4 w-4 text-amber-600" />
              ) : (
                <Moon className="h-4 w-4 text-gray-600" />
              )}
            </button>

            {/* Settings */}
            <button className="p-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200 transition-all duration-300 hover:shadow-md">
              <Settings className="h-4 w-4 text-gray-600" />
            </button>

            {/* Help */}
            <button className="p-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200 transition-all duration-300 hover:shadow-md">
              <HelpCircle className="h-4 w-4 text-gray-600" />
            </button>

            {/* Notifications */}
            <div className="relative">
              <button className="p-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200 transition-all duration-300 hover:shadow-md group">
                <Bell className="h-4 w-4 text-gray-600 group-hover:text-blue-600" />
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
              <div className="flex items-center gap-3 p-2 pl-3 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100 hover:shadow-md transition-all duration-300 cursor-pointer">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold text-gray-900 leading-tight">
                    {user?.name || "Admin User"}
                  </p>
                  <p className="text-xs text-gray-600 truncate max-w-[120px]">
                    {user?.email || "admin@example.com"}
                  </p>
                </div>
                <div className="relative">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center shadow-md">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-emerald-500 rounded-full border-2 border-white"></div>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-500 group-hover:text-blue-600 transition-transform duration-300 group-hover:rotate-180" />
              </div>

              {/* Profile Dropdown (Hidden by default) */}
              <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <div className="p-4 border-b border-gray-100">
                  <p className="font-semibold text-gray-900">{user?.name}</p>
                  <p className="text-sm text-gray-600 truncate">
                    {user?.email}
                  </p>
                  <div className="mt-2 px-2 py-1 bg-blue-50 rounded-lg inline-block">
                    <span className="text-xs font-medium text-blue-700">
                      Administrator
                    </span>
                  </div>
                </div>
                <div className="p-2">
                  {/* <button className="w-full text-left px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                    My Profile
                  </button>
                  <button className="w-full text-left px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                    Account Settings
                  </button>
                  <button className="w-full text-left px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                    Activity Log
                  </button>
                  <div className="border-t border-gray-100 my-2"></div>
                  <button className="w-full text-left px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    Sign Out
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar Indicator */}
      <div className="h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-emerald-500 animate-gradient-x"></div>

      <style jsx>{`
        @keyframes gradient-x {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
    </header>
  );
}
