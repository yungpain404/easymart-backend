const User = require('../models/User');
//GET All Users
const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
//GET User By Id
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user){
            return res.status(404).json({message: 'User not found'});
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
//POST User
const createUser = async (req, res) => {
    try {
        console.log(req.body);
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
//PUT User
const updateUser = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate({_id: req.params.id}, req.body, {returnDocument: 'after', runValidators: true});
        if (!user){
            res.status(404).json({message: 'User not found'});
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
//Add Address
const addAddress = async (req, res) => {
    try {
        const {id} = req.params;
        const address = {address_id: `addr_${Date.now()}`, ...req.body};
        const user = await User.findOneAndUpdate({_id: id}, {$push: {addresses: address}}, {returnDocument: 'after'});
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
//Update Address
const updateAddress = async (req, res) => {
    try {
        const {id, addressId} = req.params;
        const user = await User.findOneAndUpdate({_id: id, 'addresses.address._id': addressId}, {$set: {'addresses.$': {address_id: addressId,...req.body}}}, {returnDocument: 'after'});
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
//Set default address
const setDefaultAddress = async (req, res) => {
    try {
        const {id, addressId} = req.params;
        const user = await User.findById(id);
        if (!user) res.status(404).json({message: 'User not found'});

        user.addresses.forEach(address => {
            address.is_default = address.address_id === addressId;
        })

        await user.save();

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

//DELETE Address
const deleteAddress = async (req, res) => {
    try {
        const {id, addressId} = req.params;
        const user = await User.findOneAndUpdate({_id: id}, {$pull: {addresses: {address_id: addressId}}}, {returnDocument: 'after'});
        if (!user) res.status(404).json({message: 'User not found'});
        res.status(200).json(user);

    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = {getUsers, getUserById, createUser, updateUser, addAddress, updateAddress, setDefaultAddress, deleteAddress};