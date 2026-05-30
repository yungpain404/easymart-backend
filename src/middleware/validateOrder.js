const validateCreateOrder = (req, res, next) => {
    const { user_id, items, shipping_address, payment_method, total_amount} = req.body;
    if (!user_id || !items || !shipping_address || !payment_method || total_amount === undefined) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ error: 'Items must be a non-empty array' });
    }

    if (total_amount <= 0) {
        return res.status(400).json({ error: 'Total amount must be a positive number' });
    }
    next();
}

module.exports = {validateCreateOrder};