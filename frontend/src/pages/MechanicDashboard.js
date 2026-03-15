import React, { useEffect, useState } from "react";
import axios from "axios";

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

      setRequests(res.data);

    } catch (error) {
      console.log(error);
    }

  };

  const acceptRequest = async (id) => {

    try {

      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/api/services/update/${id}`,
        { status: "accepted" },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Request accepted");

      fetchRequests();

    } catch (error) {
      console.log(error);
    }

  };
  const completeRequest = async (id) => {

  try {

    const token = localStorage.getItem("token");

    await axios.put(
      `http://localhost:5000/api/services/update/${id}`,
      { status: "completed" },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    alert("Service completed");

    fetchRequests();

  } catch (error) {
    console.log(error);
  }

};

  return (
    <div>

      <h2>Mechanic Dashboard</h2>

      {requests.map((req) => (

        <div key={req._id} style={{border:"1px solid black", margin:"10px", padding:"10px"}}>

          <p>Service: {req.serviceType}</p>
          <p>Vehicle: {req.vehicleType}</p>
          <p>Location: {req.location}</p>
          <p>Status: {req.status}</p>

          {req.status === "pending" && (
            <button onClick={() => acceptRequest(req._id)}>
              Accept Job
            </button>
          )}
          {req.status === "accepted" && (
  <button onClick={() => completeRequest(req._id)}>
    Complete Job
  </button>
)}

        </div>

      ))}

    </div>
  );
}

export default MechanicDashboard;