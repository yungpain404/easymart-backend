const express = require('express');
const router = express.Router();

const {getReviews, getReviewByUserID, getReviewByProductID, createReview, updateReview, deleteReview} = require('../controllers/reviewController');
const {validateCreateReview} = require('../middleware/validateReview')
const authMiddleware = require('../middleware/authMiddleware');

//GET All Reviews
router.get('/', getReviews);
//GET Review By UserID
router.get('/user/:userId', getReviewByUserID);
//GET Review By ProductId
router.get('/product/:productId', getReviewByProductID);
//POST Review
router.post('/', validateCreateReview, authMiddleware, createReview);
//PUT Review
router.put('/:id', authMiddleware, updateReview);
//DELETE Review
router.delete('/:id', authMiddleware, deleteReview);

module.exports = router;