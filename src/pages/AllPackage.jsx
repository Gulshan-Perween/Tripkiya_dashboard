import { useEffect, useState } from "react";
import { Search, Filter } from "lucide-react";
import PackageForm from "../components/PackageForm";
import PackageCard from "../components/PackageCard";
import axios from "axios";

function AllPackage() {
  const BASE_URL = "https://tripkiya-backend.onrender.com/api/packages";

  const [packages, setPackages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingPackage, setEditingPackage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  // ✅ Fetch all packages
  const fetchPackages = async () => {
    try {
      const res = await axios.get(BASE_URL);
      console.log("📦 ALL packages received:", res.data);
      console.log("🏢 First package company details:", res.data[0]?.companyDetails);
      const data = Array.isArray(res.data) ? res.data : res.data.packages || [];
      
      

      setPackages(data);
    } catch (err) {
      console.error("❌ Error fetching packages:", err);
      setPackages([]);
    }
  };

  useEffect(() => {
    fetchPackages(); // ✅ Run only once
  }, []);

  // ✅ Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this package?")) return;
    try {
      await axios.delete(`${BASE_URL}/${id}`);
      alert("🗑️ Package deleted!");
      fetchPackages();
    } catch (err) {
      console.error("❌ Error deleting package:", err);
    }
  };

  // ✅ Edit
  const handleEdit = (pkg) => {
    setEditingPackage(pkg);
  };

  // ✅ Update
  const handleUpdate = async (updatedData) => {
    try {
      const id = editingPackage._id || editingPackage.id;
      await axios.put(`${BASE_URL}/${id}`, updatedData);
      alert("✅ Package updated!");
      setEditingPackage(null);
      fetchPackages();
    } catch (err) {
      console.error("❌ Error updating package:", err);
    }
  };

  const handleCancelEdit = () => {
    setEditingPackage(null);
  };

  // ✅ Search
  const filteredPackages = packages.filter((pkg) =>
    pkg.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (editingPackage) {
    return (
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold text-white mb-4">Edit Package</h1>
        <div className="bg-[#1e1e1e] border border-gray-800 rounded-lg p-6">
          <PackageForm
            service={editingPackage}
            onSubmit={handleUpdate}
            onCancel={handleCancelEdit}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">All Packages</h1>
        <p className="text-gray-400">Manage your package catalog</p>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
          <input
            type="text"
            placeholder="Search packages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#1e1e1e] border border-gray-800 rounded-lg pl-12 pr-4 py-3 text-white focus:outline-none focus:border-[#2563EB]"
          />
        </div>

        <div className="relative">
          <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-[#1e1e1e] border border-gray-800 rounded-lg pl-12 pr-8 py-3 text-white focus:outline-none focus:border-[#2563EB]"
          >
            <option value="all">All Categories</option>
            <option value="honeymoon">Honeymoon</option>
            <option value="mountain">Mountain</option>
            <option value="family">Family</option>
          </select>
        </div>
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPackages.length > 0 ? (
          filteredPackages.map((pkg) => (
            <PackageCard
              key={pkg._id}
              service={pkg}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <p className="text-gray-400">No packages found.</p>
        )}
      </div>
    </div>
  );
}

export default AllPackage;
