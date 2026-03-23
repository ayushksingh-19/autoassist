import React, { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

function MyRequests() {

  const [requests, setRequests] = useState([]);

  // 🔥 SOCKET REAL-TIME UPDATE
  useEffect(() => {
    const socket = io("http://localhost:5000");

    socket.on("requestUpdated", (updatedRequest) => {
      setRequests((prev) =>
        prev.map((req) =>
          req._id === updatedRequest._id ? updatedRequest : req
        )
      );
    });

    return () => socket.disconnect();
  }, []);

  // 🔥 FETCH USER REQUESTS
  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login again");
        return;
      }

      const res = await axios.get(
        "http://localhost:5000/api/services/my",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRequests(res.data);

    } catch (error) {
      console.error("FETCH ERROR:", error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // FILTERS
  const activeRequests = requests.filter(
    (r) => r.status !== "completed"
  );

  const completedRequests = requests.filter(
    (r) => r.status === "completed"
  );

  // 🎨 STATUS COLOR FUNCTION
  const getStatusStyle = (status) => {
    if (status === "pending") {
      return { background: "#fff3cd", color: "#856404" };
    } else if (status === "accepted") {
      return { background: "#d1ecf1", color: "#0c5460" };
    } else {
      return { background: "#d4edda", color: "#155724" };
    }
  };

  return (
    <div style={{ padding: "25px", background: "#f5f7fb", minHeight: "100vh" }}>

      <h2 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "20px" }}>
        My Requests
      </h2>

      {/* ACTIVE */}
      <h3 style={{ marginBottom: "10px" }}>Active Requests</h3>

      {activeRequests.length === 0 ? (
        <p>No active requests</p>
      ) : (
        activeRequests.map((req) => (
          <div
            key={req._id}
            style={{
              background: "white",
              padding: "18px",
              borderRadius: "12px",
              marginBottom: "15px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
            }}
          >
            <h3>{req.serviceType}</h3>

            <p style={{ color: "#555" }}>
              🚗 {req.vehicleType || "N/A"}
            </p>

            <p style={{ fontSize: "13px", color: "#777" }}>
              📍 {req.location?.split(",")[0]}
            </p>

            {/* STATUS */}
            <span
              style={{
                display: "inline-block",
                marginTop: "8px",
                padding: "5px 10px",
                borderRadius: "20px",
                fontWeight: "bold",
                ...getStatusStyle(req.status)
              }}
            >
              {req.status}
            </span>

            {/* ACTION BUTTONS */}
            <div style={{ marginTop: "12px", display: "flex", gap: "10px" }}>

              {/* TRACK */}
              <button
                onClick={() => {
                  if (!req.lat || !req.lng) {
                    alert("Location not available");
                    return;
                  }

                  window.open(
  `https://www.google.com/maps/search/?api=1&query=${req.lat},${req.lng}`,
  "_blank"
);
                }}
                style={{
                  background: "#172431ca",
                  color: "white",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: "6px",
                  cursor: "pointer"
                }}
              >
                 Track
              </button>

              {/* CANCEL */}
              {req.status === "pending" && (
                <button
                  onClick={async () => {
                    try {
                      const token = localStorage.getItem("token");

                      await axios.delete(
                        `http://localhost:5000/api/services/${req._id}`,
                        {
                          headers: {
                            Authorization: `Bearer ${token}`,
                          },
                        }
                      );

                      setRequests((prev) =>
                        prev.filter((r) => r._id !== req._id)
                      );

                    } catch (error) {
                      console.error(error);
                      alert("Cancel failed");
                    }
                  }}
                  style={{
                    background: "#41181c87",
                    color: "white",
                    border: "none",
                    padding: "8px 12px",
                    borderRadius: "6px",
                    cursor: "pointer"
                  }}
                >
                   Cancel
                </button>
              )}

            </div>
          </div>
        ))
      )}

      {/* COMPLETED */}
      <h3 style={{ marginTop: "30px", marginBottom: "10px" }}>
        Completed Requests
      </h3>

      {completedRequests.length === 0 ? (
        <p>No completed requests</p>
      ) : (
        completedRequests.map((req) => (
          <div
            key={req._id}
            style={{
              background: "#e6f7ff",
              padding: "18px",
              borderRadius: "12px",
              marginBottom: "15px"
            }}
          >
            <h3>{req.serviceType}</h3>
            <p>🚗 {req.vehicleType}</p>
            <p>📍 {req.location?.split(",")[0]}</p>

            <span style={{ color: "green", fontWeight: "bold" }}>
              {req.status}
            </span>
          </div>
        ))
      )}

    </div>
  );
}

export default MyRequests;