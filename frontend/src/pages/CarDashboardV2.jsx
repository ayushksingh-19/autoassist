import React from "react";
import { useNavigate } from "react-router-dom";

const services = [
  {
    title: "Mechanic Help",
    desc: "Send a mechanic to your location for urgent breakdown support.",
    actionPath: "/service",
    state: { serviceType: "Mechanic", serviceLabel: "Mechanic Help", vehicleType: "Car" },
    tag: "Fast dispatch",
  },
  {
    title: "EV Charging",
    desc: "Request emergency charging support when your EV is stranded.",
    actionPath: "/service",
    state: { serviceType: "EV Charging", serviceLabel: "EV Charging", vehicleType: "Car" },
    tag: "EV ready",
  },
  {
    title: "Fuel Delivery",
    desc: "Get petrol or diesel delivered directly to your current stop.",
    actionPath: "/fuel",
    state: { vehicleType: "Car" },
    tag: "Popular",
  },
  {
    title: "Roadside Repair",
    desc: "Handle smaller on-road issues before they become towing jobs.",
    actionPath: "/service",
    state: { serviceType: "Roadside Repair", serviceLabel: "Roadside Repair", vehicleType: "Car" },
    tag: "On-site",
  },
  {
    title: "Washing & Cleaning",
    desc: "Book premium cleaning services without leaving your parking spot.",
    actionPath: "/service",
    state: {
      serviceType: "Washing & Cleaning",
      serviceLabel: "Washing & Cleaning",
      vehicleType: "Car",
    },
    tag: "Detail care",
  },
  {
    title: "Battery Jump Start",
    desc: "Request a quick jump start or battery diagnosis for no-start situations.",
    actionPath: "/service",
    state: {
      serviceType: "Mechanic",
      serviceLabel: "Battery Jump Start",
      vehicleType: "Car",
      presetProblem: "Battery Jump Start requested for discharged battery or ignition issue.",
    },
    tag: "Quick start",
  },
  {
    title: "Tyre Services",
    desc: "Puncture repair and replacement for urgent tyre trouble.",
    actionPath: "/service",
    state: { serviceType: "Tyre Services", serviceLabel: "Tyre Services", vehicleType: "Car" },
    tag: "Quick fix",
  },
  {
    title: "AC Check & Cooling",
    desc: "Book cooling inspection for weak AC, no airflow, or compressor issues.",
    actionPath: "/service",
    state: {
      serviceType: "Mechanic",
      serviceLabel: "AC Check & Cooling",
      vehicleType: "Car",
      presetProblem: "AC Check & Cooling requested for weak cooling, airflow, or compressor issue.",
    },
    tag: "Comfort",
  },
  {
    title: "Lockout Assistance",
    desc: "Get support when keys are locked inside or access is blocked.",
    actionPath: "/service",
    state: {
      serviceType: "SOS Emergency",
      serviceLabel: "Lockout Assistance",
      vehicleType: "Car",
      presetProblem: "Lockout Assistance requested for keys locked inside or access issue.",
    },
    tag: "Urgent",
  },
  {
    title: "Towing & Recovery",
    desc: "Escalate stranded vehicles to towing and workshop recovery support.",
    actionPath: "/service",
    state: {
      serviceType: "SOS Emergency",
      serviceLabel: "Towing & Recovery",
      vehicleType: "Car",
      presetProblem: "Towing & Recovery requested for stranded vehicle transport.",
    },
    tag: "Recovery",
  },
  {
    title: "Detailing",
    desc: "Choose a cosmetic care package with transparent pricing.",
    actionPath: "/service",
    state: { serviceType: "Detailing", serviceLabel: "Detailing", vehicleType: "Car" },
    tag: "Premium",
  },
  {
    title: "Health Check-Up",
    desc: "Book a broader preventive inspection before a trip or after a warning sign.",
    actionPath: "/service",
    state: {
      serviceType: "Mechanic",
      serviceLabel: "Health Check-Up",
      vehicleType: "Car",
      presetProblem: "Health Check-Up requested for preventive inspection and diagnostics.",
    },
    tag: "Preventive",
  },
  {
    title: "Engine Diagnostics",
    desc: "Request deeper diagnostics for engine noise, misfire, or dashboard alerts.",
    actionPath: "/service",
    state: {
      serviceType: "Mechanic",
      serviceLabel: "Engine Diagnostics",
      vehicleType: "Car",
      presetProblem: "Engine Diagnostics requested for warning light, engine noise, or performance issue.",
    },
    tag: "Diagnostic",
  },
  {
    title: "SOS Emergency",
    desc: "Escalated support flow for towing and accident situations.",
    actionPath: "/service",
    state: { serviceType: "SOS Emergency", serviceLabel: "SOS Emergency", vehicleType: "Car" },
    tag: "Priority",
  },
];

function CarDashboardV2() {
  const navigate = useNavigate();

  return (
    <main className="page-shell app-grid">
      <section className="hero-card" style={{ padding: "36px" }}>
        <span className="eyebrow">Car Support</span>
        <h1 className="section-title">Car services</h1>
        <p className="section-copy" style={{ maxWidth: "720px" }}>
          Choose a service to continue.
        </p>
      </section>

      <section className="dashboard-grid">
        {services.map((item, index) => (
          <article
            key={item.title}
            className="feature-card"
            onClick={() => navigate(item.actionPath, { state: item.state })}
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                navigate(item.actionPath, { state: item.state });
              }
            }}
          >
            <div className="feature-icon">
              {String(index + 1).padStart(2, "0")}
            </div>
            <h2 className="feature-title">{item.title}</h2>
            <p className="feature-copy">{item.desc}</p>
            <div className="feature-meta">
              <span>Book now</span>
              <span className="feature-tag">{item.tag}</span>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

export default CarDashboardV2;
