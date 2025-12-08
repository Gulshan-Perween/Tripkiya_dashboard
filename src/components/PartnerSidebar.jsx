import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Plus,
  List,
  ClipboardList,
  User2,
} from "lucide-react";

export default function PartnerSidebar() {
  const location = useLocation();

  // Correct nav items with correct paths
  const navItems = [
    { path: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/partner/packages/new", icon: Plus, label: "Create Package" },
    { path: "/dashboard/packages", icon: List, label: "All Packages" }, // FIXED
    { path: "/partner/bookings", icon: ClipboardList, label: "Bookings" },
    { path: "/partner/profile", icon: User2, label: "Profile" },
  ];

  const activeColor = "bg-blue-600 text-white";
  const hoverColor = "hover:bg-gray-700 hover:text-blue-400";

  return (
    <div className="w-64 bg-gray-900 min-h-screen flex flex-col">
      
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-2xl font-bold text-white tracking-wide">
          Partner Panel
        </h1>
      </div>

      {/* Navigation Section */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.startsWith(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                  isActive
                    ? `${activeColor} shadow-md`
                    : `text-gray-400 ${hoverColor}`
                }`}
              >
                <Icon
                  size={20}
                  className={isActive ? "text-white" : "text-gray-400"}
                />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Footer Section */}
      <div className="p-4 border-t border-gray-800 text-gray-500 text-sm">
        <p>© 2025 Partner Panel</p>
      </div>
    </div>
  );
}
