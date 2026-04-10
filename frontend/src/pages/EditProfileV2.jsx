import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function EditProfileV2() {
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([""]);
  const [vehicles, setVehicles] = useState([{ model: "", plate: "" }]);
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    dob: "",
    gender: "",
  });

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleVehicleChange = (index, field, value) => {
    const updated = [...vehicles];
    updated[index][field] = value;
    setVehicles(updated);
  };

  const addVehicle = () => setVehicles([...vehicles, { model: "", plate: "" }]);
  const removeVehicle = (index) => setVehicles(vehicles.filter((_, i) => i !== index));

  const handleAddressChange = (index, value) => {
    const updated = [...addresses];
    updated[index] = value;
    setAddresses(updated);
  };

  const addAddress = () => setAddresses([...addresses, ""]);
  const removeAddress = (index) => setAddresses(addresses.filter((_, i) => i !== index));

  const handleSubmit = () => {
    console.log({ ...form, vehicles, addresses });
    alert("Profile updated.");
    navigate("/profile");
  };

  return (
    <main className="page-shell app-grid">
      <section className="hero-card" style={{ padding: "36px" }}>
        <span className="eyebrow">Edit Profile</span>
        <h1 className="section-title">Edit profile</h1>
        <p className="section-copy">Update personal details, vehicles, and addresses.</p>
      </section>

      <section className="list-card">
        <div className="grid-two">
          <div className="field">
            <label htmlFor="name">Name</label>
            <input id="name" name="name" value={form.name} onChange={handleChange} placeholder="Your name" />
          </div>
          <div className="field">
            <label htmlFor="mobile">Mobile</label>
            <input
              id="mobile"
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              placeholder="Mobile number"
            />
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" />
          </div>
          <div className="field">
            <label htmlFor="dob">Date of Birth</label>
            <input id="dob" type="date" name="dob" value={form.dob} onChange={handleChange} />
          </div>
          <div className="field">
            <label htmlFor="gender">Gender</label>
            <select id="gender" name="gender" value={form.gender} onChange={handleChange}>
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>
      </section>

      <section className="list-card">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "12px",
            flexWrap: "wrap",
            alignItems: "center",
            marginBottom: "18px",
          }}
        >
          <div>
            <h2 style={{ margin: "0 0 6px" }}>Your Vehicles</h2>
            <p className="section-copy">Keep all registered vehicles ready for quick booking.</p>
          </div>
          <button type="button" className="secondary-btn" onClick={addVehicle}>
            Add Another Vehicle
          </button>
        </div>

        <div className="app-grid" style={{ gap: "14px" }}>
          {vehicles.map((vehicle, index) => (
            <div
              key={index}
              style={{
                padding: "16px",
                borderRadius: "16px",
                border: "1px solid var(--line)",
                background: "rgba(255, 255, 255, 0.68)",
              }}
            >
              <div className="grid-two">
                <div className="field">
                  <label>Vehicle Model</label>
                  <input
                    value={vehicle.model}
                    onChange={(event) => handleVehicleChange(index, "model", event.target.value)}
                    placeholder="Vehicle model"
                  />
                </div>
                <div className="field">
                  <label>Number Plate</label>
                  <input
                    value={vehicle.plate}
                    onChange={(event) => handleVehicleChange(index, "plate", event.target.value)}
                    placeholder="Number plate"
                  />
                </div>
              </div>

              {vehicles.length > 1 ? (
                <button
                  type="button"
                  className="link-btn"
                  style={{ marginTop: "12px" }}
                  onClick={() => removeVehicle(index)}
                >
                  Remove vehicle
                </button>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      <section className="list-card">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "12px",
            flexWrap: "wrap",
            alignItems: "center",
            marginBottom: "18px",
          }}
        >
          <div>
            <h2 style={{ margin: "0 0 6px" }}>Your Addresses</h2>
            <p className="section-copy">Store the addresses you use most often for service requests.</p>
          </div>
          <button type="button" className="secondary-btn" onClick={addAddress}>
            Add Another Address
          </button>
        </div>

        <div className="app-grid" style={{ gap: "14px" }}>
          {addresses.map((address, index) => (
            <div
              key={index}
              style={{
                padding: "16px",
                borderRadius: "16px",
                border: "1px solid var(--line)",
                background: "rgba(255, 255, 255, 0.68)",
              }}
            >
              <div className="field">
                <label>Address</label>
                <input
                  value={address}
                  onChange={(event) => handleAddressChange(index, event.target.value)}
                  placeholder="Enter address"
                />
              </div>

              {addresses.length > 1 ? (
                <button
                  type="button"
                  className="link-btn"
                  style={{ marginTop: "12px" }}
                  onClick={() => removeAddress(index)}
                >
                  Remove address
                </button>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      <div className="inline-actions">
        <button type="button" className="secondary-btn" onClick={() => navigate("/profile")}>
          Cancel
        </button>
        <button type="button" className="primary-btn" onClick={handleSubmit}>
          Update Profile
        </button>
      </div>
    </main>
  );
}

export default EditProfileV2;
