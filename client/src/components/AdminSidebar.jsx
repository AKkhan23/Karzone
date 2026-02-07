 import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Car,
  Calendar,
  Plus,
  LogOut,
  ChevronRight,
  Shield,
  Sparkles,
  TrendingUp,
  Home,
} from "lucide-react";
import { motion } from "framer-motion";

export default function AdminSidebar() {
  const location = useLocation();

  const menuItems = [
    { 
      name: "Dashboard", 
      path: "/admin", 
      icon: LayoutDashboard,
      description: "Overview & Analytics",
      color: "from-blue-500 to-cyan-500"
    },
    { 
      name: "All Users", 
      path: "/admin/users", 
      icon: Users,
      description: "Manage Users",
      color: "from-emerald-500 to-green-500"
    },
    { 
      name: "All Cars", 
      path: "/admin/cars", 
      icon: Car,
      description: "Vehicle Inventory",
      color: "from-amber-500 to-orange-500"
    },
    { 
      name: "Add Car", 
      path: "/admin/add-car", 
      icon: Plus,
      description: "Add New Vehicle",
      color: "from-purple-500 to-violet-500"
    },
    { 
      name: "All Bookings", 
      path: "/admin/bookings", 
      icon: Calendar,
      description: "Booking Management",
      color: "from-rose-500 to-pink-500"
    },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <motion.aside
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="fixed left-0 top-0 z-50 w-64 min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-2xl border-r border-gray-700/50"
    >
      {/* Header - Compact Version */}
      <div className="p-4 border-b border-gray-700/50">
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="p-2 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl"
          >
            <Shield className="h-5 w-5" />
          </motion.div>
          <div className="flex-1">
            <h1 className="text-lg font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
              Admin Portal
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1.5 h-1.5 bg-emerald-500 rounded-full"
              />
              <span className="text-xs text-emerald-400 font-medium">Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Menu - Compact */}
      <nav className="p-3 space-y-1.5">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.08 }}
            >
              <Link
                to={item.path}
                className={`group relative flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-300 ${
                  active
                    ? `bg-gradient-to-r ${item.color} text-white shadow-lg`
                    : "text-gray-300 hover:bg-gray-800/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-1.5 rounded-lg ${active ? 'bg-white/20' : 'bg-gray-800/50'}`}>
                    <Icon className={`h-4 w-4 ${active ? 'text-white' : 'text-gray-400 group-hover:text-white'}`} />
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-sm">{item.name}</div>
                    <div className={`text-xs ${active ? 'text-white/80' : 'text-gray-500 group-hover:text-gray-300'} truncate max-w-[120px]`}>
                      {item.description}
                    </div>
                  </div>
                </div>
                
                {/* Active Indicator & Arrow */}
                <div className="flex items-center gap-1">
                  {active && (
                    <motion.div
                      layoutId="active-indicator"
                      className="w-1.5 h-1.5 bg-white rounded-full"
                    />
                  )}
                  <ChevronRight className={`h-3.5 w-3.5 ${active ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'}`} />
                </div>
              </Link>
            </motion.div>
          );
        })}
      </nav>

      {/* Spacing */}
      <div className="flex-1" />

      {/* Bottom Actions */}
      <div className="p-3 border-t border-gray-700/50 bg-gray-900/80 backdrop-blur-sm">
        <Link
          to="/"
          className="group flex items-center justify-between px-3 py-2.5 rounded-xl bg-gray-800/30 hover:bg-gray-800/50 transition-all duration-300"
        >
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg group-hover:from-blue-500/30 group-hover:to-cyan-500/30">
              <Home className="h-4 w-4 text-blue-400 group-hover:text-blue-300" />
            </div>
            <div>
              <div className="font-medium text-sm text-white">Back to Site</div>
              <div className="text-xs text-gray-400 group-hover:text-gray-300">Homepage</div>
            </div>
          </div>
          <LogOut className="h-3.5 w-3.5 text-gray-400 group-hover:text-white" />
        </Link>

        {/* Version Info */}
        <div className="mt-3 pt-3 border-t border-gray-700/30 text-center">
          <div className="flex items-center justify-center gap-1.5 text-xs text-gray-500">
            <Sparkles className="h-3 w-3" />
            <span>v2.0</span>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
    </motion.aside>
  );
}