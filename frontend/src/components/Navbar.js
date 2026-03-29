import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  // 🔥 LOGOUT FUNCTION
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // 🔥 ACTIVE BUTTON LOGIC
  const isActive = (path) =>
    location.pathname === path ? activeBtn : navBtn;

  return (
    <div style={navContainer}>
      
      {/* LEFT */}
      <div style={left}>
        <div
          style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}
          onClick={() => navigate("/home")}
        >
          <div>
            {/* 🔵 BLUE + BOLD */}
            <h3 style={{ ...logoText, color: "#2563eb", fontWeight: "bold",fontSize:"25px" }}>
              AutoAssist
            </h3>
          </div>
        </div>
      </div>

      {/* CENTER */}
      <div style={center}>
        <button
          style={isActive("/active")}
          onClick={() => navigate("/active")}
        >
          Active Requests
        </button>

        <button
          style={isActive("/wallet")}
          onClick={() => navigate("/wallet")}
        >
          Wallet
        </button>

        <button
          style={isActive("/profile")}
          onClick={() => navigate("/profile")}
        >
          Profile
        </button>
      </div>

      {/* RIGHT */}
      <div style={right}>
        <span style={notification}>3</span>

        {/* 🔥 SWITCH VEHICLE → HOME */}
        <button
          style={switchBtn}
          onClick={() => navigate("/home")}
        >
          Switch Vehicle
        </button>

        {/* 🔥 LOGOUT */}
        <button style={logoutBtn} onClick={logout}>
          ↗
        </button>
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