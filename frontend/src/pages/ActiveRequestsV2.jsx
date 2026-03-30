import React, { useEffect, useMemo, useState } from "react";
import socket from "../socket";
import { getMyRequests } from "../services/serviceApi";
import {
  formatCurrency,
  formatRequestTitle,
  getRequestStats,
  getStatusClass,
} from "../utils/requestUtils";

const formatRequestTime = (value) => {
  if (!value) {
    return "ASAP";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
};

const getProgress = (status) => {
  if (status === "completed") {
    return 100;
  }

  if (status === "accepted") {
    return 55;
  }

  return 18;
};

function ActiveRequestsV2() {
  const [requests, setRequests] = useState([]);

  const loadRequests = async () => {
    try {
      const data = await getMyRequests();
      setRequests(data);
    } catch (error) {
      console.error("Unable to load active requests", error);
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

  const activeRequests = useMemo(
    () => requests.filter((request) => request.status !== "completed"),
    [requests]
  );
  const stats = getRequestStats(requests);

  return (
    <main className="page-shell app-grid">
      <section className="hero-card" style={{ padding: "36px" }}>
        <span className="eyebrow">Live Requests</span>
        <h1 className="section-title">Active service requests</h1>
        <p className="section-copy">Track ongoing jobs in real time.</p>
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

      {activeRequests.length === 0 ? (
        <div className="empty-state">No active requests right now. New requests will show up here automatically.</div>
      ) : (
        <section className="app-grid">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1.35fr) minmax(280px, 0.65fr)",
              gap: "18px",
              alignItems: "start",
            }}
          >
            <div className="app-grid">
            {activeRequests.map((request) => {
              const progress = getProgress(request.status);
              const assigned = Boolean(request.mechanicId);

              return (
                <article
                  key={request._id}
                  className="list-card"
                  style={{ borderLeft: "4px solid rgba(21, 34, 53, 0.12)" }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "16px",
                      flexWrap: "wrap",
                      alignItems: "flex-start",
                    }}
                  >
                    <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                      <div
                        style={{
                          width: "38px",
                          height: "38px",
                          borderRadius: "12px",
                          background: "rgba(21, 34, 53, 0.08)",
                          color: "var(--text)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: 800,
                        }}
                      >
                        C
                      </div>
                      <div>
                        <h2 style={{ margin: "0 0 4px" }}>{formatRequestTitle(request)}</h2>
                        <p className="section-copy">{request.vehicleType || "Vehicle not set"}</p>
                      </div>
                    </div>

                    <span className={`status-pill ${getStatusClass(request.status)}`}>
                      {assigned ? "Mechanic assigned" : request.status}
                    </span>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                      gap: "18px",
                      marginTop: "22px",
                    }}
                  >
                    <div>
                      <p style={{ margin: 0, color: "var(--muted)", fontSize: "0.9rem" }}>Location</p>
                      <p style={{ margin: "4px 0 0" }}>{request.location || "Location pending"}</p>
                    </div>
                    <div>
                      <p style={{ margin: 0, color: "var(--muted)", fontSize: "0.9rem" }}>Requested</p>
                      <p style={{ margin: "4px 0 0" }}>{formatRequestTime(request.createdAt || request.timeSlot)}</p>
                    </div>
                  </div>

                  <div style={{ marginTop: "18px" }}>
                    <p style={{ margin: 0, color: "var(--muted)", fontSize: "0.9rem" }}>Problem Description</p>
                    <p style={{ margin: "6px 0 0", lineHeight: 1.7 }}>
                      {request.problem || "No notes added yet for this request."}
                    </p>
                  </div>

                  <div
                    style={{
                      marginTop: "18px",
                      padding: "16px",
                      borderRadius: "16px",
                      border: "1px solid var(--line)",
                      background: "rgba(255, 255, 255, 0.62)",
                    }}
                  >
                    <p style={{ margin: 0, fontWeight: 700 }}>Mechanic Assigned</p>
                    <div
                      style={{
                        marginTop: "12px",
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "16px",
                        alignItems: "center",
                        flexWrap: "wrap",
                      }}
                    >
                      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                        <div
                          style={{
                            width: "44px",
                            height: "44px",
                            borderRadius: "50%",
                            background: "rgba(21, 34, 53, 0.1)",
                            border: "1px solid var(--line)",
                            color: "var(--text)",
                            boxShadow: "none",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: 700,
                          }}
                        >
                          M
                        </div>
                        <div>
                          <p style={{ margin: 0, fontWeight: 700 }}>
                            {assigned ? "Assigned mechanic" : "Finding mechanic"}
                          </p>
                          <p style={{ margin: "4px 0 0", color: "var(--muted)" }}>
                            {assigned ? "ETA 15 min" : "Dispatch in progress"}
                          </p>
                        </div>
                      </div>

                      <div style={{ textAlign: "right" }}>
                        <p style={{ margin: 0, color: "var(--muted)" }}>Service Amount</p>
                        <p style={{ margin: "4px 0 0", color: "var(--text)", fontWeight: 800 }}>
                          {formatCurrency(request.price)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div style={{ marginTop: "18px" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      <span style={{ fontWeight: 600 }}>{assigned ? "On the way" : "Waiting for assignment"}</span>
                      <span style={{ color: "var(--muted)", fontSize: "0.92rem" }}>{progress}% complete</span>
                    </div>
                    <div
                      style={{
                        marginTop: "8px",
                        height: "8px",
                        borderRadius: "999px",
                        background: "rgba(20, 32, 51, 0.12)",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          width: `${progress}%`,
                          height: "100%",
                          background: "linear-gradient(90deg, rgba(21, 34, 53, 0.8), rgba(96, 112, 134, 0.72))",
                        }}
                      />
                    </div>
                  </div>
                </article>
              );
            })}
            </div>

            <aside className="app-grid">
              <div className="list-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3 style={{ margin: 0 }}>Live Tracking</h3>
                <span style={{ color: "var(--muted)", fontSize: "0.9rem", fontWeight: 700 }}>13 min</span>
              </div>

              <div
                style={{
                  marginTop: "16px",
                  height: "180px",
                  borderRadius: "16px",
                  position: "relative",
                  overflow: "hidden",
                  border: "1px solid var(--line)",
                }}
                className="tracking-map"
              >
                <div className="tracking-grid" />
                <div
                  className="tracking-car-pin"
                  style={{
                    position: "absolute",
                    top: "28%",
                    left: "24%",
                    width: "42px",
                    height: "42px",
                    borderRadius: "50%",
                    background: "rgba(21, 34, 53, 0.08)",
                    border: "1px solid rgba(21, 34, 53, 0.08)",
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  <div
                    className="tracking-car-pulse"
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: "50%",
                      background: "rgba(21, 34, 53, 0.12)",
                    }}
                  />
                  <div
                    style={{
                      width: "18px",
                      height: "18px",
                      borderRadius: "50%",
                      background: "var(--text)",
                    }}
                  />
                </div>
                <div
                  style={{
                    position: "absolute",
                    right: "12%",
                    bottom: "20%",
                    width: "14px",
                    height: "14px",
                    borderRadius: "50%",
                    background: "var(--muted)",
                    boxShadow: "0 0 0 4px rgba(96, 112, 134, 0.12)",
                  }}
                >
                  <div
                    className="tracking-destination"
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: "50%",
                      background: "rgba(96, 112, 134, 0.14)",
                    }}
                  />
                </div>
                <svg
                  viewBox="0 0 260 180"
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
                >
                  <path
                    d="M68 62C96 74 114 82 136 96C156 110 170 124 196 142"
                    className="tracking-route"
                    stroke="#607086"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <div style={{ marginTop: "14px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <span style={{ fontWeight: 700, color: "var(--text)" }}>Mechanic en route</span>
                  <span style={{ color: "var(--muted)", fontSize: "0.88rem" }}>
                    {activeRequests.length ? `${getProgress(activeRequests[0].status)}% complete` : "0% complete"}
                  </span>
                </div>
                <div
                  style={{
                    marginTop: "8px",
                    height: "8px",
                    borderRadius: "999px",
                    background: "rgba(20, 32, 51, 0.12)",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${activeRequests.length ? getProgress(activeRequests[0].status) : 0}%`,
                      height: "100%",
                      background: "linear-gradient(90deg, rgba(21, 34, 53, 0.8), rgba(96, 112, 134, 0.72))",
                    }}
                  />
                </div>
              </div>

              <div className="chip-row" style={{ marginTop: "16px" }}>
                <span className="info-chip" style={{ background: "rgba(255, 255, 255, 0.74)", color: "var(--text)" }}>
                  Started
                </span>
                <span className="info-chip">Nearby</span>
                <span className="info-chip">Arrived</span>
              </div>
              </div>
            </aside>
          </div>
        </section>
      )}
    </main>
  );
}

export default ActiveRequestsV2;
