const cloudinary = require('../config/cloudinary');

const uploadImage = async (req, res) => {
    try {
        if(!req.file) {
            return res.status(400).json({message: 'No file uploaded'})
        }
        const result = await cloudinary.uploader.upload(`data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`, {folder:'easymart'});
        res.status(200).json({imageUrl: result.secure_url})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = {uploadImage};