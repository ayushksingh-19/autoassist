import React, { useState } from "react";

function Profile() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <h2 className="text-2xl font-bold">Profile & Settings</h2>
      <p className="text-gray-500 mb-4">
        Manage your account and preferences
      </p>

      {/* TABS */}
      <div className="flex gap-3 mb-6">
        {["profile", "vehicles", "history"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1 rounded-full border ${
              activeTab === tab
                ? "bg-gray-200 font-semibold"
                : "bg-white"
            }`}
          >
            {tab === "profile"
              ? "Profile"
              : tab === "vehicles"
              ? "Vehicles"
              : "Service History"}
          </button>
        ))}
      </div>

      {/* ================= PROFILE TAB ================= */}
      {activeTab === "profile" && (
        <div className="bg-white p-6 rounded-xl shadow">

          <div className="flex justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl">
                👤
              </div>
              <div>
                <h3 className="font-semibold">John Doe</h3>
                <p className="text-gray-500 text-sm">
                  Member since March 2026
                </p>
              </div>
            </div>

            <button className="bg-black text-white px-4 py-1 rounded">
              Edit Profile
            </button>
          </div>

          <hr className="my-4" />

          {/* FORM */}
          <div className="grid grid-cols-2 gap-4">

            <input
              value="John Doe"
              disabled
              className="border p-2 rounded bg-gray-100"
            />

            <input
              value="john@example.com"
              disabled
              className="border p-2 rounded bg-gray-100"
            />

            <input
              value="+1234567890"
              disabled
              className="border p-2 rounded bg-gray-100"
            />

            <input
              value="123 Main Street"
              disabled
              className="border p-2 rounded bg-gray-100"
            />

          </div>

          {/* MEMBERSHIP */}
          <div className="mt-6">
            <span className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded text-sm">
              Premium Member
            </span>
            <p className="text-gray-500 text-sm mt-1">
              5% discount on all services
            </p>
          </div>

        </div>
      )}

      {/* ================= VEHICLES TAB ================= */}
      {activeTab === "vehicles" && (
        <div className="bg-white p-6 rounded-xl shadow">

          <div className="flex justify-between mb-4">
            <h3 className="font-semibold">Saved Vehicles</h3>

            <button
              onClick={() => alert("Add Vehicle clicked 🚗")}
              className="bg-black text-white px-4 py-1 rounded"
            >
              + Add Vehicle
            </button>
          </div>

          {/* VEHICLE LIST */}
          <div className="space-y-3">

            <div className="flex justify-between border p-3 rounded">
              <div>
                <p className="font-semibold">Toyota Camry 2020</p>
                <p className="text-gray-500 text-sm">ABC 1234</p>
              </div>

              <div className="flex gap-2">
                <button onClick={() => alert("Edit vehicle")} className="border px-3 rounded">
                  Edit
                </button>
                <button onClick={() => alert("Removed")} className="text-red-500">
                  Remove
                </button>
              </div>
            </div>

            <div className="flex justify-between border p-3 rounded">
              <div>
                <p className="font-semibold">Honda CB350 2021</p>
                <p className="text-gray-500 text-sm">XYZ 5678</p>
              </div>

              <div className="flex gap-2">
                <button onClick={() => alert("Edit vehicle")} className="border px-3 rounded">
                  Edit
                </button>
                <button onClick={() => alert("Removed")} className="text-red-500">
                  Remove
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ================= HISTORY TAB ================= */}
      {activeTab === "history" && (
        <div className="bg-white p-6 rounded-xl shadow">

          <h3 className="font-semibold mb-4">Service History</h3>

          <div className="space-y-3">

            {[
              { name: "Emergency Mechanic", price: 120 },
              { name: "Tire Service", price: 80 },
              { name: "Battery Jump-Start", price: 40 },
            ].map((item, i) => (
              <div key={i} className="flex justify-between border p-3 rounded">

                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-gray-500 text-sm">
                    Completed • ⭐⭐⭐⭐⭐
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-semibold">${item.price}</p>
                  <button
                    onClick={() => alert("Viewing details")}
                    className="text-blue-600 text-sm"
                  >
                    View Details
                  </button>
                </div>

              </div>
            ))}

          </div>
        </div>
      )}

    </div>
  );
}

export default Profile;