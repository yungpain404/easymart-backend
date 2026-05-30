const validateCreateReview = (req, res, next) => {
    const { user_id, product_id, rating, comment } = req.body;
    if (!user_id || !product_id || rating === undefined) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    if (rating < 1 || rating > 5) {
        return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }
    if (comment.length > 500) {
        return res.status(400).json({ error: 'Comment too long' });
    }
    next();
}
module.exports = {validateCreateReview};