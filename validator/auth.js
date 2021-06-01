const Joi = require('joi');

const SignupSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(15)
        .required(),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9-_@!#]{3,30}$'))

})

const LoginSchema = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9-_@!#]{3,30}$'))

})

module.exports = {
    SignupSchema,
    LoginSchema
}