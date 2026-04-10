import React, { useEffect, useMemo, useState } from "react";
import socket from "../socket";
import { getMyRequests } from "../services/serviceApi";
import { formatCurrency, formatRequestTitle, getRequestStats } from "../utils/requestUtils";

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

const getProgress = (status, completedLocally) => {
  if (completedLocally || status === "completed") {
    return 100;
  }

  if (status === "accepted") {
    return 55;
  }

  return 18;
};

const fallbackMechanic = {
  name: "Ravi Sharma",
  phone: "+919876543210",
  rating: 4.8,
  eta: "8-12 min",
  distance: "2.3 km away",
  speciality: "Emergency mechanic",
  vehicle: "AutoAssist Rapid Van",
  plate: "MH 12 AA 2045",
};

const getAssignedMechanic = (request = {}) => ({
  name: request.assignedMechanic || fallbackMechanic.name,
  phone: request.mechanicPhone || fallbackMechanic.phone,
  rating: request.mechanicRating || fallbackMechanic.rating,
  eta: request.mechanicEta || fallbackMechanic.eta,
  distance: request.mechanicDistance || fallbackMechanic.distance,
  speciality: request.mechanicSpeciality || fallbackMechanic.speciality,
  vehicle: request.assignedSupportVehicle || fallbackMechanic.vehicle,
  plate: request.assignedVehiclePlate || fallbackMechanic.plate,
  chatThread: request.chatThread?.length
    ? request.chatThread
    : [
        {
          sender: "mechanic",
          message: `Namaste, I am ${request.assignedMechanic || fallbackMechanic.name}. I have been assigned and I am on the way.`,
          time: "Just now",
        },
      ],
});

const getTimeline = (completedLocally) => {
  if (completedLocally) {
    return [
      { label: "Mechanic arrived", time: "12 min ago", done: true },
      { label: "Diagnosis complete", time: "8 min ago", done: true },
      { label: "Vehicle repaired", time: "Just now", done: true },
    ];
  }

  return [
    { label: "Mechanic arrived", time: "5 min ago", done: true },
    { label: "Diagnosis complete", time: "2 min ago", done: true },
    { label: "Repairing vehicle...", time: "In progress", done: false },
  ];
};

