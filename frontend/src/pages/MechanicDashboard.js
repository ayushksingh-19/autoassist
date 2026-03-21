import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";

// ✅ FIX MARKER ICON
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// 🔥 ROUTE COMPONENT
function Routing({ requests }) {
  const map = useMap();

  useEffect(() => {

    if (!requests || requests.length === 0) return;

    navigator.geolocation.getCurrentPosition((position) => {

      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      const req = requests[0];

      if (!req.lat || !req.lng) return;

      L.Routing.control({
        waypoints: [
          L.latLng(lat, lng),
          L.latLng(req.lat, req.lng),
        ],
        routeWhileDragging: false,
      }).addTo(map);

    });

  }, [requests, map]);

  return null;
}

function MapComponent({ requests }) {

  return (
    <MapContainer
      center={[26.8, 75.86]}
      zoom={12}
      style={{ height: "400px", width: "100%" }}
    >

      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* MARKERS */}
      {requests.map((req, index) => {

        if (!req.lat || !req.lng) return null;

        return (
          <Marker key={index} position={[req.lat, req.lng]}>
            <Popup>
              🚗 {req.serviceType} <br />
              🚙 {req.vehicleType}
            </Popup>
          </Marker>
        );
      })}

      {/* ROUTE */}
      <Routing requests={requests} />

    </MapContainer>
  );
}

export default MapComponent;