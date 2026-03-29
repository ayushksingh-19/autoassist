const service = require("../services/serviceService");
const logger = require("../utils/logger");
const { createServiceSchema } = require("../validators/serviceValidator");

// 🔥 CREATE REQUEST
exports.createRequest = async (req, res, next) => {
  try {
    // ✅ 1. VALIDATION FIRST
    const { error } = createServiceSchema.validate(req.body);

    if (error) {
      throw new Error(error.details[0].message);
    }

    // ✅ 2. BUSINESS LOGIC
    const result = await service.createRequest(req.body, req.user.id);

    // ✅ 3. SOCKET EVENT
    const io = req.app.get("io");
    io.emit("requestAssigned", result);

    // ✅ 4. LOG SUCCESS
    logger.log(`Service request created by user ${req.user.id}`);

    // ✅ 5. RESPONSE
    res.status(201).json({
      success: true,
      message: "Service request created",
      data: result,
    });

  } catch (error) {
    logger.error(error.message);
    next(error);
  }
};

// 🔥 ACCEPT REQUEST
exports.acceptRequest = async (req, res, next) => {
  try {
    const updated = await service.acceptRequest(req.params.id);

    // SOCKET UPDATE
    const io = req.app.get("io");
    io.emit("requestUpdated", updated);

    // LOG
    logger.log(`Request ${req.params.id} accepted by mechanic ${req.user.id}`);

    res.json({
      success: true,
      message: "Request accepted",
      data: updated,
    });

  } catch (error) {
    logger.error(error.message);
    next(error);
  }
};

// 🔥 GET USER REQUESTS
exports.getRequests = async (req, res, next) => {
  try {
    const requests = await service.getUserRequests(req.user.id);

    res.json({
      success: true,
      data: requests,
    });

  } catch (error) {
    logger.error(error.message);
    next(error);
  }
};

// 🔥 UPDATE STATUS
exports.updateStatus = async (req, res, next) => {
  try {
    const updated = await service.updateStatus(
      req.params.id,
      req.body.status
    );

    logger.log(`Request ${req.params.id} status updated to ${req.body.status}`);

    res.json({
      success: true,
      message: "Status updated",
      data: updated,
    });

  } catch (error) {
    logger.error(error.message);
    next(error);
  }
};