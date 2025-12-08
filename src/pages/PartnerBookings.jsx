// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function PartnerBookings() {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
//   const token = localStorage.getItem("partnerToken");

//   const loadBookings = async () => {
//     try {
//       const res = await axios.get(
//         "http://localhost:3000/api/partner/bookings",
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setBookings(res.data.bookings || []);
//     } catch (error) {
//       console.error("Error fetching partner bookings:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadBookings();
//   }, []);

//   const sortBookings = (key) => {
//     let direction = "asc";
//     if (sortConfig.key === key && sortConfig.direction === "asc") {
//       direction = "desc";
//     }
//     setSortConfig({ key, direction });
//   };

//   const sortedBookings = [...bookings].sort((a, b) => {
//     if (!sortConfig.key) return 0;

//     let aValue = a[sortConfig.key];
//     let bValue = b[sortConfig.key];

//     // Nested object check (e.g., package.title)
//     if (sortConfig.key.includes(".")) {
//       const keys = sortConfig.key.split(".");
//       aValue = keys.reduce((obj, k) => obj?.[k], a);
//       bValue = keys.reduce((obj, k) => obj?.[k], b);
//     }

//     if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
//     if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
//     return 0;
//   });

//   if (loading) return <p className="text-white">Loading bookings...</p>;
//   if (!bookings.length) return <p className="text-white">No bookings yet.</p>;

//   return (
//     <div className="text-white">
//       <h1 className="text-3xl font-bold mb-6">My Bookings</h1>

//       <table className="w-full text-left border border-gray-700">
//         <thead>
//           <tr className="border-b border-gray-700">
//             <th className="px-4 py-2 cursor-pointer" onClick={() => sortBookings("fullName")}>
//               Name
//             </th>
//             <th className="px-4 py-2 cursor-pointer" onClick={() => sortBookings("package.title")}>
//               Package
//             </th>
//             <th className="px-4 py-2 cursor-pointer" onClick={() => sortBookings("date")}>
//               Date
//             </th>
//             <th className="px-4 py-2 cursor-pointer" onClick={() => sortBookings("travelers")}>
//               Travelers
//             </th>
//             <th className="px-4 py-2 cursor-pointer" onClick={() => sortBookings("package.price")}>
//               Amount
//             </th>
//             <th className="px-4 py-2 cursor-pointer" onClick={() => sortBookings("status")}>
//               Payment Status
//             </th>
//           </tr>
//         </thead>

//         <tbody>
//           {sortedBookings.map((b) => (
//             <tr key={b._id} className="border-b border-gray-700">
//               <td className="px-4 py-2">{b.fullName}</td>
//               <td className="px-4 py-2">{b.package?.title || "N/A"}</td>
//               <td className="px-4 py-2">{new Date(b.date).toLocaleDateString("en-GB")}</td>
//               <td className="px-4 py-2">{b.travelers}</td>
//               <td className="px-4 py-2">₹{b.package?.price || "0"}</td>
//               <td
//                 className={`px-4 py-2 font-bold ${
//                   b.status === "completed" ? "text-green-500" : "text-yellow-400"
//                 }`}
//               >
//                 {b.status || "pending"}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import axios from "axios";

export default function PartnerBookings() {
  const [bookings, setBookings] = useState([]);
  const token = localStorage.getItem("partnerToken");
    console.log(token);
  const loadBookings = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/partner/booking",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      console.log(res.data); // Debug: check if bookings are returned
      setBookings(res.data.bookings || []);
    } catch (err) {
      console.error("Error fetching partner bookings:", err);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  return (
    <div className="text-white">
      <h1 className="text-3xl font-bold mb-6">My Bookings</h1>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th>Name</th>
            <th>Package</th>
            <th>Date</th>
            <th>Travelers</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b._id}>
              <td>{b.fullName}</td>
              <td>{b?.package?.title || "N/A"}</td>
              <td>{new Date(b.date).toLocaleDateString()}</td>
              <td>{b.travelers}</td>
              <td>₹{b?.package?.price || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
