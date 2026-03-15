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

// Get All Requests
exports.getRequests = async (req, res) => {

  try {

    const userId = req.user.id;

    const requests = await ServiceRequest.find({ userId });

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
