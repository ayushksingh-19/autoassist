const jwt = require("jsonwebtoken");
const env = require("../config/env");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization") || "";

    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authentication required." });
    }

    const token = authHeader.slice(7).trim();
    if (!token) {
      return res.status(401).json({ message: "Authentication required." });
    }

    req.user = jwt.verify(token, env.jwtSecret);
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};
