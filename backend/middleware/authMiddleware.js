const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {

  try {

    const authHeader = req.header("Authorization");

    if (!authHeader) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }

    // Extract token from "Bearer TOKEN"
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ msg: "Invalid token format" });
    }

    const decoded = jwt.verify(token, "secretkey"); // use your secret

    req.user = decoded;

    next();

  } catch (error) {
    res.status(401).json({ msg: "Token is not valid" });
  }

};