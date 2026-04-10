import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BrandLogo from "./BrandLogo";

const navItems = [
  { label: "Home", path: "/home" },
  {
    label: "Vehicle Health",
    path: "/vehicle-health",
  },
  { label: "Packages", path: "/packages" },
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
      <nav className="app-navbar">
        <div className="app-navbar-inner">
          <button
            type="button"
            onClick={() => navigate("/home")}
            className="app-navbar-logo"
          >
            <BrandLogo size="sm" />
          </button>

          <div className="app-navbar-links">
            {navItems.map((item) => (
              <button
                key={item.path}
                type="button"
                onClick={() => navigate(item.path, item.state ? { state: item.state } : undefined)}
                className={`app-navbar-link ${isActive(item.path) ? "active" : ""}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="app-navbar-actions">
            <button
              type="button"
              className="app-navbar-action secondary"
              onClick={() => navigate("/home")}
            >
              Switch Vehicle
            </button>
            <button
              type="button"
              className="app-navbar-action primary"
              onClick={logout}
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
