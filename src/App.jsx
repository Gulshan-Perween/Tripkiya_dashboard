// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Sidebar from './components/Sidebar';
// import Navbar from './components/Navbar';

// // Pages
// import Dashboard from './pages/Dashboard';
// import CreatePackage from './pages/CreatePackage';
// import AllPackage from './pages/AllPackage';
// import Bookings from './pages/Bookings';
// import Users from './pages/Users';
// import Analytics from './pages/Analytics';
// import AddPackageDetails from './pages/AddPackageDetails';
// import PartnerDashboard from './pages/Partner_Dashboard';
// import PartnerSignup from './pages/SignUp';
// import PartnerLogin from './pages/Login';
// import PartnerCreatePackage from './pages/PartnerCreatePackage';
// function App() {
//   return (
//     <Router>
//       <div className="flex min-h-screen bg-[#181818]">
//         {/* Sidebar */}
//         <Sidebar />

//         {/* Main Content */}
//         <div className="flex-1 flex flex-col">
//           <Navbar />

//           <main className="flex-1 p-8 overflow-y-auto">
//             <Routes>
//               {/* Dashboard */}
//               <Route path="/" element={<Dashboard />} />

//               {/* Packages */}
//               <Route path="/create" element={<CreatePackage />} />
//               <Route path="/packages" element={<AllPackage />} />

//               {/* Bookings */}
//               <Route path="/bookings" element={<Bookings />} />

//               {/* Users */}
//               <Route path="/users" element={<Users />} />


//               {/* Analytics */}
//               <Route path="/analytics" element={<Analytics />} />

//               {/* Add Package Details */} 
//               <Route path="/add-package-details" element={<AddPackageDetails />} />   

//               {/* Partner Dashboard */}
//               <Route path="/partner-dashboard" element={<PartnerDashboard />} />       
//                       <Route path="/partner/signup" element={<PartnerSignup />} />
//                       <Route path="/partner/login" element={<PartnerLogin />} />
// {/* Packages under dashboard */}
// <Route path="/dashboard/packages/new" element={<PartnerCreatePackage />} />


//             </Routes>
//           </main>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;



import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// Admin Components
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

// Partner Components
import PartnerSidebar from "./components/PartnerSidebar";
import PartnerNavbar from "./components/PartnerNavbar";

// Admin Pages
import Dashboard from "./pages/Dashboard";
import CreatePackage from "./pages/CreatePackage";
import AllPackage from "./pages/AllPackage";
import Bookings from "./pages/Bookings";
import Users from "./pages/Users";
import Analytics from "./pages/Analytics";
import AddPackageDetails from "./pages/AddPackageDetails";

// Partner Pages
import PartnerDashboard from "./pages/PartnerDashboard";
import PartnerSignup from "./pages/SignUp";
import PartnerLogin from "./pages/Login";
import PartnerCreatePackage from "./pages/PartnerCreatePackage";
import PartnerAllPackages from "./pages/PartnerAllPackages";
import PartnerProfile from "./pages/PartnerProfile";
import PartnerBookings from "./pages/PartnerBookings";

// -------- Layout Handler --------
function Layout() {
  const location = useLocation();

  // Routes that should NOT show any sidebar (login/signup)
  const hideAllLayout = ["/partner/signup", "/partner/login"];
  const isHidden = hideAllLayout.includes(location.pathname);

  // Partner dashboard routes
const isPartner =
  location.pathname.startsWith("/partner") ||
  location.pathname.startsWith("/partner-dashboard") ||
  location.pathname.startsWith("/dashboard");

  return (
    <div className="flex min-h-screen bg-[#181818]">
      {/* Sidebar */}
      {!isHidden && (
        isPartner ? <PartnerSidebar /> : <Sidebar />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        
        {/* Navbar */}
        {!isHidden && (
          isPartner ? <PartnerNavbar /> : <Navbar />
        )}

        <main className="flex-1 p-8 overflow-y-auto">
          <Routes>

            {/* ---------------- Admin Routes ---------------- */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/create" element={<CreatePackage />} />
            <Route path="/packages" element={<AllPackage />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/users" element={<Users />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/add-package-details" element={<AddPackageDetails />} />

            {/* ---------------- Partner Routes ---------------- */}
            <Route path="/partner-dashboard" element={<PartnerDashboard />} />
            <Route path="/partner/signup" element={<PartnerSignup />} />
            <Route path="/partner/login" element={<PartnerLogin />} />
            <Route path="/partner/profile" element={<PartnerProfile />} />

            
            {/* Partner Package Routes */}
            <Route path="/partner/packages/new" element={<PartnerCreatePackage />} />
            <Route path="/dashboard/packages" element={<PartnerAllPackages />} />
            <Route path="/partner/bookings" element={<PartnerBookings />} />


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
