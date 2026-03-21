import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function VehicleSelection() {
  const navigate = useNavigate();
  const location = useLocation();  // ✅ IMPORTANT

  return (
    <div className="p-10">

      <button
        onClick={() => navigate(-1)}
        className="mb-4 bg-gray-600 text-white px-3 py-1 rounded"
      >
        ← Back
      </button>

      <h2 className="text-2xl font-bold mb-6">Select Vehicle</h2>

      {/* 🚗 CAR */}
      <button
        onClick={() =>
          navigate("/service", {
            state: {
              vehicleType: "Car",
              serviceType: location.state?.serviceType  // ✅ FIX HERE
            }
          })
        }
        className="bg-blue-500 text-white px-6 py-3 rounded w-full mb-4"
      >
        Car
      </button>

      {/* 🏍️ BIKE */}
      <button
        onClick={() =>
          navigate("/service", {
            state: {
              vehicleType: "Bike",
              serviceType: location.state?.serviceType  // ✅ FIX HERE
            }
          })
        }
        className="bg-green-500 text-white px-6 py-3 rounded w-full"
      >
        Bike
      </button>

    </div>
  );
}

export default VehicleSelection;