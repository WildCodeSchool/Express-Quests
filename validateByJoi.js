const Joi = require('joi')

const userValidator = Joi.object({
  firstname: Joi.string()
    .alphanum()
    .max(255)
    .required(),
  lastname: Joi.string()
    .alphanum()
    .max(255)
    .required(),
  email: Joi.string()
    .pattern(new RegExp(/[a-z0-9._]+@[a-z0-9-]+\.[a-z]{2,3}/))
    .required(),
  language: Joi.string()
    .alphanum()
    .max(255)
    .required(),
  city: Joi.string()
    .alphanum()
    .max(255)
    .required()
    .default()
    
})


