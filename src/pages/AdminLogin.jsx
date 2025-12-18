import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/base_url";

export default function AdminLogin() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${BASE_URL}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        // Save admin details
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", "admin");

        alert("Admin Login Successful!");

        // Redirect to admin dashboard
        navigate("/admin-dashboard", { replace: true });
        return;
      }

      alert(data.message || "Invalid Email or Password");
    } catch (error) {
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 p-4">
      <div className="w-full max-w-md backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-8 animate-fade-in">
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Admin Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block mb-1 text-white font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 bg-white/20 text-white border border-white/30 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Enter your admin email"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-white font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full p-3 bg-white/20 text-white border border-white/30 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Enter your password"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-300 mt-6">
          Partner Login?{" "}
          <a href="/partner/login" className="text-blue-400 hover:text-blue-300 underline">
            Click Here
          </a>
        </p>
      </div>
    </div>
  );
}
