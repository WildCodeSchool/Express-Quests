const Joi = require("joi");

const movieSchema = Joi.object({
    title: Joi.string().max(255).required(),
    director: Joi.string().max(255).required(),
    year: Joi.string().max(255).required(),
    color: Joi.string().max(255).required(),
    duration: Joi.number().integer().required(),
});

const validateMovie = (req, res, next) => {
    const { title, director, year, color, duration } = req.body;

    const { error } = movieSchema.validate(
        { title, director, year, color, duration },
        { abortEarly: false }
    );

    if (error) {
        res.status(422).json({ validationErros: error.details });
    } else {
        next();
    }
};


// const validateMovie = (req, res, next) => {
//     const { title, director, year, color, duration } = req.body;
//     const errors = [];
  
//     if (title == null) {
//       errors.push({ field: "title", message: "This field is required" });
//     } else if (title.length >= 255) {
//       errors.push({field: "title", message: "Should contain less than 255 characters"});
//     }
//     if (director == null) {
//       errors.push({ field: "director", message: "This field is required" });
//     }
//     if (year == null) {
//       errors.push({ field: "year", message: "This field is required" });
//     }
//     if (color == null) {
//       errors.push({ field: "color", message: "This field is required" });
//     }
//     if (duration == null) {
//       errors.push({ field: "duration", message: "This field is required" });
//     }

//     if (errors.length) {
//       res.status(422).json({ validationErrors: errors });
//     } else {
//       next();
//     }
//   };

module.exports = validateMovie