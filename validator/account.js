const Joi = require('joi');

const AccountSchema = Joi.object({
    accountName: Joi.string()
        .min(3)
        .max(100)
        .required(),

    type: Joi.string()
            .valid('facebook', 'linkedin', 'instagram', 'twitter')

})

module.exports = {
    AccountSchema
}