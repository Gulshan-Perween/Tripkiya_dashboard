


import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ allowedRoles, children }) {
  const location = useLocation();

  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const partnerToken = localStorage.getItem("partnerToken");

  // 🔴 NOT LOGGED IN
  if (
    !role ||
    (role === "partner" && !partnerToken) ||
    (role !== "partner" && !token)
  ) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // 🚫 ROLE NOT ALLOWED
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // ✅ ACCESS GRANTED
  return children;
}
