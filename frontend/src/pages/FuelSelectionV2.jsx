import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const fuelOptions = [
  {
    title: "Petrol",
    description: "Choose petrol delivery and continue with nearby fuel pump support.",
    fuelType: "Petrol",
  },
  {
    title: "Diesel",
    description: "Choose diesel delivery and continue with nearby fuel pump support.",
    fuelType: "Diesel",
  },
];

function FuelSelectionV2() {
  const navigate = useNavigate();
  const location = useLocation();
  const vehicleType = location.state?.vehicleType || "Car";
  const visibleFuelOptions =
    vehicleType === "Bike"
      ? fuelOptions.filter((option) => option.fuelType === "Petrol")
      : fuelOptions;

  const openNearbyFuelPumps = () => {
    window.open(
      "https://www.google.com/maps/search/fuel+pump+near+me",
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <main className="page-shell app-grid">
      <section className="hero-card" style={{ padding: "32px" }}>
        <span className="eyebrow">Fuel Delivery</span>
        <h1 className="section-title">Choose your fuel type</h1>
        <p className="section-copy">Continue with fuel delivery or check nearby fuel pumps first.</p>

        <div
          style={{
            marginTop: "20px",
            padding: "16px",
            borderRadius: "16px",
            border: "1px solid var(--line)",
            background: "rgba(255, 255, 255, 0.68)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "12px",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <div>
              <h3 style={{ margin: "0 0 6px" }}>Nearby help</h3>
              <p className="section-copy">Open nearby fuel pumps in Google Maps.</p>
              <p style={{ margin: "8px 0 0", color: "var(--muted)", fontSize: "0.92rem" }}>
                Google Maps: fuel pump near me
              </p>
            </div>

            <button type="button" className="secondary-btn" onClick={openNearbyFuelPumps}>
              Fuel Pump Near Me
            </button>
          </div>
        </div>
      </section>

      <section className="dashboard-grid">
        {visibleFuelOptions.map((option) => (
          <article
            key={option.title}
            className="feature-card"
            onClick={() =>
              navigate("/service", {
                state: {
                  serviceType: "Fuel Delivery",
                  serviceLabel: "Fuel Delivery",
                  fuelType: option.fuelType,
                  vehicleType,
                },
              })
            }
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                navigate("/service", {
                  state: {
                    serviceType: "Fuel Delivery",
                    serviceLabel: "Fuel Delivery",
                    fuelType: option.fuelType,
                    vehicleType,
                  },
                });
              }
            }}
          >
            <div className="feature-icon">
              {option.title[0]}
            </div>
            <h2 className="feature-title">{option.title}</h2>
            <p className="feature-copy">{option.description}</p>
            <div className="feature-meta">
              <span>Continue</span>
              <span className="feature-tag">Fuel delivery</span>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

export default FuelSelectionV2;
