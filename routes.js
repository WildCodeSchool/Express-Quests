const movieController = require('./controllers/movies');

const setUpRoutes = (app) => {
  // Movie routes
  app.get('/api/movies', movieController.handleGetMovies);
  app.get('/api/movies/:id', movieController.handleGetOneMovie);
  app.post('/api/movies', movieController.handlePostMovie);
  app.put('/api/movies/:id', movieController.handlePutMovie);
  app.delete('/api/movies/:id', movieController.handleDeleteMovie);

  // User routes
  // TODO
};

module.exports = {
  setUpRoutes,
};
