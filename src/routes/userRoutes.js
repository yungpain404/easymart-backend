const express = require('express');
const router = express.Router();

const {getUsers, getUserById, createUser, updateUser} = require('../controllers/userController');
const {validateCreateUser} = require('../middleware/validateUser');
const authMiddleware = require('../middleware/authMiddleware');

//Get all users
router.get('/', authMiddleware, getUsers);
//Get user by ID
router.get('/:id', authMiddleware, getUserById);
//Create user
router.post('/', validateCreateUser, authMiddleware, createUser);
//Update user
router.put('/:id', authMiddleware, updateUser);

module.exports = router;