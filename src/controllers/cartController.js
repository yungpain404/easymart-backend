const Cart = require('../models/Cart');
//GET Cart By UserID
const getCartByUserID = async (req, res) => {
    try {
        const cart = await Cart.findOne({user_id: req.params.userId});
        if (!cart) res.status(404).json({message: 'Cart not found'});
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
//Add product to cart
const addToCart = async (req, res) => {
    try {
        const {user_id, product_id, name, price, quantity} = req.body;
        const cart = await Cart.findOne({user_id});
        if (!cart) {
            const newCart = new Cart({
                _id: `cart_${Date.now()}`,
                user_id,
                items: []
            });
        }
        //Cart da co san pham hay chua?
        const itemIndex = cart.items.findIndex(
            item => item.product_id === product_id
        );
        //Co thi tang them
        if (itemIndex > -1){
            cart.items[itemIndex].quantity += quantity;
        } 
        //Khong thi them moi
        else {
            cart.items.push({
                product_id,
                name,
                price,
                quantity
            });
        }

        cart.update_at = Date.now();
        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
//Update Quantity
const updateCartItem = async (req, res) => {
    try {
        const cart = await Cart.findOne({user_id: req.params.userId});
        if (!cart) res.status(404).json({message: 'Cart not found'});

        const {product_id, quantity} = req.body;
        const item = cart.items.find(
            item => item.product_id === product_id
        );
        if (!item) res.status(404).json({message: 'Product not found in cart'});

        item.quantity = quantity;
        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
//Remove Item
const removeCartItem = async (req, res) => {
    try {
        const cart = await Cart.findOne({user_id: req.params.userId});
        if (!cart) res.status(404).json({message: 'Cart not found'});

        cart.items = cart.items.filter(
            item => item.product_id !== req.params.productId
        );

        cart.update_at = Date.now();
        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
//Clear Cart
const clearCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({user_id: req.params.userId});
        if (!cart) res.status(404).json({message: 'Cart not found'});

        cart.otems = [];

        cart.update_at = Date.now();
        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = {getCartByUserID, addToCart, updateCartItem, removeCartItem, clearCart};