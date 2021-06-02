// route middleware to make sure a user is logged in
let isLoggedIn = (req, res, next) => {
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated()){
        next();
    }else{
        return res.status(500).send({status:false, message: "Session Expired, Please Login"});
    }
}

module.exports = { isLoggedIn }