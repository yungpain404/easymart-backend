const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    const {first_name, last_name, username, email, password} = req.body;
    try {
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(400).json({message: 'Email already exists'});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            _id: `usr_${Date.now()}`,
            first_name,
            last_name,
            username,
            email,
            password_hash: hashedPassword,
            role: 'customer',
            is_active: true
        });

        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if (!user){
            return res.status(400).json({message: 'Invalid credentials'});
        }

        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch){
            return res.status(401).json({message: 'Invalid credentials'});
        }

        const accessToken = jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET, {expiresIn: '15m'});
        const refreshToken = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});
        user.refresh_tokens.push({token: refreshToken, expires_at: new Date(Date.now() + 7*24*60*60*1000)});
        await user.save();
        res.status(200).json({accessToken, refreshToken, user});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const refresh = async (req, res) =>{
    try {
        const {refreshToken} = req.body;
        const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        const exist = user.refresh_tokens.find(rt => rt.token === refreshToken && rt.expires_at > new Date());
        if (!exist){
            return res.status(401).json({message: 'Invalid refresh token'});
        }

        const accessToken = jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET, {expiresIn: '15m'});
        res.status(200).json({accessToken});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const logout = async (req, res) => {
    try {
        const {refreshToken} = req.body;
        const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        user.refresh_tokens = user.refresh_tokens.filter(rt => rt.token !== refreshToken);
        await user.save();
        res.status(200).json({message: 'Logged out successfully'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
module.exports = {register, login, refresh, logout, getCurrentUser};