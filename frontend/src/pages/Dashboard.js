import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {

  const navigate = useNavigate();

  return (
    <div className="p-10 bg-gray-100 min-h-screen">

      <h1 className="text-3xl font-bold mb-8 text-center">
        AutoAssist Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div
          onClick={() => navigate("/service")}
          className="bg-white p-6 rounded-xl shadow hover:shadow-lg cursor-pointer"
        >
          <h2 className="text-xl font-semibold mb-2">🔧 Mechanic Help</h2>
          <p>Request roadside mechanic assistance.</p>
        </div>

        <div
          onClick={() => navigate("/service")}
          className="bg-white p-6 rounded-xl shadow hover:shadow-lg cursor-pointer"
        >
          <h2 className="text-xl font-semibold mb-2">⚡ EV Charging</h2>
          <p>Get emergency EV charging service.</p>
        </div>

        <div
          onClick={() => navigate("/service")}
          className="bg-white p-6 rounded-xl shadow hover:shadow-lg cursor-pointer"
        >
          <h2 className="text-xl font-semibold mb-2">⛽ Fuel Delivery</h2>
          <p>Order petrol or diesel to your location.</p>
        </div>

        <div
          onClick={() => navigate("/service")}
          className="bg-white p-6 rounded-xl shadow hover:shadow-lg cursor-pointer"
        >
          <h2 className="text-xl font-semibold mb-2">🚗 Roadside Repair</h2>
          <p>Fix vehicle breakdown quickly.</p>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;