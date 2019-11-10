const app = require('./app');
const dbConfig = require('./Database/db');

const port = process.env.PORT || 8000;

app.listen(port, ()=>{
    console.log(`listening on port: ${port}`);
});