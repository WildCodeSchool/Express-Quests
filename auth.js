const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
require("dotenv").config();

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
        next()
    })
    .catch((err) => {
        console.error(err);
    res.sendStatus(500);
});
  // hash the password using argon2 then call next()
  
};

//verify paswword



const verifyPassword = (req, res) => {
  argon2
    .verify(req.user.hashedPassword, req.body.password)
    .then((isVerified) => {
      if (isVerified) {
        const payload = { sub: req.user.id };

        const token = jwt.sign(payload, `${process.env.JWT_SECRET_KEY}`, {
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


// Token verify

const verifyToken = (req, res, next) => {
  try {
    const authorizationHeader = req.get("Authorization");
    if (authorizationHeader == null) {
      throw new Error("Authorization header is missing");
    } 
    const [type, token] = authorizationHeader.split(" ");
    if (type !== "Bearer") {
      throw new Error("Authorization header has not the 'Bearer' type");
    }
    req.payload = jwt.verify(token, `${process.env.JWT_SECRET_KEY}`);
    next();
  } catch (err) {
    console.error(err);
    res.sendStatus(401);
  }
};

// Payload verify by Id

const verifyPayloadId = (req,res,next) =>{
  try {
    if (req.payload.sub == req.user.id ) {
      next();
    } else {
      throw new Error("User id mismatch")
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(403);
  }
  };

module.exports = {
    hashPassword,
    verifyPassword,
    verifyToken,
    verifyPayloadId,
};


