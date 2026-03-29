// src/utils/logger.js

exports.log = (message) => {
  console.log(`[${new Date().toISOString()}] ${message}`);
};

exports.error = (message) => {
  console.error(`[ERROR ${new Date().toISOString()}] ${message}`);
};