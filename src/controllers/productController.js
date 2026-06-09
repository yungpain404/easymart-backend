const Product = require('../models/Product');

const removeVietnameseTones = (str) => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase();
}
//GET All Products
const getProducts = async (req, res) => {
    try {
        //Query Object
        let filter = { is_deleted: false };
        //Pagination
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        //Search
        const keyword = removeVietnameseTones(req.query.q || '');

        //Filter
        const category = req.query.category;
        if (category) {
            filter['category.category_id'] = category;
        }
        //Sort
        let sortOption = {};
        if (req.query.sort === 'asc') {
            sortOption.price = 1;
        }
        if (req.query.sort === 'desc') {
            sortOption.price = -1;
        }

        const products = await Product.find(filter).sort(sortOption).skip(skip).limit(limit);

        let result = products;
        if (keyword) {
            result = products.filter(product => {
                return removeVietnameseTones(product.name).includes(keyword);
            });
        }
        const total = await Product.countDocuments(filter);

        res.status(200).json({ total, page, totalPages: Math.ceil(total / limit), products: result.slice(skip, skip + limit) });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
//GET Product By Id
const getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) res.status(404).json({ message: 'Product not found' });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
//POST Product
const createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
//PUT Product By Id
const updateProduct = async (req, res) => {
    try {
        const product = await Product.findOneAndUpdate({ _id: req.params.id }, req.body, { returnDocument: 'after' });
        if (!product) res.status(404).json({ message: 'Product not found' });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
//Soft DELETE Product By Id
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, { is_deleted: true }, { returnDocument: 'after' });
        if (!product) res.status(404).json({ message: 'Product not found' });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { getProducts, getProduct, createProduct, updateProduct, deleteProduct };