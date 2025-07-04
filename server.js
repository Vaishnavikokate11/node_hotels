// var fs = require('fs');
// var os = require('os');
// const notes = require('./notes.js')

// // lodash
// var _ = require('lodash');

// var data = ["person", "name", 1,2,3,4,1,2,3, " name"];
// var filter = _.uniq(data);
// console.log(filter);

// var age = notes.age;
// console.log(age);

// var user = os.userInfo();
// console.log(user.username);
// fs.appendFile('hello.txt','hi my name is vaishu' + user.username + '!\n' , ()=>{
//     console.log('file is created')
// })

// // console.log("server file is running");

// // //first type
// // function add(a,b) {
// //     return a+b;
    
// // }

// // //sec type
// // var add = function(a,b){
// //     return a+b;
// // }

// // //third type
// // var add = (a,b)=>{return a+b};

// // function callback(){
// //     console.log("price is running");
// // }
// // var result = add(2,6);
// // console.log(result);

// const add1 = function (a,b, prince) {
//     var result1 = a+b;
//     console.log('result ' + result1);
//     prince();
    
// }
// add1(2,100, function(){
//     console.log("add succesfully");
// });

// //another way
// add1(2,79, ()=> console.log('add'));

// //convert json into object
// const jsonString = '{"name": "john", "age":23}';
// const objString = JSON.parse(jsonString);
// console.log(objString);

// //convert object into json string

// const objstring = {name:" john", age:23};
// const jsonsting = JSON.stringify(objstring);
// console.log(jsonsting)

const express = require('express')
const app = express();
const db = require('./db');
require('dotenv').config();
const bodyParser = require('body-parser');
app.use(bodyParser.json()); //req.body
const PORT = process.env.PORT || 3000


app.get('/',function (req, res){
    res.send('welcome to my hotel');
})

//export for menuItems

const menuItems = require('./routes/menuRoutes');
//export personRoute here

const personRoute = require('./routes/personRoutes');

app.use('/menu', menuItems);
app.use('/person', personRoute)


// app.get('/panir',function (req, res){
//     var panircust = {
//         name:'buttor panir',
//         size: '2 plates',
//         is_lemon_wants : true,
//     }
//     res.send(panircust)
// })

app.listen(3000,  ()=>{
    console.log('server is listing on port 3000')
})