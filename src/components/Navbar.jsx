// import { User, LogOut } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// function Navbar() {
//   const navigate = useNavigate();

//   const user = JSON.parse(localStorage.getItem("user"));
//   const role = user?.role; // admin | manager

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     localStorage.removeItem("partnerToken");
//     localStorage.removeItem("partnerInfo");

//     navigate("/partner/signup", { replace: true });
//   };

//   return (
//     <div className="bg-[#181818] border-b border-gray-800 px-6 py-4">
//       <div className="flex items-center justify-between">

//         {/* LEFT TITLE */}
//         <h2 className="text-xl font-semibold text-white">
//           {role === "manager" ? "Manager Dashboard" : "Admin Dashboard"}
//         </h2>

//         {/* RIGHT ACTIONS */}
//         <div className="flex items-center gap-4">

//           {/* ✅ PROFILE ICON → LOGIN / SIGNUP PAGE */}
//           <button
//             onClick={() => navigate("/partner/signup")}
//             className="w-10 h-10 rounded-full bg-[#2563EB] 
//                        flex items-center justify-center 
//                        text-white hover:bg-[#1d4ed8] transition"
//           >
        
//             <User size={22} />
//           </button>

//           {/* 🔴 LOGOUT ONLY FOR MANAGER */}
//           {role === "manager" && (
//             <button
//               onClick={handleLogout}
//               className="flex items-center gap-2 px-4 py-2 
//                          bg-red-600 hover:bg-red-700 
//                          text-white rounded-lg transition"
//             >
//               <LogOut size={18} />
//               Logout
//             </button>
//           )}
//         </div>

//       </div>
//     </div>
//   );
// }

// export default Navbar;

import { User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role; // admin | manager

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("partnerToken");
    localStorage.removeItem("partnerInfo");
    localStorage.removeItem("role");
    localStorage.removeItem("selectedRole");

    navigate("/", { replace: true });
  };

  return (
    <div className="bg-[#181818] border-b border-gray-800 px-6 py-4">
      <div className="flex items-center justify-between">

        {/* LEFT TITLE */}
        <h2 className="text-xl font-semibold text-white">
          {role === "manager" ? "Manager Dashboard" : "Admin Dashboard"}
        </h2>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-4">

          {/* PROFILE ICON */}
          <button
            onClick={() => navigate("/partner/signup")}
            className="w-10 h-10 rounded-full bg-[#2563EB] 
                       flex items-center justify-center 
                       text-white hover:bg-[#1d4ed8] transition"
          >
            <User size={22} />
          </button>

          {/* LOGOUT (ADMIN + MANAGER) */}
          {(role === "admin" || role === "manager") && (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 
                         bg-red-600 hover:bg-red-700 
                         text-white rounded-lg transition"
            >
              <LogOut size={18} />
              Logout
            </button>
          )}
        </div>

      </div>
    </div>
  );
}

export default Navbar;
