// import { useNavigate } from "react-router-dom";

// const RoleSelect = () => {
//   const navigate = useNavigate();

//   const handleSelect = (role) => {
//     localStorage.setItem("selectedRole", role);
//     navigate("/partner/login");
//   };

//   return (
//     <div className="h-screen flex items-center justify-center bg-[#0f0f0f]">
//       <div className="bg-[#181818] p-8 rounded-xl w-[350px]">
//         <h2 className="text-white text-2xl font-bold mb-6 text-center">
//           Select Role
//         </h2>

//         <button
//           onClick={() => handleSelect("admin")}
//           className="w-full mb-3 py-2 rounded bg-blue-600 text-white font-semibold"
//         >
//           Admin
//         </button>

//         <button
//           onClick={() => handleSelect("manager")}
//           className="w-full mb-3 py-2 rounded bg-green-600 text-white font-semibold"
//         >
//           Manager
//         </button>

//         <button
//           onClick={() => handleSelect("partner")}
//           className="w-full py-2 rounded bg-purple-600 text-white font-semibold"
//         >
//           Partner
//         </button>
//       </div>
//     </div>
//   );
// };

// export default RoleSelect;


import { useNavigate } from "react-router-dom";

const RoleSelect = () => {
  const navigate = useNavigate();

  const handleSelect = (role) => {
    localStorage.setItem("selectedRole", role);
    navigate("/partner/login"); // or /login if using common login
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0f0f] via-[#121212] to-[#1a1a1a] px-4">
      <div className="w-full max-w-md bg-[#181818]/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8">

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            Welcome to TripKiya
          </h2>
          <p className="text-gray-400 text-sm">
            Select your role to continue
          </p>
        </div>

        {/* Roles */}
        <div className="space-y-4">
          {/* Admin */}
          <button
            onClick={() => handleSelect("admin")}
            className="w-full flex items-center justify-between p-4 rounded-xl bg-[#222] hover:bg-blue-600 transition group border border-white/10"
          >
            <div>
              <h3 className="text-white font-semibold text-lg group-hover:text-white">
                Admin
              </h3>
              
            </div>
            <span className="text-blue-400 text-xl group-hover:text-white">
              →
            </span>
          </button>

          {/* Manager */}
          <button
            onClick={() => handleSelect("manager")}
            className="w-full flex items-center justify-between p-4 rounded-xl bg-[#222] hover:bg-green-600 transition group border border-white/10"
          >
            <div>
              <h3 className="text-white font-semibold text-lg">
                Manager
              </h3>
              
            </div>
            <span className="text-green-400 text-xl group-hover:text-white">
              →
            </span>
          </button>

          {/* Partner */}
          <button
            onClick={() => handleSelect("partner")}
            className="w-full flex items-center justify-between p-4 rounded-xl bg-[#222] hover:bg-purple-600 transition group border border-white/10"
          >
            <div>
              <h3 className="text-white font-semibold text-lg">
                Partner
              </h3>
              
            </div>
            <span className="text-purple-400 text-xl group-hover:text-white">
              →
            </span>
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 text-xs mt-8">
          © {new Date().getFullYear()} TripKiya. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default RoleSelect;
