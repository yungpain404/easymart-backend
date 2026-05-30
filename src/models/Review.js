const mongoose = require('mongoose');
const reviewSchema = new mongoose.Schema({
    _id:{
        type: String
    },
    user_id:{
        type: String,
        required: true,
        ref: 'User'
    },
    user_name:{
        type: String,
        required: true,
        ref: 'User'
    },
    product_id:{
        type: String,
        required: true,
        ref: 'Product'
    },
    order_id:{
        type: String,
        required: true,
        ref: 'Order'
    },
    rating:{
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment:{
        type: String
    },
    is_visible:{
        type: Boolean,
        default: true
    }
}, {timestamps:{ createdAt: 'created_at', updatedAt: 'updated_at' }});

module.exports = mongoose.model('Review', reviewSchema);