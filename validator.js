const validateMovie = (req, res, next) => {
  const { title, director, year, color, duration } = req.body;
  const errors = [];

  if (title == null) {
    errors.push({ field: "title", message: "this field is required" });
  }
  if (director == null) {
    errors.push({ field: "director", message: "this field is required" });
  }
  if (year == null) {
    errors.push({ field: "year", message: "this field is required" });
  }
  if (color == null) {
    errors.push({ field: "color", message: "this field is required" });
  }
  if (duration == null) {
    errors.push({ field: "duration", message: "this field is required" });
  } else if (typeof duration !== "number" || duration > 1) {
    errors.push({ field: "duration", message: "this field must be a number" });
  }
  if (errors.length) {
    res.status(422).json({ validationErrors: errors });
  } else {
    next();
  }
};

module.exports = { validateMovie };
