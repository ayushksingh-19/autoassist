import React, { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

function MechanicDashboard() {

  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {

      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/services/all",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log("DATA:", res.data); // 👈 IMPORTANT DEBUG

      setRequests(res.data);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6">

      <h2 className="text-2xl font-bold mb-4">
        Mechanic Dashboard (Live Requests)
      </h2>

      <MapContainer
        center={[26.8, 75.86]}
        zoom={12}
        style={{ height: "500px", width: "100%" }}
      >

        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {requests.map((req) => (

          req.lat && req.lng && (

            <Marker key={req._id} position={[req.lat, req.lng]}>
              <Popup>
                <b>{req.serviceType}</b><br />
                {req.vehicleType}<br />
                {req.location}
              </Popup>
            </Marker>

          )

        ))}

      </MapContainer>

    </div>
  );
}

export default MechanicDashboard;