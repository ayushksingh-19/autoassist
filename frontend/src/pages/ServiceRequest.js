import React, { useState, useEffect } from "react";
import axios from "axios";
import MapComponent from "../components/MapComponent";
import { useLocation, useNavigate } from "react-router-dom";

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
      "Clay Bar Treatment": 1000,
      "Paint Correction / Polishing": 2500,
      "Paint Protection (Wax/Seal)": 1500,
      "Ceramic / Graphene Coating": 8000,
      "Paint Protection Film (PPF)": 12000,
      "Headlight Restoration": 800,
      "Alloy / Wheel Detailing": 700,
      "Engine Bay Detailing": 900,

      "Deep Vacuuming": 400,
      "Interior Steam Cleaning": 1200,
      "Leather Cleaning & Conditioning": 1500,
      "Dashboard & Console Cleaning": 600,
      "Odor Elimination": 1000,
      "Glass & Mirror Cleaning": 300,

      "Car Denting / Minor Repairs": 2000,
      "Underbody Coating": 3500,
      "Windshield Anti-Glare Treatment": 1200,
    };

    if (detailingService) {
      setPrice(priceMap[detailingService] || 0);
    }
  }, [detailingService]);

  // ✅ AUTO SELECT SERVICE
  useEffect(() => {
    if (locationState.state?.serviceType) {
      setServiceType(locationState.state.serviceType);
    }
  }, [locationState.state]);

  // 📍 LOCATION
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!serviceType || !location) {
      alert("Please fill required fields");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/services/create",
        {
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
          paymentMethod
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Service request created successfully");

      setVehicleType("");
      setProblem("");
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

      <button
        onClick={() => navigate(-1)}
        className="mb-4 bg-gray-600 text-white px-3 py-1 rounded"
      >
        ← Back
      </button>

      <h2 className="text-2xl font-bold mb-6">Request Service</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* SERVICE */}
        <select disabled className="border p-2 w-full bg-gray-100" value={serviceType}>
          <option value="">Select Service</option>
          <option value="Mechanic">Mechanic</option>
          <option value="EV Charging">EV Charging</option>
          <option value="Fuel Delivery">Fuel Delivery</option>
          <option value="Roadside Repair">Roadside Repair</option>
          <option value="Washing & Cleaning">Washing & Cleaning</option>
          <option value="Tyre Services">Tyre Services</option>
          <option value="Detailing">Detailing</option>
          <option value="SOS Emergency">SOS Emergency</option>
        </select>

        {/* VEHICLE */}
        {serviceType !== "Fuel Delivery" && serviceType !== "SOS Emergency" && (
          <input
            type="text"
            placeholder="Enter Vehicle Model"
            className="border p-2 w-full"
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
          />
        )}

        {/* DETAILING */}
        {serviceType === "Detailing" && (
          <div className="border p-4 rounded bg-gray-50">

            <h3 className="font-bold mb-3">Select Detailing Type</h3>

            <select
              className="border p-2 w-full mb-3"
              value={detailingType}
              onChange={(e) => {
                setDetailingType(e.target.value);
                setDetailingService("");
              }}
            >
              <option value="">Select Type</option>
              <option value="Exterior">Exterior</option>
              <option value="Interior">Interior</option>
              <option value="Additional">Additional</option>
            </select>

            {detailingType && (
              <>
                <select
                  className="border p-2 w-full"
                  value={detailingService}
                  onChange={(e) => setDetailingService(e.target.value)}
                >
                  <option value="">Select Service</option>

                  {detailingType === "Exterior" && (
                    <>
                      <option>Deep Cleaning & Wash</option>
                      <option>Clay Bar Treatment</option>
                      <option>Paint Correction / Polishing</option>
                      <option>Paint Protection (Wax/Seal)</option>
                      <option>Ceramic / Graphene Coating</option>
                      <option>Paint Protection Film (PPF)</option>
                      <option>Headlight Restoration</option>
                      <option>Alloy / Wheel Detailing</option>
                      <option>Engine Bay Detailing</option>
                    </>
                  )}

                  {detailingType === "Interior" && (
                    <>
                      <option>Deep Vacuuming</option>
                      <option>Interior Steam Cleaning</option>
                      <option>Leather Cleaning & Conditioning</option>
                      <option>Dashboard & Console Cleaning</option>
                      <option>Odor Elimination</option>
                      <option>Glass & Mirror Cleaning</option>
                    </>
                  )}

                  {detailingType === "Additional" && (
                    <>
                      <option>Car Denting / Minor Repairs</option>
                      <option>Underbody Coating</option>
                      <option>Windshield Anti-Glare Treatment</option>
                    </>
                  )}
                </select>

                {/* ✅ PRICE FIXED (OUTSIDE SELECT) */}
                {price > 0 && (
                  <div className="mt-3 p-3 bg-green-100 rounded">
                    <h3 className="font-bold text-green-700">
                      Estimated Price: ₹ {price}
                    </h3>
                  </div>
                )}
              </>
            )}
            {/* 💳 BILL + PAYMENT */}
{serviceType === "Detailing" && price > 0 && (
  <div className="border p-4 rounded bg-yellow-50 mt-4">

    <h3 className="font-bold mb-3">Bill Summary</h3>

    <p className="mb-2">Service: {detailingService}</p>
    <p className="mb-2">Vehicle: {vehicleType || "N/A"}</p>
    <p className="mb-2 font-bold">Total Amount: ₹ {price}</p>

    {/* PAYMENT OPTIONS */}
    <h4 className="font-semibold mt-4 mb-2">Select Payment Method</h4>

    <div className="flex gap-3">

      <button
        type="button"
        onClick={() => setPaymentMethod("Cash")}
        className={`border px-4 py-2 rounded ${
          paymentMethod === "Cash" ? "bg-blue-500 text-white" : ""
        }`}
      >
        Cash
      </button>

      <button
        type="button"
        onClick={() => setPaymentMethod("Card")}
        className={`border px-4 py-2 rounded ${
          paymentMethod === "Card" ? "bg-blue-500 text-white" : ""
        }`}
      >
        Card
      </button>

      <button
        type="button"
        onClick={() => setPaymentMethod("UPI")}
        className={`border px-4 py-2 rounded ${
          paymentMethod === "UPI" ? "bg-blue-500 text-white" : ""
        }`}
      >
        UPI
      </button>

    </div>

  </div>
)}
          </div>
        )}

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

        {lat && lng && (
          <MapComponent lat={lat} lng={lng} />
        )}
 
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Submit Request
        </button>
         <button
  type="button"
  onClick={() => {
    if (!lat || !lng) {
      alert("Please click 'Use My Location' first");
      return;
    }

    let url = "";

    if (serviceType === "Fuel Delivery") {
      url = `https://www.google.com/maps/search/petrol+pump/@${lat},${lng},14z`;

    } else if (serviceType === "EV Charging") {
      url = `https://www.google.com/maps/search/ev+charging+station/@${lat},${lng},14z`;

    } else if (serviceType === "Detailing") {
      url = `https://www.google.com/maps/search/car+detailing/@${lat},${lng},14z`;

    } else if (serviceType === "Washing & Cleaning") {
      url = `https://www.google.com/maps/search/car+wash/@${lat},${lng},14z`;

    } else if (serviceType === "Tyre Services") {
      url = `https://www.google.com/maps/search/tyre+repair/@${lat},${lng},14z`;

    } else {
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
    : serviceType === "Detailing"
    ? "Get Detailing Shop Nearby"
    : serviceType === "Washing & Cleaning"
    ? "Get Car Wash Nearby"
    : serviceType === "Tyre Services"
    ? "Get Tyre Shop Nearby"
    : "Get Mechanic Nearby"}
</button>
      </form>
    </div>
  );
}

export default ServiceRequest;