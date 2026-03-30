import React from "react";
import { useNavigate } from "react-router-dom";

const vehicleOptions = [
  {
    title: "Car",
    description: "Emergency mechanics, EV support, tyre help, detailing, and SOS dispatch.",
    accent: "linear-gradient(135deg, #1f6f63, #2d9687)",
    icon: "C",
    cta: "Open Car Services",
    path: "/dashboard",
  },
  {
    title: "Bike",
    description: "Fast bike breakdown support, tire and tube service, fuel help, and home pickup care.",
    accent: "linear-gradient(135deg, #d46a3a, #c35241)",
    icon: "B",
    cta: "Open Bike Services",
    path: "/bike-dashboard",
  },
];

function HomeDashboardV2() {
  const navigate = useNavigate();

  return (
    <main className="page-shell app-grid">
      <section className="hero-card" style={{ padding: "36px" }}>
        <span className="eyebrow">Vehicle Selection</span>
        <h1 className="section-title">Choose your vehicle</h1>
        <p className="section-copy" style={{ maxWidth: "720px" }}>
          Pick a vehicle to continue.
        </p>
      </section>

      <section className="dashboard-grid">
        {vehicleOptions.map((option) => (
          <article
            key={option.title}
            className="feature-card"
            onClick={() => navigate(option.path)}
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                navigate(option.path);
              }
            }}
          >
            <div className="feature-icon" style={{ background: option.accent }}>
              {option.icon}
            </div>
            <h2 className="feature-title">{option.title}</h2>
            <p className="feature-copy">{option.description}</p>
            <div className="feature-meta">
              <span>{option.cta}</span>
              <span className="feature-tag">Live booking</span>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

export default HomeDashboardV2;
