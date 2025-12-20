import { useEffect, useState } from "react";
import axios from "axios";
import { Trash, Edit } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import { BASE_URL } from "../utils/base_url";
import PartnerPackageForm from "../components/PartnerPackageForm";

export default function PartnerAllPackages() {
  const [packages, setPackages] = useState([]);
  const [partnerId, setPartnerId] = useState(null);
  const [editingPackage, setEditingPackage] = useState(null); // 🔥 NEW
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadPackages = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("partnerToken");
      if (!token) {
        setError("No authentication token found");
        setLoading(false);
        return;
      }

      const decoded = jwtDecode(token);
      const pId = decoded.id;
      setPartnerId(pId);

      const res = await axios.get(
        `${BASE_URL}/api/partner/${pId}/packages`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPackages(res.data.packages || []);
    } catch (err) {
      console.error("❌ Error loading packages:", err);
      setError(err.response?.data?.message || "Failed to load packages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPackages();
  }, []);

  /* ---------------- DELETE ---------------- */
  const deletePackage = async (id) => {
    if (!window.confirm("Are you sure you want to delete this package?")) return;

    try {
      const token = localStorage.getItem("partnerToken");

      await axios.delete(`${BASE_URL}/api/partner/packages/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPackages((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error("❌ Error deleting package:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Failed to delete package");
    }
  };

  /* ---------------- EDIT MODE ---------------- */
  if (editingPackage) {
    return (
      <div className="text-white max-w-2xl">
        <h1 className="text-3xl font-bold mb-6">Edit Package</h1>

        <PartnerPackageForm
          service={editingPackage}
          companyDetails={editingPackage.companyDetails}
          onCancel={() => setEditingPackage(null)}
          onSubmit={async (data) => {
            try {
              const token = localStorage.getItem("partnerToken");

              await axios.put(
                `${BASE_URL}/api/partner/packages/${editingPackage._id}`,
                data,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );

              alert("✅ Package updated successfully");
              setEditingPackage(null);
              loadPackages();
            } catch (err) {
              console.error("❌ Update error:", err.response?.data || err.message);
              alert(err.response?.data?.message || "Update failed");
            }
          }}
        />
      </div>
    );
  }

  /* ---------------- LIST MODE ---------------- */
  if (loading) {
    return (
      <div className="text-white flex items-center justify-center h-64">
        <p className="text-xl">Loading packages...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-white">
        <div className="bg-red-900/20 border border-red-500 rounded-lg p-4">
          <p className="text-red-400">{error}</p>
          <button
            onClick={loadPackages}
            className="mt-3 px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="text-white">
      <h1 className="text-3xl font-bold mb-6">All Packages</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {packages.map((p) => (
          <div
            key={p._id}
            className="bg-gray-900 p-4 rounded-xl border border-gray-700"
          >
            {p.images?.[0] && (
              <img
                src={p.images[0]}
                alt={p.title}
                className="w-full h-40 object-cover rounded-lg"
              />
            )}

            <h2 className="text-xl font-semibold mt-3">{p.title}</h2>
            <p className="text-gray-400">{p.destination}</p>
            <p className="text-blue-400 font-bold mt-2">₹{p.price}</p>

            <div className="flex items-center mt-4 gap-3">
              <button
                onClick={() => setEditingPackage(p)}   // 🔥 EDIT WORKS
                className="p-2 bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                <Edit size={18} />
              </button>

              <button
                onClick={() => deletePackage(p._id)}
                className="p-2 bg-red-600 rounded-lg hover:bg-red-700"
              >
                <Trash size={18} />
              </button>
            </div>
          </div>
        ))}

        {packages.length === 0 && (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-400 text-lg">No packages found</p>
          </div>
        )}
      </div>
    </div>
  );
}
