const express = require("express");
const router = express.Router();
const Service = require("../models/ServiceRequest");
const authMiddleware = require("../middlewares/auth");
const mongoose = require("mongoose");

const mechanicPool = [
  {
    id: "AUTO-MECH-101",
    name: "Ravi Sharma",
    phone: "+919876543210",
    rating: 4.8,
    eta: "8-12 min",
    distance: "2.3 km away",
    speciality: "Emergency mechanic",
    vehicle: "AutoAssist Rapid Van",
    plate: "MH 12 AA 2045",
  },
  {
    id: "AUTO-MECH-102",
    name: "Amit Verma",
    phone: "+919812345670",
    rating: 4.7,
    eta: "10-15 min",
    distance: "3.1 km away",
    speciality: "Tyre and battery support",
    vehicle: "AutoAssist Service Bike",
    plate: "DL 05 AS 1188",
  },
  {
    id: "AUTO-MECH-103",
    name: "Suresh Patil",
    phone: "+919900112233",
    rating: 4.9,
    eta: "12-18 min",
    distance: "3.8 km away",
    speciality: "Towing and recovery",
    vehicle: "AutoAssist Tow Unit",
    plate: "KA 03 TA 7781",
  },
  {
    id: "AUTO-MECH-104",
    name: "Imran Khan",
    phone: "+919711223344",
    rating: 4.8,
    eta: "7-11 min",
    distance: "1.9 km away",
    speciality: "EV and fuel support",
    vehicle: "AutoAssist EV Support Van",
    plate: "TS 09 EV 5521",
  },
];

const assignSupport = (serviceType = "", vehicleType = "") => {
  const key = `${serviceType}-${vehicleType}`.toLowerCase();
  const index = key.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0) % mechanicPool.length;
  return mechanicPool[index];
};
// ✅ CREATE SERVICE
router.post("/create", authMiddleware, async (req, res) => {
  try {

    const {
      serviceType,
      vehicleType,
      fuelType,
      problem,
      location,
      lat,
      lng,
      date,
      timeSlot,
      detailingType,
      detailingService,
      price,
      paymentMethod
    } = req.body;

    const assigned = assignSupport(serviceType, vehicleType);

    const newRequest = new Service({
      userId: new mongoose.Types.ObjectId(req.user.id), // 🔥 FIXED
      serviceType,
      vehicleType,
      fuelType,
      problem,
      location,
      lat,
      lng,
      date,
      timeSlot,
      detailingType,
      detailingService,
      price,
      paymentMethod,
      status: "assigned",
      mechanicId: assigned.id,
      assignedMechanic: assigned.name,
      mechanicPhone: assigned.phone,
      mechanicRating: assigned.rating,
      mechanicEta: assigned.eta,
      mechanicDistance: assigned.distance,
      mechanicSpeciality: assigned.speciality,
      assignedSupportVehicle: assigned.vehicle,
      assignedVehiclePlate: assigned.plate,
      chatThread: [
        {
          sender: "mechanic",
          message: `Namaste, I am ${assigned.name}. I have been assigned to your ${serviceType} request and I am on the way.`,
          time: "Just now",
        },
      ]
    });

    await newRequest.save();

    const io = req.app.get("io");
    if (io) {
      io.emit("requestAssigned", newRequest);
    }

    res.status(201).json({ message: "Created", newRequest });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating request" });
  }
});
// 🔥 GET USER REQUESTS (FINAL FIXED)
router.get("/my", authMiddleware, async (req, res) => {
  try {

    const userId = new mongoose.Types.ObjectId(req.user.id);

    const requests = await Service.find({ userId });

    console.log("TOKEN USER:", req.user.id);
    console.log("FOUND REQUESTS:", requests.length);

    res.json(requests);

  } catch (error) {
    console.error("MY REQUEST ERROR:", error);
    res.status(500).json({ message: "Error fetching requests" });
  }
});
// ✅ ACCEPT REQUEST
router.put("/accept/:id", authMiddleware, async (req, res) => {
  try {

    const request = await Service.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    request.status = "accepted";
    request.mechanicId = req.user.id;

    await request.save();

    const io = req.app.get("io");
    io.emit("requestUpdated", request);

    res.json({ message: "Request accepted", request });

  } catch (error) {
    console.error("ACCEPT ERROR:", error);
    res.status(500).json({ message: "Error updating request" });
  }
});


// ✅ GET ALL REQUESTS (NEARBY)
router.get("/all", authMiddleware, async (req, res) => {
  try {

    const mechanicLat = parseFloat(req.query.lat);
    const mechanicLng = parseFloat(req.query.lng);

    const services = await Service.find();

    const nearby = services.filter((s) => {

      if (!s.lat || !s.lng) return false;

      const distance = Math.sqrt(
        Math.pow(s.lat - mechanicLat, 2) +
        Math.pow(s.lng - mechanicLng, 2)
      );

      return distance < 0.1;
    });

    res.json(nearby);

  } catch (error) {
    console.error("FETCH ERROR:", error);
    res.status(500).json({ message: "Error fetching services" });
  }
});


// ✅ COMPLETE REQUEST
router.put("/complete/:id", authMiddleware, async (req, res) => {
  try {

    const request = await Service.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    request.status = "completed";

    await request.save();

    const io = req.app.get("io");
    io.emit("requestUpdated", request);

    res.json({ message: "Service completed", request });

  } catch (error) {
    console.error("COMPLETE ERROR:", error);
    res.status(500).json({ message: "Error completing request" });
  }
});
// ❌ CANCEL REQUEST
router.delete("/:id", authMiddleware, async (req, res) => {
  try {

    await Service.findByIdAndDelete(req.params.id);

    res.json({ message: "Request cancelled" });

  } catch (error) {
    res.status(500).json({ message: "Error deleting request" });
  }
});
module.exports = router;
