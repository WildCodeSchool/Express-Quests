const moviesRouter = require('./movies');

const setupRoutes = (app) => {
  // Movie routes
  app.use('/api/movies', moviesRouter);
  // User routes
  // TODO
};

module.exports = {
  setupRoutes,
};
