const mongoose = require('mongoose');
const RefreshTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true
    },
    expires_at: {
        type: Date,
        required: true
    }
}, { _id: false });

const AddressSchema = new mongoose.Schema({
    address_id: {
        type: String,
        required: true
    },
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
    },
    is_default: {
        type: Boolean,
        required: true
    }
}, { _id: false });

const UserSchema = new mongoose.Schema({
    _id:{
        type: String,
    },
    first_name:{
        type: String,
        required: true
    },
    last_name:{
        type: String,
        required: true
    },
    display_name:{
        type: String,
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    password_hash:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    phone:{
        type: String
    },
    date_of_birth:{
        type: Date
    },
    avatar_url:{
        type: String
        
    },
    role:{
        type: String,
        enum: ['customer', 'staff','admin'],
        default: 'customer'
    },
    payment_method:{
        type: String,
        enum: ['COD', 'VIETQR'],
        default: 'COD', 
        required: true
    },
    is_active:{
        type: Boolean,
        default: true
    },
    refresh_tokens: [RefreshTokenSchema],
    addresses: [AddressSchema],
    wishlist:[{
        type: String,
        ref: 'Product'
    }],
    last_login:{
        type: Date,
        default: Date.now()
    }
},{timestamps:{createdAt: 'created_at', updatedAt: false}});

module.exports = mongoose.model('User', UserSchema);