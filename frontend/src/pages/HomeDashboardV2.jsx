import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BrandLogo from "../components/BrandLogo";

const vehicleOptions = [
  {
    title: "Car",
    description: "Emergency mechanics, EV support, tyre help, detailing, and SOS dispatch.",
    accent: "linear-gradient(135deg, #1f6f63, #2d9687)",
    icon: "C",
    cta: "Open Car Services",
    path: "/dashboard",
  },
  {
    title: "Bike",
    description: "Fast bike breakdown support, tire and tube service, fuel help, and home pickup care.",
    accent: "linear-gradient(135deg, #d46a3a, #c35241)",
    icon: "B",
    cta: "Open Bike Services",
    path: "/bike-dashboard",
  },
];

const footerGroups = [
  {
    title: "About AutoAssist",
    links: [
      {
        label: "How It Works",
        title: "How AutoAssist Works",
        body: "Choose your vehicle, pick the service you need, add the exact support options, and send the request for live assistance.",
      },
      {
        label: "Why AutoAssist",
        title: "Why Drivers Use AutoAssist",
        body: "AutoAssist brings emergency support, workshop coordination, and booking clarity into one clean roadside workflow.",
      },
      {
        label: "Safety Standards",
        title: "Safety Standards",
        body: "We focus on verified request details, emergency escalation flows, and clearer service selection before dispatch.",
      },
      {
        label: "Support",
        title: "Customer Support",
        body: "Use live requests, SOS Emergency, or direct support channels to get help when a vehicle issue becomes urgent.",
      },
      {
        label: "Contact Us",
        title: "Contact AutoAssist",
        body: "Reach the support team for booking help, emergency guidance, service issues, or account assistance.",
      },
    ],
  },
  {
    title: "Popular Services",
    links: [
      {
        label: "Mechanic Help",
        title: "Mechanic Help",
        body: "Book mechanic visits for inspection, urgent repair support, and on-location diagnosis.",
      },
      {
        label: "Fuel Delivery",
        title: "Fuel Delivery",
        body: "Get petrol or diesel delivered with rate-based pricing and nearby pump support links.",
      },
      {
        label: "EV Charging",
        title: "EV Charging",
        body: "Request EV help using charger type and kW capacity, with nearby charger links included.",
      },
      {
        label: "Tyre Service",
        title: "Tyre Service",
        body: "Choose car or bike tyre support options like puncture repair, replacement help, balancing, and inspection.",
      },
      {
        label: "SOS Emergency",
        title: "SOS Emergency",
        body: "Use free emergency support options and open nearby police station and hospital links instantly.",
      },
    ],
  },
  {
    title: "Emergency Resources",
    links: [
      {
        label: "Police Stations",
        title: "Nearby Police Stations",
        body: "Open nearby police stations from emergency flows when safety or reporting support is needed.",
      },
      {
        label: "Hospitals",
        title: "Nearby Hospitals",
        body: "Find nearby hospitals quickly during medical or accident emergencies from the SOS page.",
      },
      {
        label: "Tow Support",
        title: "Tow Support",
        body: "Access towing and recovery requests with detailed towing options for workshop drop, highway support, and accident recovery.",
      },
      {
        label: "Roadside Safety",
        title: "Roadside Safety",
        body: "Stay visible, share your location clearly, and use SOS when the vehicle issue also becomes a personal safety risk.",
      },
      {
        label: "Live Requests",
        title: "Live Requests",
        body: "Track your active service requests and see the dispatch flow in a cleaner real-time interface.",
      },
    ],
  },
];

const paymentPartners = [
  { label: "UPI", icon: "U", title: "UPI Payments", body: "Fast mobile-first payments for service completion and wallet top-ups." },
  { label: "Visa", icon: "V", title: "Visa", body: "Accepted for supported card payments and digital checkout flows." },
  { label: "Mastercard", icon: "M", title: "Mastercard", body: "Use Mastercard-backed cards for supported AutoAssist payments." },
  { label: "RuPay", icon: "R", title: "RuPay", body: "Domestic card support for eligible payment flows." },
  { label: "Paytm", icon: "P", title: "Paytm", body: "Wallet and payment support for faster checkout experiences." },
  { label: "PhonePe", icon: "P", title: "PhonePe", body: "UPI-based mobile payments for a smoother local transaction flow." },
];
const socialLinks = [
  { label: "Instagram", icon: "IG", title: "Instagram", body: "Visual product updates, roadside support stories, and launch announcements." },
  { label: "X", icon: "X", title: "X", body: "Fast updates, announcements, and support alerts." },
  { label: "YouTube", icon: "YT", title: "YouTube", body: "Walkthroughs, service demos, and app explainers." },
  { label: "LinkedIn", icon: "in", title: "LinkedIn", body: "Professional updates, hiring, and company news." },
];

