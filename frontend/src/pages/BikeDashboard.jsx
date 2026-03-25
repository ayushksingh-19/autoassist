import React from "react";

function BikeDashboard() {
  const services = [
    {
      title: "Mobile Mechanic",
      desc: "Expert bike mechanics at your location",
      color: "#f97316",
      tag: "Popular",
    },
    {
      title: "Tire & Tube Service",
      desc: "Puncture repair & tire replacement",
      color: "#090b0a",
      tag: "",
    },
    {
      title: "Roadside Repair",
      desc: "Fix breakdown issues instantly",
      color: "#08ea1b",
      tag: "Fast",
    },
    {
      title: "Fuel Delivery",
      desc: "Emergency fuel delivery service",
      color: "#44deef",
      tag: "",
    },
    
    {
      title: "Washing & Cleaning",
      desc:"Get your vehicle cleaned at your location",
      color: "#5586f7",
      tag: "",
    },
    {
      title: "Vehicle Health Check-Up",
      desc: "Complete bike inspection service",
      color: "#d77de1",
      tag: "Fast",
    },
    {
      title: "Engine Jobs",
      desc: "Engine repair & servicing",
      color: "#3f4740a3",
      tag: "Fast",
    },
    {
      title: "Detailing Service",
      desc: "Premium bike polishing & detailing",
      color: "#6a08ea",
      tag: "Fast",
    },
    {
      title: "SOS Emergency",
      desc:  "Immediate roadside help",
      color: "#d40633",
      tag: "",
    },
  ];

  return (
    <div style={{ padding: "30px", background: "#f8fafc", minHeight: "100vh" }}>
      
      {/* HEADER */}
      <h2 style={{ marginBottom: "5px" }}>Bike Services</h2>
      <p style={{ color: "#64748b", marginBottom: "25px" }}>
        Select the service you need for your bike
      </p>
      <div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "20px",
    marginBottom: "25px",
  }}
>
  {/* BIKE OFFER */}
  <div
    style={{
      background: "linear-gradient(90deg, #1630f9, #ef4444)",
      color: "#fff",
      padding: "20px",
      borderRadius: "16px",
    }}
  >
    <h3 style={{ margin: 0 }}>🎁 Bike Special - 25% Off</h3>
    <p style={{ margin: "8px 0" }}>
      Get 25% discount on chain and brake services
    </p>
    <span
      style={{
        background: "rgba(255,255,255,0.2)",
        padding: "5px 10px",
        borderRadius: "8px",
        fontSize: "12px",
      }}
    >
      BIKE25
    </span>
  </div>

  {/* SAFETY CHECK */}
  <div
    style={{
      background: "linear-gradient(90deg, #1630f9, #14b8a6)",
      color: "#fff",
      padding: "20px",
      borderRadius: "16px",
    }}
  >
    <h3 style={{ margin: 0 }}>🎁 Free Safety Check</h3>
    <p style={{ margin: "8px 0" }}>
      Book any service and get free bike safety inspection
    </p>
    <span
      style={{
        background: "rgba(255,255,255,0.2)",
        padding: "5px 10px",
        borderRadius: "8px",
        fontSize: "12px",
      }}
    >
      SAFETY
    </span>
  </div>
</div>
      {/* GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
        }}
      >
        {services.map((s, i) => (
          <div
            key={i}
            style={{
              background: "#fff",
              borderRadius: "16px",
              padding: "20px",
              border: i === 0 ? "2px solid #f97316" : "1px solid #e5e7eb",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              position: "relative",
              cursor: "pointer",
            }}
          >
            {/* ICON */}
            <div
              style={{
                width: "45px",
                height: "45px",
                borderRadius: "10px",
                background: s.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: "20px",
                marginBottom: "10px",
              }}
            >
              🔧
            </div>

            {/* TAG */}
            {s.tag && (
              <span
                style={{
                  position: "absolute",
                  top: "15px",
                  right: "15px",
                  background: "#e5e7eb",
                  padding: "4px 8px",
                  borderRadius: "10px",
                  fontSize: "12px",
                }}
              >
                {s.tag}
              </span>
            )}

            <h3 style={{ margin: "5px 0" }}>{s.title}</h3>
            <p style={{ color: "#64748b", fontSize: "14px" }}>{s.desc}</p>

            <p style={{ fontSize: "13px", marginTop: "10px", color: "#94a3b8" }}>
              Avg. arrival: 10-25 min
            </p>

            <p style={{ color: "#f97316", fontWeight: "bold" }}>
              Book →
            </p>
          </div>
        ))}
      </div>

      {/* BOTTOM STATS */}
      <div
        style={{
          marginTop: "30px",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
        }}
      >
        <div style={statBox}>24/7<br/><span>Available Service</span></div>
        <div style={statBox}>300+<br/><span>Verified Mechanics</span></div>
        <div style={statBox}>10 min<br/><span>Avg. Response Time</span></div>
      </div>
    </div>
  );
}

const statBox = {
  background: "#fff",
  padding: "20px",
  borderRadius: "14px",
  textAlign: "center",
  boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
  fontSize: "20px",
  fontWeight: "bold",
};

export default BikeDashboard;