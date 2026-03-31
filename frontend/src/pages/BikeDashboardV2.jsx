import React from "react";
import { useNavigate } from "react-router-dom";

const bikeServices = [
  {
    title: "Mobile Mechanic",
    desc: "Send a bike mechanic directly to your location.",
    path: "/service",
    state: { serviceType: "Mechanic", serviceLabel: "Mobile Mechanic", vehicleType: "Bike" },
    tag: "Fast dispatch",
  },
  {
    title: "Tyre & Tube Service",
    desc: "Book puncture repair or replacement support.",
    path: "/service",
    state: { serviceType: "Tyre Services", serviceLabel: "Tyre & Tube Service", vehicleType: "Bike" },
    tag: "Quick fix",
  },
  {
    title: "Roadside Repair",
    desc: "Handle urgent breakdown issues on the spot.",
    path: "/service",
    state: { serviceType: "Roadside Repair", serviceLabel: "Roadside Repair", vehicleType: "Bike" },
    tag: "On-site",
  },
  {
    title: "Fuel Delivery",
    desc: "Request emergency fuel delivery for your bike.",
    path: "/fuel",
    state: { vehicleType: "Bike" },
    tag: "Popular",
  },
  {
    title: "EV Charging",
    desc: "Get emergency EV charging support for your bike.",
    path: "/service",
    state: { serviceType: "EV Charging", serviceLabel: "EV Charging", vehicleType: "Bike" },
    tag: "EV ready",
  },
  {
    title: "Battery Service",
    desc: "Get jump-start help, battery inspection, or replacement support.",
    path: "/service",
    state: {
      serviceType: "Mechanic",
      serviceLabel: "Battery Service",
      vehicleType: "Bike",
      presetProblem: "Battery Service requested for jump start, charging issue, or replacement check.",
    },
    tag: "Quick start",
  },
  {
    title: "Chain & Brake Repair",
    desc: "Fix noisy chains, weak braking, or urgent ride-safety issues.",
    path: "/service",
    state: {
      serviceType: "Roadside Repair",
      serviceLabel: "Chain & Brake Repair",
      vehicleType: "Bike",
      presetProblem: "Chain & Brake Repair requested for bike chain adjustment or brake issue.",
    },
    tag: "Safety",
  },
  {
    title: "Washing & Cleaning",
    desc: "Book doorstep cleaning with a smoother premium UI flow.",
    path: "/service",
    state: { serviceType: "Washing & Cleaning", serviceLabel: "Washing & Cleaning", vehicleType: "Bike" },
    tag: "Detail care",
  },
  {
    title: "Vehicle Health Check-Up",
    desc: "Book a full bike inspection with preventive diagnosis and checks.",
    path: "/service",
    state: {
      serviceType: "Mechanic",
      serviceLabel: "Vehicle Health Check-Up",
      vehicleType: "Bike",
      presetProblem: "Vehicle Health Check-Up requested for preventive inspection and diagnosis.",
    },
    tag: "Preventive",
  },
  {
    title: "Engine Jobs",
    desc: "Request support for engine tuning, repair, and deeper mechanical issues.",
    path: "/service",
    state: {
      serviceType: "Mechanic",
      serviceLabel: "Engine Jobs",
      vehicleType: "Bike",
      presetProblem: "Engine Jobs requested for bike engine repair or servicing.",
    },
    tag: "Workshop",
  },
  {
    title: "Suspension Check",
    desc: "Inspect front fork, rear shock, and rough-ride handling issues.",
    path: "/service",
    state: {
      serviceType: "Mechanic",
      serviceLabel: "Suspension Check",
      vehicleType: "Bike",
      presetProblem: "Suspension Check requested for fork, shock absorber, or ride comfort issues.",
    },
    tag: "Ride quality",
  },
  {
    title: "Clutch & Gear Support",
    desc: "Book help for clutch slippage, gear shifting, or cable adjustment.",
    path: "/service",
    state: {
      serviceType: "Mechanic",
      serviceLabel: "Clutch & Gear Support",
      vehicleType: "Bike",
      presetProblem: "Clutch & Gear Support requested for shifting or clutch-related issues.",
    },
    tag: "Transmission",
  },
  {
    title: "Detailing",
    desc: "Choose a polishing and care package before dispatch.",
    path: "/service",
    state: { serviceType: "Detailing", serviceLabel: "Detailing", vehicleType: "Bike" },
    tag: "Premium",
  },
  {
    title: "Pickup & Workshop Drop",
    desc: "Arrange pickup when the bike should go straight to a workshop.",
    path: "/service",
    state: {
      serviceType: "SOS Emergency",
      serviceLabel: "Pickup & Workshop Drop",
      vehicleType: "Bike",
      presetProblem: "Pickup & Workshop Drop requested for transport to a workshop.",
    },
    tag: "Recovery",
  },
  {
    title: "SOS Emergency",
    desc: "Escalate high-priority support when the situation is urgent.",
    path: "/service",
    state: { serviceType: "SOS Emergency", serviceLabel: "SOS Emergency", vehicleType: "Bike" },
    tag: "Priority",
  },
];

function BikeDashboardV2() {
  const navigate = useNavigate();

  return (
    <main className="page-shell app-grid">
      <section className="hero-card" style={{ padding: "36px" }}>
        <span className="eyebrow">Bike Support</span>
        <h1 className="section-title">Bike services</h1>
        <p className="section-copy" style={{ maxWidth: "720px" }}>
          Choose a service to continue.
        </p>
      </section>

      <section className="dashboard-grid">
        {bikeServices.map((item, index) => (
          <article
            key={item.title}
            className="feature-card"
            onClick={() => navigate(item.path, { state: item.state })}
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                navigate(item.path, { state: item.state });
              }
            }}
          >
            <div
              className="feature-icon"
              style={{
                background:
                  index % 2 === 0
                    ? "linear-gradient(135deg, #d46a3a, #b84f24)"
                    : "linear-gradient(135deg, #1f6f63, #2d9687)",
              }}
            >
              B
            </div>
            <h2 className="feature-title">{item.title}</h2>
            <p className="feature-copy">{item.desc}</p>
            <div className="feature-meta">
              <span>Continue</span>
              <span className="feature-tag">{item.tag}</span>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

export default BikeDashboardV2;
