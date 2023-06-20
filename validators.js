const validateMovies = (req, res, next) => {
  const { title, director, year, color, duration } = req.body;

  if (title == null) {
    res.status(422).send("The field 'title' is required");
  } else if (director == null) {
    res.status(422).send("The field 'director' is required");
  } else if (year == null) {
    res.status(422).send("The field 'year' is required");
  } else if (color == null) {
    res.status(422).send("The field 'color' is required");
  } else if (duration == null) {
    res.status(422).send("The field 'duration' is required");
  } else {
    next();
  }
};

module.exports = validateMovies;
