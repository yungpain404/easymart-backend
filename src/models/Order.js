const mongoose = require('mongoose');
const shippingAddressSchema = new mongoose.Schema({
    recipient_name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address_line: {
        type: String,
        required: true
    },
    ward: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    province: {
        type: String,
        required: true
    },
    country:{
        type: String,
        required: true
    }
}, { _id: false });

const itemOrderSchema = new mongoose.Schema({
    product_id:{
        type: String,
        required: true,
        ref: 'Product'
    },
    name:{
        type: String,
        required: true
    },
    quantity:{
        type: Number,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    image:{
        type: Array,
        required: true
    }
}, {_id: false });

const orderSchema = new mongoose.Schema({
    _id:{
        type: String
    },
    user_id:{
        type: String,
        required: true,
        ref: 'User'
    },
    shipping_address: {
        type: shippingAddressSchema,
        required: true
    },
    items:[itemOrderSchema],
    status:{
        type: String,
        enum: ['pending', 'confirmed','shipped', 'delivered', 'cancelled'],
        default: 'pending'
    },
    payment_method:{
        type: String,
        enum: ['COD', 'VIETQR'],
        required: true
    },
    payment_status:{
        type: String,
        enum: ['pending', 'paid','failed', 'refunded'],
        default: 'pending'
    },
    delivery_fee:{
        type: Number,
        required: true
    },
    delivery_tip:{
        type: Number,
        required: true
    },
    total_item:{
        type: Number,
        required: true
    }
    ,
    total_amount:{
        type: Number,
        required: true
    }
},{timestamps:{createdAt: 'created_at', updatedAt: 'updated_at'}});

module.exports = mongoose.model('Order', orderSchema);