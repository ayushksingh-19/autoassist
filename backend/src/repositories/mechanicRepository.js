const User = require("../models/User");

exports.findAvailableMechanics = async () => {
  return await User.find({ role: "mechanic" });
};