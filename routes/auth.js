
let authController = require("../controllers/authController");

module.exports = (app, passport) => {
    app.post('/api/signin', passport.authenticate('local-login', {session : true}), authController.getUser);
    app.post('/api/signup', passport.authenticate('local-signup', {session : true}));
}