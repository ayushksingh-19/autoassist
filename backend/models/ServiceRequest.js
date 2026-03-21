const mongoose = require("mongoose");

const serviceRequestSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  serviceType: {
    type: String,
    enum: ["Mechanic", "EV Charging", "Fuel Delivery", "Roadside Repair"]
  },
  vehicleType: {
    type: String
  },
  location: {
    type: String,
    lat: Number,
    lng: Number,
  },
  status: {
  type: String,
  enum: ["pending", "accepted", "completed"],
  default: "pending"
},
  assignedMechanic: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  mechanicId: {
  type: String,
  default: null
},
});

module.exports = mongoose.model("ServiceRequest", serviceRequestSchema);
