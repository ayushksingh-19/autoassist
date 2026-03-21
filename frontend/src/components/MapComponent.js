import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// ✅ FORCE ICON (CDN METHOD)
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

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

      {requests && requests.map((req, index) => {

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

    </MapContainer>
  );
}

export default MapComponent;