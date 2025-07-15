const express = require('express');
const router = express.Router();
const person = require('./../models/person')
const {jwtAuthMiddleware, generateToken} = require('./../jwt')

router.post('/signup', async (req, res)=>{
    try {
        const data = req.body

        const newPerson = new person(data);
        //save the new person data
        const respone = await newPerson.save();
        console.log('data save');

        const payload ={
            id: respone.id,
            username: respone.username
        }
        console.log('payload', payload);
        const token = generateToken(respone.username);
        console.log('token  generated', token);
        res.status(200).json({respone: respone, token: token});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'internal error'});
        
    }
    
})
//login route

router.post('/login', async(req, res)=>{
    try {
        const {username, password} = req.body;


        //find the user is there or not
        const user = await person.findOne({username: username});

        //if not user not match password
        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({error: 'Invalide username and password'});
        }

        //generate token if user match
        const payload = {
            id : user.id,
            username: user.username
        }

        const token = generateToken(payload);

        res.json({token});
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Interanal server error'});
        
    }
})

router.get('/profile',jwtAuthMiddleware, async(req, res)=>{
    try {
        const userData = req.user;
        console.log("user Data", userData);

        const userId = userData.id;
        const user = await person.findById(userId);
        res.status(200).json({user});
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Interenal error'})
        
    }
})

router.get('/' ,jwtAuthMiddleware, async (req, res)=>{
    try {
        const data = await person.find();
        console.log('data featching');
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'internal error'});
        
    }
})

router.get('/:worktype', async(req,res)=>{
    try {
        const worktype = req.params.worktype  //extact work type
        if(worktype =='chef' || worktype== 'manager'|| worktype== 'waiter'){
            const respone = await person.find({work: worktype});
            console.log('data menu fetching');
            res.status(200).json(respone);

        }else{
            res.status(404).json({error: 'invalid work'});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'internal error'});
        
    }
})

router.put('/:id', async (req,res)=>{
    try {
        const personid = req.params.id;
        const updatedPersondata = req.body;

        const respone = await person.findByIdAndUpdate(personid, updatedPersondata, {
            new: true, //return upadted docu
            runValidators: true,
        })

        if(!respone){
            return res.status(404).json({error: 'not found'})
        }
        console.log('data is updated');
        res.status(200).json(respone)

    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'internal error'})
        
    }
})

router.delete('/:id', async (req,res)=>{
    try {
        const personid = req.params.id;

        const respone = await person.findOneAndDelete(personid);
        if(!respone){
            return res.status(404).json({error: 'not founded'})
        }
        console.log('data deletd');
        res.status(200).json({message: 'data deleted sccsusfuly'})
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'internal error'})
        
    }
})
module.exports = router