const express = require('express');
const router = express.Router();
const {getCartByUserID, addToCart, updateCartItem, removeCartItem, clearCart} = require('../controllers/cartController');
const {validateAddToCart} = require('../middleware/validateCart');
const authMiddleware = require('../middleware/authMiddleware');

//GET Cart By UserID
router.get('/:userId', authMiddleware, getCartByUserID);
//POST To Cart
router.post('/add', authMiddleware, validateAddToCart, addToCart);
//PUT To Cart
router.put('/update/:userId', authMiddleware, updateCartItem);
//DELETE Cart By ProductID
router.delete('/remove/:userId/:productId', authMiddleware, removeCartItem)
//DELETE Cart By UserID
router.delete('/clear/:userId', authMiddleware, clearCart);

module.exports = router;