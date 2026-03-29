import React, { useState, useEffect } from "react";
import MapComponent from "../components/MapComponent";
import { useLocation, useNavigate } from "react-router-dom";
import { createRequest } from "../services/serviceApi";

function ServiceRequest() {
  const locationState = useLocation();
  const navigate = useNavigate();

  const [serviceType, setServiceType] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [fuelType, setFuelType] = useState(
    locationState.state?.fuelType || ""
  );
  const [detailingType, setDetailingType] = useState("");
  const [detailingService, setDetailingService] = useState("");
  const [price, setPrice] = useState(0);
  const [problem, setProblem] = useState("");
  const [location, setLocation] = useState("");
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  // 💰 PRICE LOGIC
  useEffect(() => {
    let priceMap = {
      "Deep Cleaning & Wash": 500,
      "Paint Correction / Polishing": 2500,
      "Ceramic / Graphene Coating": 8000,
    };

    if (detailingService) {
      setPrice(priceMap[detailingService] || 0);
    }
  }, [detailingService]);

  // AUTO SELECT SERVICE
  useEffect(() => {
    if (locationState.state?.serviceType) {
      setServiceType(locationState.state.serviceType);
    }
  }, [locationState.state]);

  // LOCATION
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
        setLocation(
          `Lat: ${position.coords.latitude}, Lng: ${position.coords.longitude}`
        );
      });
    }
  };

  // 🔥 SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!serviceType || !location) {
      alert("Please fill required fields");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const formData = {
        serviceType,
        vehicleType,
        fuelType,
        problem,
        location,
        lat,
        lng,
        date,
        timeSlot,
        detailingType,
        detailingService,
        price,
        paymentMethod,
      };

      const res = await createRequest(formData, token);

      console.log("SUCCESS:", res.data);
      alert("Service request created ✅");

      // reset
      setVehicleType("");
      setProblem("");
      setLocation("");
      setLat(null);
      setLng(null);

    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Error creating request ❌");
    }
  };

  return (
    <div className="p-10 min-h-screen">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 bg-gray-600 text-white px-3 py-1 rounded"
      >
        ← Back
      </button>

      <h2 className="text-2xl font-bold mb-6">Request Service</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* SERVICE */}
        <input
          type="text"
          value={serviceType}
          disabled
          className="border p-2 w-full bg-gray-100"
        />

        {/* VEHICLE */}
        <input
          type="text"
          placeholder="Vehicle"
          className="border p-2 w-full"
          value={vehicleType}
          onChange={(e) => setVehicleType(e.target.value)}
        />

        {/* PROBLEM */}
        <textarea
          placeholder="Describe problem"
          className="border p-2 w-full"
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
        />

        {/* LOCATION */}
        <input
          type="text"
          placeholder="Location"
          className="border p-2 w-full"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <button
          type="button"
          onClick={getLocation}
          className="bg-gray-700 text-white px-4 py-2 rounded"
        >
          Use My Location
        </button>

        {lat && lng && <MapComponent lat={lat} lng={lng} />}

        {/* SUBMIT */}
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Submit Request
        </button>

      </form>
    </div>
  );
}

export default ServiceRequest;