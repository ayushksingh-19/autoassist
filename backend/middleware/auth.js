const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader) {
      return res.status(401).json({ message: "No token" });
    }

    const token = authHeader.replace("Bearer ", "");

    const decoded = jwt.verify(token, "secretkey"); // ⚠️ same key as login

    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};