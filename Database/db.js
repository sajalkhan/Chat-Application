const mongoose = require('mongoose');
const config = require('../config/dbConfig');

try{
    mongoose.connect(config.dbURI,{
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology:true,
        useFindAndModify:false
    }).then(()=>{ console.log('Db Connection Successfully!'); });
    
}catch(err){

}

mongoose.connection.on('error', error =>{
    console.log("MongoDb Error: ",error);
});

module.exports = mongoose;