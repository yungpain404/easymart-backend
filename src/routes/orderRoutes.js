const express = require('express');
const router = express.Router();

const {getOrders, getOrder, getOrderByUserID, createOrder, updateStatusOrder} = require('../controllers/orderController');
const {validateCreateOrder} = require('../middleware/validateOrder');
const adminMiddleware = require('../middleware/adminMiddleware');
const authMiddleware = require('../middleware/authMiddleware');
//GET All Orders
router.get('/', authMiddleware, getOrders);
//GET Order By Id
router.get('/:id', authMiddleware, getOrder);
//GET Order By UserID
router.get('/user/:userId', authMiddleware, getOrderByUserID);
//POST Order
router.post('/', authMiddleware, validateCreateOrder, createOrder);
//PATCH Order
router.patch('/:id/status', adminMiddleware, updateStatusOrder);

module.exports = router;