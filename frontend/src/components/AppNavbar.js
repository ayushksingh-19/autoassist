import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BrandLogo from "./BrandLogo";

const navItems = [
  { label: "Home", path: "/home" },
  { label: "Live Requests", path: "/active" },
  { label: "My Requests", path: "/myrequests" },
  { label: "Wallet", path: "/wallet" },
  { label: "Profile", path: "/profile" },
];

function AppNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          backdropFilter: "blur(18px)",
          borderBottom: "1px solid rgba(19, 42, 36, 0.08)",
          background: "rgba(244, 239, 230, 0.82)",
        }}
      >
        <div
          style={{
            width: "min(1180px, calc(100% - 32px))",
            margin: "0 auto",
            padding: "16px 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          <button
            type="button"
            onClick={() => navigate("/home")}
            style={{
              border: "none",
              background: "transparent",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              padding: 0,
              textAlign: "left",
            }}
          >
            <BrandLogo size="sm" />
          </button>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            {navItems.map((item) => (
              <button
                key={item.path}
                type="button"
                onClick={() => navigate(item.path)}
                style={{
                  border: "1px solid",
                  borderColor: isActive(item.path)
                    ? "rgba(212, 106, 58, 0.28)"
                    : "rgba(19, 42, 36, 0.08)",
                  background: isActive(item.path)
                    ? "rgba(212, 106, 58, 0.12)"
                    : "rgba(255, 251, 245, 0.65)",
                  color: isActive(item.path) ? "var(--accent-strong)" : "var(--muted)",
                  padding: "10px 14px",
                  borderRadius: "999px",
                  cursor: "pointer",
                  fontWeight: 700,
                }}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <button
              type="button"
              className="secondary-btn"
              onClick={() => navigate("/home")}
              style={{ padding: "12px 16px" }}
            >
              Switch Vehicle
            </button>
            <button
              type="button"
              className="primary-btn"
              onClick={logout}
              style={{ padding: "12px 16px" }}
            >
              Log Out
            </button>
          </div>
        </div>
      </nav>
      <div className="topbar-spacer" />
    </>
  );
}

export default AppNavbar;
