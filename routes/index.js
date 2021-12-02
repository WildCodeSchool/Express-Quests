const moviesRouter = require('./moviesRouter')
const usersRouter = require('./usersRouter')



const setupRoutes = (app) => {
    app.use('/movies', moviesRouter);
    app.use('/movies/:id', moviesRouter);
    app.use('/users', usersRouter);
    app.use('/users/:id', usersRouter);
  }
  
  module.exports = setupRoutes;