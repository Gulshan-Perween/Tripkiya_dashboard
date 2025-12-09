import { useEffect, useState } from "react";
import axios from "axios";
import { Trash, Edit } from "lucide-react";

export default function PartnerAllPackages() {
  const [packages, setPackages] = useState([]);

  const loadPackages = async () => {
    const res = await axios.get("https://tripkiya-backend.onrender.com/api/partner/packages", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("partnerToken")}`,
      },
    });
    setPackages(res.data || []);
  };

  useEffect(() => {
    loadPackages();
  }, []);

  const deletePackage = async (id) => {
    await axios.delete(
      `http://localhost:3000/api/partner/packages/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("partnerToken")}`,
        },
      }
    );
    loadPackages();
  };

  return (
    <div className="text-white">
      <h1 className="text-3xl font-bold mb-6">All Packages</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {packages.map((p) => (
          <div
            key={p._id}
            className="bg-gray-900 p-4 rounded-xl border border-gray-700"
          >
            <img
              src={p.images?.[0]}
              alt=""
              className="w-full h-40 object-cover rounded-lg"
            />
            <h2 className="text-xl font-semibold mt-3">{p.title}</h2>
            <p className="text-gray-400">{p.destination}</p>

            <p className="text-blue-400 font-bold mt-2">₹{p.price}</p>

            <div className="flex items-center mt-4 gap-3">
              <button className="p-2 bg-blue-600 rounded-lg">
                <Edit size={18} />
              </button>
              <button
                onClick={() => deletePackage(p._id)}
                className="p-2 bg-red-600 rounded-lg"
              >
                <Trash size={18} />
              </button>
            </div>
          </div>
        ))}

        {packages.length === 0 && (
          <p className="text-gray-400">No packages found</p>
        )}
      </div>
    </div>
  );
}
