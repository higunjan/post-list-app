// load the things we need
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({
    name: {    // name of User
        type: String,
        required: true
    },
    email: {        // User email ID
        type: String,
        required: true,
        unique: true
    },
    password: {     // User password stored in Encrypted formate
        type: String,
        required: true,
        select: false
    }
}, {});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// create the model for users and expose it to our app
module.exports = User = mongoose.model('users', userSchema);
