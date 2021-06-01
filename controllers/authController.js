const Joi = require("joi");
let mongoose = require('mongoose');
let { LoginSchema, SignupSchema } = require("../validator/auth");
let AuthService = require('../services/auth');
/**
 * @exports Login CRUD Operations
 * @namespace User Managment
 */
module.exports = {
    /**
     * @memberof User Managment
     * @method getUser
     * This will get the user information.
     * </pre>
     */
    getUser: function(req, res) {
        let { body } = req;
        const result = LoginSchema.validate(body); 
        const { value, error } = result; 
        const valid = error == null; 
        if (!valid) { 
            res.status(422).json({ 
                message: 'Invalid request', 
                data: body 
            }) 
        } else {
            AuthService
                .getUser(body)
                .then(response => {
                    res.status(200).json({ 
                        message: 'Login Successfully Done', 
                        data: response
                    }) 
                }).catch(err => {
                    res.status(400).json({ 
                        message: 'Internal Server Error', 
                        data: body 
                    }) 
                })
        }
    },
    /**
     * @memberof User Managment
     * @method createUser
     * This will create the User with Validate the request.
     * </pre>
     */
    createUser: function(req, res) {
        let { body } = req;
        const result = SignupSchema.validate(body); 
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
            AuthService
                .createUser(body)
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
}