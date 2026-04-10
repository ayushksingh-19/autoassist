import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ChangePassword() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    current: "",
    newPass: "",
    confirm: "",
    logoutAll: false,
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = () => {
    if (form.newPass !== form.confirm) {
      alert("Passwords do not match.");
      return;
    }

    if (form.newPass.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    alert("Password changed.");
    navigate("/profile");
  };

  return (
    <main className="page-shell app-grid">
      <section className="hero-card" style={{ padding: "36px" }}>
        <span className="eyebrow">Security</span>
        <h1 className="section-title">Change password</h1>
        <p className="section-copy">
          Update your account password using the same clean AutoAssist theme.
        </p>
      </section>

      <section className="surface-card" style={{ padding: "28px" }}>
        <div className="stack">
          <div className="field">
            <label htmlFor="current">Current password</label>
            <input id="current" type="password" name="current" onChange={handleChange} />
          </div>

          <div className="field">
            <label htmlFor="newPass">New password</label>
            <input id="newPass" type="password" name="newPass" onChange={handleChange} />
          </div>

          <div className="field">
            <label htmlFor="confirm">Retype new password</label>
            <input id="confirm" type="password" name="confirm" onChange={handleChange} />
          </div>

          <label className="feature-copy" style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <input type="checkbox" name="logoutAll" onChange={handleChange} />
            Log out of other devices if someone else used your account.
          </label>

          <button
            type="button"
            onClick={handleSubmit}
            className="primary-btn"
            disabled={!form.newPass || !form.confirm}
          >
            Change Password
          </button>
        </div>
      </section>
    </main>
  );
}

export default ChangePassword;
