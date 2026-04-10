import {
  BrowserRouter as Router,
  Navigate,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";

import VehicleSelectionV2 from "./pages/VehicleSelectionV2";
import RegisterScreen from "./pages/RegisterScreen";
import LoginScreen from "./pages/LoginScreen";
import ServiceRequestV2 from "./pages/ServiceRequestV2";
import MyRequestsV2 from "./pages/MyRequestsV2";
import AppNavbar from "./components/AppNavbar";
import ScrollReveal from "./components/ScrollReveal";
import ProtectedRoute from "./components/ProtectedRoute";
import FuelSelectionV2 from "./pages/FuelSelectionV2";
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
import VehicleHealthMonitorV2 from "./pages/VehicleHealthMonitorV2";
import ExplorePage from "./pages/ExplorePage";
import PremiumPackagesPage from "./pages/PremiumPackagesPage";
import FloatingCallButton from "./components/FloatingCallButton";
import EmergencyCallPage from "./pages/EmergencyCallPage";

function GlobalBackButton() {
  const navigate = useNavigate();
  const location = useLocation();

  const hideBackButton =
    location.pathname === "/" ||
    location.pathname === "/explore" ||
    location.pathname === "/login" ||
    location.pathname === "/register";

  if (hideBackButton) {
    return null;
  }

  return (
    <div className="global-back-wrap">
      <button
        type="button"
        className="secondary-btn global-back-btn"
        onClick={() => navigate(-1)}
      >
        Back
      </button>
    </div>
  );
}

function Layout({ children }) {
  const location = useLocation();

  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/" ||
    location.pathname === "/explore";

  return (
    <div className="app-shell">
      <ScrollReveal />
      {!hideNavbar && <AppNavbar />}
      <GlobalBackButton />
      {children}
      <FloatingCallButton />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<ExplorePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/wallet" element={<WalletV2 />} />

          <Route path="/home" element={<HomeDashboardV2 />} />
          <Route path="/dashboard" element={<CarDashboardV2 />} />
          <Route path="/bike-dashboard" element={<BikeDashboardV2 />} />

          <Route path="/service" element={<ServicePageV2 />} />
          <Route path="/tyre-service" element={<TyreServicePage />} />
          <Route path="/map" element={<MapPage />} />

          <Route path="/vehicle" element={<VehicleSelectionV2 />} />
          <Route path="/fuel" element={<FuelSelectionV2 />} />
          <Route path="/profile" element={<ProfileV2 />} />
          <Route path="/edit-profile" element={<EditProfileV2 />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/active" element={<ActiveRequestsV2 />} />
          <Route path="/vehicle-health" element={<VehicleHealthMonitorV2 />} />
          <Route path="/packages" element={<PremiumPackagesPage />} />
          <Route path="/emergency-call" element={<EmergencyCallPage />} />

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
                <Navigate to="/active" replace />
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
