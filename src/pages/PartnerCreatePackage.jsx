
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
// import PackageForm from "../components/PackageForm";
import PartnerPackageForm from "../components/PartnerPackageForm";
import { BASE_URL } from "../utils/base_url";

export default function PartnerCreatePackage() {
  const navigate = useNavigate();
  // const pID = localStorage.getItem("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MmFjOTc2OTYyMGMwMWZmYTc5ZmM4ZiIsInJvbGUiOiJwYXJ0bmVyIiwiaWF0IjoxNzY1Nzk3MzMwLCJleHAiOjE3NjgzODkzMzB9.Zzk3xK1r08e2t3ojjGfS5To7icysSiGWajwZTCYnK70");
  const pID = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MmFjOTc2OTYyMGMwMWZmYTc5ZmM4ZiIsInJvbGUiOiJwYXJ0bmVyIiwiaWF0IjoxNzY1Nzk3MzMwLCJleHAiOjE3NjgzODkzMzB9.Zzk3xK1r08e2t3ojjGfS5To7icysSiGWajwZTCYnK70'
  console.log("partner id",pID);
  const [companyDetails, setCompanyDetails] = useState({
    name: "",
    address: "",
    phone: "",
    email: ""
  });

  const handleCompanyChange = (e) => {
    const { name, value } = e.target;
    setCompanyDetails(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // const handleSubmit = async (packageData) => {
  //   try {
  //     const res = await axios.post(
  //       "http://localhost:3000/api/partner/packages",
  //       // `${BASE_URL}/partner/packages`,
  //       {
  //         ...packageData,
  //         companyDetails,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("partnerToken")}`,
  //         },
  //       }
  //     );

  //     if (res.data.success) {
  //       alert("🎉 Package added successfully!");
  //       navigate("/dashboard/packages");
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     alert("❌ Failed to add package");
  //   }
  // };
const handleSubmit = async (packageData) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/api/partner/packages`,
      {
        ...packageData,
        companyDetails,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("partnerToken")}`,
        },
      }
    );

    console.log("API response:", res.data);

    alert("🎉 Package added successfully!");
    navigate("/dashboard/packages");

  } catch (err) {
    console.error(err);
    alert("❌ Failed to add package");
  }
};

  return (
    <div className="max-w-2xl">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Create New Package (Partner)
        </h1>
        <p className="text-gray-400">Add a new travel package</p>
      </div>

      {/* Company Details */}
      <div className="bg-[#1e1e1e] border border-gray-800 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-white mb-4">
          Company Details
        </h2>

        <div className="space-y-4">
          {/* Company Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Company Name
            </label>
            <input
              type="text"
              name="name"
              value={companyDetails.name}
              onChange={handleCompanyChange}
              className="w-full px-4 py-2 bg-[#2a2a2a] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
              placeholder="Enter company name"
            />
          </div>

          {/* Company Address */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Address
            </label>
            <textarea
              name="address"
              value={companyDetails.address}
              onChange={handleCompanyChange}
              rows={3}
              className="w-full px-4 py-2 bg-[#2a2a2a] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 resize-none"
              placeholder="Enter company address"
            />
          </div>

          {/* Phone + Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={companyDetails.phone}
                onChange={handleCompanyChange}
                className="w-full px-4 py-2 bg-[#2a2a2a] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                placeholder="98765XXXXX"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={companyDetails.email}
                onChange={handleCompanyChange}
                className="w-full px-4 py-2 bg-[#2a2a2a] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                placeholder="company@example.com"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Package Form Section */}
      <div className="bg-[#1e1e1e] border border-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-4">
          Package Information
        </h2>

        {/* <PackageForm onSubmit={handleSubmit} companyDetails={companyDetails} /> */}
        <PartnerPackageForm onSubmit={handleSubmit} companyDetails={companyDetails} />
      </div>
    </div>
  );
}