function PaymentLogo({ label }) {
  if (label === "Visa") {
    return <span className="home-footer-logo-word visa-word">VISA</span>;
  }

  if (label === "Mastercard") {
    return (
      <span className="home-footer-logo-mastercard" aria-hidden="true">
        <span className="home-footer-logo-circle mastercard-left" />
        <span className="home-footer-logo-circle mastercard-right" />
      </span>
    );
  }

  if (label === "RuPay") {
    return <span className="home-footer-logo-word rupay-word">RuPay</span>;
  }

  if (label === "Paytm") {
    return <span className="home-footer-logo-word paytm-word">paytm</span>;
  }

  if (label === "PhonePe") {
    return <span className="home-footer-logo-phonepe">pe</span>;
  }

  return <span className="home-footer-logo-word upi-word">UPI</span>;
}

function SocialLogo({ label }) {
  if (label === "Instagram") {
    return <span className="home-footer-social-logo instagram-logo" aria-hidden="true" />;
  }

  if (label === "X") {
    return <span className="home-footer-logo-word x-word">X</span>;
  }

  if (label === "YouTube") {
    return (
      <span className="home-footer-social-logo youtube-logo" aria-hidden="true">
        <span className="youtube-play" />
      </span>
    );
  }

  return <span className="home-footer-logo-word linkedin-word">in</span>;
}

function HomeDashboardV2() {
  const navigate = useNavigate();
  const [activeFooterInfo, setActiveFooterInfo] = useState({
    title: "AutoAssist Footer Guide",
    body: "Click any payment partner, service link, emergency resource, or social badge to see more information here.",
  });

  return (
    <main className="page-shell app-grid">
      <section className="hero-card" style={{ padding: "36px" }}>
        <span className="eyebrow">Vehicle Selection</span>
        <h1 className="section-title">Choose your vehicle</h1>
        <p className="section-copy" style={{ maxWidth: "720px" }}>
          Pick a vehicle to continue.
        </p>
      </section>

      <section className="dashboard-grid">
        {vehicleOptions.map((option) => (
          <article
            key={option.title}
            className="feature-card"
            onClick={() => navigate(option.path)}
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                navigate(option.path);
              }
            }}
          >
            <div className="feature-icon" style={{ background: option.accent }}>
              {option.icon}
            </div>
            <h2 className="feature-title">{option.title}</h2>
            <p className="feature-copy">{option.description}</p>
            <div className="feature-meta">
              <span>{option.cta}</span>
              <span className="feature-tag">Live booking</span>
            </div>
          </article>
        ))}
      </section>

      <footer className="home-footer surface-card">
        <div className="home-footer-brand">
          <BrandLogo size="lg" />
          <p className="section-copy" style={{ maxWidth: "320px", marginTop: "14px" }}>
            Emergency vehicle support for car and bike owners with a cleaner booking flow and fast access
            to real help.
          </p>

          <div className="home-footer-payments">
            <h3>Payment Partners</h3>
            <div className="home-footer-badges">
              {paymentPartners.map((partner) => (
                <button
                  key={partner.label}
                  type="button"
                  className="home-footer-badge home-footer-badge-button"
                  onClick={() => setActiveFooterInfo({ title: partner.title, body: partner.body })}
                >
                  <PaymentLogo label={partner.label} />
                  <span>{partner.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="home-footer-info">
            <span className="eyebrow">Quick Info</span>
            <h3>{activeFooterInfo.title}</h3>
            <p>{activeFooterInfo.body}</p>
          </div>
        </div>

        <div className="home-footer-links">
          {footerGroups.map((group) => (
            <div key={group.title} className="home-footer-column">
              <h3>{group.title}</h3>
              <div className="home-footer-link-list">
                {group.links.map((link) => (
                  <button
                    key={link.label}
                    type="button"
                    className="home-footer-link"
                    onClick={() => setActiveFooterInfo({ title: link.title, body: link.body })}
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <div className="home-footer-column">
            <h3>Follow Us On</h3>
            <div className="home-footer-socials">
              {socialLinks.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  className="home-footer-social home-footer-badge-button"
                  onClick={() => setActiveFooterInfo({ title: item.title, body: item.body })}
                >
                  <SocialLogo label={item.label} />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
            <div className="home-footer-contact">
              <span>24x7 Support</span>
              <strong>help@autoassist.in</strong>
              <strong>+91 90000 12345</strong>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default HomeDashboardV2;
