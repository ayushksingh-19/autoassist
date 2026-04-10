import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MapComponent from "../components/MapComponent";
import { createRequest } from "../services/serviceApi";
import {
  calculateEvChargingTotal,
  calculateFuelDeliveryTotal,
  getEvBaseVisitPrice,
  getEvCapacityPrice,
  getFuelDeliveryFee,
  getFuelRatePerLitre,
  parseNumericInput,
} from "../utils/requestUtils";

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
    chargerCapacity: state.chargerCapacity || "",
    fuelQuantity: state.fuelQuantity || "",
    roadsideAssistance: state.roadsideAssistance || "",
    washPackage: state.washPackage || "",
    tyreOption: state.tyreOption || "",
    acOptions: state.acOptions || "",
    lockoutOptions: state.lockoutOptions || "",
    towingOptions: state.towingOptions || "",
    detailingOptions: state.detailingOptions || "",
    healthCheckOptions: state.healthCheckOptions || "",
    engineDiagnosticOptions: state.engineDiagnosticOptions || "",
    emergencyOptions: state.emergencyOptions || "",
    bikeMechanicOptions: state.bikeMechanicOptions || "",
    bikeBatteryOptions: state.bikeBatteryOptions || "",
    bikeChainBrakeOptions: state.bikeChainBrakeOptions || "",
    bikeSuspensionOptions: state.bikeSuspensionOptions || "",
    bikeClutchGearOptions: state.bikeClutchGearOptions || "",
    bikePickupDropOptions: state.bikePickupDropOptions || "",
    bikeEngineJobOptions: state.bikeEngineJobOptions || "",
    price: state.price || state.packagePrice || 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEvCharging = form.serviceType === "EV Charging";
  const isFuelDelivery = form.serviceType === "Fuel Delivery";
  const calculatedPrice = useMemo(() => {
    if (isEvCharging) {
      return calculateEvChargingTotal(form.chargerCapacity, form.vehicleType);
    }

    if (isFuelDelivery) {
      return calculateFuelDeliveryTotal(form.fuelType, form.fuelQuantity, form.vehicleType);
    }

    return Number(form.price || 0);
  }, [form.chargerCapacity, form.fuelQuantity, form.fuelType, form.price, form.vehicleType, isEvCharging, isFuelDelivery]);

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
        fuelType: isFuelDelivery ? form.fuelType : "",
        problem: form.problem,
        location: form.location,
        lat: form.lat,
        lng: form.lng,
        date: form.date,
        timeSlot: form.timeSlot,
        detailingService: form.detailingService || form.packageName,
        price: calculatedPrice,
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
          <h1 className="section-title">Confirm your request and dispatch support.</h1>
          <p className="section-copy">
            This is the last step before dispatch. Your request will appear in Live Requests with
            the assigned mechanic, support vehicle, call, and chat options in one place.
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
              {isFuelDelivery ? (
                <div className="field">
                  <label htmlFor="fuelType">Fuel Type</label>
                  <input id="fuelType" value={form.fuelType} onChange={setField("fuelType")} />
                </div>
              ) : null}

              <div className="field">
                <label htmlFor="paymentMethod">Payment Method</label>
                <input
                  id="paymentMethod"
                  value={form.paymentMethod}
                  onChange={setField("paymentMethod")}
                />
              </div>
            </div>

            {isEvCharging || isFuelDelivery ? (
              <div className="grid-two">
                {isEvCharging ? (
                  <div className="field">
                    <label htmlFor="chargerCapacity">Charger Type / Capacity (kW)</label>
                    <input
                      id="chargerCapacity"
                      value={form.chargerCapacity}
                      onChange={setField("chargerCapacity")}
                    />
                  </div>
                ) : (
                  <div className="field">
                    <label htmlFor="fuelQuantity">Fuel Quantity (litres)</label>
                    <input
                      id="fuelQuantity"
                      value={form.fuelQuantity}
                      onChange={setField("fuelQuantity")}
                    />
                  </div>
                )}
              </div>
            ) : null}

            {form.serviceType === "Roadside Repair" ? (
              <div className="field">
                <label htmlFor="roadsideAssistance">Roadside Assistance</label>
                <input
                  id="roadsideAssistance"
                  value={form.roadsideAssistance}
                  onChange={setField("roadsideAssistance")}
                />
              </div>
            ) : null}

            {form.serviceType === "Washing & Cleaning" ? (
              <div className="field">
                <label htmlFor="washPackage">Cleaning Options</label>
                <input id="washPackage" value={form.washPackage} onChange={setField("washPackage")} />
              </div>
            ) : null}

            {form.serviceType === "Tyre Services" ? (
              <div className="field">
                <label htmlFor="tyreOption">Tyre Service Option</label>
                <input id="tyreOption" value={form.tyreOption} onChange={setField("tyreOption")} />
              </div>
            ) : null}

            {serviceLabel === "AC Check & Cooling" ? (
              <div className="field">
                <label htmlFor="acOptions">AC Service Options</label>
                <input id="acOptions" value={form.acOptions} onChange={setField("acOptions")} />
              </div>
            ) : null}

            {serviceLabel === "Lockout Assistance" ? (
              <div className="field">
                <label htmlFor="lockoutOptions">Lockout Assistance Options</label>
                <input id="lockoutOptions" value={form.lockoutOptions} onChange={setField("lockoutOptions")} />
              </div>
            ) : null}

            {serviceLabel === "Towing & Recovery" ? (
              <div className="field">
                <label htmlFor="towingOptions">Towing Options</label>
                <input id="towingOptions" value={form.towingOptions} onChange={setField("towingOptions")} />
              </div>
            ) : null}

            {form.serviceType === "Detailing" ? (
              <div className="field">
                <label htmlFor="detailingOptions">Detailing Options</label>
                <input
                  id="detailingOptions"
                  value={form.detailingOptions}
                  onChange={setField("detailingOptions")}
                />
              </div>
            ) : null}

            {serviceLabel === "Health Check-Up" || serviceLabel === "Vehicle Health Check-Up" ? (
              <div className="field">
                <label htmlFor="healthCheckOptions">Health Check Options</label>
                <input
                  id="healthCheckOptions"
                  value={form.healthCheckOptions}
                  onChange={setField("healthCheckOptions")}
                />
              </div>
            ) : null}

            {serviceLabel === "Engine Diagnostics" ? (
              <div className="field">
                <label htmlFor="engineDiagnosticOptions">Engine Diagnostic Options</label>
                <input
                  id="engineDiagnosticOptions"
                  value={form.engineDiagnosticOptions}
                  onChange={setField("engineDiagnosticOptions")}
                />
              </div>
            ) : null}

            {form.serviceType === "SOS Emergency" ? (
              <div className="field">
                <label htmlFor="emergencyOptions">Emergency Support Options</label>
                <input
                  id="emergencyOptions"
                  value={form.emergencyOptions}
                  onChange={setField("emergencyOptions")}
                />
              </div>
            ) : null}

            {serviceLabel === "Mobile Mechanic" ? (
              <div className="field">
                <label htmlFor="bikeMechanicOptions">Bike Mechanic Options</label>
                <input
                  id="bikeMechanicOptions"
                  value={form.bikeMechanicOptions}
                  onChange={setField("bikeMechanicOptions")}
                />
              </div>
            ) : null}

            {serviceLabel === "Battery Service" ? (
              <div className="field">
                <label htmlFor="bikeBatteryOptions">Battery Service Options</label>
                <input
                  id="bikeBatteryOptions"
                  value={form.bikeBatteryOptions}
                  onChange={setField("bikeBatteryOptions")}
                />
              </div>
            ) : null}

            {serviceLabel === "Chain & Brake Repair" ? (
              <div className="field">
                <label htmlFor="bikeChainBrakeOptions">Chain and Brake Options</label>
                <input
                  id="bikeChainBrakeOptions"
                  value={form.bikeChainBrakeOptions}
                  onChange={setField("bikeChainBrakeOptions")}
                />
              </div>
            ) : null}

            {serviceLabel === "Suspension Check" ? (
              <div className="field">
                <label htmlFor="bikeSuspensionOptions">Suspension Options</label>
                <input
                  id="bikeSuspensionOptions"
                  value={form.bikeSuspensionOptions}
                  onChange={setField("bikeSuspensionOptions")}
                />
              </div>
            ) : null}

            {serviceLabel === "Clutch & Gear Support" ? (
              <div className="field">
                <label htmlFor="bikeClutchGearOptions">Clutch and Gear Options</label>
                <input
                  id="bikeClutchGearOptions"
                  value={form.bikeClutchGearOptions}
                  onChange={setField("bikeClutchGearOptions")}
                />
              </div>
            ) : null}

            {serviceLabel === "Pickup & Workshop Drop" ? (
              <div className="field">
                <label htmlFor="bikePickupDropOptions">Pickup and Drop Options</label>
                <input
                  id="bikePickupDropOptions"
                  value={form.bikePickupDropOptions}
                  onChange={setField("bikePickupDropOptions")}
                />
              </div>
            ) : null}

            {serviceLabel === "Engine Jobs" ? (
              <div className="field">
                <label htmlFor="bikeEngineJobOptions">Engine Job Options</label>
                <input
                  id="bikeEngineJobOptions"
                  value={form.bikeEngineJobOptions}
                  onChange={setField("bikeEngineJobOptions")}
                />
              </div>
            ) : null}

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
              <button type="submit" className="primary-btn" disabled={isSubmitting}>
                {isSubmitting ? "Creating Request..." : "Submit Request"}
              </button>
            </div>
          </div>
        </form>
      </section>

      <aside className="summary-card">
        <span className="eyebrow" style={{ color: "var(--accent-strong)", background: "var(--accent-soft)" }}>
          Booking Snapshot
        </span>
        <h2 style={{ fontFamily: '"Space Grotesk", sans-serif', marginBottom: "8px" }}>
          {serviceLabel || form.serviceType}
        </h2>
        <p>{form.vehicleType || "Vehicle details will be sent with your request."}</p>

        <div className="stack" style={{ marginTop: "20px" }}>
          <div>
            <strong>Estimated total</strong>
            <p style={{ color: "var(--accent)", fontSize: "1.8rem", fontWeight: 800 }}>
              Rs {calculatedPrice.toLocaleString("en-IN")}
            </p>
          </div>
          <div>
            <strong>Timing</strong>
            <p>{form.timeSlot || "ASAP dispatch"}</p>
          </div>
          {isEvCharging ? (
            <>
              <div>
                <strong>EV visit fee</strong>
                <p>Rs {getEvBaseVisitPrice(form.vehicleType).toLocaleString("en-IN")}</p>
              </div>
              <div>
                <strong>Charger capacity</strong>
                <p>{form.chargerCapacity || "Not specified yet"}</p>
              </div>
              <div>
                <strong>Capacity estimate</strong>
                <p>
                  {getEvCapacityPrice(form.chargerCapacity, form.vehicleType)
                    ? `Rs ${getEvCapacityPrice(form.chargerCapacity, form.vehicleType).toLocaleString("en-IN")}`
                    : "Enter charger kW"}
                </p>
              </div>
            </>
          ) : null}
          {isFuelDelivery ? (
            <>
              <div>
                <strong>Fuel type</strong>
                <p>{form.fuelType || "Not selected yet"}</p>
              </div>
              <div>
                <strong>Delivery fee</strong>
                <p>Rs {getFuelDeliveryFee(form.vehicleType).toLocaleString("en-IN")}</p>
              </div>
              <div>
                <strong>Fuel quantity</strong>
                <p>{form.fuelQuantity ? `${parseNumericInput(form.fuelQuantity)} litres` : "Not specified yet"}</p>
              </div>
              <div>
                <strong>Fuel rate</strong>
                <p>
                  {getFuelRatePerLitre(form.fuelType)
                    ? `Rs ${getFuelRatePerLitre(form.fuelType).toLocaleString("en-IN")} per litre`
                    : "Select fuel type"}
                </p>
              </div>
            </>
          ) : null}
          {form.serviceType === "Roadside Repair" ? (
            <div>
              <strong>Roadside support</strong>
              <p>{form.roadsideAssistance || "No assistance add-on"}</p>
            </div>
          ) : null}
          {form.serviceType === "Washing & Cleaning" ? (
            <div>
              <strong>Cleaning options</strong>
              <p>{form.washPackage || "No cleaning option selected"}</p>
            </div>
          ) : null}
          {form.serviceType === "Tyre Services" ? (
            <div>
              <strong>Tyre service</strong>
              <p>{form.tyreOption || "No tyre option selected"}</p>
            </div>
          ) : null}
          {serviceLabel === "AC Check & Cooling" ? (
            <div>
              <strong>AC service</strong>
              <p>{form.acOptions || "No AC option selected"}</p>
            </div>
          ) : null}
          {serviceLabel === "Lockout Assistance" ? (
            <div>
              <strong>Lockout assistance</strong>
              <p>{form.lockoutOptions || "No lockout option selected"}</p>
            </div>
          ) : null}
          {serviceLabel === "Towing & Recovery" ? (
            <div>
              <strong>Towing service</strong>
              <p>{form.towingOptions || "No towing option selected"}</p>
            </div>
          ) : null}
          {form.serviceType === "Detailing" ? (
            <div>
              <strong>Detailing service</strong>
              <p>{form.detailingOptions || "No detailing option selected"}</p>
            </div>
          ) : null}
          {serviceLabel === "Health Check-Up" || serviceLabel === "Vehicle Health Check-Up" ? (
            <div>
              <strong>Health check</strong>
              <p>{form.healthCheckOptions || "No health check option selected"}</p>
            </div>
          ) : null}
          {serviceLabel === "Engine Diagnostics" ? (
            <div>
              <strong>Engine diagnostics</strong>
              <p>{form.engineDiagnosticOptions || "No engine diagnostic option selected"}</p>
            </div>
          ) : null}
          {form.serviceType === "SOS Emergency" ? (
            <div>
              <strong>Emergency support</strong>
              <p>{form.emergencyOptions || "No emergency option selected"}</p>
            </div>
          ) : null}
          {serviceLabel === "Mobile Mechanic" ? (
            <div>
              <strong>Bike mechanic support</strong>
              <p>{form.bikeMechanicOptions || "No mechanic option selected"}</p>
            </div>
          ) : null}
          {serviceLabel === "Battery Service" ? (
            <div>
              <strong>Battery service</strong>
              <p>{form.bikeBatteryOptions || "No battery option selected"}</p>
            </div>
          ) : null}
          {serviceLabel === "Chain & Brake Repair" ? (
            <div>
              <strong>Chain and brake service</strong>
              <p>{form.bikeChainBrakeOptions || "No chain or brake option selected"}</p>
            </div>
          ) : null}
          {serviceLabel === "Suspension Check" ? (
            <div>
              <strong>Suspension service</strong>
              <p>{form.bikeSuspensionOptions || "No suspension option selected"}</p>
            </div>
          ) : null}
          {serviceLabel === "Clutch & Gear Support" ? (
            <div>
              <strong>Clutch and gear service</strong>
              <p>{form.bikeClutchGearOptions || "No clutch or gear option selected"}</p>
            </div>
          ) : null}
          {serviceLabel === "Pickup & Workshop Drop" ? (
            <div>
              <strong>Pickup and drop service</strong>
              <p>{form.bikePickupDropOptions || "No pickup option selected"}</p>
            </div>
          ) : null}
          {serviceLabel === "Engine Jobs" ? (
            <div>
              <strong>Engine jobs</strong>
              <p>{form.bikeEngineJobOptions || "No engine job option selected"}</p>
            </div>
          ) : null}
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
