import { useEffect, useState } from "react";
import axios from "axios";

export default function PartnerBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("partnerToken");

  const loadBookings = async () => {
    try {
      if (!token) return;

      const res = await axios.get(
        "https://tripkiya-backend.onrender.com/api/partner/bookings",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const partnerId = JSON.parse(atob(token.split(".")[1])).id;

      const filtered = (res.data.bookings || []).filter(
        (b) => b.partner === partnerId || b.partner?._id === partnerId
      );

      setBookings(filtered);
    } catch (err) {
      console.error("❌ Error fetching bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  return (
    <div className="p-6 text-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">📦 My Bookings</h1>
        <span className="text-sm text-gray-400">Total: {bookings.length}</span>
      </div>

      {/* Loading */}
      {loading && <p className="text-gray-400">Loading bookings...</p>}

      {/* Empty State */}
      {!loading && bookings.length === 0 && (
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-10 text-center">
          <p className="text-lg font-semibold text-gray-300">No bookings yet</p>
          <p className="text-gray-500 text-sm mt-2">
            Your customer bookings will appear here.
          </p>
        </div>
      )}

      {/* Booking Cards */}
      {!loading && bookings.length > 0 && (
        <div className="grid gap-5">
          {bookings.map((b) => (
            <div
              key={b._id}
              className="bg-gray-900 border border-gray-700 rounded-xl p-5 hover:border-blue-500 transition"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                {/* Left */}
                <div>
                  <h2 className="text-xl font-semibold">
                    {b.package?.title || b.packageTitle || "Package"}
                  </h2>

                  <p className="text-sm text-gray-400 mt-1">
                    Customer:{" "}
                    <span className="text-gray-200">{b.fullName}</span>
                  </p>
                  <p className="text-sm text-gray-400">
                    Date: {new Date(b.date).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-400">
                    Travelers: {b.travelers}
                  </p>
                </div>

                {/* Right */}
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-400">
                    ₹{b.package?.price || 0}
                  </p>

                  <span className="inline-block mt-2 px-3 py-1 text-xs rounded-full bg-green-900 text-green-300">
                    Confirmed
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
