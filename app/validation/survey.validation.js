const Joi = require("joi");

exports.createSurvey = Joi.object({
  userId: Joi.number().required(),
  values: Joi.array().items(Joi.number()).required(),
});
