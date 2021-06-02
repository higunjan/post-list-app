// load the things we need
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// define the schema for account model
var accountSchema = mongoose.Schema({
    accountName: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['facebook', 'linkedin', 'instagram', 'twitter'],
        required: true
    },
    _ref_user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
}, { timestamps: true });

// Model accounts and expose it to our app
module.exports = User = mongoose.model('accounts', accountSchema);
