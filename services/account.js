let mongoose = require("mongoose");
let Account = require("../models/account");
/**
 * @exports Account CRUD Operations
 * @namespace Account
 */
module.exports = {
    /**
     * @memberof Account
     * Insert the Account information to the DB.
     * </pre>
     */
    createAccount: function(options) {
        return new Promise((resolve, reject) => {
            let { user, accountName, type } = options;
            
            // create the user
            var newAccount = new Account();
            // set the user's local credentials
            newAccount.accountName = accountName;
            newAccount.type = type;
            newAccount._ref_user = user;

            // save the user
            newAccount.save(function(err) {
                err = (err && err.error) ? err.error : err;
                if(err){
                    reject(err);
                    return;
                }
                resolve({ status: true, message: "Account created success.", data: newAccount });
            });
        })
    },
    /**
     * @memberof Account
     * Get user Accounts information from the DB.
     * </pre>
     */
    getAccounts: function(options) {
        return new Promise((resolve, reject) => {
            let { user } = options;
            
            Account.find({ _ref_user: mongoose.Types.ObjectId(user) }, '_id accountName type', function(err, accounts) {
                err = (err && err.error) ? err.error : err;
                if(err){
                    reject(err);
                    return;
                }
                resolve({ status: true, message: "Accounts retrived success.", data: accounts });
            });
        })
    },
}