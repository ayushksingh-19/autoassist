import React from "react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import L from "leaflet";

// Fix marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

function ActiveRequests() {
  const requests = JSON.parse(localStorage.getItem("requests")) || [];

  const userPos = [28.6139, 77.2090];
  const mechanicPos = [28.6200, 77.2200];

  return (
    <div style={{ padding: "30px", background: "#f8fafc", minHeight: "100vh" }}>
      
      <h2 style={{ fontWeight: "700", fontSize: "24px" }}>
        Active Service Requests
      </h2>

      <p style={{ color: "#64748b" }}>
        Track your ongoing service requests in real-time
      </p>

      {/* LOOP ALL REQUESTS */}
      {requests.map((req, i) => (
        <div key={i} style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
          
          {/* LEFT */}
          <div style={leftCard}>
            
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <h3>🚗 {req.service}</h3>
                <p style={{ color: "#64748b" }}>{req.vehicle}</p>
              </div>

              <span style={badge}>Mechanic assigned</span>
            </div>

            <div style={row}>
              <div>
                <p style={label}>Location</p>
                <p>{req.location}</p>
              </div>

              <div>
                <p style={label}>Requested</p>
                <p>{req.time}</p>
              </div>
            </div>

            <div>
              <p style={label}>Problem Description</p>
              <p>{req.problem}</p>
            </div>

            {/* MECHANIC CARD */}
            <div style={mechanicBox}>
              <h4>Mechanic Assigned</h4>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={avatar}>👤</div>

                  <div>
                    <p style={{ fontWeight: "bold" }}>Parth Verma</p>
                    <p style={{ fontSize: "13px", color: "#64748b" }}>
                      ⭐ 4.9 • ETA: 12 min
                    </p>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "10px" }}>
                  <button style={iconBtn}>📞</button>
                  <button style={iconBtn}>💬</button>
                </div>
              </div>

              <div style={{ marginTop: "10px", display: "flex", justifyContent: "space-between" }}>
                <p style={label}>Service Amount</p>
                <p style={{ color: "#2563eb", fontWeight: "bold" }}>
                  ₹{req.amount}
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div style={rightCard}>
            <h3>📍 Live Tracking</h3>

            <div style={{ height: "160px", borderRadius: "10px", overflow: "hidden" }}>
              <MapContainer center={userPos} zoom={13} style={{ height: "100%" }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={userPos} />
                <Marker position={mechanicPos} />
                <Polyline positions={[mechanicPos, userPos]} color="blue" />
              </MapContainer>
            </div>

            <div style={{ marginTop: "10px", display: "flex", justifyContent: "space-between" }}>
              <p>Parth Verma is on the way</p>
              <p style={{ color: "#2563eb" }}>8 min</p>
            </div>

            <div style={progressBar}>
              <div style={progressFill}></div>
            </div>

            <p style={{ fontSize: "12px", color: "#64748b" }}>
              30% complete
            </p>

            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <button style={activeBtn}>Started</button>
              <button style={inactiveBtn}>Nearby</button>
              <button style={inactiveBtn}>Arrived</button>
            </div>
          </div>
        </div>
      ))}

      {/* STATS */}
      <div style={statsCard}>
        <h3>Your Stats</h3>

        <div style={statsRow}>
          <span>Total Services</span>
          <span>12</span>
        </div>

        <div style={statsRow}>
          <span>Active Requests</span>
          <span>{requests.length}</span>
        </div>

        <div style={statsRow}>
          <span>Money Saved</span>
          <span style={{ color: "green" }}>₹248</span>
        </div>
      </div>
    </div>
  );
}
/* ================= STYLES ================= */

const leftCard = {
  flex: 2,
  background: "#fff",
  padding: "20px",
  borderRadius: "12px",
  borderLeft: "4px solid #2563eb",
};

const rightCard = {
  flex: 1,
  background: "#fff",
  padding: "20px",
  borderRadius: "12px",
};

const statsCard = {
  marginTop: "20px",
  background: "#fff",
  padding: "20px",
  borderRadius: "12px",
  width: "300px",
};

const statsRow = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "10px",
};

const row = {
  display: "flex",
  justifyContent: "space-between",
  margin: "15px 0",
};

const label = {
  fontSize: "13px",
  color: "#64748b",
};

const badge = {
  background: "#2563eb",
  color: "#fff",
  padding: "5px 10px",
  borderRadius: "10px",
  fontSize: "12px",
};

const mechanicBox = {
  marginTop: "15px",
  background: "#eef2ff",
  padding: "15px",
  borderRadius: "10px",
};

const avatar = {
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  background: "#2563eb",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
};

const iconBtn = {
  background: "#e5e7eb",
  border: "none",
  padding: "8px",
  borderRadius: "8px",
  cursor: "pointer",
};

const progressBar = {
  width: "100%",
  height: "8px",
  background: "#ddd",
  borderRadius: "5px",
  marginTop: "10px",
};

const progressFill = {
  width: "30%",
  height: "100%",
  background: "#2563eb",
};

const activeBtn = {
  background: "#bbf7d0",
  border: "none",
  padding: "6px 10px",
  borderRadius: "6px",
};

const inactiveBtn = {
  background: "#e5e7eb",
  border: "none",
  padding: "6px 10px",
  borderRadius: "6px",
};

/* ✅ VERY IMPORTANT FIX */
export default ActiveRequests;