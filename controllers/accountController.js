const Joi = require("joi");
let mongoose = require('mongoose');
let { AccountSchema } = require("../validator/account");
let AccountService = require('../services/account');
/**
 * @exports Account CRUD Operations
 * @namespace Account
 */
module.exports = {
    /**
     * @memberof Account
     * @method createAccount
     * This will create the User with Validate the request.
     * </pre>
     */
    createAccount: function(req, res) {
        let { body } = req;
        let user = req.user;
        const result = AccountSchema.validate(body); 
        const { value, error } = result; 
        const valid = error == null; 
        console.log(value, result, error);
        if (!valid) { 
            res.status(422).json({ 
                status: false,
                message: 'Invalid request', 
                data: body 
            }) 
        } else {
            body['user'] = user._id;
            AccountService
                .createAccount(body)
                .then(response => {
                    if(response.status) {
                        res.status(200).json(response) 
                    } else {
                        res.status(400).json(response)
                    }
                }).catch(err => {
                    res.status(400).json({ 
                        message: 'Internal Server Error', 
                        data: body 
                    }) 
                })
        }
    },
    /**
     * @memberof Account
     * @method getAccounts
     * This will get the Users account informations.
     * </pre>
     */
    getAccounts: function(req, res) {
        let { _id } = req.user;
        AccountService
            .getAccounts({ user: _id })
            .then(response => {
                if(response.status) {
                    res.status(200).json(response) 
                } else {
                    res.status(400).json(response)
                }
            }).catch(err => {
                res.status(400).json({ 
                    message: 'Internal Server Error', 
                    data: body 
                }) 
            })
    } 
}