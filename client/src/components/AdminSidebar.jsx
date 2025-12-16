 // src/components/AdminSidebar.jsx
import { Link, useLocation } from "react-router-dom";
import {LayoutDashboard, Users, Car,  Calendar, Plus,LogOut,} from "lucide-react";

export default function AdminSidebar() {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { name: "All Users", path: "/admin/users", icon: Users },
    { name: "All Cars", path: "/admin/cars", icon: Car },
    { name: "Add Car", path: "/admin/add-car", icon: Plus },
    { name: "All Bookings", path: "/admin/bookings", icon: Calendar },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="fixed left-0 top-0 z-50 w-64 min-h-screen bg-gray-900 text-white">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg ${
                  isActive(item.path)
                    ? "bg-blue-600"
                    : "text-gray-300 hover:bg-gray-800"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-8 pt-8 border-t border-gray-700">
          <Link
            to="/"
            className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800"
          >
            <LogOut className="h-5 w-5" />
            <span>Back to Site</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
