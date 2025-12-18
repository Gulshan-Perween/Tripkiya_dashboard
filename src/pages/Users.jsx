import { useEffect, useState } from "react";
import axios from "axios";
import { User, Mail, Calendar, Shield } from "lucide-react";
import { BASE_URL } from "../utils/base_url";

function Users() {
  const [users, setUsers] = useState([]);
  
  // Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/auth/users`);
      setUsers(Array.isArray(res.data.users) ? res.data.users : []);
    } catch (err) {
      console.error("❌ Error fetching users:", err);
      setUsers([]);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">All Users</h1>
        <p className="text-gray-400">Registered platform users</p>
      </div>

      {users.length === 0 ? (
        <p className="text-gray-400 mt-6">No users found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <div
              key={user._id}
              className="bg-[#1e1e1e] border border-gray-800 rounded-xl p-5 hover:border-[#2563EB] transition-all shadow-sm"
            >
              <div className="flex items-center gap-4">
                <User className="text-[#2563EB]" size={28} />
                <div>
                  <h2 className="text-lg font-semibold text-white">{user.name}</h2>
                  <p className="text-gray-400 flex items-center gap-2">
                    <Mail size={14} /> {user.email}
                  </p>
                  <p className="text-gray-400 flex items-center gap-2 mt-1">
                    <Shield size={14} /> {user.role || "User"}
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-4 flex items-center gap-2">
                <Calendar size={14} /> Joined{" "}
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Users;
