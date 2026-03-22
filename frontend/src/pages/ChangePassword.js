import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ChangePassword() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    current: "",
    newPass: "",
    confirm: "",
    logoutAll: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = () => {
    if (form.newPass !== form.confirm) {
      alert("Passwords do not match ❌");
      return;
    }

    if (form.newPass.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    alert("Password Changed ✅");
    navigate("/profile");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5">

      {/* 🔙 BACK */}
      <button onClick={() => navigate(-1)} className="mb-4 text-lg">
        ← Change Password
      </button>

      <div className="bg-white rounded-2xl p-5 shadow-md">

        <h2 className="text-xl font-bold mb-2">Change password</h2>

        <p className="text-gray-500 text-sm mb-4">
          Your password must be at least 6 characters and include a mix of letters, numbers and symbols.
        </p>

        {/* CURRENT */}
        <input
          type="password"
          name="current"
          placeholder="Current password"
          className="input-box mb-3"
          onChange={handleChange}
        />

        {/* NEW */}
        <input
          type="password"
          name="newPass"
          placeholder="New password"
          className="input-box mb-3"
          onChange={handleChange}
        />

        {/* CONFIRM */}
        <input
          type="password"
          name="confirm"
          placeholder="Retype new password"
          className="input-box mb-3"
          onChange={handleChange}
        />

        {/* FORGOT */}
        <p className="text-blue-500 text-sm mb-3 cursor-pointer">
          Forgotten your password?
        </p>

        {/* CHECKBOX */}
        <div className="flex items-start gap-2 mb-5">
          <input
            type="checkbox"
            name="logoutAll"
            onChange={handleChange}
          />
          <p className="text-sm text-gray-600">
            Log out of other devices if someone else used your account.
          </p>
        </div>

        {/* BUTTON */}
        <button
          onClick={handleSubmit}
          className={`w-full py-3 rounded-xl text-white font-semibold transition ${
            form.newPass && form.confirm
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-blue-300 cursor-not-allowed"
          }`}
        >
          Change password
        </button>

      </div>
    </div>
  );
}

export default ChangePassword;