import React from "react";
import { useNavigate } from "react-router-dom";

function HomeDashboard() {
  const navigate = useNavigate();

  return (
    <div style={container}>
      
      <h2 style={title}>Select Your Vehicle</h2>
      <p style={subtitle}>
        Choose the vehicle you need assistance for
      </p>

      <div style={grid}>
        
        {/* CAR */}
        <div
          style={card}
          onClick={() => navigate("/dashboard")}
          onMouseEnter={(e) => hoverIn(e)}
          onMouseLeave={(e) => hoverOut(e)}
        >
          <div style={{ ...iconBox, background: "#3b82f6" }}>🚗</div>

          <h3 style={cardTitle}>Car</h3>
          <p style={desc}>Get assistance for your car</p>

          <ul style={list}>
            <li>Emergency mechanic service</li>
            <li>Tire replacement & repair</li>
            <li>Battery jump start</li>
            <li>Fuel delivery</li>
            <li>Towing service</li>
          </ul>
        </div>

        {/* BIKE */}
        <div
          style={card}
          onClick={() => navigate("/bike-dashboard")}
          onMouseEnter={(e) => hoverIn(e)}
          onMouseLeave={(e) => hoverOut(e)}
        >
          <div style={{ ...iconBox, background: "#f97316" }}>🏍️</div>

          <h3 style={cardTitle}>Bike / Motorcycle</h3>
          <p style={desc}>Get assistance for your bike</p>

          <ul style={list}>
            <li>Mobile mechanic service</li>
            <li>Tire & tube replacement</li>
            <li>Battery service</li>
            <li>Fuel delivery</li>
            <li>Chain & brake repair</li>
          </ul>
        </div>

      </div>
    </div>
  );
}

/* 🔥 STYLES */

const container = {
  minHeight: "100vh",
  background: "linear-gradient(135deg,#e0e7ff,#f8fafc)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

const title = {
  fontSize: "28px",
  fontWeight: "700",
};

const subtitle = {
  color: "#64748b",
  marginBottom: "40px",
};

const grid = {
  display: "flex",
  gap: "40px",
};

const card = {
  background: "rgba(255,255,255,0.8)",
  backdropFilter: "blur(12px)",
  padding: "30px",
  borderRadius: "18px",
  width: "300px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  cursor: "pointer",
  transition: "all 0.35s ease",
};

const cardTitle = {
  fontSize: "18px",
  fontWeight: "600",
  marginTop: "10px",
};

const iconBox = {
  width: "70px",
  height: "70px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "32px",
  color: "#fff",
  boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
};

const desc = {
  color: "#64748b",
  fontSize: "14px",
};

const list = {
  marginTop: "14px",
  fontSize: "13px",
  color: "#475569",
  lineHeight: "1.7",
};

/* 🔥 HOVER */

const hoverIn = (e) => {
  e.currentTarget.style.transform = "translateY(-12px) scale(1.05)";
  e.currentTarget.style.boxShadow =
    "0 25px 60px rgba(0,0,0,0.2)";
};

const hoverOut = (e) => {
  e.currentTarget.style.transform = "translateY(0)";
  e.currentTarget.style.boxShadow =
    "0 10px 30px rgba(0,0,0,0.08)";
};

export default HomeDashboard;