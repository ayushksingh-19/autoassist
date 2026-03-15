import React, { useEffect, useState } from "react";
import axios from "axios";

function MyRequests() {

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

  return (
  <div>

    <h2>My Service Requests</h2>

    <h3>Active Requests</h3>

    {requests
      .filter(req => req.status !== "completed")
      .map((req) => (

        <div key={req._id} style={{border:"1px solid black", margin:"10px", padding:"10px"}}>

          <p>Service: {req.serviceType}</p>
          <p>Vehicle: {req.vehicleType}</p>
          <p>Location: {req.location}</p>
          <p>Status: {req.status}</p>

        </div>

      ))}

    <h3>Completed Services</h3>

    {requests
      .filter(req => req.status === "completed")
      .map((req) => (

        <div key={req._id} style={{border:"1px solid green", margin:"10px", padding:"10px"}}>

          <p>Service: {req.serviceType}</p>
          <p>Vehicle: {req.vehicleType}</p>
          <p>Location: {req.location}</p>
          <p>Status: {req.status}</p>

        </div>

      ))}

  </div>
);
}

export default MyRequests;