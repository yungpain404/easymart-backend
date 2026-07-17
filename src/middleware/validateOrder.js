const validateCreateOrder = (req, res, next) => {
    const { user_id, items, shipping_address, status, payment_method, payment_status, delivery_fee, delivery_tip, total_item, total_amount} = req.body;
    const requiredFields = [user_id, items, shipping_address, status, payment_method, payment_status, delivery_fee, delivery_tip, total_item, total_amount];
    
    if (requiredFields.some(field => field === undefined || field === null)) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ error: 'Items must be a non-empty array' });
    }

    if (total_amount <= 0 || total_item <= 0 || delivery_fee < 0 || delivery_tip < 0) {
        return res.status(400).json({ error: 'Total amount must be a positive number' });
    }
    next();
}

module.exports = {validateCreateOrder};