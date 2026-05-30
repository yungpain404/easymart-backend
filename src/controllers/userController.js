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
        console.log(req.params.id);
        console.log(req.body);
        const user = await User.findOneAndUpdate({_id: req.params.id}, req.body, {returnDocument: 'after', runValidators: true});
        if (!user){
            res.status(404).json({message: 'User not found'});
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
module.exports = {getUsers, getUserById, createUser, updateUser};