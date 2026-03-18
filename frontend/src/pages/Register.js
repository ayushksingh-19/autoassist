import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {

      await axios.post(
        "http://localhost:5000/api/auth/register",
        { name, email, password }
      );

      alert("Registered successfully");

      navigate("/login");

    } catch (error) {
      alert("Registration failed");
    }
  };

  return (

    <div className="h-screen flex items-center justify-center bg-[var(--bright-snow)]">

      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-xl shadow-lg w-80 space-y-4"
      >

        <h2 className="text-2xl font-bold text-center text-[var(--smart-blue)]">
          Create Account
        </h2>

        <input
          type="text"
          placeholder="Name"
          className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-[var(--smart-blue)]"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-[var(--smart-blue)]"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-[var(--smart-blue)]"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="bg-[var(--smart-blue)] text-white w-full py-2 rounded-lg hover:opacity-90 transition"
        >
          Register
        </button>

        <p className="text-center text-sm text-[var(--grey-olive)]">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[var(--smart-blue)] font-semibold hover:underline"
          >
            Login
          </Link>
        </p>

      </form>

    </div>
  );
}

export default Register;