function ActiveRequestsV2() {
  const [requests, setRequests] = useState([]);
  const [completionState, setCompletionState] = useState({});
  const [paymentModalFor, setPaymentModalFor] = useState(null);
  const [successModalFor, setSuccessModalFor] = useState(null);
  const [reviewModalFor, setReviewModalFor] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState("card");
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState("");
  const [quickTags, setQuickTags] = useState([]);
  const [cardForm, setCardForm] = useState({ number: "", expiry: "", cvv: "" });
  const [chatRequest, setChatRequest] = useState(null);
  const [chatDraft, setChatDraft] = useState("");
  const [localChats, setLocalChats] = useState({});

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

  const requestStages = useMemo(
    () =>
      requests.reduce((acc, request) => {
        acc[request._id] = completionState[request._id] || "active";
        return acc;
      }, {}),
    [requests, completionState]
  );

  const activeRequests = useMemo(
    () => requests.filter((request) => requestStages[request._id] !== "completed"),
    [requests, requestStages]
  );

  const completedRequests = useMemo(
    () => requests.filter((request) => requestStages[request._id] === "completed"),
    [requests, requestStages]
  );

  const displayRequests = activeRequests.length ? activeRequests : completedRequests;
  const stats = getRequestStats(requests);
  const trackingRequest = displayRequests[0] || null;

  const closeAllModals = () => {
    setPaymentModalFor(null);
    setSuccessModalFor(null);
    setReviewModalFor(null);
  };

  const openPaymentFlow = (requestId) => {
    setSelectedMethod("card");
    setCardForm({ number: "", expiry: "", cvv: "" });
    setPaymentModalFor(requestId);
  };

  const handlePayment = () => {
    if (!paymentModalFor) {
      return;
    }

    setPaymentModalFor(null);
    setSuccessModalFor(paymentModalFor);
  };

  const handleSuccessClose = () => {
    if (!successModalFor) {
      return;
    }

    const requestId = successModalFor;
    setSuccessModalFor(null);
    setReviewModalFor(requestId);
  };

  const handleReviewSubmit = (requestId) => {
    setCompletionState((current) => ({
      ...current,
      [requestId]: "completed",
    }));
    setReviewModalFor(null);
    setRating(0);
    setComments("");
    setQuickTags([]);
  };

  const toggleQuickTag = (tag) => {
    setQuickTags((current) =>
      current.includes(tag) ? current.filter((item) => item !== tag) : [...current, tag]
    );
  };

  const openChat = (request) => {
    const mechanic = getAssignedMechanic(request);
    setChatRequest({ ...request, mechanic });
    setLocalChats((current) => ({
      ...current,
      [request._id]: current[request._id] || mechanic.chatThread,
    }));
  };

  const sendChatMessage = () => {
    if (!chatRequest || !chatDraft.trim()) {
      return;
    }

    const userMessage = {
      sender: "user",
      message: chatDraft.trim(),
      time: "Now",
    };
    const mechanicReply = {
      sender: "mechanic",
      message: "Received. I am checking your details and will call if I need anything else.",
      time: "Now",
    };

    setLocalChats((current) => ({
      ...current,
      [chatRequest._id]: [...(current[chatRequest._id] || []), userMessage, mechanicReply],
    }));
    setChatDraft("");
  };

  return (
    <>
      <main className="page-shell app-grid active-page-shell">
        <section className="active-page-header">
          <h1 style={{ margin: 0, fontSize: "2rem" }}>Active Service Requests</h1>
          <p className="section-copy" style={{ marginTop: "8px" }}>
            Track your ongoing service requests in real-time
          </p>
        </section>

        {displayRequests.length === 0 ? (
          <div className="empty-state">No active requests right now. New requests will show up here automatically.</div>
        ) : (
          <section className="app-grid" style={{ gap: "18px" }}>
            <div className="active-requests-layout">
              <div className="app-grid" style={{ gap: "18px" }}>
                {displayRequests.map((request) => {
                  const localStatus = requestStages[request._id];
                  const isCompleted = localStatus === "completed";
                  const title = formatRequestTitle(request);
                  const amount = request.price || 75;
                  const timeline = getTimeline(isCompleted);
                  const mechanic = getAssignedMechanic(request);

                  return (
                    <article
                      key={request._id}
                      className="list-card active-request-card"
                      style={{
                        borderLeft: `4px solid ${isCompleted ? "rgba(34, 197, 94, 0.45)" : "rgba(47, 111, 237, 0.5)"}`,
                      }}
                    >
                      <div className="active-request-top">
                        <div className="active-request-title-group">
                          <div className="active-request-icon">AA</div>
                          <div>
                            <h2 style={{ margin: "0 0 4px", fontSize: "1.15rem" }}>{title}</h2>
                            <p className="section-copy" style={{ fontSize: "0.95rem" }}>
                              {request.vehicleName || request.vehicleModel || "MH 12 AB 1234"}
                            </p>
                          </div>
                        </div>

                        <span className={`status-pill ${isCompleted ? "completed" : "active-service-pill"}`}>
                          {isCompleted ? "Service completed" : "Service in progress"}
                        </span>
                      </div>

                      <div className="active-request-meta">
                        <div>
                          <p className="active-label">Location</p>
                          <p className="active-meta-value">{request.location || "jagat"}</p>
                        </div>
                        <div>
                          <p className="active-label">Requested</p>
                          <p className="active-meta-value">{formatRequestTime(request.createdAt || request.timeSlot || "17:42")}</p>
                        </div>
                      </div>

                      <div style={{ marginTop: "18px" }}>
                        <p className="active-label">Problem Description</p>
                        <p className="active-problem-copy">{request.problem || "bkl"}</p>
                      </div>

                      <div className="active-mechanic-box">
                        <div className="active-mechanic-head">
                          <p style={{ margin: 0, fontWeight: 700 }}>Mechanic Assigned</p>
                          <div className="active-mechanic-actions">
                            <button
                              type="button"
                              className="mini-action-btn"
                              onClick={() => window.open(`tel:${mechanic.phone}`)}
                            >
                              Call
                            </button>
                            <button type="button" className="mini-action-btn" onClick={() => openChat(request)}>
                              Chat
                            </button>
                          </div>
                        </div>

                        <div className="active-mechanic-row">
                          <div className="active-mechanic-profile">
                            <div className="active-avatar">M</div>
                            <div>
                              <p style={{ margin: 0, fontWeight: 700 }}>{mechanic.name}</p>
                              <p style={{ margin: "4px 0 0", color: "var(--muted)", fontSize: "0.92rem" }}>
                                {mechanic.rating} rating - {mechanic.eta}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="active-assignment-strip">
                          <span>{mechanic.vehicle}</span>
                          <strong>{mechanic.plate}</strong>
                          <span>{mechanic.distance}</span>
                        </div>

                        {!isCompleted ? (
                          <div className="active-progress-list">
                            <p style={{ margin: "0 0 10px", fontWeight: 700 }}>Service Progress</p>
                            {timeline.map((step) => (
                              <div key={step.label} className="active-progress-item">
                                <span className={`active-progress-dot ${step.done ? "done" : "live"}`} />
                                <span>{step.label}</span>
                                <span className="active-progress-time">{step.time}</span>
                              </div>
                            ))}
                          </div>
                        ) : null}

                        <div className="active-amount-row">
                          <p style={{ margin: 0, color: "var(--muted)" }}>Service Amount</p>
                          <p className="active-amount-value">{formatCurrency(amount)}</p>
                        </div>
                      </div>

                      {isCompleted ? (
                        <div className="active-success-banner">
                          <strong>Service Completed Successfully!</strong>
                          <span>Your vehicle is ready. Payment has been completed.</span>
                        </div>
                      ) : (
                        <button
                          type="button"
                          className="primary-btn active-complete-btn"
                          onClick={() => openPaymentFlow(request._id)}
                        >
                          Mark as Complete
                        </button>
                      )}
                    </article>
                  );
                })}
              </div>

              <aside className="app-grid" style={{ gap: "18px" }}>
                {trackingRequest ? (
                  <div className="list-card active-tracking-card">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <h3 style={{ margin: 0 }}>Live Tracking</h3>
                    </div>

                    <div className="tracking-map active-tracking-map">
                      <div className="tracking-grid" />
                      <div className="tracking-car-pin active-tracking-pin">
                        <div className="tracking-car-pulse active-tracking-pulse" />
                        <span>ME</span>
                      </div>
                      <div className="active-tracking-destination">
                        <div className="tracking-destination" />
                      </div>
                      <svg
                        viewBox="0 0 260 180"
                        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
                      >
                        <path
                          d="M72 58C92 66 110 76 126 88C146 100 166 116 198 136"
                          className="tracking-route"
                          stroke="#2f6fed"
                          strokeWidth="3"
                          fill="none"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>

                    <div style={{ marginTop: "12px" }}>
                      <div className="active-tracking-title-row">
                        <span className="active-tracking-title">{getAssignedMechanic(trackingRequest).name} is on the way</span>
                        <span className="active-tracking-time">14 min</span>
                      </div>

                      <div className="active-progress-bar-shell">
                        <div
                          className="active-progress-bar-fill"
                          style={{ width: `${getProgress(trackingRequest.status, requestStages[trackingRequest._id] === "completed")}%` }}
                        />
                      </div>

                      <div className="active-tracking-caption">
                        <span>En route</span>
                        <span>{getProgress(trackingRequest.status, requestStages[trackingRequest._id] === "completed")}% complete</span>
                      </div>
                    </div>

                    <div className="active-stage-row">
                      <span className="active-stage-chip active">Started</span>
                      <span className="active-stage-chip">Nearby</span>
                      <span className="active-stage-chip">Arrived</span>
                    </div>
                  </div>
                ) : null}

                <div className="list-card active-stats-card">
                  <h3 style={{ marginTop: 0 }}>Your Stats</h3>
                  <div className="active-stats-list">
                    <div className="active-stat-line">
                      <span>Total Services</span>
                      <strong>{Math.max(stats.total, 12)}</strong>
                    </div>
                    <div className="active-stat-line">
                      <span>Active Requests</span>
                      <strong>{activeRequests.length}</strong>
                    </div>
                    <div className="active-stat-line">
                      <span>Money Saved</span>
                      <strong style={{ color: "var(--accent)" }}>Rs 20,500</strong>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </section>
        )}
      </main>

      {paymentModalFor ? (
        <div className="active-modal-backdrop" onClick={closeAllModals}>
          <div className="active-modal-card" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="active-modal-close" onClick={closeAllModals}>
              x
            </button>
            <h2 style={{ margin: 0 }}>Complete Payment</h2>
            <p className="section-copy" style={{ marginTop: "4px" }}>
              Pay for {formatRequestTitle(requests.find((request) => request._id === paymentModalFor) || {})}
            </p>

            <div className="active-payment-total">
              <span>Total Amount</span>
              <strong>{formatCurrency((requests.find((request) => request._id === paymentModalFor) || {}).price || 75)}</strong>
            </div>

            <div className="app-grid" style={{ gap: "10px" }}>
              <p style={{ margin: 0, fontWeight: 700 }}>Payment Method</p>

              <button
                type="button"
                className={`active-pay-option ${selectedMethod === "card" ? "selected" : ""}`}
                onClick={() => setSelectedMethod("card")}
              >
                <span>Credit/Debit Card</span>
              </button>

              <button
                type="button"
                className={`active-pay-option ${selectedMethod === "wallet" ? "selected" : ""}`}
                onClick={() => setSelectedMethod("wallet")}
              >
                <span>AutoAssist Wallet</span>
                <strong style={{ color: "var(--accent)" }}>Rs 12,500</strong>
              </button>

              <button
                type="button"
                className={`active-pay-option ${selectedMethod === "cash" ? "selected" : ""}`}
                onClick={() => setSelectedMethod("cash")}
              >
                <span>Cash Payment</span>
              </button>
            </div>

            {selectedMethod === "card" ? (
              <div className="app-grid" style={{ gap: "12px", marginTop: "18px" }}>
                <div className="field">
                  <label>Card Number</label>
                  <input
                    value={cardForm.number}
                    onChange={(event) => setCardForm((current) => ({ ...current, number: event.target.value }))}
                    placeholder="1234 5678 9012 3456"
                  />
                </div>

                <div className="grid-two">
                  <div className="field">
                    <label>Expiry</label>
                    <input
                      value={cardForm.expiry}
                      onChange={(event) => setCardForm((current) => ({ ...current, expiry: event.target.value }))}
                      placeholder="MM/YY"
                    />
                  </div>
                  <div className="field">
                    <label>CVV</label>
                    <input
                      value={cardForm.cvv}
                      onChange={(event) => setCardForm((current) => ({ ...current, cvv: event.target.value }))}
                      placeholder="123"
                    />
                  </div>
                </div>
              </div>
            ) : null}

            <div className="active-modal-actions">
              <button type="button" className="secondary-btn" onClick={closeAllModals}>
                Cancel
              </button>
              <button type="button" className="primary-btn" onClick={handlePayment}>
                Pay {formatCurrency((requests.find((request) => request._id === paymentModalFor) || {}).price || 75)}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {successModalFor ? (
        <div className="active-modal-backdrop" onClick={handleSuccessClose}>
          <div className="active-success-modal" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="active-modal-close" onClick={handleSuccessClose}>
              x
            </button>
            <div className="active-success-check">OK</div>
            <h2 style={{ margin: "8px 0 6px" }}>Payment Successful!</h2>
            <p className="section-copy">Thank you for using AutoAssist</p>
          </div>
        </div>
      ) : null}

      {reviewModalFor ? (
        <div className="active-modal-backdrop" onClick={() => handleReviewSubmit(reviewModalFor)}>
          <div className="active-modal-card" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="active-modal-close" onClick={() => handleReviewSubmit(reviewModalFor)}>
              x
            </button>
            <h2 style={{ margin: 0 }}>Rate Your Experience</h2>
            <p className="section-copy" style={{ marginTop: "4px" }}>
              How was your service with {getAssignedMechanic(requests.find((request) => request._id === reviewModalFor) || {}).name}?
            </p>

            <div className="active-review-service">
              <span>Service</span>
              <strong>{formatRequestTitle(requests.find((request) => request._id === reviewModalFor) || {})}</strong>
            </div>

            <div className="active-star-row">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  className={`active-star-btn ${rating >= value ? "filled" : ""}`}
                  onClick={() => setRating(value)}
                >
                  *
                </button>
              ))}
            </div>

            <div className="field">
              <label>Additional Comments (Optional)</label>
              <textarea
                value={comments}
                onChange={(event) => setComments(event.target.value)}
                placeholder="Tell us about your experience..."
              />
            </div>

            <div className="app-grid" style={{ gap: "10px" }}>
              <p style={{ margin: 0, fontWeight: 700 }}>Quick feedback</p>
              <div className="chip-row">
                {["Professional", "On Time", "Friendly", "Expert", "Fair Price"].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    className={`info-chip active-review-chip ${quickTags.includes(tag) ? "selected" : ""}`}
                    onClick={() => toggleQuickTag(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="active-modal-actions">
              <button type="button" className="secondary-btn" onClick={() => handleReviewSubmit(reviewModalFor)}>
                Skip
              </button>
              <button type="button" className="primary-btn" onClick={() => handleReviewSubmit(reviewModalFor)}>
                Submit Review
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {chatRequest ? (
        <div className="active-modal-backdrop" onClick={() => setChatRequest(null)}>
          <div className="active-modal-card active-chat-card" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="active-modal-close" onClick={() => setChatRequest(null)}>
              x
            </button>
            <div className="active-chat-head">
              <div className="active-avatar">M</div>
              <div>
                <h2 style={{ margin: 0 }}>{chatRequest.mechanic.name}</h2>
                <p className="section-copy">
                  {chatRequest.mechanic.vehicle} - {chatRequest.mechanic.plate}
                </p>
              </div>
              <button
                type="button"
                className="mini-action-btn"
                onClick={() => window.open(`tel:${chatRequest.mechanic.phone}`)}
              >
                Call
              </button>
            </div>

            <div className="active-chat-thread">
              {(localChats[chatRequest._id] || chatRequest.mechanic.chatThread).map((message, index) => (
                <div key={`${message.sender}-${index}`} className={`active-chat-bubble ${message.sender}`}>
                  <p>{message.message}</p>
                  <span>{message.time}</span>
                </div>
              ))}
            </div>

            <div className="active-chat-input-row">
              <input
                value={chatDraft}
                onChange={(event) => setChatDraft(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    sendChatMessage();
                  }
                }}
                placeholder="Type your message..."
              />
              <button type="button" className="primary-btn" onClick={sendChatMessage}>
                Send
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default ActiveRequestsV2;
