const path = require('path');
const express = require('express');
const session = require('./config/session');

//init app
const app = express();

//view engine setup
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

//set public folder
app.use(express.static(path.join(__dirname,'public')));

//set session
app.use(session);

//set routes
const chat_router = require('./Routes/all_route');
app.use('/',chat_router);

//handle 404 error
app.use((req,res,next)=>{
    res.status(404).sendFile(process.cwd()+'/views/404.html'); 
});

module.exports = app;