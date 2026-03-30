import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const defaultPackageOptions = [
  {
    name: "Essential",
    price: 1499,
    eta: "20-30 min",
    features: ["Core roadside help", "Basic inspection", "Quick dispatch"],
  },
  {
    name: "Priority",
    price: 2499,
    eta: "15-25 min",
    features: ["Experienced mechanic", "Priority queue", "Expanded checks"],
  },
  {
    name: "Signature",
    price: 3999,
    eta: "15-20 min",
    features: ["Senior support", "High-priority routing", "Premium assistance"],
  },
];

const carPackageOptions = [
  {
    name: "Basic Care",
    price: 1199,
    eta: "25-35 min",
    features: ["Roadside visit", "Basic fault check", "Single issue support"],
  },
  {
    name: "Priority Care",
    price: 2199,
    eta: "15-25 min",
    features: ["Faster dispatch", "Senior mechanic", "Minor repair attempt"],
  },
  {
    name: "Premium Care",
    price: 3499,
    eta: "15-20 min",
    features: ["Priority routing", "Advanced diagnostics", "Breakdown coordination"],
  },
];

const extras = [
  { name: "Brake adjustment", price: 200 },
  { name: "Battery check", price: 250 },
  { name: "Electrical check", price: 300 },
  { name: "Fuel system check", price: 300 },
  { name: "Air filter check", price: 180 },
  { name: "Washing", price: 200 },
];

