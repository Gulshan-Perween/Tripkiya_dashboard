import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PartnerSignup() {
  const [form, setForm] = useState({
    companyName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("https://tripkiya-backend.onrender.com/api/partner/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.companyName,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Signup Successful!");
        navigate("/partner/login");
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-8 border border-gray-200 backdrop-blur-md">
        
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-4xl font-bold text-gray-900">Partner Signup</h2>
          <p className="text-gray-500 mt-1 text-sm">
            Create your partner account to list and manage packages
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Company Name */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Company Name
            </label>
            <input
              type="text"
              name="companyName"
              value={form.companyName}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-gray-50"
              placeholder="Your travel company name"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-gray-50"
              placeholder="example@company.com"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-gray-50"
              placeholder="••••••••"
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-gray-50"
              placeholder="Re-enter password"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl font-semibold text-lg shadow-md hover:shadow-lg transition-all duration-200"
          >
            Create Account
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-5">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/partner/login")}
            className="text-blue-600 font-semibold cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
