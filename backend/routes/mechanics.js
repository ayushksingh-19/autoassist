const express = require("express");
const router = express.Router();

// Dummy for now (later DB)
router.get("/", (req, res) => {
  res.json([
    { id: 1, lat: 26.803, lng: 75.864, name: "Shivam Garage" },
    { id: 2, lat: 26.801, lng: 75.862, name: "CarFix Center" },
    { id: 3, lat: 26.804, lng: 75.865, name: "Auto Repair Hub" },
  ]);
});

module.exports = router;