function ServicePageV2() {
  const navigate = useNavigate();
  const location = useLocation();
  const vehicleType = location.state?.vehicleType || "Car";
  const serviceType = location.state?.serviceType || "Mechanic";
  const serviceLabel = location.state?.serviceLabel || serviceType;
  const presetFuelType = location.state?.fuelType || "";
  const presetProblem = location.state?.presetProblem || "";
  const packageOptions = vehicleType === "Car" ? carPackageOptions : defaultPackageOptions;

  const [selectedPackage, setSelectedPackage] = useState(packageOptions[0].name);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [scheduleType, setScheduleType] = useState("now");
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [locationText, setLocationText] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [problem, setProblem] = useState(presetProblem);

  const selectedPackageData = useMemo(
    () => packageOptions.find((item) => item.name === selectedPackage) || packageOptions[0],
    [selectedPackage]
  );

  const extrasTotal = selectedExtras.reduce((sum, itemName) => {
    const extra = extras.find((item) => item.name === itemName);
    return sum + (extra?.price || 0);
  }, 0);

  const total = selectedPackageData.price + extrasTotal;

  const toggleExtra = (name) => {
    setSelectedExtras((current) =>
      current.includes(name) ? current.filter((item) => item !== name) : [...current, name]
    );
  };

  const detectLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported on this device.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude.toFixed(5);
        const lng = position.coords.longitude.toFixed(5);
        setLocationText(`Lat ${lat}, Lng ${lng}`);
      },
      () => {
        alert("Unable to detect your location.");
      }
    );
  };

  const continueToRequest = () => {
    navigate("/service-request", {
      state: {
        serviceType,
        serviceLabel,
        vehicleType,
        fuelType: presetFuelType,
        packageName: selectedPackageData.name,
        packagePrice: selectedPackageData.price,
        price: total,
        problem,
        location: locationText,
        date: scheduleType === "later" ? scheduleDate : "",
        timeSlot: scheduleType === "later" ? scheduleTime : "ASAP",
        selectedExtras,
        paymentMethod: "Pay after service",
        vehicleModel,
      },
    });
  };

  return (
    <main className="page-shell split-layout">
      <section className="app-grid">
        <div className="hero-card" style={{ padding: "32px" }}>
          <span className="eyebrow">{serviceLabel}</span>
          <h1 className="section-title">{serviceLabel}</h1>
          <p className="section-copy">Choose package and request details.</p>

          <div className="chip-row" style={{ marginTop: "18px" }}>
            <span className="info-chip">Vehicle: {vehicleType}</span>
            <span className="info-chip">ETA: {selectedPackageData.eta}</span>
            <span className="info-chip">Fuel: {presetFuelType || "Not required"}</span>
          </div>
        </div>

        <div className="surface-card" style={{ padding: "28px" }}>
          <div className="stack">
            <div>
              <h2 style={{ margin: 0 }}>Choose your package</h2>
              <p className="section-copy" style={{ marginTop: "8px" }}>
                Transparent pricing first, final request confirmation second.
              </p>
            </div>

            <div className="dashboard-grid">
              {packageOptions.map((item) => {
                const active = item.name === selectedPackage;

                return (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => setSelectedPackage(item.name)}
                    className="list-card"
                    style={{
                      textAlign: "left",
                      cursor: "pointer",
                      borderColor: active ? "rgba(212, 106, 58, 0.3)" : "var(--line)",
                      background: active
                        ? "linear-gradient(180deg, rgba(255, 244, 235, 0.98), rgba(251, 239, 230, 0.95))"
                        : undefined,
                    }}
                  >
                    <span className="feature-tag">{item.eta}</span>
                    <h3 className="feature-title">{item.name}</h3>
                    <p className="feature-copy">Rs {item.price.toLocaleString("en-IN")}</p>
                    {item.features.map((feature) => (
                      <p key={feature} style={{ margin: "10px 0 0", color: "var(--muted)" }}>
                        {feature}
                      </p>
                    ))}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="surface-card" style={{ padding: "28px" }}>
          <div className="stack">
            <div className="grid-two">
              <div className="field">
                <label htmlFor="vehicle-model">Vehicle Model</label>
                <input
                  id="vehicle-model"
                  value={vehicleModel}
                  onChange={(event) => setVehicleModel(event.target.value)}
                  placeholder="Example: Hyundai i20"
                />
              </div>

              <div className="field">
                <label htmlFor="location">Pickup or breakdown location</label>
                <input
                  id="location"
                  value={locationText}
                  onChange={(event) => setLocationText(event.target.value)}
                  placeholder="Enter address or coordinates"
                />
              </div>
            </div>

            <div className="inline-actions">
              <button type="button" className="ghost-btn" onClick={detectLocation}>
                Use Current Location
              </button>
            </div>

            <div className="field">
              <label htmlFor="problem">Problem description</label>
              <textarea
                id="problem"
                value={problem}
                onChange={(event) => setProblem(event.target.value)}
                placeholder="What happened, what you hear, and what support you need."
              />
            </div>

            <div className="grid-two">
              <div className="field">
                <label htmlFor="schedule-type">When do you need help?</label>
                <select
                  id="schedule-type"
                  value={scheduleType}
                  onChange={(event) => setScheduleType(event.target.value)}
                >
                  <option value="now">Right now</option>
                  <option value="later">Schedule for later</option>
                </select>
              </div>

              {scheduleType === "later" ? (
                <>
                  <div className="field">
                    <label htmlFor="schedule-date">Date</label>
                    <input
                      id="schedule-date"
                      type="date"
                      value={scheduleDate}
                      onChange={(event) => setScheduleDate(event.target.value)}
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="schedule-time">Time</label>
                    <input
                      id="schedule-time"
                      type="time"
                      value={scheduleTime}
                      onChange={(event) => setScheduleTime(event.target.value)}
                    />
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>

        <div className="surface-card" style={{ padding: "28px" }}>
          <h2 style={{ marginTop: 0 }}>Add optional services</h2>
          <div className="dashboard-grid">
            {extras.map((item) => {
              const active = selectedExtras.includes(item.name);

              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => toggleExtra(item.name)}
                  className="list-card"
                  style={{
                    textAlign: "left",
                    cursor: "pointer",
                    borderColor: active ? "rgba(31, 111, 99, 0.28)" : "var(--line)",
                    background: active
                      ? "linear-gradient(180deg, rgba(238, 247, 244, 0.95), rgba(245, 250, 248, 0.96))"
                      : undefined,
                  }}
                >
                  <h3 className="feature-title">{item.name}</h3>
                  <p className="feature-copy">Rs {item.price.toLocaleString("en-IN")}</p>
                  <div className="feature-meta">
                    <span>{active ? "Added" : "Tap to include"}</span>
                    <span className="feature-tag">{active ? "Selected" : "Optional"}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <aside className="summary-card">
        <span className="eyebrow" style={{ color: "#f6f2e9", background: "rgba(255,255,255,0.1)" }}>
          Request Summary
        </span>
        <h2 style={{ fontFamily: '"Space Grotesk", sans-serif', marginBottom: "8px" }}>{serviceLabel}</h2>
        <p>{vehicleModel || vehicleType}</p>

        <div className="stack" style={{ marginTop: "20px" }}>
          <div>
            <strong>Package</strong>
            <p>{selectedPackageData.name}</p>
          </div>
          <div>
            <strong>Base price</strong>
            <p>Rs {selectedPackageData.price.toLocaleString("en-IN")}</p>
          </div>
          <div>
            <strong>Extras</strong>
            <p>{selectedExtras.length ? selectedExtras.join(", ") : "No extras selected yet"}</p>
          </div>
          <div>
            <strong>Total</strong>
            <p style={{ color: "#fff7ef", fontSize: "1.8rem", fontWeight: 800 }}>
              Rs {total.toLocaleString("en-IN")}
            </p>
          </div>
        </div>

        <div className="inline-actions" style={{ marginTop: "24px" }}>
          <button type="button" className="secondary-btn" onClick={() => navigate(-1)}>
            Back
          </button>
          <button type="button" className="primary-btn" onClick={continueToRequest}>
            Continue to Request
          </button>
        </div>
      </aside>
    </main>
  );
}

export default ServicePageV2;
