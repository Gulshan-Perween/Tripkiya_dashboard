import { Package, CalendarCheck2, DollarSign, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function PartnerDashboard() {
  const [packages, setPackages] = useState([]);
  const [bookings, setBookings] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const pk = await axios.get("https://tripkiya-backend.onrender.com/api/partner/packages");
  //       const bk = await axios.get("https://tripkiya-backend.onrender.com/api/partner/bookings");

  //       setPackages(pk.data || []);
  //       setBookings(bk.data || []);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  //   fetchData();
  // }, []);
 useEffect(() => {
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      const pk = await axios.get(
        "https://tripkiya-backend.onrender.com/api/partner/packages",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const bk = await axios.get(
        "https://tripkiya-backend.onrender.com/api/partner/bookings",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPackages(pk.data || []);
      setBookings(bk.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  fetchData();
}, []);

  const stats = [
    {
      label: "Total Packages",
      value: packages.length,
      icon: Package,
    },
    {
      label: "Total Bookings",
      value: bookings.length,
      icon: CalendarCheck2,
    },
    {
      label: "Total Revenue",
      value: "₹" +
        bookings
          .reduce((sum, b) => sum + (b.totalPrice || 0), 0)
          .toLocaleString(),
      icon: DollarSign,
    },
  ];

  return (
    <div className="text-white space-y-6">
      <h1 className="text-3xl font-bold">Partner Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div
              key={i}
              className="p-6 bg-gray-900 rounded-xl border border-gray-700 flex items-center justify-between hover:border-blue-600 transition"
            >
              <div>
                <p className="text-gray-400 text-sm">{s.label}</p>
                <h2 className="text-2xl font-bold">{s.value}</h2>
              </div>
              <Icon className="text-blue-500" size={36} />
            </div>
          );
        })}
      </div>

      {/* Recent Bookings */}
      <div className="bg-gray-900 p-6 rounded-xl border border-gray-700">
        <h2 className="text-xl font-semibold mb-4">Recent Bookings</h2>

        {bookings.length === 0 ? (
          <p className="text-gray-400">No recent bookings</p>
        ) : (
          <div className="overflow-auto">
            <table className="min-w-full text-sm">
              <thead className="border-b border-gray-700 text-left">
                <tr>
                  <th className="py-3">User</th>
                  <th className="py-3">Package</th>
                  <th className="py-3">Amount</th>
                </tr>
              </thead>
              <tbody>
                {bookings.slice(0, 5).map((b) => (
                  <tr
                    key={b._id}
                    className="border-b border-gray-800 hover:bg-gray-800"
                  >
                    <td className="py-3">{b.userName}</td>
                    <td>{b.packageName}</td>
                    <td className="text-blue-500">₹{b.totalPrice}</td>
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
