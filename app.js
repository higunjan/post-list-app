/*
 * ARETE CONSULTING SERVICES INC CONFIDENTIAL
 *
 * 2018 Arete Consulting Services Incorporated, All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Arete Consulting Services Incorporated.
 * The intellectual and technical concepts contained herein are
 * proprietary to Arete Consulting Services Incorporated and may
 * be covered by U.S. and Foreign Patents, patents in process,
 * and are protected by trade secret or copyright law. Dissemination
 * of this information or reproduction of this material is strictly
 * forbidden unless prior written permission is obtained from
 * Arete Consulting Services Incorporated
 */

const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const multer = require('multer');
const path = require('path');
const compression = require('compression');
const dotenv = require('dotenv');
const DB = require('./middleware/database');

const app = express();

process.on('uncaughtException', (err) => {
  console.log(err);
});

dotenv.config();
console.log(`process started with env: ${process.env.NODE_ENV} .........`);

// ----------Other App global variables-----------
global.__parentDir = __dirname;

//----file upload configuration----
let storage = multer.diskStorage({
destination: './upload/',
limits: {
  fileSize: '5MB',
},
filename: function (req, file, cb) {
  cb(
    null,
    'IMG_' +
      Date.now() +
      path.extname(file.originalname)
  );
},
});

let upload = multer({ storage: storage });

//--------req body parsing----------------
app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 100000,
  })
);
app.use(
  bodyParser.json({
    limit: '50mb',
    extended: true,
    parameterLimit: 100000,
  })
);

// file compression configuration
app.use(compression());

// ------global configuration--------------------
// App config file is dynamically loaded
// from config service
global.gConfig = require('./config/config.json');

// --- app config vars----------
const port = process.env.PORT || global.gConfig.PORT || 3000;
const hostIp = process.env.HOST_IP || global.gConfig.HOST_IP || '0.0.0.0';

//-------database configuration
DB.connectMongoDB(); // connect to our database

// auth configuration
require(__parentDir + '/middleware/passport'); // pass passport for configuration
app.use(cookieParser()); // read cookies (needed for auth)

// required for passport
app.use(
    session({
    secret: 'post-list-app',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000,
    }
    })
); // session secret

// initialize all app event handlers
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// routes
require('./routes/index')(app, passport, upload); // load our routes and pass in our app and fully configured passport

// launch
app.listen(port, hostIp, () => {
    console.log(`Server started on port:  + ${port}......`);
});