const Joi = require("joi");

exports.createServiceSchema = Joi.object({
  serviceType: Joi.string().required(),
  vehicleType: Joi.string().required(),
  location: Joi.string().required(),
  lat: Joi.number().required(),
  lng: Joi.number().required(),
});