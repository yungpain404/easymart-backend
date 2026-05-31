const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const {register, login, refresh, logout, getCurrentUser} = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.post('/refresh', refresh);
router.post('/logout', logout);
router.get('/me', authMiddleware, getCurrentUser);

module.exports = router;