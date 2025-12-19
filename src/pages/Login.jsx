


// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { BASE_URL } from "../utils/base_url";

// export default function Login() {
//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//   });

//   const navigate = useNavigate();
//   console.log(localStorage.getItem("partnerToken"));
//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

 
//   const handleSubmit = async (e) => {
//   e.preventDefault();

//   try {
//     // 🔐 Admin / Manager login (same endpoint)
//     const res = await fetch(`${BASE_URL}/api/auth/login`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(form),
//     });

//     if (res.ok) {
//       const data = await res.json();

//       // ✅ store unified auth
//       localStorage.setItem("token", data.token);
//       localStorage.setItem("user", JSON.stringify(data.user));

//       const role = data.user.role;

//       if (role === "admin") {
//         navigate("/", { replace: true });
//       } else if (role === "manager") {
//         navigate("/manager-dashboard", { replace: true });
//       }

//       return;
//     }

//     // 🔐 Partner login (separate system)
//     const partnerRes = await fetch(
//       "https://tripkiya-backend.onrender.com/api/partner/login",
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       }
//     );

//     const partnerData = await partnerRes.json();

//     if (partnerRes.ok) {
//       localStorage.setItem("partnerToken", partnerData.token);
//       localStorage.setItem("partnerInfo", JSON.stringify(partnerData.partner));
//       localStorage.setItem("role", "partner");

//       navigate("/partner-dashboard", { replace: true });
//       return;
//     }t

//     alert("Invalid email or password");
//   } catch (error) {
//     alert("Something went wrong");
//   }
// };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 p-4">
      
//       <div className="w-full max-w-md backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-8 animate-fade-in">

//         <h2 className="text-3xl font-bold text-center text-white mb-6">
//           Login
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-5">
//           {/* Email */}
//           <div>
//             <label className="block mb-1 text-white font-medium">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={form.email}
//               onChange={handleChange}
//               className="w-full p-3 bg-white/20 text-white placeholder-gray-300 border border-white/30 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none transition"
//               placeholder="Enter your email"
//             />
//           </div>

//           {/* Password */}
//           <div>
//             <label className="block mb-1 text-white font-medium">Password</label>
//             <input
//               type="password"
//               name="password"
//               value={form.password}
//               onChange={handleChange}
//               className="w-full p-3 bg-white/20 text-white placeholder-gray-300 border border-white/30 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none transition"
//               placeholder="Enter your password"
//             />
//           </div>

//           {/* Login Button */}
//           <button
//             type="submit"
//             className="w-full py-3 rounded-xl text-lg font-semibold bg-blue-600 hover:bg-blue-700 transition text-white shadow-lg hover:shadow-blue-500/30"
//           >
//             Login
//           </button>
//         </form>

//         {/* Footer */}
//         <p className="text-center text-gray-300 mt-6">
//           Partner?{" "}
//           <a href="/partner/signup" className="text-blue-400 hover:text-blue-300 underline">
//             Create an account
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/base_url";

export default function Login() {
  const navigate = useNavigate();

  const selectedRole = localStorage.getItem("selectedRole");

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔒 If role not selected, send back
  useEffect(() => {
    if (!selectedRole) {
      navigate("/", { replace: true });
    }
  }, [selectedRole, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // ===============================
      // 🔐 ADMIN / MANAGER LOGIN
      // ===============================
      if (selectedRole === "admin" || selectedRole === "manager") {
        const res = await fetch(`${BASE_URL}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.message || "Invalid credentials");
          setLoading(false);
          return;
        }

        // 🚫 Role mismatch protection
        if (data.user.role !== selectedRole) {
          setError(`You are not authorized as ${selectedRole}`);
          setLoading(false);
          return;
        }

        // ✅ Store auth
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("role", data.user.role);

        // ✅ Redirect
        navigate(
          data.user.role === "admin"
            ? "/dashboard"
            : "/manager-dashboard",
          { replace: true }
        );

        return;
      }

      // ===============================
      // 🔐 PARTNER LOGIN
      // ===============================
      if (selectedRole === "partner") {
        const res = await fetch(
          "https://tripkiya-backend.onrender.com/api/partner/login",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
          }
        );

        const data = await res.json();

        if (!res.ok) {
          setError(data.message || "Invalid partner credentials");
          setLoading(false);
          return;
        }

        localStorage.setItem("partnerToken", data.token);
        localStorage.setItem("partnerInfo", JSON.stringify(data.partner));
        localStorage.setItem("role", "partner");

        navigate("/partner-dashboard", { replace: true });
        return;
      }
    } catch (err) {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 p-4">
      <div className="w-full max-w-md backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-8">

        <h2 className="text-3xl font-bold text-center text-white mb-2">
          {selectedRole?.toUpperCase()} Login
        </h2>

        <p className="text-center text-gray-300 mb-6 text-sm">
          Login as {selectedRole}
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block mb-1 text-white font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full p-3 bg-white/20 text-white placeholder-gray-300 border border-white/30 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Enter your email"
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
              required
              className="w-full p-3 bg-white/20 text-white placeholder-gray-300 border border-white/30 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Enter your password"
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl text-lg font-semibold bg-blue-600 hover:bg-blue-700 transition text-white disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Partner Signup */}
        {selectedRole === "partner" && (
          <p className="text-center text-gray-300 mt-6">
            New Partner?{" "}
            <a
              href="/partner/signup"
              className="text-blue-400 hover:text-blue-300 underline"
            >
              Create an account
            </a>
          </p>
        )}
      </div>
    </div>
  );
}
