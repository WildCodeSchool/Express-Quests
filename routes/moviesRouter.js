const moviesRouter = require('express').Router()
const Movies = require('../models/moviesModel');

const bodyparser = require('body-parser');

moviesRouter.use(bodyparser.json());
moviesRouter.use(bodyparser.urlencoded({ extended: true }));

const Joi = require('joi');


moviesRouter.get("/", (req, res) => {
    Movies.findMany()
        .then((result) => {
            res.json(result[0])
        })
        .catch((err) => {
            res.status(500).send("error")
        })
})

moviesRouter.get("/:id", (req, res) => {
    const { id } = req.params
    Movies.findOne(id)
        .then((result) => {
            res.json(result[0])
        })
        .catch((err) => {
            res.status(500).send("error")
        })
})

moviesRouter.post("/", (req, res) => {
    const { title, director, year, color, duration } = req.body;

    const { error } = Joi.object({
        title: Joi.string().max(255).required(),
        director: Joi.string().max(255).required(),
        year: Joi.number().integer().min(1888).required(),
        color: Joi.boolean().required(),
        duration: Joi.number().integer().min(1).required(),
    }).validate(
        { title, director, year, color, duration },
        { abortEarly: false }
    );

    if (error) {
        res.status(422).json({ validationErrors: error.details });
    }
    else {
        Movies.postOne(title, director, year, color, duration)
            .then((result) => {
                const id = result.insertId;
                const createdMovie = { id, title, director, year, color, duration };
                res.json(createdMovie)
            })
            .catch((err) => {
                res.status(500).send('Error saving the movie');
            })
    }
})


moviesRouter.put("/:id", (req, res) => {
    const { id } = req.params;

    let existingMovie = null;
    let validationErrors = null;

    Movies.findOne(id)
        .then((result) => {
            existingMovie = result[0];
            if (!existingMovie) return Promise.reject('RECORD_NOT_FOUND');
            validationErrors = Joi.object({
                title: Joi.string().max(255),
                director: Joi.string().max(255),
                year: Joi.number().integer().min(1888),
                color: Joi.boolean(),
                duration: Joi.number().integer().min(1),
            }).validate(req.body, { abortEarly: false }).error;
            if (validationErrors) return Promise.reject('INVALID_DATA');
            return Movies.putOne(req.body, id)
                .then(() => {
                    res.status(200).json({ ...existingMovie, ...req.body });
                })
                .catch((err) => {
                    console.error(err);
                    if (err === 'RECORD_NOT_FOUND')
                        res.status(404).send(`Movie with id ${movieId} not found.`);
                    else if (err === 'INVALID_DATA')
                        res.status(422).json({ validationErrors });
                    else res.status(500).send('Error updating a movie.');
                })
        })
        .catch((err) => {
            res.status(500).send(validationErrors)
            console.log(err)
        })

})

moviesRouter.delete('/:id', (req, res) => {
    const { id } = req.params;

    Movies.deleteOne(id)
        .then(() => {
            res.status(200).send("movies deleted")
        })
        .catch(() => {
            res.status(500).send("error")
        })
})

module.exports = moviesRouter;