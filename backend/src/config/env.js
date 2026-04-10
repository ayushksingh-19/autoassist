const crypto = require("crypto");

const isProduction = process.env.NODE_ENV === "production";

const requiredVariables = ["MONGO_URI", "JWT_SECRET"];

const missingVariables = requiredVariables.filter((key) => !process.env[key]);

if (missingVariables.length) {
  throw new Error(`Missing required environment variables: ${missingVariables.join(", ")}`);
}

if (isProduction && process.env.JWT_SECRET.length < 32) {
  throw new Error("JWT_SECRET must be at least 32 characters in production.");
}

if (!isProduction && process.env.JWT_SECRET.length < 32) {
  console.warn("Warning: JWT_SECRET should be at least 32 characters before deployment.");
}

const fallbackNonce = crypto.randomBytes(16).toString("hex");

const parseAllowedOrigins = () => {
  const configuredOrigins = process.env.FRONTEND_URL || "http://localhost:3000";

  return configuredOrigins
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
};

module.exports = {
  isProduction,
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "1d",
  port: process.env.PORT || 5000,
  allowedOrigins: parseAllowedOrigins(),
  requestBodyLimit: process.env.REQUEST_BODY_LIMIT || "20kb",
  fallbackNonce,
};
