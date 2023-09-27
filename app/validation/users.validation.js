const Joi = require("joi");

exports.login = Joi.object({
  digits: Joi.string().required(),
  password: Joi.string().required(),
});

exports.register = Joi.object({
  digits: Joi.string().uppercase().required().max(3),
  fotoUrl: Joi.string().optional().allow(null),
  workType: Joi.string().required().valid("WFO", "WFH", "WFA"),
  positionTitle: Joi.string().required(),
  lat: Joi.number().optional(),
  lon: Joi.number().optional(),
  company: Joi.string().required(),
  fullname: Joi.string().required(),
  role: Joi.string().required().valid("EMPLOYE", "ADMIN"),
  password: Joi.string().required(),
});
