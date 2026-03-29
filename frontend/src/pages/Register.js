import React, { useState } from "react";
import { registerUser } from "../services/authApi";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match ❌");
      return;
    }

    try {
      await registerUser(form);

      alert("Account created ✅");
      navigate("/login");

    } catch (err) {
      console.error(err.response?.data);
      alert(err.response?.data?.message || "Error ❌");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-80">

        <h2 className="text-xl font-bold mb-4">Create Account</h2>

        <input name="name" placeholder="Full Name" onChange={handleChange} className="border p-2 w-full mb-2" />
        <input name="email" placeholder="Email" onChange={handleChange} className="border p-2 w-full mb-2" />
        <input name="phone" placeholder="Phone" onChange={handleChange} className="border p-2 w-full mb-2" />

        <input name="password" type="password" placeholder="Password" onChange={handleChange} className="border p-2 w-full mb-2" />
        <input name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleChange} className="border p-2 w-full mb-4" />

        <button className="bg-blue-600 text-white w-full py-2 rounded">
          Create Account
        </button>

        <p className="text-sm mt-3">
          Already have an account?{" "}
          <span className="text-blue-600 cursor-pointer" onClick={() => navigate("/login")}>
            Sign in
          </span>
        </p>
      </form>
    </div>
  );
}

export default Register;