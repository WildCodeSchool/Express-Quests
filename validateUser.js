const validateUser = (req, res, next) => {

  const { firstname, lastname, email, language, city } = req.body;
  const errors = [];
  const emailRegex = /[a-z0-9._]+@[a-z0-9-]+\.[a-z]{2,3}/;

  for (const [key, value] of Object.entries({ firstname, lastname, email, language, city })) {
    if (value == null) {
      errors.push({ field: key, message: "This field is required" })
    } else if (value.length >= 255) { // pour ne pas mettre de restriction sur email afin de test
      errors.push({ field: key, message: "Should contain less than 255 characters" });
    } else if (key === "email" && !emailRegex.test(email)) {
      errors.push({ field: key, message: "Invalid email" })
    }
  }
  if (errors.length) {
    res.status(422).json({ validationErrors: errors, });
  } else {
    next();
  }

};

module.exports = {
  validateUser,
};
