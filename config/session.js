//npm i express-session@1.12.1 --save
//npm i connect-mongo@1.1.0 --save

const session = require('express-session');
const mongoStore = require('connect-mongo')(session);
const config = require('../config/dbConfig');
const mongoose = require('mongoose');

if(process.env.NODE_ENV == 'production'){
    module.exports = session({
        secret: config.sessionSecret,
        resave: false,
        saveUninitialized: false,
        store: new mongoStore({
            mongooseConnection: mongoose.connection
        })
    });
}else{
    module.exports = session({
        secret: config.sessionSecret,
        resave: false,
        saveUninitialized: true
    });
}