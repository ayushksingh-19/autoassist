import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const serviceHistory = [
  { name: "Emergency Mechanic", price: 120 },
  { name: "Tyre Service", price: 80 },
  { name: "Battery Jump Start", price: 40 },
];

const vehicles = [
  { model: "Toyota Camry 2020", plate: "ABC 1234" },
  { model: "Honda CB350 2021", plate: "XYZ 5678" },
];

function ProfileV2() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <main className="page-shell app-grid">
      <section className="hero-card" style={{ padding: "36px" }}>
        <span className="eyebrow">Profile & Settings</span>
        <h1 className="section-title">Your account</h1>
        <p className="section-copy">Personal details, saved vehicles, and service history in one place.</p>
      </section>

      <section className="stat-strip">
        <div className="stat-card">
          <strong>2</strong>
          <span>Saved vehicles</span>
        </div>
        <div className="stat-card">
          <strong>3</strong>
          <span>Completed services</span>
        </div>
        <div className="stat-card">
          <strong>Premium</strong>
          <span>Membership tier</span>
        </div>
      </section>

      <section className="chip-row">
        {["profile", "vehicles", "history"].map((tab) => (
          <button
            key={tab}
            type="button"
            className="info-chip"
            onClick={() => setActiveTab(tab)}
            style={
              activeTab === tab
                ? {
                    background: "rgba(255, 255, 255, 0.92)",
                    color: "var(--text)",
                    borderColor: "rgba(21, 34, 53, 0.16)",
                  }
                : undefined
            }
          >
            {tab === "profile" ? "Profile" : tab === "vehicles" ? "Vehicles" : "Service History"}
          </button>
        ))}
      </section>

      {activeTab === "profile" ? (
        <article className="list-card">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "16px",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  background: "rgba(21, 34, 53, 0.08)",
                  display: "grid",
                  placeItems: "center",
                  fontWeight: 700,
                }}
              >
                JD
              </div>
              <div>
                <h2 style={{ margin: "0 0 6px" }}>John Doe</h2>
                <p className="section-copy">Member since March 2026</p>
              </div>
            </div>

            <button
              type="button"
              className="secondary-btn"
              onClick={() => navigate("/edit-profile")}
            >
              Edit Profile
            </button>
          </div>

          <div className="grid-two" style={{ marginTop: "24px" }}>
            <div className="field">
              <label>Full Name</label>
              <input value="John Doe" disabled />
            </div>
            <div className="field">
              <label>Email</label>
              <input value="john@example.com" disabled />
            </div>
            <div className="field">
              <label>Phone</label>
              <input value="+1234567890" disabled />
            </div>
            <div className="field">
              <label>Address</label>
              <input value="123 Main Street" disabled />
            </div>
          </div>
        </article>
      ) : null}

      {activeTab === "vehicles" ? (
        <article className="list-card">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "16px",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <div>
              <h2 style={{ margin: "0 0 6px" }}>Saved Vehicles</h2>
              <p className="section-copy">Vehicles connected to your AutoAssist account.</p>
            </div>

            <button type="button" className="primary-btn">
              Add Vehicle
            </button>
          </div>

          <div className="app-grid" style={{ marginTop: "18px", gap: "12px" }}>
            {vehicles.map((vehicle) => (
              <div
                key={vehicle.plate}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "16px",
                  flexWrap: "wrap",
                  alignItems: "center",
                  padding: "16px",
                  borderRadius: "16px",
                  border: "1px solid var(--line)",
                  background: "rgba(255, 255, 255, 0.68)",
                }}
              >
                <div>
                  <p style={{ margin: 0, fontWeight: 700 }}>{vehicle.model}</p>
                  <p style={{ margin: "4px 0 0", color: "var(--muted)" }}>{vehicle.plate}</p>
                </div>

                <div className="inline-actions">
                  <button type="button" className="secondary-btn">
                    Edit
                  </button>
                  <button type="button" className="secondary-btn">
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </article>
      ) : null}

      {activeTab === "history" ? (
        <article className="list-card">
          <h2 style={{ margin: "0 0 6px" }}>Service History</h2>
          <p className="section-copy">Completed services connected to your account.</p>

          <div className="app-grid" style={{ marginTop: "18px", gap: "12px" }}>
            {serviceHistory.map((item) => (
              <div
                key={item.name}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "16px",
                  flexWrap: "wrap",
                  alignItems: "center",
                  padding: "16px",
                  borderRadius: "16px",
                  border: "1px solid var(--line)",
                  background: "rgba(255, 255, 255, 0.68)",
                }}
              >
                <div>
                  <p style={{ margin: 0, fontWeight: 700 }}>{item.name}</p>
                  <p style={{ margin: "4px 0 0", color: "var(--muted)" }}>Completed</p>
                </div>

                <strong>Rs {item.price}</strong>
              </div>
            ))}
          </div>
        </article>
      ) : null}
    </main>
  );
}

export default ProfileV2;
