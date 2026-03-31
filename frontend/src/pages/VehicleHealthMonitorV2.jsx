import React from "react";
import { useNavigate } from "react-router-dom";

const alertItems = [
  {
    title: "Brake pad wear detected. Service recommended within 300 km.",
    time: "2 hours ago",
    action: "Brake Inspection",
  },
  {
    title: "Battery voltage slightly low. Consider checking terminals.",
    time: "1 day ago",
    action: "Battery Check",
  },
];

const healthCards = [
  {
    title: "Engine Health",
    icon: "EH",
    tone: "good",
    score: 90,
    lastChecked: "2 days ago",
    nextService: "3,500 km",
  },
  {
    title: "Battery Level",
    icon: "BL",
    tone: "watch",
    score: 75,
    lastChecked: "1 day ago",
    nextService: "Check recommended",
  },
  {
    title: "Oil Quality",
    icon: "OQ",
    tone: "good",
    score: 85,
    lastChecked: "5 days ago",
    nextService: "2,000 km",
  },
  {
    title: "Brake System",
    icon: "BS",
    tone: "warning",
    score: 65,
    lastChecked: "1 week ago",
    nextService: "Service soon",
  },
  {
    title: "Tire Pressure",
    icon: "TP",
    tone: "good",
    score: 95,
    lastChecked: "Today",
    nextService: "All good",
  },
  {
    title: "Coolant Level",
    icon: "CL",
    tone: "watch",
    score: 80,
    lastChecked: "3 days ago",
    nextService: "1,500 km",
  },
];

const maintenanceItems = [
  { priority: "medium", title: "Oil Change", due: "Due in 500 km", price: "$45" },
  { priority: "high", title: "Brake Inspection", due: "Due in 300 km", price: "$25" },
  { priority: "low", title: "Tire Rotation", due: "Due in 1,200 km", price: "$35" },
];

function VehicleHealthMonitorV2() {
  const navigate = useNavigate();

  const openHealthService = (presetProblem) => {
    navigate("/service", {
      state: {
        serviceType: "Mechanic",
        serviceLabel: "Health Check-Up",
        vehicleType: "Car",
        presetProblem,
      },
    });
  };

  return (
    <main className="page-shell app-grid" style={{ gap: "22px" }}>
      <section style={{ padding: "0 4px" }}>
        <h1 style={{ margin: 0, fontSize: "2rem" }}>Vehicle Health Monitor</h1>
        <p className="section-copy" style={{ marginTop: "8px" }}>
          Real-time diagnostics and maintenance tracking
        </p>
      </section>

      <section className="vehicle-health-hero surface-card">
        <div className="vehicle-health-hero-main">
          <p className="vehicle-health-heading">Overall Health Score</p>
          <div className="vehicle-health-score-row">
            <strong className="vehicle-health-score">85</strong>
            <span className="vehicle-health-pill">Good Condition</span>
          </div>
          <p className="section-copy">Last scanned: Today</p>
        </div>

        <div className="inline-actions" style={{ alignSelf: "center" }}>
          <button type="button" className="secondary-btn vehicle-health-secondary">
            Full Diagnostic
          </button>
          <button
            type="button"
            className="primary-btn"
            onClick={() => openHealthService("Schedule a complete vehicle health service.")}
          >
            Schedule Service
          </button>
        </div>
      </section>

      <section className="vehicle-health-alerts surface-card">
        <div className="vehicle-health-section-head">
          <h2 style={{ margin: 0, fontSize: "1.1rem" }}>Recent Alerts</h2>
        </div>

        <div className="app-grid" style={{ gap: "12px" }}>
          {alertItems.map((item) => (
            <div key={item.title} className="vehicle-health-alert-item">
              <div>
                <p style={{ margin: 0, fontWeight: 600 }}>{item.title}</p>
                <p className="section-copy" style={{ fontSize: "0.85rem", marginTop: "4px" }}>
                  {item.time}
                </p>
              </div>
              <button
                type="button"
                className="secondary-btn vehicle-health-fix-btn"
                onClick={() => openHealthService(item.action)}
              >
                Fix Now
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="dashboard-grid vehicle-health-grid">
        {healthCards.map((card) => (
          <article key={card.title} className="vehicle-health-card surface-card">
            <div className="vehicle-health-card-top">
              <div className={`vehicle-health-icon ${card.tone}`}>{card.icon}</div>
              <span className={`vehicle-health-mini-pill ${card.tone}`}>{card.tone === "warning" ? "warning" : card.tone === "watch" ? "moderate" : "good"}</span>
            </div>

            <h3 className="feature-title" style={{ marginTop: "18px" }}>{card.title}</h3>

            <div className="vehicle-health-metric-row">
              <span>Health Score</span>
              <strong>{card.score}%</strong>
            </div>

            <div className="vehicle-health-progress">
              <div className="vehicle-health-progress-fill" style={{ width: `${card.score}%` }} />
            </div>

            <div className="vehicle-health-detail-list">
              <div>
                <span>Last checked:</span>
                <strong>{card.lastChecked}</strong>
              </div>
              <div>
                <span>Next service:</span>
                <strong>{card.nextService}</strong>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="surface-card vehicle-health-maintenance">
        <div className="vehicle-health-section-head">
          <div>
            <h2 style={{ margin: 0, fontSize: "1.1rem" }}>Upcoming Maintenance</h2>
            <p className="section-copy" style={{ marginTop: "6px" }}>
              Scheduled services based on your vehicle&apos;s mileage
            </p>
          </div>
        </div>

        <div className="app-grid" style={{ gap: "12px" }}>
          {maintenanceItems.map((item) => (
            <div key={item.title} className="vehicle-health-maintenance-item">
              <div className="vehicle-health-maintenance-left">
                <span className={`vehicle-health-priority ${item.priority}`}>{item.priority}</span>
                <div>
                  <strong>{item.title}</strong>
                  <p className="section-copy" style={{ fontSize: "0.88rem", marginTop: "4px" }}>
                    {item.due}
                  </p>
                </div>
              </div>

              <div className="vehicle-health-maintenance-right">
                <strong className="vehicle-health-price">{item.price}</strong>
                <button
                  type="button"
                  className="primary-btn vehicle-health-schedule-btn"
                  onClick={() => openHealthService(`Schedule ${item.title.toLowerCase()} from health monitor.`)}
                >
                  Schedule
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default VehicleHealthMonitorV2;
