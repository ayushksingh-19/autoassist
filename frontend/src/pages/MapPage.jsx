import React, { useEffect } from "react";

function MapPage() {
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        const map = window.L.map("map").setView([lat, lon], 13);

        window.L.tileLayer(
          "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        ).addTo(map);

        window.L.marker([lat, lon]).addTo(map).bindPopup("You are here").openPopup();
      });
    }
  }, []);

  return <div id="map" style={{ height: "100vh" }}></div>;
}

export default MapPage;