const mongoose = require('mongoose');
require('dotenv').config();

//define the mongosb url

//const mongoURL = 'mongodb://localhost:27017/hotels'
//const mongoURL = 'mongodb+srv://vanitakokate08:vaishu123@cluster0.vukrlcm.mongodb.net/'


const mongoURL = process.env.MONGODB_URL_LOCAL
//setup mongodb connect
//establish connection
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//helloword
//get the default connection
const db = mongoose.connection;

//define event 

db.on('connected',()=>{
    console.log('mongodb is connect');
})

db.on('error', ()=>{
    console.log('error');
})

db.on('disconnected', ()=>{
    console.log('disconnect');
})

//export data connection
module.exports = db;