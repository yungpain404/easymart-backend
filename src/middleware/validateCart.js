const validateAddToCart = (req, res, next) => {
    const { user_id, product_id, quantity } = req.body;
    if (!user_id || !product_id || quantity === undefined) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    if (quantity <= 0) {
        return res.status(400).json({ error: 'Quantity must be a positive number' });
    }
    next();
}

module.exports = {validateAddToCart};