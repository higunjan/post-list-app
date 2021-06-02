
const accountController = require("../controllers/accountController");
const middleware = require("../middleware/middleware");

module.exports = (app) => {
    app.post('/api/account', middleware.isLoggedIn, accountController.createAccount);
    app.get('/api/account', middleware.isLoggedIn, accountController.getAccounts);
}