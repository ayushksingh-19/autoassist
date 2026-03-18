import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {

  const navigate = useNavigate();

  const services = [
    {
      title: "Mechanic Help",
      desc: "Request roadside mechanic assistance",
      route: "/service",
    },
    {
      title: "EV Charging",
      desc: "Get emergency EV charging service",
      route: "/service",
    },
    {
      title: "Fuel Delivery",
      desc: "Order fuel to your location",
      route: "/service",
    },
    {
      title: "Roadside Repair",
      desc: "Fix breakdown quickly",
      route: "/service",
    },
  ];

  return (
    <div
      className="min-h-screen p-10"
      style={{ backgroundColor: "var(--bright-snow)" }}
    >

      {/* Heading */}
      <h1 className="text-3xl font-bold text-center mb-8">
        AutoAssist Dashboard
      </h1>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {services.map((item, index) => (
          <div
            key={index}
            onClick={() => navigate("/service", { state: { serviceType: item.title } })}
            style={{
              backgroundColor: "white",
              borderRadius: "10px",
              padding: "20px",
              cursor: "pointer",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              transition: "0.3s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "scale(1)")
            }
          >

            <h3
              style={{
                color: "var(--smart-blue)",
                fontWeight: "bold",
                fontSize: "18px",
              }}
            >
              {item.title}
            </h3>

            <p
              style={{
                color: "var(--grey-olive)",
                marginTop: "10px",
                fontSize: "14px",
              }}
            >
              {item.desc}
            </p>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Dashboard;