import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import VehicleSelectionV2 from "./pages/VehicleSelectionV2";
import RegisterScreen from "./pages/RegisterScreen";
import LoginScreen from "./pages/LoginScreen";
import ServiceRequestV2 from "./pages/ServiceRequestV2";
import MechanicDashboard from "./pages/MechanicDashboard";
import MyRequestsV2 from "./pages/MyRequestsV2";
import AppNavbar from "./components/AppNavbar";
import ProtectedRoute from "./components/ProtectedRoute";
import FuelSelection from "./pages/FuelSelection";
import ProfileV2 from "./pages/ProfileV2";
import EditProfileV2 from "./pages/EditProfileV2";
import ChangePassword from "./pages/ChangePassword";
import BikeDashboardV2 from "./pages/BikeDashboardV2";
import CarDashboardV2 from "./pages/CarDashboardV2";
import HomeDashboardV2 from "./pages/HomeDashboardV2";
import ServicePageV2 from "./pages/ServicePageV2";
import MapPage from "./pages/MapPage";
import ActiveRequestsV2 from "./pages/ActiveRequestsV2";
import TyreServicePage from "./pages/TyreServicePage";
import "leaflet/dist/leaflet.css";
import WalletV2 from "./pages/WalletV2";

// 🔥 Layout FIXED
function Layout({ children }) {
  const location = useLocation();

  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/";

  return (
    <div className="app-shell">
      {!hideNavbar && <AppNavbar />}
      {children}
    </div>
  );
}


// 🔥 App FIXED
function App() {
  return (
    <Router>
      <Layout>
        <Routes>

          {/* AUTH */}
          <Route path="/" element={<LoginScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
  <Route path="/wallet" element={<WalletV2 />} />
          {/* HOME */}
          <Route path="/home" element={<HomeDashboardV2 />} />

          {/* DASHBOARDS */}
          <Route path="/dashboard" element={<CarDashboardV2 />} />
          <Route path="/bike-dashboard" element={<BikeDashboardV2 />} />

          {/* SERVICES */}
          <Route path="/service" element={<ServicePageV2 />} />
          <Route path="/tyre-service" element={<TyreServicePage />} />

          {/* MAP */}
          <Route path="/map" element={<MapPage />} />

          {/* USER */}
          <Route path="/vehicle" element={<VehicleSelectionV2 />} />
          <Route path="/fuel" element={<FuelSelection />} />
          <Route path="/profile" element={<ProfileV2 />} />
          <Route path="/edit-profile" element={<EditProfileV2 />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/active" element={<ActiveRequestsV2 />} />

          {/* PROTECTED */}
          <Route
            path="/service-request"
            element={
              <ProtectedRoute>
                <ServiceRequestV2 />
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
                <MyRequestsV2 />
              </ProtectedRoute>
            }
          />

        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
