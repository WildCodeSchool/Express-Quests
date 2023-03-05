const { body, validationResult } = require("express-validator");

const validateMovie = [
  body("title").isString().isLength({ max: 255 }),
  body("director").isString().isLength({ max: 255 }),
  body("year").isString().isLength({ max: 255 }),
  body("color").isString().isLength({ max: 255 }),
  body("duration").isNumeric(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ validationErrors: errors.array() });
    } else {
      next();
    }
  },
];
const validateUser = [
  body("email").isEmail(),

  body("firstname").isString().isLength({ max: 255 }),
  body("lastname").isString().isLength({ max: 255 }),
  body("email").isEmail().isLength({ max: 255 }),
  body("city").isString().isLength({ max: 255 }),
  body("language").isString().isLength({ max: 255 }),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ validationErrors: errors.array() });
    } else {
      next();
    }
  },
];

module.exports = { validateMovie, validateUser };
