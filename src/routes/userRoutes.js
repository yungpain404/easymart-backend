const express = require('express');
const router = express.Router();

const {getUsers, getUserById, createUser, updateUser} = require('../controllers/userController');
const {validateCreateUser} = require('../middleware/validateUser');

//Get all users
router.get('/', getUsers);
//Get user by ID
router.get('/:id', getUserById);
//Create user
router.post('/', validateCreateUser, createUser);
//Update user
router.put('/:id', updateUser);

module.exports = router;