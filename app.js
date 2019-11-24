const path = require('path');
const express = require('express');
const passport = require('passport');
const session = require('./config/session');

//social authenticatio logic
require('./Auth/social_auth_rules')();

//Create an Io server instance
let ioServer = data =>{
    data.locals.chatrooms = [];
    const server = require('http').Server(data);
    const io = require('socket.io')(server);
    io.use((socket, next)=>{  // Bridging socket.io with session
        require('./config/session')(socket.request,{},next);
    });
    require('./Socket/socket')(io,data);
    return server;
}

//init app
const app = express();

//view engine setup
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

//set public folder
app.use(express.static(path.join(__dirname,'public')));

//set session
app.use(session);

//set passport middleware
app.use(passport.initialize());
app.use(passport.session());

//set routes
const chat_router = require('./Routes/all_route');
app.use('/',chat_router);

//handle 404 error
app.use((req,res,next)=>{
    res.status(404).sendFile(process.cwd()+'/views/404.html'); 
});

module.exports = {app,ioServer}