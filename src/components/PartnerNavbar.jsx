import React from "react";
import { User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PartnerNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("partnerToken");
    navigate("/partner/login");
  };

  return (
    <div className="bg-gray-900 border-b border-gray-800 px-6 py-4 shadow-md">
      <div className="flex items-center justify-between">

        {/* LEFT SIDE TITLE */}
        <h2 className="text-xl font-semibold text-white tracking-wide">
          Partner Dashboard
        </h2>

        {/* RIGHT SIDE BUTTONS */}
        <div className="flex items-center gap-4">

          {/* Profile Button */}
          <button
            onClick={() => navigate("/partner/profile")}
            className="w-10 h-10 rounded-full bg-blue-600 
                       flex items-center justify-center 
                       text-white hover:bg-blue-700 transition"
          >
            <User size={20} />
          </button>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-400 hover:text-red-300 
                       border border-red-400 hover:border-red-300 
                       px-3 py-1.5 rounded-lg transition"
          >
            <LogOut size={18} />
            <span className="text-sm font-medium">Logout</span>
          </button>

        </div>

      </div>
    </div>
  );
}
