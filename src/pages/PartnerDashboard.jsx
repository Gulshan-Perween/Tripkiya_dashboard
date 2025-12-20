// import { Package, CalendarCheck2, DollarSign } from "lucide-react";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { BASE_URL } from "../utils/base_url";
// import { jwtDecode } from "jwt-decode";

// export default function PartnerDashboard() {
//   const [packages, setPackages] = useState([]);
//   const [bookings, setBookings] = useState([]);
//   const [partnerId, setPartnerId] = useState(null);

//   const token = localStorage.getItem("partnerToken");

//   const decoded = jwtDecode(token);
//   const pId = decoded.id;
//   setPartnerId(pId);

//   console.log("Partner ID:", pId);

//   console.log(packages);
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = localStorage.getItem("partnerToken");
//         console.log(token);

//         if (!token) {
//           window.location.href = "/partner-login";
//           return;
//         }

//         const pk = await axios.get(
//           `${BASE_URL}/api/partner/${pId}/packages`,

//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );

//         const bk = await axios.get(`${BASE_URL}/api/partner/bookings`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         console.log("Bookings response =>", bk.data);

//         setPackages(Array.isArray(pk.data) ? pk.data : []);

//         setBookings(
//           Array.isArray(bk.data)
//             ? bk.data
//             : Array.isArray(bk.data?.bookings)
//             ? bk.data.bookings
//             : []
//         );
//       } catch (err) {
//         console.log(err);
//         localStorage.removeItem("partnerToken");
//         window.location.href = "/partner-login";
//       }
//     };

//     fetchData();
//   }, []);

//   const safeBookings = Array.isArray(bookings) ? bookings : [];

//   const totalRevenue = safeBookings.reduce(
//     (sum, b) => sum + (b.totalPrice || 0),
//     0
//   );

//   const stats = [
//     {
//       label: "Total Packages",
//       value: packages.length,
//       icon: Package,
//     },
//     {
//       label: "Total Bookings",
//       value: safeBookings.length,
//       icon: CalendarCheck2,
//     },
//     {
//       label: "Total Revenue",
//       value: `₹${totalRevenue.toLocaleString()}`,
//       icon: DollarSign,
//     },
//   ];

//   return (
//     <div className="text-white space-y-6">
//       <h1 className="text-3xl font-bold">Partner Dashboard</h1>

//       {/* Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {stats.map((s, i) => {
//           const Icon = s.icon;
//           return (
//             <div
//               key={i}
//               className="p-6 bg-gray-900 rounded-xl border border-gray-700 flex items-center justify-between hover:border-blue-600 transition"
//             >
//               <div>
//                 <p className="text-gray-400 text-sm">{s.label}</p>
//                 <h2 className="text-2xl font-bold">{s.value}</h2>
//               </div>
//               <Icon className="text-blue-500" size={36} />
//             </div>
//           );
//         })}
//       </div>

//       {/* Recent Bookings */}
//       <div className="bg-gray-900 p-6 rounded-xl border border-gray-700">
//         <h2 className="text-xl font-semibold mb-4">Recent Bookings</h2>

//         {safeBookings.length === 0 ? (
//           <p className="text-gray-400">No recent bookings</p>
//         ) : (
//           <div className="overflow-auto">
//             <table className="min-w-full text-sm">
//               <thead className="border-b border-gray-700 text-left">
//                 <tr>
//                   <th className="py-3">User</th>
//                   <th className="py-3">Package</th>
//                   <th className="py-3">Amount</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {safeBookings.slice(0, 5).map((b) => (
//                   <tr
//                     key={b._id}
//                     className="border-b border-gray-800 hover:bg-gray-800"
//                   >
//                     <td className="py-3"> {b.fullName || "User"}</td>
//                     <td> {b.destination || "N/A"}</td>₹
//                     {(b.amountPaid ?? b.package?.price ?? 0).toLocaleString()}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import { Package, CalendarCheck2, DollarSign } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/base_url";
import { jwtDecode } from "jwt-decode";

export default function PartnerDashboard() {
  const [packages, setPackages] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [partnerId, setPartnerId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("partnerToken");

        if (!token) {
          window.location.href = "/partner-login";
          return;
        }

        const decoded = jwtDecode(token);
        const pId = decoded.id;
        setPartnerId(pId);

        // ✅ Get partner packages
        const pk = await axios.get(
          `${BASE_URL}/api/partner/${pId}/packages`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // ✅ Get partner bookings
        const bk = await axios.get(
          `${BASE_URL}/api/partner/bookings`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setPackages(
          Array.isArray(pk.data?.packages) ? pk.data.packages : []
        );

        setBookings(
          Array.isArray(bk.data?.bookings) ? bk.data.bookings : []
        );
      } catch (err) {
        console.error(err);
        localStorage.removeItem("partnerToken");
        window.location.href = "/partner-login";
      }
    };

    fetchData();
  }, []);

  const safeBookings = Array.isArray(bookings) ? bookings : [];

  // ✅ Correct revenue logic
  const totalRevenue = safeBookings.reduce(
    (sum, b) => sum + (b.amountPaid ?? Number(b.package?.price) ?? 0),
    0
  );

  const stats = [
    {
      label: "Total Packages",
      value: packages.length,
      icon: Package,
    },
    {
      label: "Total Bookings",
      value: safeBookings.length,
      icon: CalendarCheck2,
    },
    {
      label: "Total Revenue",
      value: `₹${totalRevenue.toLocaleString()}`,
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

        {safeBookings.length === 0 ? (
          <p className="text-gray-400">No recent bookings</p>
        ) : (
          <div className="overflow-auto">
            <table className="min-w-full text-sm">
              <thead className="border-b border-gray-700 text-left">
                <tr>
                  <th className="py-3 px-2">User</th>
                  <th className="py-3 px-2">Package</th>
                  <th className="py-3 px-2">Amount</th>
                </tr>
              </thead>
              <tbody>
                {safeBookings.slice(0, 5).map((b) => (
                  <tr
                    key={b._id}
                    className="border-b border-gray-800 hover:bg-gray-800"
                  >
                    <td className="py-3 px-2">
                      {b.fullName || "User"}
                    </td>
                    <td className="py-3 px-2">
                      {b.destination || b.package?.title || "N/A"}
                    </td>
                    <td className="py-3 px-2 font-semibold text-blue-400">
                      ₹
                      {(b.amountPaid ??
                        Number(b.package?.price) ??
                        0
                      ).toLocaleString()}
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
