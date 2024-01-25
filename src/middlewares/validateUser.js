const { body, validationResults } = require("express-validator");

const validateUser = [
    body("firstname").isLength({ max: 255 }),
    body("lastname").isLength({ max: 255 }),
    body("email").isEmail(),
    (req, res, next) => {
        const errors = validationResults(req);

        if (!errors.isEmpty()) {
            res.status(422).json({ validationErrors: errors.array() });
        } else {
            next();
        }
    },
];

module.exports = validateUser;