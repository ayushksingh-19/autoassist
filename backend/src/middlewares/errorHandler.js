const env = require("../config/env");

module.exports = (err, req, res, next) => {
  const statusCode = err.statusCode || err.status || 500;

  if (!env.isProduction) {
    console.error("ERROR:", err);
  }

  res.status(statusCode).json({
    success: false,
    message: statusCode >= 500 ? "Internal server error." : err.message,
    ...(env.isProduction ? {} : { stack: err.stack }),
  });
};
