const Joi = require("joi");

const userSchema = Joi.object({
  email: Joi.string().email().max(255).required(),
  firstname: Joi.string().max(255).required(),
  lastname: Joi.string().max(255).required(),
});
const movieSchema = Joi.object({
  title: Joi.string().max(255).required(),
  director: Joi.string().max(255).required(),
  year: Joi.number().integer().min(1880).max(2030).required(),
  color: Joi.string().required(),
  duration: Joi.number().integer().required(),
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

// in validators.js
// const validateMovie = (req, res, next) => {
//   const { title, director, year, color, duration } = req.body;
//   const errors = [];
//   if (title == null) {
//     errors.push({ field: "title", message: "This field is required" });
//   } else if (title.length >= 255) {
//     errors.push({
//       field: "title",
//       message: "Should contain less than 255 characters",
//     });
//   } else if (director == null) {
//     res.status(422).send("The field 'director' is required");
//   } else if (year == null) {
//     res.status(422).send("The field 'year' is required");
//   } else if (color == null) {
//     res.status(422).send("The field 'color' is required");
//   } else if (duration == null) {
//     res.status(422).send("The field 'duration' is required");
//   } else {
//     next();
//   }
// };

const validateUser = (req, res, next) => {
  const { firstname, lastname, email } = req.body;

  const { error } = userSchema.validate(
    { firstname, lastname, email },
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
