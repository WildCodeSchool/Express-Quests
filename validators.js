const {body, validationResult} = require('express-validator');

const validateMovie = [
    body("title").isAlpha().isLength({max: 255}).notEmpty(),
    body("director").isAlpha().isLength({ max: 255 }).notEmpty(),
    body("year").isAlpha().isLength({ max: 255 }).notEmpty(),
    body("color").isAlpha().isLength({ max: 255 }).notEmpty(),
    body("duration").notEmpty(),
    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            res.status(422).json({ validationErrors: errors.array()});
        } else {
            next();
        }
    }
];

const validateUser = [
    body("firstname").isAlpha().isLength({ max: 255 }).notEmpty(),
    body("lastname").isAlpha().isLength({ max: 255 }).notEmpty(),
    body("email").isEmail().isLength({ max: 255 }).notEmpty(),
    body("city").isAlpha().isLength({ max: 255 }),
    body("language").isAlpha(),
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
};