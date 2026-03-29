import React, { useState } from "react";
import { loginUser } from "../services/authApi";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ FINAL LOGIN HANDLER
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser(form);

      // 🔥 SAVE TOKEN (IMPORTANT)
      localStorage.setItem("token", res.data.token);

      alert("Login successful ✅");

      // 🔥 Redirect
      navigate("/home");

    } catch (err) {
      console.error(err.response?.data);
      alert("Invalid credentials ❌");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-80">

        <h2 className="text-xl font-bold mb-4">Login</h2>

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="border p-2 w-full mb-2"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="border p-2 w-full mb-4"
        />

        <button type="submit" className="bg-blue-600 text-white w-full py-2 rounded">
          Sign In
        </button>

        <p className="text-sm mt-3">
          Don't have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;