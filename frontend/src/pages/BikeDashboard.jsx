import React from "react";
import { useNavigate } from "react-router-dom";

function BikeDashboard() {
  const navigate = useNavigate();

  const handleClick = (type) => {
  if (type === "tyre") {
    navigate("/tyre-service"); // ✅ OPEN TYRE PAGE
  } else {
    navigate("/service", {
      state: {
        serviceType: type,
        vehicleType: "bike",
      },
    });
  }
};

  const services = [
    {
      title: "Mobile Mechanic",
      desc: "Expert bike mechanics at your location",
      color: "#f97316",
      tag: "Popular",
      type: "mechanic",
    },
    {
      title: "Tire & Tube Service",
      desc: "Puncture repair & tire replacement",
      color: "#090b0a",
      tag: "",
      type: "tyre",
    },
    {
      title: "Roadside Repair",
      desc: "Fix breakdown issues instantly",
      color: "#08ea1b",
      tag: "Fast",
      type: "roadside",
    },
    {
      title: "Fuel Delivery",
      desc: "Emergency fuel delivery service",
      color: "#44deef",
      tag: "",
      type: "fuel",
    },
    {
      title: "Washing & Cleaning",
      desc: "Get your vehicle cleaned at your location",
      color: "#5586f7",
      tag: "",
      type: "washing",
    },
    {
      title: "Vehicle Health Check-Up",
      desc: "Complete bike inspection service",
      color: "#d77de1",
      tag: "Fast",
      type: "health",
    },
    {
      title: "Engine Jobs",
      desc: "Engine repair & servicing",
      color: "#3f4740a3",
      tag: "Fast",
      type: "engine",
    },
    {
      title: "Detailing Service",
      desc: "Premium bike polishing & detailing",
      color: "#6a08ea",
      tag: "Fast",
      type: "detailing",
    },
    {
      title: "SOS Emergency",
      desc: "Immediate roadside help",
      color: "#d40633",
      tag: "",
      type: "sos",
    },
  ];

  return (
    <div style={{ padding: "30px", background: "#f8fafc", minHeight: "100vh" }}>
      
      <h2 style={{ color: "#2563eb", fontSize: "24px", fontWeight: "bold" }}>
        Bike Services
      </h2>

      <p style={{ color: "#64748b", marginBottom: "25px" }}>
        Select the service you need for your bike
      </p>

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
            onClick={() => handleClick(s.type)}
            style={{
              background: "#fff",
              borderRadius: "16px",
              padding: "20px",
              border: i === 0 ? "2px solid #f97316" : "1px solid #e5e7eb",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              position: "relative",
              cursor: "pointer",
              transition: "all 0.25s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.boxShadow =
                "0 10px 25px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 4px 12px rgba(0,0,0,0.05)";
            }}
          >
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
    </div>
  );
}

export default BikeDashboard;