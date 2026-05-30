const express = require('express');
const router = express.Router();

const {getOrders, getOrder, getOrderByUserID, createOrder} = require('../controllers/orderController');
const {validateCreateOrder} = require('../middleware/validateOrder');
//GET All Orders
router.get('/', getOrders);
//GET Order By Id
router.get('/:id', getOrder);
//GET Order By UserID
router.get('/user/:userId', getOrderByUserID);
//POST Order
router.post('/', validateCreateOrder, createOrder);

module.exports = router;