import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../socket";
import { getMyRequests } from "../services/serviceApi";
import {
  formatCurrency,
  formatRequestSubtitle,
  formatRequestTitle,
  getRequestStats,
  getStatusClass,
} from "../utils/requestUtils";

function MyRequestsV2() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);

  const loadRequests = async () => {
    try {
      const data = await getMyRequests();
      setRequests(data);
    } catch (error) {
      console.error("Unable to load requests", error);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  useEffect(() => {
    socket.connect();

    const refresh = () => loadRequests();

    socket.on("requestAssigned", refresh);
    socket.on("requestUpdated", refresh);

    return () => {
      socket.off("requestAssigned", refresh);
      socket.off("requestUpdated", refresh);
      socket.disconnect();
    };
  }, []);

  const stats = getRequestStats(requests);

  return (
    <main className="page-shell app-grid">
      <section className="hero-card" style={{ padding: "36px" }}>
        <div className="premium-hero">
          <div>
            <span className="eyebrow">Request History</span>
            <h1 className="section-title">My requests</h1>
            <p className="section-copy">View all your service requests.</p>
          </div>
          <button type="button" className="secondary-btn" onClick={() => navigate("/packages")}>
            Premium Packages
          </button>
        </div>
      </section>

      <section className="stat-strip">
        <div className="stat-card">
          <strong>{stats.total}</strong>
          <span>Total requests</span>
        </div>
        <div className="stat-card">
          <strong>{stats.active}</strong>
          <span>Still active</span>
        </div>
        <div className="stat-card">
          <strong>{stats.completed}</strong>
          <span>Completed</span>
        </div>
      </section>

      <section className="app-grid">
        {requests.length === 0 ? (
          <div className="empty-state">No requests found yet. Once you submit one, it will appear here.</div>
        ) : (
          requests.map((request) => (
            <article key={request._id} className="list-card my-request-card">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "16px",
                  flexWrap: "wrap",
                  alignItems: "center",
                }}
              >
                <div>
                  <h2 style={{ margin: "0 0 6px" }}>{formatRequestTitle(request)}</h2>
                  <p className="section-copy">{formatRequestSubtitle(request)}</p>
                </div>

                <span className={`status-pill ${getStatusClass(request.status)}`}>{request.status}</span>
              </div>

              <div className="chip-row" style={{ marginTop: "18px" }}>
                <span className="info-chip">Location: {request.location || "Pending update"}</span>
                <span className="info-chip">Price: {formatCurrency(request.price)}</span>
                <span className="info-chip">Time: {request.timeSlot || "ASAP"}</span>
              </div>

              <p style={{ marginTop: "18px", color: "var(--muted)", lineHeight: 1.7 }}>
                {request.problem || "No additional problem notes were provided for this request."}
              </p>

              {request.mechanicId ? (
                <p style={{ marginTop: "14px", fontWeight: 700, color: "var(--teal)" }}>
                  Mechanic assigned and attached to this job.
                </p>
              ) : null}
            </article>
          ))
        )}
      </section>
    </main>
  );
}

export default MyRequestsV2;
