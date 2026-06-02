const Order = require('../models/Order');
//GET All Orders
const getOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
//GET Order By Id
const getOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) res.status(404).json({message: 'Order not found'});
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
//GET Order By UserID
const getOrderByUserID = async (req, res) => {
    try {
        const order = await Order.find({user_id: req.params.userId});
        if (!order) res.status(404).json({message: 'Order not found'});
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
//POST Order
const createOrder = async (req, res) => {
    try {
        const order = await Order.create(req.body);
        res.status(201).json(order);        
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
//PATCH Order
const updateStatusOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, {status: req.body.status}, {new: true});
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
module.exports = {getOrders, getOrder, getOrderByUserID, createOrder, updateStatusOrder};