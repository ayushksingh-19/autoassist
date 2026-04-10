import React from "react";
import { useNavigate } from "react-router-dom";

const emergencyActions = [
  {
    title: "Call AutoAssist",
    copy: "Connect with roadside support for urgent vehicle help.",
    action: "tel:+919000012345",
    label: "+91 90000 12345",
  },
  {
    title: "SOS Emergency",
    copy: "Open the free SOS flow with police and hospital links.",
    route: "/service",
    state: { serviceType: "SOS Emergency", serviceLabel: "SOS Emergency", vehicleType: "Car" },
    label: "Open SOS",
  },
  {
    title: "Nearby Hospitals",
    copy: "Open Google Maps for hospitals near your current location.",
    action: "https://www.google.com/maps/search/hospital+near+me",
    label: "Find Hospitals",
  },
  {
    title: "Police Station",
    copy: "Find nearby police stations for accident or safety support.",
    action: "https://www.google.com/maps/search/police+station+near+me",
    label: "Find Police",
  },
];

const serviceCoverage = [
  "Battery Jumpstart",
  "Tyre & Tube Help",
  "Fuel Delivery",
  "EV Charging",
  "Towing & Recovery",
  "Lockout Help",
  "Roadside Repair",
  "Accident Support",
];

const faqs = [
  {
    question: "When should I use the red emergency call button?",
    answer: "Use it when your vehicle is stuck, unsafe, involved in an accident, or you need urgent roadside guidance.",
  },
  {
    question: "Is SOS emergency support paid?",
    answer: "SOS emergency guidance is free. Paid charges apply only if you choose a service like towing, tyre repair, or fuel delivery.",
  },
  {
    question: "Can I call and still create a service request?",
    answer: "Yes. You can call support first, then open the SOS or service booking flow to submit details and track help.",
  },
  {
    question: "Are nearby police stations and hospitals included?",
    answer: "Yes. This page includes quick Google Maps links for nearby police stations and hospitals.",
  },
  {
    question: "Does this work for both cars and bikes?",
    answer: "Yes. AutoAssist supports car, bike, and EV emergency flows across supported service locations.",
  },
];

function EmergencyCallPage() {
  const navigate = useNavigate();

  const openAction = (item) => {
    if (item.route) {
      navigate(item.route, { state: item.state });
      return;
    }

    window.open(item.action, "_blank", "noopener,noreferrer");
  };

  return (
    <main className="page-shell app-grid emergency-page">
      <section className="hero-card emergency-hero">
        <div>
          <span className="eyebrow">Emergency Call Support</span>
          <h1 className="section-title">Need urgent roadside help?</h1>
          <p className="section-copy">
            Call AutoAssist, open SOS support, or find nearby emergency resources from one calm page.
          </p>
        </div>

        <div className="emergency-hero-card">
          <span>24x7 Hotline</span>
          <strong>+91 90000 12345</strong>
          <a href="tel:+919000012345" className="primary-btn emergency-call-link">
            Call Now
          </a>
        </div>
      </section>

      <section className="emergency-action-grid">
        {emergencyActions.map((item, index) => (
          <button
            key={item.title}
            type="button"
            className="list-card emergency-action-card"
            style={{ "--delay": `${index * 70}ms` }}
            onClick={() => openAction(item)}
          >
            <span className="emergency-card-number">{String(index + 1).padStart(2, "0")}</span>
            <h2>{item.title}</h2>
            <p>{item.copy}</p>
            <strong>{item.label}</strong>
          </button>
        ))}
      </section>

      <section className="surface-card emergency-coverage-panel">
        <div>
          <span className="eyebrow">Coverage</span>
          <h2>Emergency help for common roadside problems</h2>
          <p className="section-copy">
            Choose the support path you need. The red button is only a shortcut, not a replacement for emergency services.
          </p>
        </div>

        <div className="emergency-coverage-grid">
          {serviceCoverage.map((item) => (
            <button key={item} type="button" className="info-chip" onClick={() => navigate("/home")}>
              {item}
            </button>
          ))}
        </div>
      </section>

      <section className="emergency-faq-section">
        <div className="explore-section-head emergency-section-head">
          <h2>Emergency questions, answered simply</h2>
          <p>Quick clarity before you call or submit a request.</p>
        </div>

        <div className="emergency-faq-list">
          {faqs.map((item, index) => (
            <details key={item.question} className="emergency-faq-item" open={index === 0}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="emergency-bottom-cta">
        <div>
          <h2>Stay safe first. We’ll handle the vehicle next.</h2>
          <p>If you are in danger, call local emergency services immediately. For roadside vehicle support, use AutoAssist.</p>
        </div>
        <button type="button" className="primary-btn" onClick={() => navigate("/service", { state: emergencyActions[1].state })}>
          Start SOS Request
        </button>
      </section>
    </main>
  );
}

export default EmergencyCallPage;
