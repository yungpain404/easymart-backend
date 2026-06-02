const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');

const getDashboardData = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalProducts = await Product.countDocuments();
        const totalOrders = await Order.countDocuments();

        const revenue = await Order.aggregate([{$group:{_id: null, totalRevenue:{$sum: "$total_amount"}}}]);
        const topProducts = await Product.find().sort({sold_count: -1}).limit(10);
        const monthlyOrders = await Order.aggregate([{$group:{_id:{month:{$month:"$created_at"}, year:{$year:"$created_at"}}, totalOrders:{$sum:1}}}, {$sort:{"_id.year": -1, "_id.month": -1}}]);
        res.status(200).json({totalUsers, totalProducts, totalOrders, revenue: revenue[0]?.totalRevenue || 0, topProducts, monthlyOrders});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = {getDashboardData};