const express = require('express');
const router = express.Router();
const person = require('./../models/person')

router.post('/', async (req, res)=>{
    try {
        const data = req.body

        const newPerson = new person(data);
        //save the new person data
        const respone = await newPerson.save();
        console.log('data save');
        res.status(200).json(respone);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'internal error'});
        
    }
    
})

router.get('/' , async (req, res)=>{
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