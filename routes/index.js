let fs = require("fs");
let path = require('path');

module.exports = function(app, passport, upload) {
    app.all('/*', function(req, res, next){
        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', '*');

        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'my-header,X-Requested-With,content-type,Authorization,cache-control');

        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);

        // Pass to next layer of middleware
        next();
    });

    require('./auth')(app, passport);
    require('./post')(app, upload);

    app.get('/*', (req, res) => {
        res.send("Post List App APIs are working.! Hurry.!")
    });
};
