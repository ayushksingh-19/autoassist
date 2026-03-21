import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import VehicleSelection from "./pages/VehicleSelection";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ServiceRequest from "./pages/ServiceRequest";
import MechanicDashboard from "./pages/MechanicDashboard";
import MyRequests from "./pages/MyRequests";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import MapComponent from "./components/MapComponent";
import FuelSelection from "./pages/FuelSelection";


function Layout() {

  const location = useLocation();
  
  // ❌ Hide Navbar on login & register
  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/map" element={<MapComponent />} />
        <Route path="/vehicle" element={<VehicleSelection />} />
        <Route path="/fuel" element={<FuelSelection />} />
        
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/service"
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
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;