const Joi = require("joi");

const movieSchema = Joi.object({
  title: Joi.string().required(),
  director: Joi.string().required(),
  year: Joi.number().integer().min(1900).max(2099).required(),
  color: Joi.boolean().required(),
  duration: Joi.number().integer().min(1).required(),
});

const userSchema = Joi.object({
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  email: Joi.string().email().required(),
  city: Joi.string().required(),
  language: Joi.string().required(),
});

const validateMovie = (req, res, next) => {
  const { title, director, year, color, duration } = req.body;
  const { error } = movieSchema.validate(
    { title, director, year, color, duration },
    { abortEarly: false }
  );

  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    next();
  }
};

const validateUser = (req, res, next) => {
  const { firstname, lastname, email, city, language } = req.body;
  const { error } = userSchema.validate(
    { firstname, lastname, email, city, language },
    { abortEarly: false }
  );

  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    next();
  }
};

module.exports = {
  validateMovie,
  validateUser,
};
