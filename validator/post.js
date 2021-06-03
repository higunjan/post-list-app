const Joi = require('joi');
const JoiO = require('joi-oid');

const PostCreateSchema = Joi.object({
    title: Joi.string()
        .min(3)
        .max(50)
        .required(),
    description: Joi.string()
            .min(10)
            .max(1000),
    media: Joi.string()
            .min(5)
            .max(150),
    targetDate: Joi.date().iso().required(),
    scheduleDate: Joi.date().iso().required(),
    _ref_account: Joi.string().required()
})
const PostUpdateSchema = Joi.object({
    _id: JoiO.objectId().required(),
    title: Joi.string()
        .min(3)
        .max(50),
    description: Joi.string()
            .min(10)
            .max(1000),
    media: Joi.string()
            .min(5)
            .max(150),
    targetDate: Joi.date().iso(),
    scheduleDate: Joi.date().iso(),
    _ref_account: Joi.string()
});

module.exports = {
    PostCreateSchema,
    PostUpdateSchema
}