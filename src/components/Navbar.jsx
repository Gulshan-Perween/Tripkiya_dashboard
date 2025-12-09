

import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#181818] border-b border-gray-800 px-6 py-4">
      <div className="flex items-center justify-between">
        
        <h2 className="text-xl font-semibold text-white">Service Management</h2>

        {/* RIGHT SIDE PROFILE ICON */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/partner/signup")}
            className="w-10 h-10 rounded-full bg-[#2563EB] 
                       flex items-center justify-center 
                       text-white hover:bg-[#1d4ed8] transition"
          >
            <User size={22} />
          </button>
        </div>

      </div>
    </div>
  );
}

export default Navbar;
