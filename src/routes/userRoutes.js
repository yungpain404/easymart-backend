const express = require('express');
const router = express.Router();

const {getUsers, getUserById, createUser, updateUser, addAddress, updateAddress, setDefaultAddress, deleteAddress} = require('../controllers/userController');
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
//Add address
router.put('/:id/address', authMiddleware,addAddress);
//Edit address
router.put('/:id/address/:addressId', authMiddleware, updateAddress);
//Set default address
router.put('/:id/address/:addressId/default', authMiddleware, setDefaultAddress);
//Delete address
router.delete('/:id/address/:addressId', authMiddleware, deleteAddress)

module.exports = router;