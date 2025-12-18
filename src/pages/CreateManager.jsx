import { useState } from "react";
import axios from "axios";
import { UserPlus, Mail, Lock } from "lucide-react";

function CreateManager() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  // 🔴 TEMP TOKEN (TEST ONLY)
  const token =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NDE0Mzk1ODJjZDcwMzBjM2E4MzQ3ZCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc2NjAzNDU3MCwiZXhwIjoxNzY2MDM4MTcwfQ.3eiSXxVjQqb0reaw1A85bRQvXm10b7-559p5Dn-INQY"
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      await axios.post(
        "http://localhost:3000/api/admin/create-manager",
        { ...form, role: "manager" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage({
        type: "success",
        text: "Manager account created successfully 🎉",
      });

      setForm({ name: "", email: "", password: "" });
    } catch (err) {
      setMessage({
        type: "error",
        text:
          err.response?.data?.message ||
          "Failed to create manager",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-xl bg-[#1e1e1e] border border-gray-800 rounded-2xl shadow-lg p-8">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-blue-600/20 rounded-xl">
            <UserPlus className="text-blue-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">
              Create Manager
            </h1>
            <p className="text-sm text-gray-400">
              Add a new manager with limited access
            </p>
          </div>
        </div>

        {/* Alerts */}
        {message && (
          <div
            className={`mb-5 p-4 rounded-lg text-sm ${
              message.type === "success"
                ? "bg-green-500/10 text-green-400 border border-green-500/30"
                : "bg-red-500/10 text-red-400 border border-red-500/30"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name */}
          <div>
            <label className="text-sm text-gray-400 mb-1 block">
              Manager Name
            </label>
            <div className="flex items-center gap-3 bg-[#181818] border border-gray-700 rounded-lg px-4">
              <UserPlus size={18} className="text-gray-500" />
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
                className="w-full py-3 bg-transparent text-white outline-none"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-gray-400 mb-1 block">
              Email Address
            </label>
            <div className="flex items-center gap-3 bg-[#181818] border border-gray-700 rounded-lg px-4">
              <Mail size={18} className="text-gray-500" />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="manager@tripkiya.com"
                required
                className="w-full py-3 bg-transparent text-white outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-400 mb-1 block">
              Password
            </label>
            <div className="flex items-center gap-3 bg-[#181818] border border-gray-700 rounded-lg px-4">
              <Lock size={18} className="text-gray-500" />
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Minimum 6 characters"
                required
                className="w-full py-3 bg-transparent text-white outline-none"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold text-white 
                       bg-blue-600 hover:bg-blue-700 transition
                       disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Creating Manager..." : "Create Manager"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateManager;
