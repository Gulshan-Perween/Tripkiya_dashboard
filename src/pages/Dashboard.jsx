import { Package, Users, CalendarCheck2, DollarSign, TrendingUp, AlertCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [services, setServices] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [servicesRes, bookingsRes, usersRes] = await Promise.all([
          axios.get('https://tripkiya-backend.onrender.com/api/packages'),
          axios.get('https://tripkiya-backend.onrender.com/api/bookings'),
          axios.get('https://tripkiya-backend.onrender.com/api/auth/users'),
        ]);

        const servicesData = Array.isArray(servicesRes.data)
          ? servicesRes.data
          : servicesRes.data?.packages || servicesRes.data?.data || [];

        const bookingsData = Array.isArray(bookingsRes.data)
          ? bookingsRes.data
          : bookingsRes.data?.bookings || bookingsRes.data?.data || [];

        const usersData = Array.isArray(usersRes.data)
          ? usersRes.data
          : usersRes.data?.users || usersRes.data?.data || [];

        setServices(servicesData);
        setBookings(bookingsData);
        setUsers(usersData);
        setError(null);
        console.log(servicesData, bookingsData, usersData);
      } catch (err) {
        console.error('❌ Error fetching dashboard data:', err);
        setError(err.response?.data?.message || err.message || 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalPackages = services.length;
  const totalBookings = bookings.length;
  const totalUsers = users.length;
  const totalRevenue = bookings.reduce((sum, b) => {
    const amount = b.amountPaid || b.totalPrice || b.price || 0;
    return sum + amount;
  }, 0);

  const themeColor = 'bg-[#2563EB]/20 text-[#2563EB]';

  const stats = [
    { label: 'Total Packages', value: totalPackages, icon: Package },
    { label: 'Total Users', value: totalUsers, icon: Users },
    { label: 'Total Bookings', value: totalBookings, icon: CalendarCheck2 },
    { label: 'Total Revenue', value: `₹${totalRevenue.toLocaleString()}`, icon: DollarSign },
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
            <h3 className="text-lg font-semibold text-red-500">Error Loading Dashboard</h3>
          </div>
          <p className="text-gray-300">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-[#2563EB] text-white rounded hover:bg-[#1d4ed8] transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">Overview of your TripKiya travel platform</p>
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
                  <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${themeColor}`}>
                  <Icon size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Bookings Section */}
      <div className="bg-[#1e1e1e] border border-[#2563EB] rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">Recent Bookings</h2>
          <div className="flex items-center gap-2">
            <TrendingUp size={16} className="text-green-500" />
            <p className="text-sm text-green-500">+18% Growth</p>
          </div>
        </div>

        {bookings.length === 0 ? (
          <div className="text-center py-12">
            <CalendarCheck2 size={48} className="mx-auto text-[#2563EB] mb-4" />
            <p className="text-gray-400">No bookings yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-gray-400">
              <thead className="border-b border-gray-700">
                <tr>
                  <th className="text-left py-3 px-4">User Name</th>
                  <th className="text-left py-3 px-4">Destination</th>
                  <th className="text-left py-3 px-4">Passengers</th>
                  <th className="text-left py-3 px-4">Amount</th>
                  <th className="text-left py-3 px-4">Registered On</th>
                </tr>
              </thead>
              <tbody>
                {bookings.slice(0, 5).map((b) => {
                  const userName = b.user?.name || b.userName || 'Unknown User';
                  const destination = b.package?.destination || b.package?.title || b.packageName || 'N/A';
                  const regDate = b.createdAt
                    ? new Date(b.createdAt).toLocaleString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })
                    : 'N/A';

                  return (
                    <tr key={b._id} className="border-b border-gray-800 hover:bg-gray-900/50 transition">
                      <td className="py-3 px-4">{userName}</td>
                      <td className="py-3 px-4">{destination}</td>
                      <td className="py-3 px-4">{b.passengers?.length || b.numberOfPeople || 1}</td>
                      <td className="py-3 px-4 text-[#2563EB] font-medium">
                        ₹{(b.amountPaid || b.totalPrice || 0).toLocaleString()}
                      </td>
                      <td className="py-3 px-4">{regDate}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Recent Packages */}
      <div className="bg-[#1e1e1e] border border-[#2563EB] rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Recent Packages</h2>
        {services.length === 0 ? (
          <div className="text-center py-12">
            <Package size={48} className="mx-auto text-[#2563EB] mb-4" />
            <p className="text-gray-400">No packages available</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.slice(0, 3).map((service) => (
              <div
                key={service._id}
                className="p-4 bg-gray-900/50 rounded-lg border border-gray-800 hover:border-[#2563EB]/60 transition-all"
              >
                <div className="h-40 w-full overflow-hidden rounded-lg mb-3">
                  {service.images?.[0] || service.image ? (
                    <img
                      src={service.images?.[0] || service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-800">
                      <Package size={28} className="text-[#2563EB]" />
                    </div>
                  )}
                </div>
                <h3 className="text-white font-medium mb-1">
                  {service.destination || service.title}
                </h3>
                <p className="text-gray-500 text-sm mb-2">{service.duration || 'N/A'}</p>
                <p className="text-[#2563EB] font-semibold">₹{service.price?.toLocaleString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
