


import { useEffect, useState } from "react";
import axios from "axios";
import { Trash, Edit } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import { BASE_URL } from "../utils/base_url";


export default function PartnerAllPackages() {
  const [packages, setPackages] = useState([]);
  const [partnerId, setPartnerId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadPackages = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // const token = localStorage.getItem("partnerToken");
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MmFjOTc2OTYyMGMwMWZmYTc5ZmM4ZiIsInJvbGUiOiJwYXJ0bmVyIiwiaWF0IjoxNzY1Nzk3MzMwLCJleHAiOjE3NjgzODkzMzB9.Zzk3xK1r08e2t3ojjGfS5To7icysSiGWajwZTCYnK70";
      
      if (!token) {
        setError("No authentication token found");
        setLoading(false);
        return;
      }

      // Decode token to get partner ID
      const decoded = jwtDecode(token);
      const pId = decoded.id;
      setPartnerId(pId);
      
      console.log("Partner ID:", pId);

      // Use the decoded ID instead of hardcoded value
      const res = await axios.get(
        `${BASE_URL}/api/partner/692ac9769620c01ffa79fc8f/packages`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      
      setPackages(res.data.packages || []);
      console.log("Packages loaded:", res.data.packages);
    } catch (err) {
      console.error("Error loading packages:", err);
      setError(err.response?.data?.message || "Failed to load packages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPackages();
  }, []);

  const deletePackage = async (id) => {
    if (!window.confirm("Are you sure you want to delete this package?")) {
      return;
    }

    try {
      const token = localStorage.getItem("partnerToken");
      await axios.delete(
        `http://localhost:3000/api/partner/packages/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      // Optimistically update UI
      setPackages(packages.filter(p => p._id !== id));
      
      // Or reload from server
      // await loadPackages();
    } catch (err) {
      console.error("Error deleting package:", err);
      alert(err.response?.data?.message || "Failed to delete package");
    }
  };

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
                className="p-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
                aria-label="Edit package"
              >
                <Edit size={18} />
              </button>
              <button
                onClick={() => deletePackage(p._id)}
                className="p-2 bg-red-600 rounded-lg hover:bg-red-700 transition"
                aria-label="Delete package"
              >
                <Trash size={18} />
              </button>
            </div>
          </div>
        ))}

        {packages.length === 0 && (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-400 text-lg">No packages found</p>
            <p className="text-gray-500 text-sm mt-2">
              Create your first package to get started
            </p>
          </div>
        )}
      </div>
    </div>
  );
}