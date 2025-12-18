import { Navigate, useLocation } from "react-router-dom";

/**
 * Role-based protected route
 * @param {Array} allowedRoles - roles allowed to access this route
 */
export default function ProtectedRoute({ allowedRoles, children }) {
  const location = useLocation();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // 🔐 Not logged in
  if (!token || !user) {
    return <Navigate to="/partner/login" state={{ from: location }} replace />;
  }

  // 🚫 Role not allowed
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // ✅ Access granted
  return children;
}
