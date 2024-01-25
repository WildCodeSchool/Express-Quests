// const validateMovie = (req, res, next) => {
//     const { title, director, year, color, duration } = req.body;
//     const errors = [];

//     if (title == null) {
//         errors.push({ field: "title", message: "is required" })
//     } else if (title.length >= 255) {
//         errors.push({ fiel: "title", message: "too long" })
//     } else if (director == null) {
//         errors.push({ field: "director", message: "is required" })
//     } else if (year == null) {
//         errors.push({ field: "yeah", message: "is required" })
//     } else if (color == null) {
//         errors.push({ field: "color", message: "is required" })
//     } else if (duration == null) {
//         errors.push({ field: "duration", message: "is required" })
//     } else if (errors.length) {
//         res.status(422).json({ validationErrors: errors })
//     } else {
//         next()
//     }
// };

const { body, validationResult } = require("express-validator");

const validateMovie = [
    body("title").isLength({ max: 255 }),
    body("director").isLength({ max: 255 }),
    body("year").isLength({ max: 255 }),
    body("color").isInt({ min: 0, max: 1 }),
    body("duration").isInt({ gt: 0 }),
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(422).json({ validationErrors: errors.array() });
        } else {
            next();
        }
    },
];

module.exports = validateMovie;