const mongoose = require('mongoose');

const menuItemsSchem = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    test:{
        type: String,
        enum: ['sweet', 'spicy', 'sour'],
        required: true
    },
    is_drink:{
        type: Boolean,
        default: false
    },
    ingridient:{
        type: String,
        default: []
    },
    num_sales:{
        type: Number,
        default: 0
    }

})

//comments add fo testing purpose
const MenuItem = mongoose.model('MenuItem', menuItemsSchem)
module.exports = MenuItem;