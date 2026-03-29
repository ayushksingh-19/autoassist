const express = require("express");
const router = express.Router();
const controller = require("../controllers/walletController");
const auth = require("../middlewares/auth");

router.post("/add", auth, controller.addMoney);
router.get("/", auth, controller.getWallet);

module.exports = router;