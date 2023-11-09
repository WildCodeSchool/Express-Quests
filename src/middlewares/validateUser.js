const validateUser = (req, res, next) => {
  const { email } = req.body;
  const errors = [];

  const emailRegex = /[a-z0-9._]+@[a-z0-9-]+\.[a-z]{2,3}/;

  if (!emailRegex.test(email)) {
    errors.push({ field: "email", message: "Invalid email" });
  }

  if (errors.length) {
    res.status(422).json({ validationErrors: errors });
  } else {
    next();
  }
};

module.exports = validateUser;
