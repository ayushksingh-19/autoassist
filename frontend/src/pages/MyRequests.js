import React, { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
function MyRequests() {

  const [requests, setRequests] = useState([]);
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

      setRequests(res.data);

    } catch (error) {
      console.error(error);
    }
  };

  const activeRequests = requests.filter(
    (r) => r.status !== "completed"
  );

  const completedRequests = requests.filter(
    (r) => r.status === "completed"
  );

  return (
    <div style={{ backgroundColor: "var(--bright-snow)", minHeight: "100vh", padding: "20px" }}>

      <h2 style={{ fontSize: "26px", fontWeight: "bold", marginBottom: "20px" }}>
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
              backgroundColor: "white",
              padding: "15px",
              borderRadius: "10px",
              marginBottom: "10px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
            }}
          >
            <h4 style={{ color: "var(--smart-blue)" }}>{req.serviceType}</h4>
            <p>{req.vehicleType}</p>
            <p>{req.location}</p>
            <p style={{ color: "orange", fontWeight: "bold" }}>{req.status}</p>
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
              backgroundColor: "#e6f7ff",
              padding: "15px",
              borderRadius: "10px",
              marginBottom: "10px"
            }}
          >
            <h4>{req.serviceType}</h4>
            <p>{req.vehicleType}</p>
            <p>{req.location}</p>
            <p style={{ color: "green", fontWeight: "bold" }}>
              {req.status}
            </p>
          </div>
        ))
      )}

    </div>
  );
}

export default MyRequests;