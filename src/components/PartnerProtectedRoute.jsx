import { Navigate } from "react-router-dom";

export default function PartnerProtectedRoute({ children }) {
  const token = localStorage.getItem("partnerToken");
  const role = localStorage.getItem("role");

  if (!token || role !== "partner") {
    return <Navigate to="/partner/login" />;
  }

  return children;
}
