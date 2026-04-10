import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function FloatingCallButton() {
  const navigate = useNavigate();
  const location = useLocation();
  const isCallPage = location.pathname === "/emergency-call";

  return (
    <button
      type="button"
      className={`floating-call-btn ${isCallPage ? "active" : ""}`}
      onClick={() => navigate("/emergency-call")}
      aria-label="Open emergency call support"
    >
      <span className="floating-call-pulse" />
      <span className="floating-call-icon">Call</span>
    </button>
  );
}

export default FloatingCallButton;
