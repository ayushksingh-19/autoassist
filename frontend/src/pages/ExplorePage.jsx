import React from "react";
import { useNavigate } from "react-router-dom";
import BrandLogo from "../components/BrandLogo";

const features = [
  {
    icon: "24",
    title: "24/7 Availability",
    copy: "Round-the-clock roadside assistance whenever you need it.",
    tone: "blue",
  },
  {
    icon: "GPS",
    title: "Live GPS Tracking",
    copy: "Track your mechanic in real time with accurate arrival updates.",
    tone: "pink",
  },
  {
    icon: "OK",
    title: "Verified Mechanics",
    copy: "Every mechanic is reviewed, verified, and background checked.",
    tone: "green",
  },
  {
    icon: "15",
    title: "Fast Response",
    copy: "Average response time under 15 minutes in supported zones.",
    tone: "orange",
  },
  {
    icon: "4.9",
    title: "Rated Service",
    copy: "Transparent ratings and reviews from real AutoAssist users.",
    tone: "gold",
  },
  {
    icon: "PRO",
    title: "Expert Team",
    copy: "Trained specialists for cars, bikes, EVs, towing, and emergency care.",
    tone: "violet",
  },
];

const services = [
  { icon: "ER", title: "Emergency Repair", price: "From Rs 299" },
  { icon: "BJ", title: "Battery Jumpstart", price: "From Rs 249" },
  { icon: "TY", title: "Tyre Service", price: "From Rs 149" },
  { icon: "TW", title: "Towing Service", price: "From Rs 1,499" },
  { icon: "FD", title: "Fuel Delivery", price: "Pay fuel + fee" },
  { icon: "HC", title: "Full Inspection", price: "From Rs 599" },
];

const testimonials = [
  {
    quote: "My car stopped near Hinjewadi late evening. AutoAssist assigned a mechanic quickly and I could track him live.",
    name: "Priya Sharma",
    role: "Pune Commuter",
  },
  {
    quote: "The bike puncture support was clear and fairly priced. No confusion, no hidden drama.",
    name: "Arjun Mehta",
    role: "Mumbai Rider",
  },
  {
    quote: "Live tracking made the whole experience calm. I knew exactly when help was reaching me.",
    name: "Neha Iyer",
    role: "Bengaluru Founder",
  },
  {
    quote: "Fuel delivery helped me avoid a long walk on the Delhi-Gurugram road. The flow was simple.",
    name: "Rohan Malhotra",
    role: "Delhi NCR Driver",
  },
  {
    quote: "I booked a health check before a Jaipur road trip. The options and price estimate were very clear.",
    name: "Aditi Verma",
    role: "Jaipur Traveller",
  },
  {
    quote: "The EV charger link and request details saved time when my scooter battery was almost dead.",
    name: "Karthik Nair",
    role: "Kochi EV Rider",
  },
  {
    quote: "Towing support felt professional. The app showed the request status and payment clearly.",
    name: "Simran Kaur",
    role: "Chandigarh Driver",
  },
  {
    quote: "I used washing and detailing options for my car. The booking felt premium but still practical.",
    name: "Vikram Rao",
    role: "Hyderabad Customer",
  },
];

const movingTestimonials = [...testimonials, ...testimonials];

const stats = [
  { value: "500K+", label: "Happy Customers" },
  { value: "5000+", label: "Expert Mechanics" },
  { value: "1M+", label: "Services Completed" },
  { value: "4.9", label: "Average Rating" },
];

