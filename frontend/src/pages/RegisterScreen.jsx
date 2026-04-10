import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authApi";
import BrandLogo from "../components/BrandLogo";

function RegisterScreen() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    try {
      await registerUser(form);
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Unable to create your account.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-shell">
      <div className="auth-panel">
        <section className="auth-brand">
          <div style={{ marginTop: "18px", marginBottom: "14px" }}>
            <BrandLogo size="lg" />
          </div>
          <h1>Your roadside membership starts here.</h1>
          <p>
            Create an account to request mechanics, track nearby support, and manage every service
            touchpoint from one calm dashboard.
          </p>

          <div className="auth-metrics">
            <div className="auth-metric">
              <strong>Request once, track everywhere</strong>
              <p>Frontend and backend stay aligned so service data appears consistently across screens.</p>
            </div>
            <div className="auth-metric">
              <strong>Designed like a product</strong>
              <p>Warm colors, stronger hierarchy, and cleaner spacing replace the default template feel.</p>
            </div>
          </div>
        </section>

        <section className="auth-form-wrap">
          <span className="eyebrow">Create Account</span>
          <h2>Set up your service profile</h2>
          <p>We only need a few details to get your roadside support flow ready.</p>

          <form onSubmit={handleSubmit} className="stack">
            <div className="field">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                name="name"
                placeholder="Enter your name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid-two">
              <div className="field">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="phone">Phone</label>
                <input
                  id="phone"
                  name="phone"
                  placeholder="Phone number"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid-two">
              <div className="field">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Create password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Repeat password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button type="submit" className="primary-btn" disabled={isSubmitting}>
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <p style={{ marginTop: "18px" }}>
            Already registered?{" "}
            <button type="button" className="link-btn" onClick={() => navigate("/login")}>
              Sign in instead
            </button>
          </p>
        </section>
      </div>
    </div>
  );
}

export default RegisterScreen;
