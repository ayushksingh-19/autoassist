import React, { useState } from "react";
import axios from "axios";
import MapComponent from "../components/MapComponent";

function ServiceRequest() {

  const [serviceType, setServiceType] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [location, setLocation] = useState("");
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);

  // Get user GPS location
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
          lat,   // ✅ ADDED
          lng    // ✅ ADDED
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Service request created successfully");

      // Reset form
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

    <div className="p-10">

      <h2 className="text-2xl font-bold mb-6">Request Service</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <select
          className="border p-2 w-full"
          value={serviceType}
          onChange={(e) => setServiceType(e.target.value)}
        >

          <option value="">Select Service</option>
          <option value="Mechanic">Mechanic</option>
          <option value="EV Charging">EV Charging</option>
          <option value="Fuel Delivery">Fuel Delivery</option>
          <option value="Roadside Repair">Roadside Repair</option>

        </select>

        <input
          type="text"
          placeholder="Vehicle Type"
          className="border p-2 w-full"
          value={vehicleType}
          onChange={(e) => setVehicleType(e.target.value)}
        />

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
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Use My Location
        </button>

        {/* Map Display */}
        {lat && lng && (
          <div className="mt-4">
            <MapComponent lat={lat} lng={lng} />
          </div>
        )}

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit Request
        </button>

      </form>

    </div>

  );
}

export default ServiceRequest;