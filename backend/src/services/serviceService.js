const repository = require("../repositories/serviceRepository");
const mechanicRepo = require("../repositories/mechanicRepository");

// 🔥 CREATE + AUTO ASSIGN
exports.createRequest = async (data, userId) => {

  const request = await repository.create({
    ...data,
    userId,
  });

  // AUTO ASSIGN
  const updated = await exports.assignNearestMechanic(request);

  return updated;
};

// ACCEPT
exports.acceptRequest = async (id) => {
  const request = await repository.findById(id);

  if (!request) {
    throw new Error("Request not found");
  }

  request.status = "accepted";
  return await request.save();
};

// GET USER REQUESTS
exports.getUserRequests = async (userId) => {
  return await repository.findByUserId(userId);
};

// UPDATE STATUS
exports.updateStatus = async (id, status) => {
  return await repository.updateStatus(id, status);
};

// 🔥 NEAREST MECHANIC LOGIC
exports.assignNearestMechanic = async (request) => {

  const mechanics = await mechanicRepo.findAvailableMechanics();

  if (!mechanics.length) return request;

  let nearest = null;
  let minDistance = Infinity;

  mechanics.forEach((m) => {

    if (!m.lat || !m.lng) return;

    const distance = Math.sqrt(
      Math.pow(request.lat - m.lat, 2) +
      Math.pow(request.lng - m.lng, 2)
    );

    if (distance < minDistance) {
      minDistance = distance;
      nearest = m;
    }
  });

  if (nearest) {
    request.mechanicId = nearest._id;
    request.status = "assigned";
    await request.save();
  }

  return request;
};