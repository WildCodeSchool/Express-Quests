const Joi = require('joi');

exports.validateMovie = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    year: Joi.number().integer().min(1800).max(2030),
    genre: Joi.string().required(),
    director: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(422).json({ error: error.details[0].message });
  }

  next();
};

exports.validateUser = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(422).json({ error: error.details[0].message });
  }

  next();
};
