import React from "react";
import { useNavigate } from "react-router-dom";

const membershipPlans = [
  {
    name: "Essential Assist",
    price: "Rs 1,499",
    cadence: "monthly",
    badge: "Starter",
    description: "For users who want quick roadside coverage without buying a full service bundle.",
    features: ["Priority request support", "Basic vehicle inspection", "Roadside coordination", "Member-only support line"],
  },
  {
    name: "Priority Assist",
    price: "Rs 2,499",
    cadence: "monthly",
    badge: "Popular",
    description: "Faster dispatch and better coverage for regular city driving.",
    features: ["Faster mechanic assignment", "Expanded diagnosis support", "Fuel and tyre help coordination", "Live tracking priority"],
  },
  {
    name: "Signature Care",
    price: "Rs 3,999",
    cadence: "monthly",
    badge: "Premium",
    description: "Premium roadside care with senior support and broader assistance options.",
    features: ["Senior mechanic routing", "Advanced diagnostic support", "High-priority emergency handling", "Premium assistance desk"],
  },
];

const servicePacks = [
  {
    title: "Car Care Pack",
    price: "From Rs 1,199",
    copy: "Roadside visit, basic fault check, minor repair attempt, and breakdown coordination.",
  },
  {
    title: "Bike Ready Pack",
    price: "From Rs 799",
    copy: "Mobile mechanic support, chain/brake checks, battery help, and pickup coordination.",
  },
  {
    title: "Detailing Plus",
    price: "From Rs 2,999",
    copy: "Deep cleaning, polishing, ceramic top-up, PPF consultation, and premium finish options.",
  },
  {
    title: "Emergency Shield",
    price: "Free SOS support",
    copy: "Police station and hospital links, emergency coordination, and urgent roadside guidance.",
  },
];

function PremiumPackagesPage() {
  const navigate = useNavigate();

  return (
    <main className="page-shell app-grid">
      <section className="hero-card premium-hero">
        <div>
          <span className="eyebrow">Premium Packages</span>
          <h1 className="section-title">Plans stay separate from service booking.</h1>
          <p className="section-copy">
            Buy a premium membership when you want coverage. Book individual services when you only need one job.
          </p>
        </div>
        <button type="button" className="primary-btn" onClick={() => navigate("/wallet")}>
          Manage Subscription
        </button>
      </section>

      <section className="premium-plan-grid">
        {membershipPlans.map((plan) => (
          <article key={plan.name} className="list-card premium-plan-card">
            <div className="premium-plan-head">
              <span className="feature-tag">{plan.badge}</span>
              <strong>{plan.price}</strong>
            </div>
            <h2>{plan.name}</h2>
            <p className="section-copy">{plan.description}</p>
            <p className="premium-cadence">Billed {plan.cadence}</p>
            <div className="premium-feature-list">
              {plan.features.map((feature) => (
                <span key={feature}>{feature}</span>
              ))}
            </div>
            <button type="button" className="primary-btn" onClick={() => navigate("/wallet")}>
              Choose {plan.name}
            </button>
          </article>
        ))}
      </section>

      <section className="surface-card premium-service-panel">
        <div>
          <span className="eyebrow">Service Packs</span>
          <h2>Popular bundles and add-on options</h2>
          <p className="section-copy">
            These are shown here for browsing only. Service pages now calculate only the exact options you select.
          </p>
        </div>

        <div className="premium-service-grid">
          {servicePacks.map((pack) => (
            <button key={pack.title} type="button" className="list-card" onClick={() => navigate("/home")}>
              <span className="feature-tag">{pack.price}</span>
              <h3 className="feature-title">{pack.title}</h3>
              <p className="feature-copy">{pack.copy}</p>
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}

export default PremiumPackagesPage;
