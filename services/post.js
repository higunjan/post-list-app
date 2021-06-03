let mongoose = require("mongoose");
let Post = require("../models/post");
/**
 * @exports Post CRUD Operations
 * @namespace Post
 */
module.exports = {
    /**
     * @memberof Post
     * Insert the Post information to the DB.
     * </pre>
     */
    createPost: function(options) {
        return new Promise((resolve, reject) => {
            let { user, title, description, media, targetDate, scheduleDate, _ref_account } = options;
            
            // create the user
            var newPost = new Post();
            // set the user's local credentials
            newPost.title = title;
            newPost.description = description;
            newPost.media = media;
            newPost.targetDate = targetDate;
            newPost.scheduleDate = scheduleDate;
            newPost._ref_account = _ref_account;
            newPost._ref_user = user;

            // save the user
            newPost.save(function(err) {
                err = (err && err.error) ? err.error : err;
                if(err){
                    reject(err);
                    return;
                }
                resolve({ status: true, message: "Post created success.", data: newPost });
            });
        })
    },
    getPosts: function(options) {
        return new Promise((resolve, reject) => {
            let { user, page, limit } = options;
            page = page ? page : 0;
            limit = limit ? limit : 20;
            console.log(user);
            Post.find({
                _ref_user: mongoose.Types.ObjectId(user)
            })
            .limit(limit)
            .skip(limit * page)
            .exec(function(err, posts) {
                err = (err && err.error) ? err.error : err;
                if(err){
                    reject(err);
                    return;
                }
                resolve({ status: true, message: "Post retrived success.", data: posts });
            })
        })
    },
    updatePost: function(options) {
        return new Promise(async (resolve, reject) => {
            let { _id, user, title, description, media, targetDate, scheduleDate, _ref_account } = options;
            
            let post = await Post.findOne({ _id: _id });
            if(!post) {
                resolve({ status: false, message: "No post found for update." });
                return;
            }
            // set the user's local credentials
            post.title? post.title = title : null;
            post.description? post.description = description : null;
            post.media? post.media = media : null;
            post.targetDate? post.targetDate = targetDate : null;
            post.scheduleDate? post.scheduleDate = scheduleDate : null;
            post._ref_account? post._ref_account = _ref_account : null;
            post._ref_user? post._ref_user = user : null;

            // save the user
            post.save(function(err) {
                err = (err && err.error) ? err.error : err;
                if(err){
                    reject(err);
                    return;
                }
                resolve({ status: true, message: "Post created success.", data: post });
            });
        })
    },
    deletePosts: function(options) {
        return new Promise(async (resolve, reject) => {
            let { ids, user } = options;
            
            // save the user
            Post.deleteMany(
                {
                  _id: {
                    $in: ids
                  }
                },
                function(err, result) {
                  if (err) {
                    reject(err);
                  } else {
                    resolve({ status: true, message: "Delete posts success." });
                  }
            });
        })
    },
}