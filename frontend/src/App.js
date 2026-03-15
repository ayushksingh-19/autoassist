import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ServiceRequest from "./pages/ServiceRequest";
import MechanicDashboard from "./pages/MechanicDashboard";
import MyRequests from "./pages/MyRequests";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  return (
    <Router>

      <Navbar />

      <Routes>

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

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

    </Router>
  );
}

export default App;