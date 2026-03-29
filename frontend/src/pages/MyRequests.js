import React, { useState, useEffect } from "react";
import { getMyRequests } from "../services/serviceApi";
import socket from "../socket";

function MyRequests() {
  const [requests, setRequests] = useState([]);

  // 🔥 FETCH REQUESTS
  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await getMyRequests(token);
      setRequests(res.data.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  // INITIAL LOAD
  useEffect(() => {
    fetchRequests();
  }, []);

  // 🔥 SOCKET LIVE UPDATES
  useEffect(() => {
    socket.on("requestAssigned", (data) => {
      console.log("Assigned:", data);
      fetchRequests(); // refresh
    });

    socket.on("requestUpdated", (data) => {
      console.log("Updated:", data);
      fetchRequests(); // refresh
    });

    return () => {
      socket.off("requestAssigned");
      socket.off("requestUpdated");
    };
  }, []);

  return (
    <div className="p-10 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">My Requests</h2>

      {requests.length === 0 ? (
        <p>No requests found</p>
      ) : (
        <div className="space-y-4">
          {requests.map((req) => (
            <div
              key={req._id}
              className="border p-4 rounded shadow bg-white"
            >
              <h3 className="font-bold text-lg">{req.serviceType}</h3>

              <p><b>Vehicle:</b> {req.vehicleType}</p>
              <p><b>Problem:</b> {req.problem}</p>
              <p><b>Location:</b> {req.location}</p>

              {/* 🔥 STATUS */}
              <p className="mt-2">
                <b>Status:</b>{" "}
                <span
                  className={`px-2 py-1 rounded text-white ${
                    req.status === "pending"
                      ? "bg-yellow-500"
                      : req.status === "assigned"
                      ? "bg-blue-500"
                      : req.status === "completed"
                      ? "bg-green-600"
                      : "bg-gray-500"
                  }`}
                >
                  {req.status}
                </span>
              </p>

              {/* 🔥 MECHANIC */}
              {req.mechanicId && (
                <p className="mt-2 text-green-700 font-semibold">
                  Mechanic Assigned ✅
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyRequests;