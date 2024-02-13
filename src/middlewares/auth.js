const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const hashingOptions = {
    type: argon2.argon2id,
    memoryCost: 2 ** 16,
    timeCost: 5,
    parallelism: 1,
};

const hashPassword = (req, res, next) => {
    argon2
        .hash(req.body.password, hashingOptions)
        .then((hashedPassword) => {
            console.log(hashedPassword);

            req.body.hashedPassword = hashedPassword;
            delete req.body.password;

            next();
        })
        .catch((err) => {
            console.error(err);
            res.sendStatus(500);
        });
};

const verifyPassword = (req, res) => {
    argon2
        .verify(req.user.hashedPassword, req.body.password)
        .then((isVerified) => {
            if (isVerified) {
                const payload = { sub: req.user.id };

                const token = jwt.sign(payload, process.env.JWT_SECRET, {
                    expiresIn: "1h",
                });

                delete req.user.hashedPassword;
                res.send({ token, user: req.user });
            } else {
                res.sendStatus(401);
            }
        })
        .catch((err) => {
            console.error(err);
            res.sendStatus(500);
        });
};

const verifyToken = (req, res, next) => {
    try {
        next();
    } catch (err) {
        console.error(err);
        res.sendStatus(401);
    }
};

module.exports = {
    hashPassword,
    verifyPassword,
    verifyToken,
};