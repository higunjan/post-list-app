const Joi = require("joi");
let mongoose = require('mongoose');
let { PostCreateSchema, PostUpdateSchema } = require("../validator/post");
let PostService = require('../services/post');
/**
 * @exports Post CRUD Operations
 * @namespace Post
 */
module.exports = {
    /**
     * @memberof Post
     * @method createPost
     * This will create the User with Validate the request.
     * </pre>
     */
    createPost: function(req, res) {
        let { body } = req;
        let user = req.user;
        req.files && req.files.length ? body['media'] = './upload/'+req.files[0].filename : null;
        const result = PostCreateSchema.validate(body); 
        const { value, error } = result; 
        const valid = error == null; 
        if (!valid) { 
            res.status(422).json({ 
                status: false,
                message: 'Invalid request', 
                data: body 
            }) 
        } else {
            body['user'] = user._id;
            body['_ref_account'] = mongoose.Types.ObjectId(body._ref_account);
            PostService
                .createPost(body)
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
     * @memberof post
     * @method getPosts
     * This will get the Users post informations.
     * </pre>
     */
    getPosts: function(req, res) {
        let { _id } = req.user;
        let { page, limit, sort } = req.query;
        if(sort && typeof sort == "string") {
            console.log(sort);
            sort = JSON.parse(sort);
        } else {
            sort = {}
        }
        PostService
            .getPosts({ user: _id, page, limit, sort })
            .then(response => {
                if(response.status) {
                    res.status(200).json(response) 
                } else {
                    res.status(400).json(response)
                }
            }).catch(err => {
                res.status(400).json({ 
                    message: 'Internal Server Error', 
                    data: err 
                }) 
            })
    },
    /**
     * @memberof Post
     * @method updatePost
     * This will create the User with Validate the request.
     * </pre>
     */
    updatePost: function(req, res) {
        let { body } = req;
        let { id } = req.params;
        let user = req.user;
        body['_id'] = id;
        req.files && req.files.length ? body['media'] = './upload/'+req.files[0].filename : null;
        const result = PostUpdateSchema.validate(body); 
        const { value, error } = result; 
        const valid = error == null; 
        console.log(value, error);
        if (!valid) { 
            res.status(422).json({ 
                status: false,
                message: 'Invalid request', 
                data: body 
            }) 
        } else {
            body['user'] = user._id;
            body['_ref_account'] = mongoose.Types.ObjectId(body._ref_account);
            PostService
                .updatePost(body)
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
    deletePosts: function(req, res) {
        let { id } = req.params;
        let options = {};
        let user = req.user;
        options['user'] = user._id;
        options['ids'] = id.split(";");
        PostService
            .deletePosts(options)
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
    },
    searchPosts: function(req, res) {
        let { _id } = req.user;
        let { title, description, accountName } = req.query;
        PostService
            .searchPosts({ user: _id, title, description, accountName })
            .then(response => {
                if(response.status) {
                    res.status(200).json(response) 
                } else {
                    res.status(400).json(response)
                }
            }).catch(err => {
                res.status(400).json({ 
                    message: 'Internal Server Error', 
                    data: err 
                }) 
            })
    },
}