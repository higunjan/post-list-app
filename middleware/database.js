let mongoose = require('mongoose');
mongoose.Promise = Promise;

function connectMongoDB() {
    let str = [];

    let connectionString = "";
    if(process.env.MONGO_URL) {
        connectionString = process.env.MONGO_URL;
    } else {
        connectionString = "mongodb://" + str.join(",")
        global.gConfig.mongo.replicas.forEach(function(item) {
            str.push(item + '/' + global.gConfig.mongo.database);
        });
        if (global.gConfig.mongo.username && global.gConfig.mongo.password) {
            connectionString = "mongodb://" + global.gConfig.mongo.username + ":" + global.gConfig.mongo.password + '@' + str.join(",");
        }
    }
    //CONNECTION METHOD OF MONGOOSE ORM
    mongoose.connect(connectionString, { poolSize: 10, useUnifiedTopology: true, useNewUrlParser: true });
    // CONNECTION EVENTS

    // When successfully connected
    mongoose.connection.on('connected', function() {
        console.log('Mongo database connection estabilished successfully. ');
    });

    // If the connection throws an error
    mongoose.connection.on('error', function(err) {
        console.log('Mongoose default connection error: ' + err);
    });

    // When the connection is disconnected
    mongoose.connection.on('disconnected', function() {
        console.log('Mongoose default connection disconnected');
    });

    // If the Node process ends, close the Mongoose connection 
    process.on('exit', function() {
        console.log('Goodbye!!! Node Server stoped');
    });

    process.on('SIGINT', function() {
        mongoose.connection.close(function() {
            console.log('Mongoose default connection disconnected through app termination');
            process.exit(0);
        });
    });
}

module.exports = {
    connectMongoDB: connectMongoDB
}