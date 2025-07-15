const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//define schema
const personSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true 
    },
    age:{
        type: Number,

    },
    work:{
        type: String,
        enum: ['chef','waiter','manager'],
        required: true
    },
    mobile:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    address:{
        type:String,

    },
    salary: {
        type: Number,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

personSchema.pre('save', async function(next) {
    const person = this;

    //hash is only working if the new user is there if old user change any kind of data this condiction is not
    //working in that case
    if(!person.isModified('password')) return next();
    try {
        //hash password generation
        const salt = await bcrypt.genSalt(10);

        //hash password
        const hashpassword = await bcrypt.hash(person.password, salt)

        //override the plain pass to hash pass
        person.password = hashpassword;
        next();
    } catch (error) {
        return next(error)
        
    }
    
})

personSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        const isMatch= await bcrypt.compare(candidatePassword, this.password)
        return isMatch
    } catch (error) {
        
    }
    
}

//create person model
const person = mongoose.model('person',personSchema);
module.exports = person;