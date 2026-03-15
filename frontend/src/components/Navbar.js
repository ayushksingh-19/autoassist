import React from "react";
import { Link } from "react-router-dom";

function Navbar() {

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div style={{ padding: "10px", background: "#eee" }}>

      <Link to="/dashboard" style={{ marginRight: "10px" }}>Dashboard</Link>

      <Link to="/service" style={{ marginRight: "10px" }}>Request Service</Link>

      <Link to="/myrequests" style={{ marginRight: "10px" }}>My Requests</Link>

      <Link to="/mechanic" style={{ marginRight: "10px" }}>Mechanic</Link>

      {!token && (
        <>
          <Link to="/login" style={{ marginRight: "10px" }}>Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}

      {token && (
        <button onClick={handleLogout} style={{ marginLeft: "10px" }}>
          Logout
        </button>
      )}

    </div>
  );
}

export default Navbar;