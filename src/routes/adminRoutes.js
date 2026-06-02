const express = require('express');
const router = express.Router();
const {getDashboardData} = require('../controllers/adminController');
const adminMiddleware = require('../middleware/adminMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/dashboard', authMiddleware, adminMiddleware, getDashboardData);

module.exports = router;