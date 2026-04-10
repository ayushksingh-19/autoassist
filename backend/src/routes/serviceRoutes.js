const express = require("express");
const mongoose = require("mongoose");
const Service = require("../models/ServiceRequest");
const authMiddleware = require("../middlewares/auth");
const roleMiddleware = require("../middlewares/role");

const router = express.Router();

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

const allowedServiceTypes = new Set([
  "Mechanic",
  "EV Charging",
  "Fuel Delivery",
  "Roadside Repair",
  "Washing & Cleaning",
  "Tyre Services",
  "Detailing",
  "SOS Emergency",
]);

const sanitizeString = (value, maxLength = 500) =>
  String(value || "")
    .trim()
    .slice(0, maxLength);

const toNumberOrUndefined = (value) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
};

const assignSupport = (serviceType = "", vehicleType = "") => {
  const key = `${serviceType}-${vehicleType}`.toLowerCase();
  const index = key.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0) % mechanicPool.length;
  return mechanicPool[index];
};

const getRequestForUser = async (requestId, user) => {
  if (!mongoose.Types.ObjectId.isValid(requestId)) {
    return null;
  }

  const request = await Service.findById(requestId);
  if (!request) {
    return null;
  }

  const isOwner = String(request.userId) === String(user.id);
  const isMechanic = user.role === "mechanic";

  if (!isOwner && !isMechanic) {
    return "forbidden";
  }

  return request;
};

router.post("/create", authMiddleware, async (req, res, next) => {
  try {
    const serviceType = sanitizeString(req.body.serviceType, 80);
    const vehicleType = sanitizeString(req.body.vehicleType || req.body.vehicleModel || "General vehicle", 80);

    if (!allowedServiceTypes.has(serviceType)) {
      return res.status(400).json({ message: "Invalid service type." });
    }

    const location = sanitizeString(req.body.location, 500);
    if (!location) {
      return res.status(400).json({ message: "Location is required." });
    }

    const assigned = assignSupport(serviceType, vehicleType);

    const newRequest = await Service.create({
      userId: req.user.id,
      serviceType,
      vehicleType,
      fuelType: serviceType === "Fuel Delivery" ? sanitizeString(req.body.fuelType, 40) : "",
      problem: sanitizeString(req.body.problem, 2000),
      location,
      lat: toNumberOrUndefined(req.body.lat),
      lng: toNumberOrUndefined(req.body.lng),
      date: sanitizeString(req.body.date, 40),
      timeSlot: sanitizeString(req.body.timeSlot, 80),
      detailingType: sanitizeString(req.body.detailingType, 100),
      detailingService: sanitizeString(req.body.detailingService, 1000),
      price: Math.max(0, toNumberOrUndefined(req.body.price) || 0),
      paymentMethod: sanitizeString(req.body.paymentMethod, 80),
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
      ],
    });

    const io = req.app.get("io");
    if (io) {
      io.emit("requestAssigned", newRequest);
    }

    return res.status(201).json({ message: "Created", newRequest });
  } catch (error) {
    return next(error);
  }
});

router.get("/my", authMiddleware, async (req, res, next) => {
  try {
    const requests = await Service.find({ userId: req.user.id }).sort({ createdAt: -1 });
    return res.json(requests);
  } catch (error) {
    return next(error);
  }
});

router.put("/accept/:id", authMiddleware, roleMiddleware("mechanic"), async (req, res, next) => {
  try {
    const request = await getRequestForUser(req.params.id, req.user);

    if (!request) {
      return res.status(404).json({ message: "Request not found." });
    }

    request.status = "accepted";
    request.mechanicId = req.user.id;

    await request.save();

    const io = req.app.get("io");
    if (io) {
      io.emit("requestUpdated", request);
    }

    return res.json({ message: "Request accepted", request });
  } catch (error) {
    return next(error);
  }
});

router.get("/all", authMiddleware, roleMiddleware("mechanic"), async (req, res, next) => {
  try {
    const mechanicLat = Number(req.query.lat);
    const mechanicLng = Number(req.query.lng);

    if (!Number.isFinite(mechanicLat) || !Number.isFinite(mechanicLng)) {
      return res.status(400).json({ message: "Valid latitude and longitude are required." });
    }

    const services = await Service.find({ status: { $in: ["assigned", "accepted"] } }).sort({ createdAt: -1 });

    const nearby = services.filter((service) => {
      if (!Number.isFinite(service.lat) || !Number.isFinite(service.lng)) {
        return false;
      }

      const distance = Math.sqrt(
        Math.pow(service.lat - mechanicLat, 2) + Math.pow(service.lng - mechanicLng, 2)
      );

      return distance < 0.1;
    });

    return res.json(nearby);
  } catch (error) {
    return next(error);
  }
});

router.put("/complete/:id", authMiddleware, async (req, res, next) => {
  try {
    const request = await getRequestForUser(req.params.id, req.user);

    if (!request) {
      return res.status(404).json({ message: "Request not found." });
    }

    if (request === "forbidden") {
      return res.status(403).json({ message: "Access denied." });
    }

    request.status = "completed";
    await request.save();

    const io = req.app.get("io");
    if (io) {
      io.emit("requestUpdated", request);
    }

    return res.json({ message: "Service completed", request });
  } catch (error) {
    return next(error);
  }
});

router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    const request = await getRequestForUser(req.params.id, req.user);

    if (!request) {
      return res.status(404).json({ message: "Request not found." });
    }

    if (request === "forbidden") {
      return res.status(403).json({ message: "Access denied." });
    }

    request.status = "cancelled";
    await request.save();

    return res.json({ message: "Request cancelled", request });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
