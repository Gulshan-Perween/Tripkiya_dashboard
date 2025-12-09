import { useState } from "react";

export default function CompanyDetails() {
  const [form, setForm] = useState({
    companyName: "",
    contactPerson: "",
    supportNumber: "",
    email: "",
    address: "",
    website: "",
  });

  const [showCompanyInfo, setShowCompanyInfo] = useState(false);

  const handleSubmit = async () => {
    try {
      const res = await fetch(
        "https://tripkiya-backend.onrender.com/api/company-details/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );
      if (res.ok) {
        alert("Company Details Added Successfully!");
      } else {
        alert("Error adding company details");
      }
    } catch (error) {
      alert("Error adding company details");
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-[#1e1e1e] p-6 rounded-xl shadow-lg text-white mt-10 border border-gray-700">

      {/* Company Info Display Bar */}
      {form.companyName && (
        <div className="mb-6 p-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold">
              {form.companyName}
            </span>
            <button
              onClick={() => setShowCompanyInfo(!showCompanyInfo)}
              className="px-4 py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              {showCompanyInfo ? "Hide Info" : "View Info"}
            </button>
          </div>
        </div>
      )}

      {/* Company Info Panel */}
      {showCompanyInfo && (
        <div className="mb-6 p-5 bg-[#111] rounded-lg border-2 border-blue-500 shadow-xl">
          <h3 className="text-xl font-bold text-blue-400 mb-4 flex items-center">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            Company Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-400 text-sm mb-1">Company Name</p>
              <p className="text-white font-medium">{form.companyName || "—"}</p>
            </div>
            
            <div>
              <p className="text-gray-400 text-sm mb-1">Contact Person</p>
              <p className="text-white font-medium">{form.contactPerson || "—"}</p>
            </div>
            
            <div>
              <p className="text-gray-400 text-sm mb-1">Support Number</p>
              <p className="text-white font-medium flex items-center">
                <svg className="w-4 h-4 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {form.supportNumber || "—"}
              </p>
            </div>
            
            <div>
              <p className="text-gray-400 text-sm mb-1">Email</p>
              <p className="text-white font-medium flex items-center">
                <svg className="w-4 h-4 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {form.email || "—"}
              </p>
            </div>
            
            <div className="md:col-span-2">
              <p className="text-gray-400 text-sm mb-1">Address</p>
              <p className="text-white font-medium">{form.address || "—"}</p>
            </div>
            
            <div className="md:col-span-2">
              <p className="text-gray-400 text-sm mb-1">Website</p>
              <p className="text-white font-medium">{form.website || "—"}</p>
            </div>
          </div>
        </div>
      )}

      <h2 className="text-2xl font-bold mb-5 text-blue-400">Company Details</h2>

      {/* Company Information Section */}
      <div className="box">
        <input
          className="input"
          placeholder="Company Name"
          value={form.companyName}
          onChange={(e) =>
            setForm({ ...form, companyName: e.target.value })
          }
        />

        <input
          className="input"
          placeholder="Contact Person Name"
          value={form.contactPerson}
          onChange={(e) =>
            setForm({ ...form, contactPerson: e.target.value })
          }
        />

        <input
          className="input"
          placeholder="Support Number"
          value={form.supportNumber}
          onChange={(e) =>
            setForm({ ...form, supportNumber: e.target.value })
          }
        />

        <input
          className="input"
          type="email"
          placeholder="Email Address"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          className="input"
          placeholder="Physical Address"
          value={form.address}
          onChange={(e) =>
            setForm({ ...form, address: e.target.value })
          }
        />

        
      </div>

      <button
        className="w-full py-3 bg-blue-500 rounded-lg hover:bg-blue-600 font-bold transition-colors"
        onClick={handleSubmit}
      >
        Submit Company Details
      </button>

      {/* CSS */}
      <style>{`
        .input {
          width: 100%;
          padding: 12px;
          margin-bottom: 14px;
          border-radius: 8px;
          background: #242424;
          border: 1px solid #444;
          color: white;
        }
        .input:focus {
          outline: none;
          border-color: #3b82f6;
        }
        .box {
          background: #111;
          padding: 14px;
          border-radius: 10px;
          margin-bottom: 16px;
          border: 1px solid #333;
        }
      `}</style>
    </div>
  );
}
