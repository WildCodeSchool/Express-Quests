const usersRouter = require('express').Router()
const Users = require('../models/usersModel');

const bodyparser = require('body-parser');

usersRouter.use(bodyparser.json());
usersRouter.use(bodyparser.urlencoded({ extended: true }));

const Joi = require('joi');


usersRouter.get("/", (req, res) => {
    Users.findMany()
        .then((result) => {
            res.json(result[0])
        })
        .catch((err) => {
            res.status(500).send("error")
        })
})

usersRouter.get("/:id", (req, res) => {
    const { id } = req.params
    Users.findOne(id)
        .then((result) => {
            res.json(result[0])
        })
        .catch((err) => {
            res.status(500).send("error")
        })
})

usersRouter.post("/", (req, res) => {
    const { firstname, lastname, email, city, language } = req.body;

    const { error } = Joi.object({
        firstname: Joi.string().max(255).required(),
        lastname: Joi.string().max(255).required(),
        email: Joi.string().required(),
        city: Joi.string().required(),
        language: Joi.string().required(),
    }).validate(
        { firstname, lastname, email, city, language },
        { abortEarly: false }
    );

    if (error) {
        res.status(422).json({ validationErrors: error.details });
    }
    else {
        Users.postOne(firstname, lastname, email, city, language)
            .then((result) => {
                const id = result.insertId;
                const createdMovie = { id, firstname, lastname, email, city, language };
                res.json(createdMovie)
            })
            .catch((err) => {
                res.status(500).send('Error saving the movie');
            })
    }
})


usersRouter.put("/:id", (req, res) => {
    const { id } = req.params;

    let existingMovie = null;
    let validationErrors = null;

    Users.findOne(id)
        .then((result) => {
            existingMovie = result[0];
            if (!existingMovie) return Promise.reject('RECORD_NOT_FOUND');
            validationErrors = Joi.object({
                firstname: Joi.string().max(255),
                lastname: Joi.string().max(255),
                email: Joi.string(),
                city: Joi.string(),
                language: Joi.string(),
            }).validate(req.body, { abortEarly: false }).error;
            if (validationErrors) return Promise.reject('INVALID_DATA');
            return Users.putOne(req.body, id)
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

usersRouter.delete('/:id', (req, res) => {
    const { id } = req.params;

    Users.deleteOne(id)
        .then(() => {
            res.status(200).send("users deleted")
        })
        .catch(() => {
            res.status(500).send("error")
        })
})

module.exports = usersRouter;