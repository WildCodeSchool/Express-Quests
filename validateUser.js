const validateUser = (req, res, next) => {

  const { firstname, lastname, email, language, city } = req.body;
  const errors = [];
  const emailRegex = /[A-Za-z0-9]+[A-Za-z0-9._]+@[A-Za-z0-9-]+\.[A-Za-z]{2,3}/;
  // const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;


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
