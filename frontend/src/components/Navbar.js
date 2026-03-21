import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  // ❌ Hide navbar on login/register
  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div
      style={{
        backgroundColor: "var(--blue-slate)",
        padding: "12px",
        display: "flex",
        gap: "20px",
        color: "white",
        alignItems: "center",
      }}
    >
      {/* 👤 USER LINKS */}
      {role === "user" && (
        <>
          <Link to="/dashboard" style={{ color: "white" }}>Dashboard</Link>
          <Link to="/service" style={{ color: "white" }}>Request Service</Link>
          <Link to="/myrequests" style={{ color: "white" }}>My Requests</Link>
        </>
      )}

      {/* 🔧 MECHANIC LINKS */}
      {role === "mechanic" && (
        <>
          <Link to="/mechanic" style={{ color: "white" }}>Mechanic Dashboard</Link>
        </>
      )}

      {/* 🚪 LOGOUT */}
      <button
        onClick={logout}
        style={{
          marginLeft: "auto",
          backgroundColor: "var(--smart-blue)",
          color: "white",
          border: "none",
          padding: "6px 12px",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;