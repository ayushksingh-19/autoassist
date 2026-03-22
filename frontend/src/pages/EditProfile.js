import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function EditProfile() {
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([""]);
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    dob: "",
    gender: "",
  });
// 🏠 ADDRESS CHANGE
const handleAddressChange = (index, value) => {
  const updated = [...addresses];
  updated[index] = value;
  setAddresses(updated);
};

// ➕ ADD ADDRESS
const addAddress = () => {
  setAddresses([...addresses, ""]);
};

// ❌ REMOVE ADDRESS
const removeAddress = (index) => {
  const updated = addresses.filter((_, i) => i !== index);
  setAddresses(updated);
};
  // 🔥 DYNAMIC VEHICLES
  const [vehicles, setVehicles] = useState([
    { model: "", plate: "" }
  ]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔧 VEHICLE CHANGE
  const handleVehicleChange = (index, field, value) => {
    const updated = [...vehicles];
    updated[index][field] = value;
    setVehicles(updated);
  };

  // ➕ ADD VEHICLE
  const addVehicle = () => {
    setVehicles([...vehicles, { model: "", plate: "" }]);
  };

  // ❌ REMOVE VEHICLE (optional but useful)
  const removeVehicle = (index) => {
    const updated = vehicles.filter((_, i) => i !== index);
    setVehicles(updated);
  };

  const handleSubmit = () => {
    const finalData = { ...form, vehicles };
    console.log(finalData);

    alert("Profile Updated ✅");
    navigate("/profile");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5">

      {/* 🔙 BACK */}
      <button onClick={() => navigate(-1)} className="mb-4 text-lg">
        ← Your Profile
      </button>

      <div className="bg-white rounded-2xl p-5 shadow-md space-y-4">

        {/* BASIC INFO */}
        <input name="name" placeholder="Name" className="input-box" onChange={handleChange} />
        <input name="mobile" placeholder="Mobile" className="input-box" onChange={handleChange} />
        <input name="email" placeholder="Email" className="input-box" onChange={handleChange} />

        <input type="date" name="dob" className="input-box" onChange={handleChange} />

        <select name="gender" className="input-box" onChange={handleChange}>
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
        </select>

        {/* 🚗 VEHICLES */}
        <h3 className="font-semibold mt-4">Your Vehicles</h3>

        {vehicles.map((vehicle, index) => (
          <div key={index} className="border p-3 rounded-xl space-y-2">

            <input
              placeholder="Vehicle Model"
              className="input-box"
              value={vehicle.model}
              onChange={(e) =>
                handleVehicleChange(index, "model", e.target.value)
              }
            />

            <input
              placeholder="Number Plate"
              className="input-box"
              value={vehicle.plate}
              onChange={(e) =>
                handleVehicleChange(index, "plate", e.target.value)
              }
            />
             
            {/* ❌ REMOVE BUTTON */}
            {vehicles.length > 1 && (
              <button
                onClick={() => removeVehicle(index)}
                className="text-red-500 text-sm"
              >
                Remove
              </button>
            )}

          </div>
        ))}

        {/* ➕ ADD MORE */}
        <button
          onClick={addVehicle}
          className="w-full border border-dashed border-blue-400 text-blue-500 py-2 rounded-xl"
        >
          + Add Another Vehicle
        </button>
        {/* 🏠 ADDRESSES */}
<h3 className="font-semibold mt-4">Your Addresses</h3>

{addresses.map((addr, index) => (
  <div key={index} className="border p-3 rounded-xl space-y-2">

    <input
      placeholder="Enter Address"
      className="input-box"
      value={addr}
      onChange={(e) => handleAddressChange(index, e.target.value)}
    />

    {addresses.length > 1 && (
      <button
        onClick={() => removeAddress(index)}
        className="text-red-500 text-sm"
      >
        Remove
      </button>
    )}

  </div>
))}

{/* ➕ ADD ADDRESS */}
<button
  onClick={addAddress}
  className="w-full border border-dashed border-green-400 text-green-500 py-2 rounded-xl"
>
  + Add Another Address
</button>
        {/* ✅ SUBMIT */}
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white py-3 rounded-xl mt-4"
        >
          Update Profile
        </button>

      </div>
    </div>
  );
}

export default EditProfile;