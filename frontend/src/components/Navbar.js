import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-full bg-white shadow-md px-8 py-4 flex justify-between items-center">

      {/* 🔷 LOGO */}
      <div
        onClick={() => navigate("/home")}
        className="text-xl font-bold text-blue-600 cursor-pointer tracking-wide"
      >
        AutoAssist
      </div>

      {/* 🔷 NAV BUTTONS */}
      <div className="flex gap-4">
         <button onClick={() => navigate("/dashboard")}>
         Car
      </button>
        <button onClick={() => navigate("/bike-dashboard", { state: { vehicleType: "bike" } })}>
         Bike
      </button>
        <button
          onClick={() => navigate("/dashboard")}
          className={`nav-btn ${isActive("/dashboard") ? "active" : ""}`}
        >
          Home
        </button>

        <button
          onClick={() => navigate("/myrequests")}
          className={`nav-btn ${isActive("/myrequests") ? "active" : ""}`}
        >
          My Bookings
        </button>

        <button
          onClick={() => navigate("/profile")}
          className="profile-btn"
        >
           Profile
        </button>

      </div>
    </div>
  );
}

export default Navbar;