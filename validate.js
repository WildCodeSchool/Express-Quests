const { body, validationResult } = require("express-validator");

const validateMovie = [
    body("title")
        .trim().notEmpty().withMessage({ field: "title", message: "This field is required" })
        .isLength({ max: 255 }).withMessage({ field: "title", message: "Should contain less than 255 characters" }),
    body("director")
        .trim().notEmpty().withMessage({ field: "director", message: "This field is required" })
        .isLength({ max: 255 }).withMessage({ field: "director", message: "Should contain less than 255 characters" }),
    body("year")
        .trim().notEmpty().withMessage({ field: "year", message: "This field is required" })
        .isLength({ max: 255 }).withMessage({ field: "year", message: "Should contain less than 255 characters" }),
    body("color")
        .trim().notEmpty().withMessage({ field: "color", message: "This field is required" })
        .isLength({ max: 255 }).withMessage({ field: "color", message: "Should contain less than 255 characters" }),
    body("duration")
        .trim().notEmpty().withMessage({ field: "duration", message: "This field is required" })
        .isInt().withMessage({ field: "title", message: "Should contain numbers" }),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(422).json({ validationErrors: errors.array() })
        } else {
            next();
        }
    }
];

const validateUser = [
    body("firstname")
        .trim().notEmpty().withMessage({ field: "firstname", message: "This field is required" })
        .isLength({ max: 255 }).withMessage({ field: "firstname", message: "Should contain less than 255 characters" }),
    body("lastname")
        .trim().notEmpty().withMessage({ field: "lastname", message: "This field is required" })
        .isLength({ max: 255 }).withMessage({ field: "lastname", message: "Should contain less than 255 characters" }),
    body("email")
        .trim()
        .notEmpty().withMessage({ field: "email", message: "This field is required" })
        .isEmail().withMessage({ field: "email", message: "Must be a valid email" })
        .isLength({ max: 255 }).withMessage({ field: "email", message: "Should contain less than 255 characters" }),
    body("city")
        .trim().notEmpty().withMessage({ field: "city", message: "This field is required" })
        .isLength({ max: 255 }).withMessage({ field: "city", message: "Should contain less than 255 characters" }),
    body("language")
        .trim().notEmpty().withMessage({ field: "language", message: "This field is required" })
        .isLength({ max: 255 }).withMessage({ field: "language", message: "Should contain less than 255 characters" }),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(422).json({ validationErrors: errors.array() });
        } else {
            next();
        }
    }
];

module.exports = {
    validateMovie,
    validateUser,
}