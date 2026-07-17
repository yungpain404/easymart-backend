const mongoose = require('mongoose');
const itemCartSchema = new mongoose.Schema({
    product_id:{
        type: String,
        required: true,
        ref: 'Product'
    },
    name:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    quantity:{
        type: Number,
        required: true,
        min: 1
    },
    image:{
        type: Array,
        required: true
    }
}, {_id: false });

const cartSchema = new mongoose.Schema({
    _id:{
        type: String
    },
    user_id:{
        type: String,
        required: true,
        ref: 'User'
    },
    items:[itemCartSchema],
    total_amount:{
        type: Number,
        required: true
    }
}, {timestamps: {createdAt: false, updatedAt: 'updated_at'}});

module.exports = mongoose.model('Cart', cartSchema);