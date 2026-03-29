const mongoose = require("mongoose");

const serviceRequestSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  serviceType: {
    type: String,
    enum: [
      "Mechanic",
      "EV Charging",
      "Fuel Delivery",
      "Roadside Repair",
      "Washing & Cleaning",
      "Tyre Services",
      "Detailing",
      "SOS Emergency"
    ]
  },

  vehicleType: {
    type: String
  },

  fuelType: {
    type: String
  },

  problem: {
    type: String
  },

  location: {
    type: String
  },

  lat: Number,
  lng: Number,

  // ✅ NEW FIELDS
  price: Number,
  paymentMethod: String,
  detailingType: String,
  detailingService: String,
  date: String,
  timeSlot: String,
  problem: String,
fuelType: String,
date: String,
timeSlot: String,
detailingType: String,
detailingService: String,
price: Number,
paymentMethod: String,
lat: Number,
lng: Number,
  status: {
    type: String,
    enum: ["pending", "accepted", "completed"],
    default: "pending"
  },

  assignedMechanic: {
    type: String
  },

  mechanicId: {
    type: String,
    default: null
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("ServiceRequest", serviceRequestSchema);