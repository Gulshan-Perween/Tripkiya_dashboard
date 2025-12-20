import React from "react";

import {
  Package,
  Users,
  CalendarCheck2,
  DollarSign,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/base_url";

function Dashboard() {
  const [services, setServices] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role; // admin | manager

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // ✅ Common APIs (Admin + Manager)
        const requests = [
          axios.get(`${BASE_URL}/api/packages`),
          axios.get(`${BASE_URL}/api/bookings`),
        ];

        // 🔴 Admin-only API
        if (role === "admin") {
          requests.push(axios.get(`${BASE_URL}/api/auth/users`));
        }

        const responses = await Promise.all(requests);

        const servicesRes = responses[0];
        const bookingsRes = responses[1];
        const usersRes = role === "admin" ? responses[2] : null;

        setServices(
          Array.isArray(servicesRes.data)
            ? servicesRes.data
            : servicesRes.data?.packages || []
        );

        setBookings(
          Array.isArray(bookingsRes.data)
            ? bookingsRes.data
            : bookingsRes.data?.bookings || []
        );

        if (role === "admin") {
          setUsers(
            Array.isArray(usersRes.data)
              ? usersRes.data
              : usersRes.data?.users || []
          );
        }

        setError(null);
      } catch (err) {
        console.error("❌ Dashboard error:", err);
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to load dashboard"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [role]);

  const totalPackages = services.length;
  const totalBookings = bookings.length;
  const totalUsers = users.length;

  const totalRevenue = bookings.reduce(
    (sum, b) => sum + (b.amountPaid || b.totalPrice || 0),
    0
  );

  const themeColor = "bg-[#2563EB]/20 text-[#2563EB]";

  // 🔥 SAME UI — ONLY USERS CARD CONDITIONAL
  const stats = [
    { label: "Total Packages", value: totalPackages, icon: Package },
    ...(role === "admin"
      ? [{ label: "Total Users", value: totalUsers, icon: Users }]
      : []),
    { label: "Total Bookings", value: totalBookings, icon: CalendarCheck2 },
    {
      label: "Total Revenue",
      value: `₹${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2563EB] mx-auto mb-4"></div>
          <p className="text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-900/20 border border-red-500 rounded-lg p-6 max-w-md">
          <div className="flex items-center gap-3 mb-2">
            <AlertCircle className="text-red-500" size={24} />
            <h3 className="text-lg font-semibold text-red-500">
              Error Loading Dashboard
            </h3>
          </div>
          <p className="text-gray-300">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">
          Overview of your TripKiya travel platform
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-[#1e1e1e] border border-[#2563EB] rounded-lg p-6 hover:shadow-lg hover:shadow-[#2563EB]/30 transition-all"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-gray-400 text-sm">{stat.label}</h3>
                  <p className="text-2xl font-bold text-white mt-1">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${themeColor}`}>
                  <Icon size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Bookings (UI SAME) */}
      <div className="bg-[#1e1e1e] border border-[#2563EB] rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">Recent Bookings</h2>
          <div className="flex items-center gap-2">
            <TrendingUp size={16} className="text-green-500" />
            <p className="text-sm text-green-500">+18% Growth</p>
          </div>
        </div>

        {bookings.length === 0 ? (
          <p className="text-gray-400">No bookings yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-gray-400">
              <thead className="border-b border-gray-700">
                <tr>
                  <th className="text-left py-3 px-4">User</th>
                  <th className="text-left py-3 px-4">Destination</th>
                  <th className="text-left py-3 px-4">Amount</th>
                </tr>
              </thead>
              <tbody>
                {bookings.slice(0, 5).map((b) => (
                  <tr key={b._id}>
                    <td className="py-3 px-4">{b.fullName || "User"}</td>
                    <td className="py-3 px-4">{b.destination || "N/A"}</td>
                    <td className="py-3 px-4 font-semibold text-[#2563EB]">
                      ₹
                      {(b.amountPaid ?? b.package?.price ?? 0).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
