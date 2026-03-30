import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MapComponent from "../components/MapComponent";
import { createRequest } from "../services/serviceApi";

function ServiceRequestV2() {
  const navigate = useNavigate();
  const locationState = useLocation();
  const state = locationState.state || {};
  const serviceLabel = state.serviceLabel || state.serviceType || "";

  const [form, setForm] = useState({
    serviceType: state.serviceType || "",
    vehicleType: state.vehicleType || "",
    fuelType: state.fuelType || "",
    vehicleModel: state.vehicleModel || "",
    problem: state.problem || "",
    location: state.location || "",
    lat: state.lat || null,
    lng: state.lng || null,
    date: state.date || "",
    timeSlot: state.timeSlot || "",
    paymentMethod: state.paymentMethod || "Pay after service",
    packageName: state.packageName || "",
    detailingService: state.detailingService || "",
    price: state.price || state.packagePrice || 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const requestsForMap = useMemo(() => {
    if (!form.lat || !form.lng) {
      return [];
    }

    return [
      {
        lat: form.lat,
        lng: form.lng,
        serviceType: form.serviceType,
        vehicleType: form.vehicleType,
      },
    ];
  }, [form]);

  const setField = (field) => (event) => {
    setForm((current) => ({
      ...current,
      [field]: event.target.value,
    }));
  };

  const detectLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported on this device.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setForm((current) => ({
          ...current,
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          location:
            current.location ||
            `Lat ${position.coords.latitude.toFixed(5)}, Lng ${position.coords.longitude.toFixed(5)}`,
        }));
      },
      () => alert("Unable to fetch your current location.")
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.serviceType || !form.location) {
      alert("Service type and location are required.");
      return;
    }

    setIsSubmitting(true);

    try {
      await createRequest({
        serviceType: form.serviceType,
        vehicleType: form.vehicleType || form.vehicleModel || "General vehicle",
        fuelType: form.fuelType,
        problem: form.problem,
        location: form.location,
        lat: form.lat,
        lng: form.lng,
        date: form.date,
        timeSlot: form.timeSlot,
        detailingService: form.detailingService || form.packageName,
        price: form.price,
        paymentMethod: form.paymentMethod,
      });

      navigate("/active");
    } catch (error) {
      alert(error.response?.data?.message || "Unable to create the request.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="page-shell split-layout">
      <section className="app-grid">
        <div className="hero-card" style={{ padding: "32px" }}>
          <span className="eyebrow">{serviceLabel || "Final Confirmation"}</span>
          <h1 className="section-title">Send the request to the backend with all service details ready.</h1>
          <p className="section-copy">
            This is the last step before dispatch. Everything here gets posted to your live service
            request history so you can track it from the active requests screen.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="surface-card" style={{ padding: "28px" }}>
          <div className="stack">
            <div className="grid-two">
              <div className="field">
                <label htmlFor="serviceType">Service Type</label>
                <input id="serviceType" value={form.serviceType} onChange={setField("serviceType")} required />
              </div>

              <div className="field">
                <label htmlFor="vehicleType">Vehicle</label>
                <input id="vehicleType" value={form.vehicleType} onChange={setField("vehicleType")} />
              </div>
            </div>

            <div className="grid-two">
              <div className="field">
                <label htmlFor="fuelType">Fuel Type</label>
                <input id="fuelType" value={form.fuelType} onChange={setField("fuelType")} />
              </div>

              <div className="field">
                <label htmlFor="paymentMethod">Payment Method</label>
                <input
                  id="paymentMethod"
                  value={form.paymentMethod}
                  onChange={setField("paymentMethod")}
                />
              </div>
            </div>

            <div className="field">
              <label htmlFor="location">Location</label>
              <input
                id="location"
                value={form.location}
                onChange={setField("location")}
                placeholder="Enter your exact address or coordinates"
                required
              />
            </div>

            <div className="inline-actions">
              <button type="button" className="ghost-btn" onClick={detectLocation}>
                Refresh Location
              </button>
            </div>

            <div className="grid-two">
              <div className="field">
                <label htmlFor="date">Scheduled Date</label>
                <input id="date" type="date" value={form.date} onChange={setField("date")} />
              </div>

              <div className="field">
                <label htmlFor="timeSlot">Scheduled Time</label>
                <input id="timeSlot" value={form.timeSlot} onChange={setField("timeSlot")} />
              </div>
            </div>

            <div className="field">
              <label htmlFor="problem">Problem Description</label>
              <textarea
                id="problem"
                value={form.problem}
                onChange={setField("problem")}
                placeholder="Share symptoms, urgency, and any special instructions for the mechanic."
              />
            </div>

            {requestsForMap.length ? (
              <div className="map-shell">
                <MapComponent requests={requestsForMap} />
              </div>
            ) : null}

            <div className="inline-actions">
              <button type="button" className="secondary-btn" onClick={() => navigate(-1)}>
                Back
              </button>
              <button type="submit" className="primary-btn" disabled={isSubmitting}>
                {isSubmitting ? "Creating Request..." : "Submit Request"}
              </button>
            </div>
          </div>
        </form>
      </section>

      <aside className="summary-card">
        <span className="eyebrow" style={{ color: "#f6f2e9", background: "rgba(255,255,255,0.1)" }}>
          Booking Snapshot
        </span>
        <h2 style={{ fontFamily: '"Space Grotesk", sans-serif', marginBottom: "8px" }}>
          {serviceLabel || form.serviceType}
        </h2>
        <p>{form.vehicleType || "Vehicle details will be sent with your request."}</p>

        <div className="stack" style={{ marginTop: "20px" }}>
          <div>
            <strong>Package</strong>
            <p>{form.packageName || form.detailingService || "Standard request"}</p>
          </div>
          <div>
            <strong>Estimated total</strong>
            <p style={{ color: "#fff7ef", fontSize: "1.8rem", fontWeight: 800 }}>
              Rs {Number(form.price || 0).toLocaleString("en-IN")}
            </p>
          </div>
          <div>
            <strong>Timing</strong>
            <p>{form.timeSlot || "ASAP dispatch"}</p>
          </div>
          <div>
            <strong>Location status</strong>
            <p>{form.lat && form.lng ? "Coordinates captured" : "Manual address entry"}</p>
          </div>
        </div>
      </aside>
    </main>
  );
}

export default ServiceRequestV2;
