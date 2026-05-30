const Product = require('../models/Product');
//GET All Products
const getProducts = async (req, res) => {
    try {
        const products = await await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
//GET Product By Id
const getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) res.status(404).json({message: 'Product not found'});
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
//POST Product
const createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
//PUT Product By Id
const updateProduct = async (req, res) => {
    try {
        const product = await Product.findOneAndUpdate({_id: req.params.id}, req.body, {returnDocument: 'after'});
        if (!product) res.status(404).json({message: 'Product not found'});
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
//DELETE Product By Id
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findOneAndDelete({_id: req.params.id});
        if (!product) res.status(404).json({message: 'Product not found'});
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = {getProducts, getProduct, createProduct, updateProduct, deleteProduct};