import React from "react";
import { useNavigate } from "react-router-dom";

function HomeDashboard() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "20px" }}>
      <h1>🚗 AutoAssist Dashboard</h1>

      {/* CAR SECTION */}
      <div style={{ marginTop: "20px" }}>
        <h2>🚗 Car Services</h2>
        <button onClick={() => navigate("/dashboard")}>
          Explore Car Services
        </button>
      </div>

      {/* BIKE SECTION */}
      <div style={{ marginTop: "20px" }}>
        <h2>🏍️ Bike Services</h2>
        <button onClick={() => navigate("/bike-dashboard")}>
          Explore Bike Services
        </button>
      </div>

      {/* COMMON SERVICES */}
      <div style={{ marginTop: "20px" }}>
        <h2>⚡ Common Services</h2>

        <div
          onClick={() =>
            navigate("/service", {
              state: { serviceType: "fuel", vehicleType: "common" }
            })
          }
          style={{ cursor: "pointer" }}
        >
          ⛽ Fuel Delivery
        </div>

        <div
          onClick={() =>
            navigate("/service", {
              state: { serviceType: "ev", vehicleType: "common" }
            })
          }
          style={{ cursor: "pointer" }}
        >
          ⚡ EV Charging
        </div>
      </div>
    </div>
  );
}

export default HomeDashboard;