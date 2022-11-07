const validateMovie = (req, res, next) => {
  const { title, director, year, color, duration } = req.body;
  const errors = [];

  if (title == null) {
    errors.push({ field: "title", message: "This field is required" })
  } else if (title.length >= 255) {
    errors.push({ field: "title", message: "Should contains less than 255 characters" })
  }

  if (director == null) {
    errors.push({ field: "director", message: "This field is required" })
  };

  if (year == null) {
    errors.push({ field: "year", message: "This field is required" })
  };

  if (color == null) {
    errors.push({ field: "color", message: "This field is required" })
  };

  if (duration == null) {
    errors.push({ field: "duration", message: "This field is required" })
  };

  if (errors.length) {
    res.status(422).json({ validationErros: errors })
  } else {
    next()
  }
}


module.exports = {
  validateMovie,
};