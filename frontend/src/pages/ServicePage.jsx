import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // ✅ FIXED

function ServicePage() {
  const location = useLocation();
  const vehicleType = location.state?.vehicleType;
  const navigate = useNavigate(); // ✅ FIXED
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState("Basic");
  const [scheduleType, setScheduleType] = useState("now");
  const [userLocation, setUserLocation] = useState(""); // ✅ FIXED
 
  const packages = [
    {
      name: "Basic",
      price: 1500,
      features: ["Standard service", "30 day warranty", "Regular mechanic"],
    },
    {
      name: "Standard",
      price: 2500,
      features: ["Premium service", "90 day warranty", "Experienced mechanic"],
    },
    {
      name: "Premium",
      price: 4000,
      features: ["Elite service", "180 day warranty", "Master mechanic"],
    },
  ];
const extraServices = [
  { name: "Breaks Adjust", price: 200 },
  { name: "Clutch Adjust", price: 250 },
  { name: "Chain Adjust", price: 150 },
  { name: "Electrical Component Check", price: 300 },
  { name: "Engine Condition Check", price: 400 },
  { name: "Fuel System Check", price: 300 },
  { name: "Suspensions Check", price: 350 },
  { name: "Transmission Performance Check", price: 500 },
  { name: "Wheels Services", price: 250 },
  { name: "Oil Level Condition Check", price: 150 },
  { name: "Washing", price: 200 },
  { name: "Spark Plug Check", price: 180 },
  { name: "Air Filter Check", price: 180 },
];
const handleExtraChange = (service) => {
  if (selectedExtras.includes(service)) {
    setSelectedExtras(selectedExtras.filter((s) => s !== service));
  } else {
    setSelectedExtras([...selectedExtras, service]);
  }
};
  const detectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;

          fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
          )
            .then((res) => res.json())
            .then((data) => {
              setUserLocation(data.display_name || "Location found");
            });
        },
        () => {
          setUserLocation("Permission denied");
        }
      );
    }
  };
const extraTotal = extraServices
  .filter((item) => selectedExtras.includes(item.name))
  .reduce((sum, item) => sum + item.price, 0);
  return (
    <div style={{ padding: "30px", background: "#f8fafc", minHeight: "100vh" }}>
      
      {/* 🔥 TOP RIGHT BUTTON */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px" }}>
        <button
  style={nearbyBtn}
  onClick={() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        const url = `https://www.google.com/maps/search/mechanic+near+me/@${lat},${lon},15z`;

        window.open(url, "_blank"); // 🔥 opens real Google Maps
      });
    }
  }}
>
  🔧 Nearby Mechanics
</button>
      </div>

      <h2 style={{ fontSize: "28px", fontWeight: "bold" }}>
        Request Emergency Mechanic
      </h2>

      <p style={{ color: "#64748b", fontSize: "16px" }}>
        Customize your service request and choose a package
      </p>

      {/* INFO */}
      <div style={infoBox}>
        <span>₹1500 Base Price</span>
        <span>⏱ 15-30 min</span>
        <span>🚗 {vehicleType}</span>
      </div>

      {/* PACKAGES */}
      <h3>Choose Service Package</h3>

      <div style={{ display: "flex", gap: "20px" }}>
        {packages.map((pkg) => (
          <div
            key={pkg.name}
            onClick={() => setSelectedPackage(pkg.name)}
            style={{
              ...packageBox,
              border:
                selectedPackage === pkg.name
                  ? "2px solid #2563eb"
                  : "1px solid #e5e7eb",
            }}
          >
            <h4>{pkg.name}</h4>
            <h2>₹{pkg.price}</h2>

            {pkg.features.map((f, i) => (
              <p key={i}>✔ {f}</p>
            ))}
          </div>
        ))}
      </div>
<h3 style={{ marginTop: "20px" }}>When do you need service?</h3>

<div style={inputBox}>
  <input
    type="radio"
    checked={scheduleType === "now"}
    onChange={() => setScheduleType("now")}
  />
  <span style={{ marginLeft: "10px" }}>Right Now</span>
</div>

<div style={inputBox}>
  <input
    type="radio"
    checked={scheduleType === "later"}
    onChange={() => setScheduleType("later")}
  />
  <span style={{ marginLeft: "10px" }}>Schedule for Later</span>
</div>

{scheduleType === "later" && (
  <div style={{ display: "flex", gap: "10px" }}>
    <input type="date" style={input} />
    <input type="time" style={input} />
  </div>
)}
      {/* LOCATION */}
      <h3>Your Location</h3>
      <input
        style={input}
        placeholder="Enter your address or coordinates"
        value={userLocation}
        onChange={(e) => setUserLocation(e.target.value)}
        onClick={detectLocation} // ✅ WORKING
      />

      {/* FORM */}
      <h3>Vehicle Model</h3>
      <input style={input} placeholder="e.g. Honda CB350" />
      <h3 style={{ fontSize: "20px" }}>Additional Services (Optional)</h3>

<div style={{ background: "#fff", padding: "15px", borderRadius: "10px" }}>
  {extraServices.map((item, index) => (
    <div key={index} style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
      
      <input
        type="checkbox"
        checked={selectedExtras.includes(item.name)}
        onChange={() => handleExtraChange(item.name)}
      />

      <span style={{ marginLeft: "10px", flex: 1 }}>
        {item.name}
      </span>

      <span style={{ color: "#2563eb", fontWeight: "bold" }}>
        ₹{item.price}
      </span>
    </div>
  ))}
</div>
      <h3>Problem Description</h3>
      <textarea style={input} placeholder="Describe issue..." />

      {/* SUMMARY */}
      <div style={summaryBox}>
        <h4>Service Package: {selectedPackage}</h4>
        <h2 style={{ color: "#2563eb" }}>
  Total: ₹
  {packages.find(p => p.name === selectedPackage).price + extraTotal}
</h2>

<p style={{ fontSize: "12px", color: "#64748b" }}>
  *Extra services are not included in base package
</p>
      </div>

      {/* BUTTONS */}
      <div style={{ display: "flex", gap: "10px" }}>
        <button style={cancelBtn}>Cancel</button>
        <button style={mainBtn} onClick={() => navigate("/active")}>
  Schedule Service
</button>
      </div>
    </div>
  );
}

/* STYLES */

const nearbyBtn = {
  background: "#2563eb",
  color: "#fff",
  padding: "10px 16px",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
};

const infoBox = {
  display: "flex",
  justifyContent: "space-between",
  background: "#fff",
  padding: "15px",
  borderRadius: "10px",
  margin: "15px 0",
};

const packageBox = {
  flex: 1,
  background: "#fff",
  padding: "20px",
  borderRadius: "12px",
  cursor: "pointer",
};

const input = {
  width: "100%",
  padding: "12px",
  margin: "10px 0",
  borderRadius: "8px",
  border: "1px solid #ddd",
};

const summaryBox = {
  background: "#fff",
  padding: "15px",
  borderRadius: "10px",
  marginTop: "20px",
};

const mainBtn = {
  background: "#2563eb",
  color: "#fff",
  padding: "12px",
  border: "none",
  borderRadius: "8px",
  flex: 1,
};

const cancelBtn = {
  background: "#e5e7eb",
  padding: "12px",
  border: "none",
  borderRadius: "8px",
  flex: 1,
};
const inputBox = {
  background: "#fff",
  padding: "12px",
  borderRadius: "8px",
  margin: "10px 0",
  display: "flex",
  alignItems: "center",
};
export default ServicePage;