import React from "react";
import { useNavigate } from "react-router-dom";

function FuelSelection() {
  const navigate = useNavigate();

  return (
    <div className="p-10">

      {/* 🔙 Back */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 bg-gray-600 text-white px-3 py-1 rounded"
      >
        ← Back
      </button>

      <h2 className="text-2xl font-bold mb-6">Select Fuel Type</h2>

      {/* ⛽ Petrol */}
      <button
        onClick={() =>
          navigate("/service", {
            state: {
              serviceType: "Fuel Delivery",
              fuelType: "Petrol"
            }
          })
        }
        className="bg-blue-500 text-white px-6 py-3 rounded w-full mb-4"
      >
        Petrol
      </button>

      {/* ⛽ Diesel */}
      <button
        onClick={() =>
          navigate("/service", {
            state: {
              serviceType: "Fuel Delivery",
              fuelType: "Diesel"
            }
          })
        }
        className="bg-green-500 text-white px-6 py-3 rounded w-full"
      >
        Diesel
      </button>

    </div>
  );
}

export default FuelSelection;