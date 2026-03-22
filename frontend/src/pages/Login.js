import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Login() {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
  e.preventDefault();

  // ✅ VALIDATION
  if (!email || !password) {
    alert("Please enter email and password");
    return;
  }

  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/login",
      {
        email,
        password,
      }
    );

    localStorage.setItem("token", res.data.token);
localStorage.setItem("role", res.data.role);
localStorage.setItem("user", JSON.stringify(res.data.user));
// 🔥 redirect based on role
if (res.data.role === "mechanic") {
  navigate("/mechanic");
} else {
  navigate("/dashboard");
}

  } catch (error) {
    console.error(error.response?.data);
    alert(error.response?.data?.message || "Invalid credentials");
  }
};

  return (
  <div className="h-screen flex items-center justify-center bg-[var(--bright-snow)]">

    <form
      onSubmit={handleLogin}
      className="bg-white p-8 rounded shadow-md w-80 space-y-4"
    >
      <h2 className="text-xl font-bold text-center">AutoAssist</h2>

      <input
        type="email"
        placeholder="Email"
        className="border p-2 w-full"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="border p-2 w-full"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        type="submit"
        className="bg-[var(--smart-blue)] text-white w-full py-2 rounded"
      >
        Login
      </button>
      <p style={{ textAlign: "center", marginTop: "10px" }}>
  Don't have an account?{" "}
  <Link
    to="/register"
    style={{ color: "var(--smart-blue)", fontWeight: "bold" }}
  >
    Register
  </Link>
</p>

    </form>

  </div>
);
}

export default Login;