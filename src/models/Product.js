const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
    category_id:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    }
}, {_id: false });

const supplierSchema = new mongoose.Schema({
    supplier_id:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    }
}, {_id: false });

const promotionSchema = new mongoose.Schema({
    promotion_id:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    discount_percent:{
        type: Number,
        required: true
    }
}, {_id: false });

const productSchema = new mongoose.Schema({
    _id:{
        type: String
    },
    name:{
        type: String,
        required: true
    },
    description:{
        type: String
    },
    price:{
        type: Number,
        required: true
    },
    stock_quantity:{
        type: Number,
        default: 0
    },
    category:{
        type: categorySchema,
        required: true
    },
    supplier:{
        type: supplierSchema,
        required: true
    },
    images:[String],
    origin:{
        type: String
    },
    is_new_arrival:{
        type: Boolean,
        default: false
    },
    applied_promotions:[promotionSchema],
    average_rating:{
        type: Number,
        default: 0
    },
    review_count:{
        type: Number,
        default: 0
    },
    sold_count:{
        type: Number,
        default: 0
    },
    is_deleted:{
        type: Boolean,
        default: false
    }
}, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}});

module.exports = mongoose.model('Product', productSchema);