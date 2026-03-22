import React from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  let user = null;
  try {
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined") {
      user = JSON.parse(storedUser);
    }
  } catch (error) {
    console.error(error);
  }

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">

      <div className="w-full max-w-md">

        {/* 🔷 PROFILE CARD */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-5 text-center">

          <div className="flex justify-center mb-3">
            <div className="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-bold">
              {user?.name ? user.name[0].toUpperCase() : "U"}
            </div>
          </div>

          <h2 className="text-lg font-semibold text-gray-800">
            {user?.name || "User"}
          </h2>

          <p className="text-gray-500 text-sm">
            {user?.email || "No Email"}
          </p>

        </div>

        {/* 🔷 OPTIONS LIST */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">

          <div className="list-item" onClick={() => navigate("/edit-profile")}>
            <span>✏️ Edit Profile</span>
            <span className="arrow">›</span>
          </div>

          <div className="list-item" onClick={() => navigate("/change-password")}>
            <span>🔒 Change Password</span>
            <span className="arrow">›</span>
          </div>

          <div className="list-item" onClick={() => navigate("/myrequests")}>
            <span>📦 My Requests</span>
            <span className="arrow">›</span>
          </div>

          <div className="list-item" onClick={() => alert("Payment Methods")}>
            <span>💳 Payment Methods</span>
            <span className="arrow">›</span>
          </div>

        </div>

        {/* 🔴 LOGOUT */}
        <button
          onClick={handleLogout}
          className="w-full mt-5 py-3 rounded-xl bg-red-500 text-white font-semibold shadow hover:bg-red-600 transition"
        >
          Logout
        </button>

      </div>
    </div>
  );
}

export default Profile;