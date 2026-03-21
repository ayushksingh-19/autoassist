import React, { useState } from "react";
import axios from "axios";
import MapComponent from "../components/MapComponent";
import { useLocation, useNavigate } from "react-router-dom";

function ServiceRequest() {

  // ✅ FIRST declare these
  const locationState = useLocation();
  const navigate = useNavigate();
  const [fuelType, setFuelType] = useState(
  locationState.state?.fuelType || ""
);
  // ✅ THEN use them
 const [serviceType, setServiceType] = useState(
  locationState.state?.serviceType || ""
);
  const [vehicleType, setVehicleType] = useState("");
  const [problem, setProblem] = useState("");
  const [location, setLocation] = useState("");
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);

  // 📍 Get user location
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        setLat(latitude);
        setLng(longitude);
        setLocation(`Lat: ${latitude}, Lng: ${longitude}`);
      });
    } else {
      alert("Geolocation not supported");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!serviceType || !vehicleType || !location) {
      alert("Please fill all fields");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/services/create",
        {
          serviceType,
          vehicleType,
          location,
          fuelType,
          problem,
          location,
          lat,
          lng,
        },
        {
  serviceType,
  vehicleType,
  fuelType,   // ✅ ADD HERE
  location,
  lat,
  lng,
},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Service request created successfully");

      setServiceType("");
      setVehicleType("");
      setLocation("");
      setLat(null);
      setLng(null);
    } catch (error) {
      console.error(error);
      alert("Error creating request");
    }
  };

  return (
    <div className="p-10 min-h-screen">

      {/* 🔙 BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 bg-gray-600 text-white px-3 py-1 rounded"
      >
        ← Back
      </button>

      <h2 className="text-2xl font-bold mb-6">Request Service</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <select
  disabled={locationState.state?.serviceType}
  className="border p-2 w-full bg-gray-100"
  value={serviceType}
 
>
          <option value="">Select Service</option>
          <option value="Mechanic">Mechanic</option>
          <option value="EV Charging">EV Charging</option>
          <option value="Fuel Delivery">Fuel Delivery</option>
          <option value="Roadside Repair">Roadside Repair</option>
        </select>

        {serviceType !== "Fuel Delivery" && (
  <input
    type="text"
    placeholder="Enter Vehicle Model (e.g. Swift, Activa)"
    className="border p-2 w-full"
    value={vehicleType}
    onChange={(e) => setVehicleType(e.target.value)}
  />
  
)}

<textarea
  placeholder="Enter Your Problem (e.g. engine not starting, tyre puncture)"
  className="border p-2 w-full"
  value={problem}
  onChange={(e) => setProblem(e.target.value)}
/>
        {serviceType === "Fuel Delivery" && (
  <input
    type="text"
    placeholder="Fuel Type"
    className="border p-2 w-full"
    value={fuelType}
    readOnly
  />
)}
        <input
          type="text"
          placeholder="Location"
          className="border p-2 w-full"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        {/* 📍 Get Location */}
        <button
          type="button"
          onClick={getLocation}
          className="bg-gray-700 text-white px-4 py-2 rounded"
        >
          Use My Location
        </button>

        {/* 📍 SHOW MAP */}
        {lat && lng && (
          <div className="mt-4 border rounded overflow-hidden">
            <MapComponent lat={lat} lng={lng} />
          </div>
        )}

        {/* ✅ Submit */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Submit Request
        </button>

        {/* 🔧 Nearby Mechanics */}
       <button
  type="button"
  onClick={() => {
    if (!lat || !lng) {
      alert("Please click 'Use My Location' first");
      return;
    }

    let url = "";

    if (serviceType === "Fuel Delivery") {
      // ⛽ Petrol Pump
      url = `https://www.google.com/maps/search/petrol+pump/@${lat},${lng},14z`;

    } else if (serviceType === "EV Charging") {
      // ⚡ Charging Station
      url = `https://www.google.com/maps/search/ev+charging+station/@${lat},${lng},14z`;

    } else {
      // 🔧 Mechanic
      url = `https://www.google.com/maps/search/mechanic/@${lat},${lng},14z`;
    }

    window.open(url, "_blank");
  }}
  className="bg-orange-500 text-white px-4 py-2 rounded"
>
  {serviceType === "Fuel Delivery"
    ? "Get Petrol Pump Nearby"
    : serviceType === "EV Charging"
    ? "Get Charging Station Nearby"
    : "Get Mechanic Nearby"}
</button>

      </form>
    </div>
  );
}

export default ServiceRequest;