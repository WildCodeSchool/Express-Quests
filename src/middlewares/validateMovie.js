const Joi = require("joi");

const userSchema = Joi.object({
  title: Joi.string().max(255).required(),
  director: Joi.string().max(255).required(),
  year: Joi.string().max(255).required(),
  color: Joi.string().max(255).required(),
  duration: Joi.number().integer().min(1).required(),
});

const validateMovie = (req, res, next) => {
  const { title, director, year, color, duration } = req.body;

  const { error } = userSchema.validate(
    { title, director, year, color, duration },
    { abortEarly: false }
  );

  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    next();
  }
};

module.exports = validateMovie;