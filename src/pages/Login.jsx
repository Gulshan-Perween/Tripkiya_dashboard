// import { useState } from "react";

// export default function PartnerLogin() {
//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await fetch("https://tripkiya-backend.onrender.com/api/partner/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         localStorage.setItem("partnerToken", data.token);
//         localStorage.setItem("partnerInfo", JSON.stringify(data.partner));
//         alert("Login successful!");
//         window.location.href = "/partner-dashboard";
//       } else {
//         alert(data.message || "Login failed");
//       }
//     } catch (error) {
//       console.error(error);
//       alert("Something went wrong");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 p-4">
      
//       {/* Glassmorphism Card */}
//       <div className="w-full max-w-md backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-8 animate-fade-in">
        
//         {/* Heading */}
//         <h2 className="text-3xl font-bold text-center text-white mb-6">
//           Partner Login
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
//           Don’t have an account?{" "}
//           <a href="/partner/signup" className="text-blue-400 hover:text-blue-300 underline">
//             Register now
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
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

    // -----------------------------------
    // 1️⃣ Try Admin Login First
    // -----------------------------------
    try {
      const adminRes = await fetch(
        "http://localhost:3000/api/admin/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      if (adminRes.ok) {
        const data = await adminRes.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", "admin");

        alert("Admin Login Successful!");
      navigate("/admin-dashboard", { replace: true });
        return;
      }
    } catch (err) {
      console.log("Admin login failed (normal)");
    }

    // -----------------------------------
    // 2️⃣ Try Partner Login
    // -----------------------------------
    try {
      const res = await fetch(
        "https://tripkiya-backend.onrender.com/api/partner/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("partnerToken", data.token);
        localStorage.setItem("partnerInfo", JSON.stringify(data.partner));
        localStorage.setItem("role", "partner");

        alert("Partner Login Successful!");
        window.location.href = "/partner-dashboard";
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
          Login
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
              className="w-full p-3 bg-white/20 text-white placeholder-gray-300 border border-white/30 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none transition"
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
              className="w-full p-3 bg-white/20 text-white placeholder-gray-300 border border-white/30 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none transition"
              placeholder="Enter your password"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl text-lg font-semibold bg-blue-600 hover:bg-blue-700 transition text-white shadow-lg hover:shadow-blue-500/30"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-300 mt-6">
          Partner?{" "}
          <a href="/partner/signup" className="text-blue-400 hover:text-blue-300 underline">
            Create an account
          </a>
        </p>
      </div>
    </div>
  );
}
