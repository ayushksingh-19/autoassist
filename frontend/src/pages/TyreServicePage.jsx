import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // ✅ FIXED

function TyreServicePage() {
     const location = useLocation();
      const vehicleType = location.state?.vehicleType;
      const navigate = useNavigate(); 
  const [selectedPackage, setSelectedPackage] = useState("Basic");
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [scheduleType, setScheduleType] = useState("now");
    const [userLocation, setUserLocation] = useState(""); // ✅ FIXED
  const handleRequest = () => {
  const requestData = {
    service: "Tire Service",
    vehicle: "Bike",
    location: userLocation,
    problem: "Tyre issue",
    amount: totalAmount,
    time: new Date().toLocaleTimeString(),
  };

  // Save to localStorage (simple backend)
  const existing = JSON.parse(localStorage.getItem("requests")) || [];
  existing.push(requestData);
  localStorage.setItem("requests", JSON.stringify(existing));

  // Navigate
  navigate("/active");
};
  const openTyreMechanics = () => {
    window.open(
      "https://www.google.com/maps/search/tyre+mechanic+near+me",
      "_blank"
    );
  };

  const tyreServices = [
    { name: "Puncture Repair", price: 300 },
    { name: "Tyre Replacement", price: 800 },
    { name: "Wheel Balancing", price: 400 },
    { name: "Nitrogen Filling", price: 200 },
    { name: "Valve/Tube Replacement", price: 350 },
  ];

  const handleExtraChange = (service) => {
    if (selectedExtras.includes(service)) {
      setSelectedExtras(selectedExtras.filter((s) => s !== service));
    } else {
      setSelectedExtras([...selectedExtras, service]);
    }
  };

  const packages = [
    { name: "Basic", price: 1500 },
    { name: "Standard", price: 2500 },
    { name: "Premium", price: 4000 },
  ];

  const extraTotal = tyreServices
    .filter((item) => selectedExtras.includes(item.name))
    .reduce((sum, item) => sum + item.price, 0);

  const basePrice =
    packages.find((p) => p.name === selectedPackage).price;

  const totalAmount = basePrice + extraTotal;
const detectLocation = () => {
  if (!navigator.geolocation) {
    alert("Geolocation not supported");
    return;
  }

  setUserLocation("Detecting location...");

  navigator.geolocation.getCurrentPosition(
    async (pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;

      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`,
          {
            headers: {
              "User-Agent": "autoassist-app", // ✅ IMPORTANT FIX
            },
          }
        );

        const data = await res.json();

        if (data && data.display_name) {
          setUserLocation(data.display_name);
        } else {
          setUserLocation(`${lat}, ${lon}`);
        }

      } catch (error) {
        console.log(error);
        setUserLocation(`${lat}, ${lon}`);
      }
    },
    (error) => {
      alert("Location permission denied");
      console.log(error);
    }
  );
};
  return (
    <div style={{ background: "#f1f5f9", padding: "30px" }}>
      <div style={container}>

        {/* ✅ HEADER FIXED */}
        <div style={{ marginBottom: "20px" }}>
          <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "5px" }}>
            Request Tire Service
          </h2>
          <p style={subText}>
            Customize your service request and choose a package
          </p>
        </div>

        {/* ✅ CLEAN TOP ROW */}
        <div style={topRow}>
          <div style={topInfoClean}>
            <div>
              <p style={label}>Base Price</p>
              <b>₹{basePrice}</b>
            </div>

            <div>
              <p style={label}>Est. Time</p>
              <b>20-40 min</b>
            </div>

            <div>
              <p style={label}>Service Type</p>
              <b>Bike</b>
            </div>
          </div>

          <button
            onClick={openTyreMechanics}
            style={mapBtn}
            onMouseEnter={(e) => (e.target.style.background = "#1d4ed8")}
            onMouseLeave={(e) => (e.target.style.background = "#2563eb")}
          >
            📍 Tyre Mechanic Nearby
          </button>
        </div>

        <div
          style={{
            background: "#f8fafc",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            padding: "14px 16px",
            marginBottom: "18px",
          }}
        >
          <p style={{ margin: 0, fontWeight: "600" }}>Nearby help</p>
          <p style={{ ...subText, marginTop: "6px", marginBottom: "8px" }}>
            Open nearby tyre repair and replacement shops in Google Maps.
          </p>
          <p style={{ fontSize: "13px", color: "#64748b", margin: 0 }}>
            Google Maps: tyre mechanic near me
          </p>
        </div>

        {/* PACKAGES */}
        <h3 style={sectionTitle}>Choose Service Package</h3>
        <div style={packageWrap}>
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              onClick={() => setSelectedPackage(pkg.name)}
              style={{
                ...packageCard,
                border:
                  selectedPackage === pkg.name
                    ? "2px solid #2563eb"
                    : "1px solid #e5e7eb",
              }}
            >
              <h4>{pkg.name}</h4>
              <h2 style={{ color: "#2563eb" }}>₹{pkg.price}</h2>
              <ul style={featureList}>
                <li>✔ Standard service</li>
                <li>✔ 30 day warranty</li>
                <li>✔ Regular mechanic</li>
                <li>✔ Business hours priority</li>
              </ul>
            </div>
          ))}
        </div>

        {/* SCHEDULE */}
        <h3 style={sectionTitle}>When do you need service?</h3>

        <div style={radioBox}>
          <input
            type="radio"
            checked={scheduleType === "now"}
            onChange={() => setScheduleType("now")}
          />
          <span>Right Now</span>
        </div>

       <div style={radioBox}>
  <input
    type="radio"
    checked={scheduleType === "later"}
    onChange={() => setScheduleType("later")}
  />
  <span>Schedule for Later </span>
</div>
       {scheduleType === "later" && (
  <div style={dateTimeBox}>
    
    <div style={{ flex: 1 }}>
      <p style={label}>Select Date</p>
      <input
        type="date"
        style={input}
      />
    </div>

    <div style={{ flex: 1 }}>
      <p style={label}>Select Time</p>
      <input
        type="time"
        style={input}
      />
    </div>

  </div>
)}
        {/* LOCATION */}
        <h3 style={sectionTitle}>Your Location *</h3>
        <input style={input} 
        placeholder="Enter your address or coordinates" 
        value={userLocation}
        onChange={(e) => setUserLocation(e.target.value)}
        onClick={detectLocation}
        />

        {/* VEHICLE */}
        <h3 style={sectionTitle}>Vehicle Model *</h3>
        <input style={input} placeholder="e.g. Honda CB350 2021" />

        {/* CHECKBOX SERVICES */}
        <h3 style={sectionTitle}>Select Tyre Services</h3>
        <div style={checkboxBox}>
          {tyreServices.map((item, i) => (
            <div key={i} style={row}>
              <div>
                <input
                  type="checkbox"
                  onChange={() => handleExtraChange(item.name)}
                />
                <span style={{ marginLeft: "10px" }}>{item.name}</span>
              </div>
              <b>₹{item.price}</b>
            </div>
          ))}
        </div>

        <p style={note}>*Not included in package price</p>

        {/* PROBLEM */}
        <h3 style={sectionTitle}>Problem Description *</h3>
        <textarea style={{ ...input, height: "80px" }} />

        {/* TOTAL */}
        <div style={totalBox}>
          <div>
            <p style={label}>Service Package</p>
            <b>{selectedPackage}</b>
          </div>
          <div>
            <p style={label}>Total Amount</p>
            <h2 style={{ color: "#2563eb" }}>₹{totalAmount}</h2>
          </div>
        </div>

        {/* BUTTONS */}
        <div style={btnWrap}>
          <button style={cancelBtn}>Cancel</button>
          <button style={mainBtn} onClick={handleRequest}>
  Request Service Now
</button>
        </div>

      </div>
    </div>
  );
}

/* STYLES */

const container = {
  maxWidth: "900px",
  margin: "auto",
  background: "#fff",
  padding: "25px",
  borderRadius: "12px",
};

const subText = { color: "#64748b", marginBottom: "20px" };

const topRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px",
  gap: "20px",
};

const topInfoClean = {
  display: "flex",
  gap: "40px",
  background: "#f8fafc",
  padding: "15px 20px",
  borderRadius: "10px",
  flex: 1,
};

const mapBtn = {
  background: "#2563eb",
  color: "#fff",
  padding: "10px 16px",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  fontWeight: "500",
  whiteSpace: "nowrap",
};

const label = { fontSize: "12px", color: "#64748b" };

const sectionTitle = { marginTop: "20px", fontWeight: "600" };

const packageWrap = { display: "flex", gap: "20px" };

const packageCard = {
  flex: 1,
  padding: "15px",
  borderRadius: "10px",
  cursor: "pointer",
};

const featureList = {
  fontSize: "13px",
  color: "#64748b",
};

const radioBox = {
  padding: "10px",
  border: "1px solid #e5e7eb",
  borderRadius: "8px",
  marginBottom: "10px",
};

const input = {
  width: "100%",
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #e5e7eb",
};

const checkboxBox = {
  background: "#f8fafc",
  padding: "10px",
  borderRadius: "10px",
};

const row = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "8px",
};

const note = { fontSize: "12px", color: "#64748b" };

const totalBox = {
  background: "#e0f2fe",
  padding: "15px",
  borderRadius: "10px",
  display: "flex",
  justifyContent: "space-between",
  marginTop: "20px",
};

const btnWrap = {
  display: "flex",
  gap: "10px",
  marginTop: "20px",
};

const cancelBtn = {
  flex: 1,
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ccc",
};

const mainBtn = {
  flex: 1,
  padding: "12px",
  borderRadius: "8px",
  background: "#2563eb",
  color: "#fff",
  border: "none",
};
const dateTimeBox = {
  display: "flex",
  gap: "15px",
  marginTop: "10px",
};
const rightCard = {
  flex: 1,
  background: "#fff",
  padding: "20px",
  borderRadius: "12px",
};

const progressBar = {
  width: "100%",
  height: "8px",
  background: "#ddd",
  borderRadius: "5px",
  marginTop: "10px",
};

const progressFill = {
  width: "30%",
  height: "100%",
  background: "#2563eb",
  borderRadius: "5px",
};

const activeBtn = {
  background: "#bbf7d0",
  border: "none",
  padding: "6px 10px",
  borderRadius: "6px",
};

const inactiveBtn = {
  background: "#e5e7eb",
  border: "none",
  padding: "6px 10px",
  borderRadius: "6px",
};

const statsCard = {
  marginTop: "20px",
  background: "#fff",
  padding: "20px",
  borderRadius: "12px",
  width: "300px",
};

const statsRow = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "10px",
};
export default TyreServicePage;
