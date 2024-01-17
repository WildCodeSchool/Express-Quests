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

module.exports = validateMovie