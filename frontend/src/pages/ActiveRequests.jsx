import React from "react";

function ActiveRequests() {
  return (
    <div style={{ padding: "30px", background: "#f8fafc", minHeight: "100vh" }}>
      
      <h2>Active Service Requests</h2>
      <p style={{ color: "#64748b" }}>
        Track your ongoing service requests in real-time
      </p>

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        
        {/* LEFT CARD */}
        <div style={card}>
          <h3>Emergency Mechanic</h3>
          <p style={{ color: "#64748b" }}>honda12345</p>

          <p><b>Location:</b> Jagat</p>
          <p><b>Requested:</b> 01:30 AM</p>

          <p><b>Problem:</b> hi</p>

          <div style={mechanicBox}>
            <h4>Mechanic Assigned</h4>
            <p><b>Mike Johnson</b></p>
            <p>⭐ 4.8 • ETA: 15 min</p>

            <p style={{ marginTop: "10px" }}>
              Service Amount: <b style={{ color: "#2563eb" }}>₹1500</b>
            </p>
          </div>
        </div>

        {/* RIGHT TRACKING */}
        <div style={card}>
          <h3>Live Tracking</h3>

          <div style={mapBox}>
            📍 Map Loading...
          </div>

          <p style={{ marginTop: "10px" }}>
            Mike Johnson is on the way
          </p>

          <div style={progressBar}>
            <div style={{ width: "30%", background: "#2563eb", height: "100%" }}></div>
          </div>

          <p style={{ fontSize: "12px" }}>30% complete</p>
        </div>
      </div>
    </div>
  );
}

/* STYLES */

const card = {
  flex: 1,
  background: "#fff",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
};

const mechanicBox = {
  marginTop: "15px",
  padding: "15px",
  background: "#eef2ff",
  borderRadius: "10px",
};

const mapBox = {
  height: "150px",
  background: "#e5e7eb",
  borderRadius: "10px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const progressBar = {
  width: "100%",
  height: "8px",
  background: "#ddd",
  borderRadius: "5px",
  marginTop: "10px",
};

export default ActiveRequests;