const express = require('express');
const router = express.Router();

const MenuItem = require('./../models/MenuItem');
const person = require('../models/person');



//for menu post

router.post('/', async (req, res)=>{
    try {
        const data = req.body

        const newItem = new MenuItem(data);

        const respone = await newItem.save();
        console.log('data saving');
        res.status(200).json(respone);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'internal error'});
        
    }
})

router.get('/', async (req, res)=>{
    try {
        const data = await MenuItem.find();
        console.log('data fetching');
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'internal error'});
        
    }
})

//export test 

router.get('/:testtype', async (req,res)=>{
    try {
        const testtype = req.params.testtype;
        if(testtype== 'sweet'|| testtype== 'spicy'|| testtype== 'sour'){
            const respone = await MenuItem.find({test: testtype});
            console.log('menu data fetching');
            res.status(200).json(respone);
        }else{
            console.log('invalid menu test');
            res.status(404).json(error);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'internal error'})
        
    }
})

module.exports = router