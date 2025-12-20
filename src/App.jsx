import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

// Admin Components
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

// Partner Components
import PartnerSidebar from "./components/PartnerSidebar";
import PartnerNavbar from "./components/PartnerNavbar";

// Admin Pages
import Dashboard from "./pages/Dashboard";
import ManagerDashboard from "./pages/ManagerDashboard";
import RoleSelect from "./pages/RoleSelect";

import CreatePackage from "./pages/CreatePackage";
import AllPackage from "./pages/AllPackage";
import Bookings from "./pages/Bookings";
import Users from "./pages/Users";
import AddPackageDetails from "./pages/AddPackageDetails";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";

// Partner Pages
import PartnerDashboard from "./pages/PartnerDashboard";
import PartnerSignup from "./pages/SignUp";
import PartnerLogin from "./pages/Login";
import PartnerCreatePackage from "./pages/PartnerCreatePackage";
import PartnerAllPackages from "./pages/PartnerAllPackages";
import PartnerProfile from "./pages/PartnerProfile";
import PartnerBookings from "./pages/PartnerBookings";
import CreateManager from "./pages/CreateManager";


function Layout() {
  const location = useLocation();
  const role = localStorage.getItem("role");

  // 🔒 Auth pages (NO sidebar / navbar)
  const authRoutes = ["/", "/partner/login", "/partner/signup"];
  const isAuthPage = authRoutes.includes(location.pathname);

  const isPartner = role === "partner";

  return (
    <div className="flex min-h-screen bg-[#181818]">
      {/* Sidebar */}
      {!isAuthPage && (isPartner ? <PartnerSidebar /> : <Sidebar />)}

      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        {!isAuthPage && (isPartner ? <PartnerNavbar /> : <Navbar />)}

        <main className={isAuthPage ? "" : "flex-1 p-8 overflow-y-auto"}>
          <Routes>
            {/* ---------- AUTH ---------- */}
            <Route path="/" element={<RoleSelect />} />
            <Route path="/partner/login" element={<Login />} />
            <Route path="/partner/signup" element={<PartnerSignup />} />

            {/* ---------- ADMIN ---------- */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/create"
              element={
                <ProtectedRoute allowedRoles={["admin", "manager"]}>
                  <CreatePackage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/packages"
              element={
                <ProtectedRoute allowedRoles={["admin", "manager"]}>
                  <AllPackage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/bookings"
              element={
                <ProtectedRoute allowedRoles={["admin", "manager"]}>
                  <Bookings />
                </ProtectedRoute>
              }
            />

            <Route
              path="/users"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <Users />
                </ProtectedRoute>
              }
            />

           

            <Route
              path="/add-package-details"
              element={
                <ProtectedRoute allowedRoles={["admin", "manager"]}>
                  <AddPackageDetails />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/create-manager"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <CreateManager />
                </ProtectedRoute>
              }
            />


            <Route
              path="/manager-dashboard"
              element={
                <ProtectedRoute allowedRoles={["manager"]}>
                  <ManagerDashboard />
                </ProtectedRoute>
              }
            />

         

              


            {/* ---------- PARTNER ---------- */}
            <Route
              path="/partner-dashboard"
              element={
                <ProtectedRoute allowedRoles={["partner"]}>
                  <PartnerDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/partner/profile"
              element={
                <ProtectedRoute allowedRoles={["partner"]}>
                  <PartnerProfile />
                </ProtectedRoute>
              }
            />

            <Route
              path="/partner/packages/new"
              element={
                <ProtectedRoute allowedRoles={["partner"]}>
                  <PartnerCreatePackage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/dashboard/packages"
              element={
                <ProtectedRoute allowedRoles={["partner"]}>
                  <PartnerAllPackages />
                </ProtectedRoute>
              }
            />

            <Route
              path="/partner/bookings"
              element={
                <ProtectedRoute allowedRoles={["partner"]}>
                  <PartnerBookings />
                </ProtectedRoute>
              }
            />




            <Route path="*" element={<RoleSelect />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

// Main App
export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}
