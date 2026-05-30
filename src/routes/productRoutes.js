const express = require('express');
const router = express.Router();

const {getProducts, getProduct, createProduct, updateProduct, deleteProduct} = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const {validateCreateProduct} = require('../middleware/validateProduct');
//GET All Products
router.get('/', getProducts);
//GET product by Id
router.get('/:id', getProduct);
//POST Product
router.post('/', authMiddleware, adminMiddleware, validateCreateProduct, createProduct);
//PUT Product
router.put('/:id', authMiddleware, adminMiddleware, validateCreateProduct, updateProduct);
//DELETE Product
router.delete('/:id', authMiddleware, adminMiddleware, deleteProduct);

module.exports = router;