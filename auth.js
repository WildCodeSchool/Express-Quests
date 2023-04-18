const argon2 = require("argon2");

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

const hashPassword = (request, response, next) => {
  if (request.body.password) {
    argon2
      .hash(request.body.password, hashingOptions)
      .then((hashedPassword) => {
        request.body.hashedPassword = hashedPassword;
        delete request.body.password;
        next();
      })
      .catch((err) => {
        console.error(err);
        response.status(500).send("Error hashing password");
      });
  } else {
    next();
  }
};

module.exports = {
  hashPassword,
};