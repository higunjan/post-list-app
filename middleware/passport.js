// load all the things we need
let LocalStrategy = require('passport-local').Strategy;
let passport = require('passport');
let mongoose = require("mongoose");
let AuthController = require("../controllers/authController");
// load up the user model
let User = require('../models/user');


// used to serialize the user for the session
passport.serializeUser(function(user, done) {
    done(null, user);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

// we are using named strategies since we have one for login and one for signup
// by default, if there was no name, it would just be called 'local'

passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    function(req, email, password) {
        process.nextTick(function() {
            req.body['email'] = email;
            req.body['password'] = password;
            AuthController.createUser(req, req.res);
        });
    }
));

passport.use('local-login', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true // allows us to pass back the entire request to the callback
},
function(req, email, password, done) { // callback with email and password from our form
    try{
        User.findOne({ 'email': new RegExp('^'+email+'$', 'gi')})
            .select('+password')
            .exec(function(err, user) {
                if (err){
                    return req.res.status(500).send({ status: false, message: "Internal Server Error" })
                }

                if (!user){
                    return req.res.status(400).send({ status: false, message: "You're not registered" })
                }

                if (!user.validPassword(password)){
                    return req.res.status(400).send({ status: false, message: "Email & Password not matched" })
                }
                return done(null, user);
            });
    } catch(e) {
        return req.res.status(500).send({ status: false, message: "Internal Server Error" })
    }
}));