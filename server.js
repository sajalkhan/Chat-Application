const Chatapp = require('./app');
const dbConfig = require('./Database/db');

const port = process.env.PORT || 8000;

Chatapp.ioServer(Chatapp.app).listen(port, ()=>{
    console.log(`listening on port: ${port}`);
});