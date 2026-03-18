const ServiceRequest = require("../models/ServiceRequest");

// Create Service Request
exports.createRequest = async (req, res) => {

  try {

    const { serviceType, vehicleType, location } = req.body;

    const request = new ServiceRequest({
      userId: req.user.id,
      serviceType,
      vehicleType,
      location
    });

    await request.save();

    res.status(201).json({
      message: "Service request created",
      request
    });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};
exports.acceptRequest = async (req, res) => {
  try {

    // 🔍 Find request by ID
    const request = await ServiceRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ msg: "Request not found" });
    }

    // ✅ Update status
    request.status = "accepted";

    await request.save();

    // 🔥 SOCKET.IO EMIT
    const io = req.app.get("io");

    io.emit("requestUpdated", request);

    // ✅ Response
    res.json({
      msg: "Request accepted",
      request
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Get All Requests
exports.getRequests = async (req, res) => {
  try {

    const requests = await ServiceRequest.find({
      userId: req.user.id   // ✅ FILTER USER
    });

    res.json(requests);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Update request status
exports.updateStatus = async (req, res) => {
  try {

    const { status } = req.body;

    const request = await ServiceRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json({
      message: "Status updated",
      request
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
