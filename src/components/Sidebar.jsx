// import { Link, useLocation } from 'react-router-dom';
// import {
//   LayoutDashboard,
//   Plane,
//   ClipboardList,
//   User2,
//   Users,
//   Plus,
//   List,
// } from 'lucide-react';

// function Sidebar() {
//   const location = useLocation();

//   // Navigation items for all admin pages
//   const navItems = [
//     { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
//     { path: '/create', icon: Plus, label: 'Create Package' },
//     { path: '/packages', icon: List, label: 'All Packages' },
//     { path: '/bookings', icon: ClipboardList, label: 'Bookings' },
//     { path: '/users', icon: Users, label: 'Users' },
//     { path: '/analytics', icon: Plane, label: 'Analytics' },
//     { path: '/add-package-details', icon: User2, label: 'Add Package Details' },
//   ];

//   const activeColor = 'bg-blue-600 text-white';
//   const hoverColor = 'hover:bg-[#1f1f1f] hover:text-blue-400';

//   return (
//     <div className="w-64 bg-[#181818] min-h-screen border-r border-gray-800 flex flex-col">
//       {/* Logo Section */}
//       <div className="p-6 border-b border-gray-800">
//         <h1 className="text-2xl font-bold text-white tracking-wide">TripKiya Admin</h1>
//       </div>

//       {/* Navigation Section */}
//       <nav className="flex-1 p-4">
//         <div className="space-y-2">
//           {navItems.map((item) => {
//             const Icon = item.icon;
//             const isActive = location.pathname === item.path;

//             return (
//               <Link
//                 key={item.path}
//                 to={item.path}
//                 className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
//                   isActive
//                     ? `${activeColor} shadow-md`
//                     : `text-gray-400 ${hoverColor}`
//                 }`}
//               >
//                 <Icon
//                   size={20}
//                   className={`${
//                     isActive ? 'text-white' : 'text-gray-400 group-hover:text-blue-400'
//                   }`}
//                 />
//                 <span>{item.label}</span>
//               </Link>
//             );
//           })}
//         </div>
//       </nav>

//       {/* Footer Section */}
//       <div className="p-4 border-t border-gray-800 text-gray-500 text-sm">
//         <p>© 2025 TripKiya</p>
//       </div>
//     </div>
//   );
// }

// export default Sidebar;
 import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardList,
  Users,
  Plane,
  Plus,
  List,
  UserPlus, // 👈 new icon
} from "lucide-react";

function Sidebar() {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  /* ---------------- ADMIN MENU ---------------- */
  const adminMenu = [
    { path: "/", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/create", icon: Plus, label: "Create Package" },
    { path: "/packages", icon: List, label: "All Packages" },
    { path: "/bookings", icon: ClipboardList, label: "Bookings" },
    { path: "/users", icon: Users, label: "Users" },

    // 🔥 NEW: CREATE MANAGER (ADMIN ONLY)
    { path: "/admin/create-manager", icon: UserPlus, label: "Create Manager" },

    { path: "/analytics", icon: Plane, label: "Analytics" },
  ];

  /* ---------------- MANAGER MENU ---------------- */
  const managerMenu = [
    { path: "/manager-dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/packages", icon: List, label: "All Packages" },
    { path: "/bookings", icon: ClipboardList, label: "Bookings" },
  ];

  const navItems = role === "manager" ? managerMenu : adminMenu;

  return (
    <div className="w-64 bg-[#181818] min-h-screen border-r border-gray-800">
      {/* Header */}
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-xl font-bold text-white">
          TripKiya {role === "manager" ? "Manager" : "Admin"}
        </h1>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                active
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export default Sidebar;
