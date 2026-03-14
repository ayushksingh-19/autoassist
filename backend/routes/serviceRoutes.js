const express = require("express");
const router = express.Router();

const { createRequest, getRequests, updateStatus } = require("../controllers/serviceController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/create", authMiddleware, createRequest);
router.get("/all", authMiddleware, getRequests);
router.put("/update/:id", authMiddleware, updateStatus);

module.exports = router;
