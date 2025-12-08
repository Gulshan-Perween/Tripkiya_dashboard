import { useEffect, useState } from "react";
import axios from "axios";
import { CalendarCheck2, User, MapPin, Phone, Mail } from "lucide-react";

function Bookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/bookings");
        setBookings(res.data.bookings || []);
      } catch (err) {
        console.error("Error fetching bookings:", err.response?.data || err.message);
      }
    };
    fetchBookings();
  }, []);

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-6">📘 All Bookings</h1>

      {bookings.length === 0 ? (
        <p className="text-gray-400">No bookings found yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-[#1e1e1e] rounded-xl border border-gray-700 hover:border-[#2563EB] transition-all p-5 shadow-lg"
            >
              <div className="flex items-center gap-3 mb-3">
                <User className="text-[#2563EB]" />
                <h2 className="text-lg font-semibold">{booking.fullName || booking.user?.name || "Guest User"}</h2>
              </div>

              <div className="space-y-2 text-gray-300 text-sm">
                <p className="flex items-center gap-2">
                  <Mail className="text-[#2563EB]" size={16} />
                  {booking.email}
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="text-[#2563EB]" size={16} />
                  {booking.phone}
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="text-[#2563EB]" size={16} />
                  {booking.destination}
                </p>
                <p className="flex items-center gap-2">
                  <CalendarCheck2 className="text-[#2563EB]" size={16} />
                  {booking.date}
                </p>
                <p>
                  👥 <span className="font-semibold">{booking.travelers}</span> Travelers
                </p>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <span
                  className={`text-sm px-3 py-1 rounded-full ${
                    booking.status === "pending"
                      ? "bg-blue-600"
                      : booking.status === "confirmed"
                      ? "bg-green-600"
                      : "bg-red-600"
                  }`}
                >
                  {booking.status || "pending"}
                </span>
                <span className="text-sm text-gray-400">
                  {new Date(booking.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Bookings;