function ExplorePage() {
  const navigate = useNavigate();

  const goLogin = () => navigate("/login");
  const goRegister = () => navigate("/register");

  return (
    <main className="explore-shell">
      <nav className="explore-nav">
        <button type="button" className="explore-logo-btn" onClick={goLogin}>
          <BrandLogo size="sm" />
        </button>

        <div className="explore-nav-actions">
          <button type="button" className="explore-link-btn" onClick={goLogin}>
            Login
          </button>
          <button type="button" className="explore-primary-btn" onClick={goRegister}>
            Get Started
          </button>
        </div>
      </nav>

      <section className="explore-hero">
        <div className="explore-hero-copy">
          <span className="explore-pill">On-Demand Roadside Assistance</span>
          <h1>
            Help is Just a <span>Tap Away</span>
          </h1>
          <p>
            24/7 professional roadside assistance for cars, bikes, and EVs. Get help instantly with verified
            mechanics, transparent pricing, and live tracking.
          </p>

          <div className="explore-actions">
            <button type="button" className="explore-primary-btn explore-large-btn" onClick={goRegister}>
              Get Started Now
            </button>
            <button type="button" className="explore-secondary-btn explore-large-btn" onClick={goLogin}>
              Learn More
            </button>
          </div>

          <div className="explore-mini-stats">
            <div>
              <strong>500K+</strong>
              <span>Happy Customers</span>
            </div>
            <div>
              <strong>5000+</strong>
              <span>Expert Mechanics</span>
            </div>
          </div>
        </div>

        <button type="button" className="explore-live-card" onClick={goLogin}>
          <div className="explore-live-card-top">
            <div className="explore-live-icon">AA</div>
            <div>
              <strong>Emergency Request</strong>
              <span>Battery Jumpstart</span>
            </div>
            <i />
          </div>

          <div className="explore-live-list">
            <p>Mechanic 2.3 km away</p>
            <p>ETA: 8 minutes</p>
            <p>4.9 Rating • 234 Reviews</p>
          </div>

          <div className="explore-live-progress">
            <span />
          </div>
        </button>
      </section>

      <section className="explore-section explore-deep-section">
        <div className="explore-section-head">
          <h2>Why Choose AutoAssist?</h2>
          <p>Premium features designed for your peace of mind</p>
        </div>

        <div className="explore-feature-grid">
          {features.map((feature) => (
            <button key={feature.title} type="button" className="explore-card" onClick={goLogin}>
              <span className={`explore-card-icon ${feature.tone}`}>{feature.icon}</span>
              <h3>{feature.title}</h3>
              <p>{feature.copy}</p>
            </button>
          ))}
        </div>
      </section>

      <section className="explore-section explore-service-section">
        <div className="explore-section-head">
          <h2>Our Services</h2>
          <p>Complete roadside assistance solutions</p>
        </div>

        <div className="explore-service-grid">
          {services.map((service) => (
            <button key={service.title} type="button" className="explore-service-card" onClick={goLogin}>
              <span>{service.icon}</span>
              <strong>{service.title}</strong>
              <em>{service.price}</em>
            </button>
          ))}
        </div>
      </section>

      <section className="explore-section explore-testimonial-section">
        <div className="explore-section-head">
          <h2>What Our Customers Say</h2>
          <p>Join thousands of satisfied customers</p>
        </div>

        <div className="explore-testimonial-marquee">
          <div className="explore-testimonial-track">
          {movingTestimonials.map((item, index) => (
            <button key={`${item.name}-${index}`} type="button" className="explore-card explore-testimonial" onClick={goLogin}>
              <span className="explore-stars">5.0 rating</span>
              <p>&quot;{item.quote}&quot;</p>
              <strong>{item.name}</strong>
              <small>{item.role}</small>
            </button>
          ))}
          </div>
        </div>

        <div className="explore-stats-row">
          {stats.map((item) => (
            <button key={item.label} type="button" onClick={goLogin}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="explore-cta-section">
        <div className="explore-cta-card">
          <h2>Ready to Get Started?</h2>
          <p>Join AutoAssist today and never worry about roadside emergencies again.</p>
          <div className="explore-actions">
            <button type="button" className="explore-light-btn" onClick={goRegister}>
              Sign Up Free
            </button>
            <button type="button" className="explore-secondary-btn" onClick={goLogin}>
              Login
            </button>
          </div>
        </div>
      </section>

      <footer className="explore-footer">
        <div>
          <BrandLogo size="sm" />
          <p>24/7 roadside assistance at your fingertips.</p>
        </div>

        <div>
          <h3>Company</h3>
          <button type="button" onClick={goLogin}>About Us</button>
          <button type="button" onClick={goLogin}>Careers</button>
          <button type="button" onClick={goLogin}>Press</button>
          <button type="button" onClick={goLogin}>Blog</button>
        </div>

        <div>
          <h3>Support</h3>
          <button type="button" onClick={goLogin}>Help Center</button>
          <button type="button" onClick={goLogin}>Safety</button>
          <button type="button" onClick={goLogin}>Terms</button>
          <button type="button" onClick={goLogin}>Privacy</button>
        </div>

        <div>
          <h3>Contact</h3>
          <button type="button" onClick={goLogin}>1-800-AUTO-HELP</button>
          <button type="button" onClick={goLogin}>support@autoassist.com</button>
          <div className="explore-socials">
            <button type="button" onClick={goLogin}>X</button>
            <button type="button" onClick={goLogin}>f</button>
            <button type="button" onClick={goLogin}>in</button>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default ExplorePage;
