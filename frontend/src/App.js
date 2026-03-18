import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ServiceRequest from "./pages/ServiceRequest";
import MechanicDashboard from "./pages/MechanicDashboard";
import MyRequests from "./pages/MyRequests";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

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