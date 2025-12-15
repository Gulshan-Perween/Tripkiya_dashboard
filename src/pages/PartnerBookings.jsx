import { useEffect, useState } from "react";
import axios from "axios";

export default function PartnerBookings() {
  const [bookings, setBookings] = useState([]);
  const token = localStorage.getItem("partnerToken");

  const loadBookings = async () => {
    try {
      const res = await axios.get(
        "https://tripkiya-backend.onrender.com/api/partner/bookings",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("📦 Partner bookings:", res.data);
      setBookings(res.data.bookings || []);
    } catch (err) {
      console.error("❌ Error fetching partner bookings:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  return (
    <div className="text-white">
      <h1 className="text-3xl font-bold mb-6">My Bookings</h1>

      {bookings.length === 0 ? (
        <p className="text-gray-400">No bookings found</p>
      ) : (
        <table className="w-full text-left border border-gray-700">
          <thead className="bg-gray-800">
            <tr>
              <th className="p-3">Customer</th>
              <th className="p-3">Package</th>
              <th className="p-3">Date</th>
              <th className="p-3">Travelers</th>
              <th className="p-3">Amount</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b._id} className="border-t border-gray-700">
                <td className="p-3">{b.fullName}</td>
                <td className="p-3">{b.package?.title || "N/A"}</td>
                <td className="p-3">
                  {new Date(b.date).toLocaleDateString()}
                </td>
                <td className="p-3">{b.travelers}</td>
                <td className="p-3">₹{b.package?.price || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
