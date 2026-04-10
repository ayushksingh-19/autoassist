import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function VehicleSelectionV2() {
  const navigate = useNavigate();
  const location = useLocation();
  const serviceType = location.state?.serviceType || "Mechanic";

  return (
    <main className="page-shell app-grid">
      <section className="hero-card" style={{ padding: "32px" }}>
        <span className="eyebrow">Vehicle Selection</span>
        <h1 className="section-title">Continue this request as a car service.</h1>
        <p className="section-copy" style={{ maxWidth: "680px" }}>
          The bike option is removed here so this screen stays aligned with the car flow from your
          dashboard.
        </p>
      </section>

      <section className="surface-card" style={{ padding: "28px" }}>
        <button
          type="button"
          onClick={() =>
            navigate("/service", {
              state: {
                vehicleType: "Car",
                serviceType,
              },
            })
          }
          className="feature-card"
          style={{
            width: "100%",
            textAlign: "left",
            cursor: "pointer",
            background: "linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(244, 248, 255, 0.96))",
          }}
        >
          <div className="feature-icon">
            C
          </div>
          <h2 className="feature-title">Car</h2>
          <p className="feature-copy">
            Continue with {serviceType} for your car using the updated booking flow.
          </p>
          <div className="feature-meta">
            <span>Proceed to service setup</span>
            <span className="feature-tag">Car only</span>
          </div>
        </button>
      </section>
    </main>
  );
}

export default VehicleSelectionV2;
