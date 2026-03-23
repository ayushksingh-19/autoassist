const express = require("express");
const router = express.Router();
const Service = require("../models/ServiceRequest");
const authMiddleware = require("../middleware/auth");
const mongoose = require("mongoose");
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
      paymentMethod
    });

    await newRequest.save();

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