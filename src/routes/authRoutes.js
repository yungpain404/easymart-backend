const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');
const {register, login, refresh, logout, getCurrentUser} = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.post('/refresh', refresh);
router.post('/logout', logout);
router.get('/me', authMiddleware, getCurrentUser);
router.post('/check-exists', async (req, res) => {
    const {username, email} = req.body;
    const usernameExists = await User.findOne({username});
    const emailExists = await User.findOne({email});
    
    if (usernameExists){
        return res.json({success: false, field: 'username',message: 'Username already exists'});
    }

    if (emailExists){
        return res.json({success: false, field: 'email',message: 'Email already exists'});
    }
    res.json({success: true});
});

module.exports = router;