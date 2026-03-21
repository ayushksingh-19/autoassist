const express = require("express");
const router = express.Router();
const Service = require("../models/ServiceRequest");
const authMiddleware = require("../middleware/auth");
// CREATE SERVICE
router.post("/create", async (req, res) => {
  try {

    const { serviceType, vehicleType, location } = req.body;

    const newRequest = new Service({
      serviceType,
      vehicleType,
      location,
      lat,
      lng
    });

    await newRequest.save();

    res.status(201).json({ message: "Service request created" });

  } catch (error) {
    res.status(500).json({ message: "Error creating request" });
  }
});
// ACCEPT REQUEST

router.put("/accept/:id", async (req, res) => {
  try {

    const request = await Service.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    request.status = "accepted";
request.mechanicId = req.user.id; // 🔥 WHO ACCEPTED

    await request.save();

    // ✅ REAL-TIME UPDATE (IMPORTANT)
    const io = req.app.get("io");
    io.emit("requestUpdated", request);

    res.json({ message: "Request accepted", request });

  } catch (error) {
    res.status(500).json({ message: "Error updating request" });
  }
});

// ✅ GET ALL REQUESTS
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

      return distance < 0.1; // 🔥 adjust radius
    });

    res.json(nearby);

  } catch (error) {
    res.status(500).json({ message: "Error fetching services" });
  }
});
router.put("/complete/:id", async (req, res) => {
  try {

    const request = await Service.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    request.status = "completed";

    await request.save();

    // 🔥 REAL-TIME UPDATE
    const io = req.app.get("io");
    io.emit("requestUpdated", request);

    res.json({ message: "Service completed", request });

  } catch (error) {
    res.status(500).json({ message: "Error completing request" });
  }
});
module.exports = router;
