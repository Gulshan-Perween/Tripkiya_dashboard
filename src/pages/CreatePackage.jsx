// 


import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PackageForm from "../components/PackageForm";

function CreatePackage() {
  const navigate = useNavigate();
  const [companyDetails, setCompanyDetails] = useState({
    name: "",
    address: "",
    phone: "",
    email: ""
  });

  const handleSubmit = () => {
    // Triggered after successful form submission
    alert("🎉 Package added successfully!");
    navigate("/packages");
  };

  const handleCompanyChange = (e) => {
    const { name, value } = e.target;
    setCompanyDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Create New Package</h1>
        <p className="text-gray-400">Add a new package to your catalog</p>
      </div>

      {/* Company Details Section */}
      <div className="bg-[#1e1e1e] border border-gray-800 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-white mb-4">Company Details</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Company Name
            </label>
            <input
              type="text"
              name="name"
              value={companyDetails.name}
              onChange={handleCompanyChange}
              className="w-full px-4 py-2 bg-[#2a2a2a] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="Enter company name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Address
            </label>
            <textarea
              name="address"
              value={companyDetails.address}
              onChange={handleCompanyChange}
              rows={3}
              className="w-full px-4 py-2 bg-[#2a2a2a] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
              placeholder="Enter company address"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={companyDetails.phone}
                onChange={handleCompanyChange}
                className="w-full px-4 py-2 bg-[#2a2a2a] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="+1 (555) 000-0000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={companyDetails.email}
                onChange={handleCompanyChange}
                className="w-full px-4 py-2 bg-[#2a2a2a] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="company@example.com"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Package Form Section */}
      <div className="bg-[#1e1e1e] border border-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Package Information</h2>
        <PackageForm onSubmit={handleSubmit} companyDetails={companyDetails} />
      </div>
    </div>
  );
}

export default CreatePackage;