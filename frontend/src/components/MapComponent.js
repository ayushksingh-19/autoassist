import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";
import L from "leaflet";

// Fix icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

function MapComponent({ lat, lng }) {
  const [nearest, setNearest] = useState(null);

  // 📏 Distance function
  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) *
      Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  useEffect(() => {
    axios.get("http://localhost:5000/api/mechanics")
      .then((res) => {
        let minDist = Infinity;
        let nearestMech = null;

        res.data.forEach((mech) => {
          const dist = getDistance(lat, lng, mech.lat, mech.lng);
          if (dist < minDist) {
            minDist = dist;
            nearestMech = mech;
          }
        });

        setNearest(nearestMech);
      })
      .catch((err) => console.error(err));
  }, [lat, lng]);

  if (!lat || !lng) return <p>Loading...</p>;

  return (
    <MapContainer center={[lat, lng]} zoom={15} style={{ height: "300px", width: "100%" }}>
      
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* 📍 You */}
      <Marker position={[lat, lng]}>
        <Popup>You are here 📍</Popup>
      </Marker>

      {/* 🔧 Nearest mechanic */}
      {nearest && (
        <Marker position={[nearest.lat, nearest.lng]}>
          <Popup>Nearest: {nearest.name} 🔧</Popup>
        </Marker>
      )}

    </MapContainer>
  );
}

export default MapComponent;