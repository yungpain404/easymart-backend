const express = require('express');
const router = express.Router();

const {getReviews, getReviewByUserID, getReviewByProductID, createReview, updateReview} = require('../controllers/reviewController');
const {validateCreateReview} = require('../middleware/validateReview')
//GET All Reviews
router.get('/', getReviews);
//GET Review By UserID
router.get('/user/:userId', getReviewByUserID);
//GET Review By ProductId
router.get('/product/:productId', getReviewByProductID);
//POST Review
router.post('/', validateCreateReview, createReview);
//PUT Review
router.put('/:id', updateReview);

module.exports = router;