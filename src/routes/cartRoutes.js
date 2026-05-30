const express = require('express');
const router = express.Router();
const {getCartByUserID, addToCart, updateCartItem, removeCartItem, clearCart} = require('../controllers/cartController');
const {validateAddToCart} = require('../middleware/validateCart');
//GET Cart By UserID
router.get('/:userId', getCartByUserID);
//POST To Cart
router.post('/add', validateAddToCart, addToCart);
//PUT To Cart
router.put('/update/:userId', updateCartItem);
//DELETE Cart By ProductID
router.delete('/remove/:userId/:productId',removeCartItem)
//DELETE Cart By UserID
router.delete('/clear/:userId', clearCart);

module.exports = router;