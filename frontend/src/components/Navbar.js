import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
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
      }}
    >

      <Link to="/dashboard" style={{ color: "white" }}>Dashboard</Link>
      <Link to="/service" style={{ color: "white" }}>Request Service</Link>
      <Link to="/myrequests" style={{ color: "white" }}>My Requests</Link>
      <Link to="/mechanic" style={{ color: "white" }}>Mechanic</Link>

      <button
        onClick={logout}
        style={{
          marginLeft: "auto",
          backgroundColor: "var(--smart-blue)",
          color: "white",
          border: "none",
          padding: "5px 10px",
          borderRadius: "5px",
        }}
      >
        Logout
      </button>

    </div>
  );
}

export default Navbar;