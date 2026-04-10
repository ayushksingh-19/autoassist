const mongoose = require("mongoose");

const chatMessageSchema = new mongoose.Schema(
  {
    sender: {
      type: String,
      enum: ["user", "mechanic", "system"],
      required: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },
    time: {
      type: String,
      default: "Just now",
    },
  },
  { _id: false }
);

const serviceRequestSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
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
        "SOS Emergency",
      ],
      required: true,
    },
    vehicleType: {
      type: String,
      trim: true,
      maxlength: 80,
    },
    fuelType: {
      type: String,
      trim: true,
      maxlength: 40,
    },
    problem: {
      type: String,
      trim: true,
      maxlength: 2000,
    },
    location: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    lat: Number,
    lng: Number,
    price: {
      type: Number,
      min: 0,
      default: 0,
    },
    paymentMethod: {
      type: String,
      trim: true,
      maxlength: 80,
    },
    detailingType: String,
    detailingService: String,
    date: String,
    timeSlot: String,
    status: {
      type: String,
      enum: ["pending", "assigned", "accepted", "completed", "cancelled"],
      default: "pending",
      index: true,
    },
    assignedMechanic: String,
    mechanicPhone: String,
    mechanicRating: Number,
    mechanicEta: String,
    mechanicDistance: String,
    mechanicSpeciality: String,
    assignedSupportVehicle: String,
    assignedVehiclePlate: String,
    chatThread: [chatMessageSchema],
    mechanicId: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ServiceRequest", serviceRequestSchema);
