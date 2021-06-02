// load the things we need
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// define the schema for post model
var postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    media: {
        type: String
    },
    targetDate: {
        type: Date,
        required: true
    },
    scheduleDate: {
        type: Date,
        required: true
    },
    _ref_account: {
        type: Schema.Types.ObjectId,
        ref: 'accounts'
    },
    _ref_user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
}, { timestamps: true });

// Model posts and expose it to our app
module.exports = User = mongoose.model('posts', postSchema);
