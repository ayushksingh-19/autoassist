const ServiceRequest = require("../models/ServiceRequest");

exports.create = async (data) => {
  return await ServiceRequest.create(data);
};

exports.findById = async (id) => {
  return await ServiceRequest.findById(id);
};

exports.findByUserId = async (userId) => {
  return await ServiceRequest.find({ userId });
};

exports.updateStatus = async (id, status) => {
  return await ServiceRequest.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );
};