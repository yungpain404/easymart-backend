const uploadMiddleware = (req, res, next) => {
    const multer = require('multer');
    //Nơi lưu trữ tạm thời của file được tải lên
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'src/uploads');
        },
        filename: function (req, file, cb) {
            const uniqueName = Date.now() + '-' + file.originalname;
            cb(null, uniqueName);
        }
    });
    const fileFilter = (req, file, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif') {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'), false);
        }  
    }
    const upload = multer({ storage, fileFilter });
    next();
}

module.exports = upload;