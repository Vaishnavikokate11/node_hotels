var a = 4;
var b= 5;
var ans = a+b;
console.log(ans);

//array
const arr = ["ajay","sima",23];
console.log(arr);

//if else
var a= 12;

if(a>=18){
    console.log("voting");
}else{
    console.log("no voting");
}

//for
var count = 10;
for(var i=1;i<=count;i++){
    console.log(i);
}

//object
var person={
    name: "john",
    age: 23,
    isStudent: true,
    hobbies: ["reading", "listing"]
};
console.log(person.name);

//func

var age1 = [12,32,19,20];
var result = age1.filter(checkAge);

function checkAge(age) {
    return age<=18;
    
}
console.log(result);

//user input
