import { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Users, Briefcase } from "lucide-react";
import { ResponsiveContainer, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";
import { BASE_URL } from "../utils/base_url";

function Analytics() {
  const [stats, setStats] = useState({ users: 0, bookings: 0, revenue: 0 });
  const [popularPackages, setPopularPackages] = useState([]);

  const fetchStats = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/admin/stats`);
      setStats(res.data.stats || {});
      setPopularPackages(res.data.popularPackages || []);
    } catch (err) {
      console.error("Error fetching analytics:", err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">Analytics</h1>
      <p className="text-gray-400 mb-6">Dashboard insights</p>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-[#1e1e1e] border border-gray-800 rounded-xl p-6 text-center">
          <Users className="text-[#2563EB] mx-auto mb-2" size={32} />
          <h2 className="text-xl text-white font-semibold">{stats.users}</h2>
          <p className="text-gray-400">Total Users</p>
        </div>
        <div className="bg-[#1e1e1e] border border-gray-800 rounded-xl p-6 text-center">
          <Briefcase className="text-[#2563EB] mx-auto mb-2" size={32} />
          <h2 className="text-xl text-white font-semibold">{stats.bookings}</h2>
          <p className="text-gray-400">Total Bookings</p>
        </div>
        <div className="bg-[#1e1e1e] border border-gray-800 rounded-xl p-6 text-center">
          <BarChart className="text-[#2563EB] mx-auto mb-2" size={32} />
          <h2 className="text-xl text-white font-semibold">₹{stats.revenue}</h2>
          <p className="text-gray-400">Total Revenue</p>
        </div>
      </div>

      <div className="bg-[#1e1e1e] border border-gray-800 rounded-xl p-6">
        <h3 className="text-white text-lg mb-4">Most Booked Packages</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={popularPackages}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="title" stroke="#ccc" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="bookings" fill="#2563EB" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Analytics;
