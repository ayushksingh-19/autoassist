const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const env = require("../config/env");

const normalizeEmail = (email = "") => email.trim().toLowerCase();

const sanitizeUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
});

exports.register = async (req, res, next) => {
  try {
    const name = String(req.body.name || "").trim();
    const email = normalizeEmail(req.body.email);
    const password = String(req.body.password || "");

    if (!name || !email || password.length < 8) {
      return res.status(400).json({ message: "Valid name, email, and 8 character password are required." });
    }

    const userExists = await User.exists({ email });
    if (userExists) {
      return res.status(409).json({ message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, Number(process.env.BCRYPT_ROUNDS || 12));
    const user = await User.create({ name, email, password: hashedPassword });

    return res.status(201).json({ message: "User registered successfully.", user: sanitizeUser(user) });
  } catch (error) {
    return next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const email = normalizeEmail(req.body.email);
    const password = String(req.body.password || "");
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, env.jwtSecret, {
      expiresIn: env.jwtExpiresIn,
    });

    return res.json({ token, role: user.role, user: sanitizeUser(user) });
  } catch (error) {
    return next(error);
  }
};
