const mongoose = require('mongoose');

//define the mongosb url

const mongoURL = 'mongodb://localhost:27017/hotels'

//setup mongodb connect
//establish connection
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//get the default connection
const db = mongoose.connection;

//define event 

db.on('connected',()=>{
    console.log('mongodb is connect');
})

db.on('error', ()=>{
    console.log('error',err);
})

db.on('disconnected', ()=>{
    console.log('disconnect');
})

//export data connection
module.exports = db;