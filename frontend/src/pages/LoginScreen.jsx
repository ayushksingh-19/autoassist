import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authApi";
import BrandLogo from "../components/BrandLogo";

function LoginScreen() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await loginUser(form);
      localStorage.setItem("token", response.data.token);
      navigate("/home");
    } catch (error) {
      alert(error.response?.data?.message || "Unable to sign in right now.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-shell">
      <div className="auth-panel">
        <section className="auth-brand">
          <span className="eyebrow" style={{ color: "#f6f2e9" }}>
            AutoAssist Network
          </span>
          <div style={{ marginTop: "18px", marginBottom: "14px" }}>
            <BrandLogo variant="dark" size="lg" />
          </div>
          <h1>Roadside support that feels premium, fast, and local.</h1>
          <p>
            Book mechanics, fuel delivery, emergency repair, and live request tracking from one
            polished control center.
          </p>

          <div className="auth-metrics">
            <div className="auth-metric">
              <strong>15 min average</strong>
              <p>Faster dispatch visibility for emergency roadside situations.</p>
            </div>
            <div className="auth-metric">
              <strong>Live backend sync</strong>
              <p>Requests and status updates stay tied to the real API instead of local placeholders.</p>
            </div>
          </div>
        </section>

        <section className="auth-form-wrap">
          <span className="eyebrow">Welcome Back</span>
          <h2>Sign in to your dispatch dashboard</h2>
          <p>Jump back into your active jobs, saved requests, and service history.</p>

          <form onSubmit={handleSubmit} className="stack">
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
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="primary-btn" disabled={isSubmitting}>
              {isSubmitting ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <p style={{ marginTop: "18px" }}>
            New here?{" "}
            <button type="button" className="link-btn" onClick={() => navigate("/register")}>
              Create your account
            </button>
          </p>
        </section>
      </div>
    </div>
  );
}

export default LoginScreen;
