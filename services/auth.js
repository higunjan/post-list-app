let User = require("../models/user.js");
/**
 * @exports Login CRUD Operations
 * @namespace User Managment
 */
module.exports = {
    /**
     * @memberof User Managment
     * This will get the user information.
     * </pre>
     */
    getUser: function(options) {
        return new Promise((resolve, reject) => {
            let { email } = options;
            User.findOne({ email: new RegExp('^'+email+'$', 'i')}, function(err, user) {
                if (err) {
                    reject(err);
                }
                delete user['password'];
                resolve(user);
            });
        })
    },
    /**
     * @memberof User Managment
     * Insert the User information to the DB.
     * </pre>
     */
    createUser: function(options) {
        return new Promise((resolve, reject) => {
            let { email, password, name } = options;
            
            User.findOne({ 'email': new RegExp('^'+email+'$', 'i') }, function(err, user) {
                // if there are any errors, return the error
                if (err)
                    return reject(err);

                // check to see if theres already a user with that email
                if (user) {
                    resolve({ status:false, message: "Email already registered."});;
                } else {
                    // if there is no user with that email
                    // create the user
                    var newUser = new User();
                    // set the user's local credentials
                    newUser.email = email;
                    newUser.name = name;
                    newUser.password = newUser.generateHash(password);

                    // save the user
                    newUser.save(function(err) {
                        err = (err && err.error) ? err.error : err;
                        if(err){
                            reject(err);
                            return;
                        }
                        resolve({ status: true, message: "Registration success.", data: newUser });
                    });
                }
            });
        })
    }
}