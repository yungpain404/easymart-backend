const Review = require('../models/Review');
//GET All Reviews
const getReviews = async (req, res) => {
    try {
        const reviews = await Review.find();
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
//GET Review By UserID
const getReviewByUserID = async (req, res) => {
    try {
        const reviewByUserID = await Review.find({user_id: req.params.userId});
        if (!reviewByUserID) res.status(404).json({message: 'Review not found'});
        res.status(200).json(reviewByUserID);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
//GET Review By ProductId
const getReviewByProductID = async (req, res) => {
    try {
        const reviewByProductID = await Review.find({product_id: req.params.productId});
        if (!reviewByProductID) res.status(404).json({message: 'Review not found'});
        res.status(200).json(reviewByProductID);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
//POST Review
const createReview = async (req, res) => {
    try {
        const review = await Review.create(req.body);
        res.status(201).json(review);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
//PUT Review
const updateReview = async (req, res) => {
    try {
        const review = await Review.findOneAndUpdate({_id:req.params.id}, req.body, {returnDocument: 'after', runValidators: true});
        if (!review) res.status(404).json({message: 'Review not found'});
        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = {getReviews, getReviewByUserID, getReviewByProductID, createReview, updateReview};