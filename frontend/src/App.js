import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import VehicleSelection from "./pages/VehicleSelection";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ServiceRequest from "./pages/ServiceRequest";
import MechanicDashboard from "./pages/MechanicDashboard";
import MyRequests from "./pages/MyRequests";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import FuelSelection from "./pages/FuelSelection";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import ChangePassword from "./pages/ChangePassword";
import BikeDashboard from "./pages/BikeDashboard";
import CarDashboard from "./pages/CarDashboard";
import HomeDashboard from "./pages/HomeDashboard";
import ServicePage from "./pages/ServicePage";
import MapPage from "./pages/MapPage";
import ActiveRequests from "./pages/ActiveRequests";
import TyreServicePage from "./pages/TyreServicePage";
import "leaflet/dist/leaflet.css";


// 🔥 Layout FIXED
function Layout({ children }) {
  const location = useLocation();

  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/";

  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
    </>
  );
}


// 🔥 App FIXED
function App() {
  return (
    <Router>
      <Layout>
        <Routes>

          {/* AUTH */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* HOME */}
          <Route path="/home" element={<HomeDashboard />} />

          {/* DASHBOARDS */}
          <Route path="/dashboard" element={<CarDashboard />} />
          <Route path="/bike-dashboard" element={<BikeDashboard />} />

          {/* SERVICES */}
          <Route path="/service" element={<ServicePage />} />
          <Route path="/tyre-service" element={<TyreServicePage />} />

          {/* MAP */}
          <Route path="/map" element={<MapPage />} />

          {/* USER */}
          <Route path="/vehicle" element={<VehicleSelection />} />
          <Route path="/fuel" element={<FuelSelection />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/active" element={<ActiveRequests />} />

          {/* PROTECTED */}
          <Route
            path="/service-request"
            element={
              <ProtectedRoute>
                <ServiceRequest />
              </ProtectedRoute>
            }
          />

          <Route
            path="/mechanic"
            element={
              <ProtectedRoute>
                <MechanicDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/myrequests"
            element={
              <ProtectedRoute>
                <MyRequests />
              </ProtectedRoute>
            }
          />

        </Routes>
      </Layout>
    </Router>
  );
}

export default App;