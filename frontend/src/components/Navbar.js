import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <div style={navContainer}>
      
      {/* LEFT */}
      <div style={left}>
        <div
          style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}
          onClick={() => navigate("/home")}
        >
         

          <div>
            <h3 style={logoText}>AutoAssist</h3>
          </div>
        </div>
      </div> {/* ✅ FIX: properly closed LEFT */}

      {/* CENTER */}
      <div style={center}>
        <button style={activeBtn} onClick={() => navigate("/active")}>
          Active Requests
        </button>

        <button style={navBtn}>Wallet</button>
        <button style={navBtn}>Profile</button>
      </div>

      {/* RIGHT */}
      <div style={right}>
        <span style={notification}>3</span>

        <button style={switchBtn}>Switch Vehicle</button>

        <button style={logoutBtn}>↗</button>
      </div>
    </div>
  );
}

const navContainer = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "12px 25px",
  background: "#fff",
  borderBottom: "1px solid #e5e7eb",
};

const left = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
};

const logoBox = {
  width: "40px",
  height: "40px",
  background: "#2563eb",
  borderRadius: "10px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
  fontSize: "18px",
};

const logoText = {
  margin: 0,
  fontSize: "18px",
};

const center = {
  display: "flex",
  gap: "15px",
};

const navBtn = {
  background: "transparent",
  border: "none",
  cursor: "pointer",
  color: "#374151",
};

const activeBtn = {
  background: "#111827",
  color: "#fff",
  border: "none",
  padding: "6px 12px",
  borderRadius: "8px",
  cursor: "pointer",
};

const right = {
  display: "flex",
  alignItems: "center",
  gap: "15px",
};

const notification = {
  background: "#111827",
  color: "#fff",
  borderRadius: "50%",
  padding: "4px 8px",
  fontSize: "12px",
};

const switchBtn = {
  border: "1px solid #e5e7eb",
  padding: "6px 12px",
  borderRadius: "8px",
  background: "#fff",
  cursor: "pointer",
};

const logoutBtn = {
  border: "none",
  background: "#f3f4f6",
  padding: "6px 10px",
  borderRadius: "8px",
  cursor: "pointer",
};

export default Navbar;