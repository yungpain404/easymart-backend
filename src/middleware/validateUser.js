const validateCreateUser = (req, res, next) => {
    const {first_name, last_name, username, email, password_hash} = req.body;
    if (!first_name || !last_name || !username || !email || !password_hash){
        return res.status(400).json({message: 'Missing required fields'});
    }

    const usernameRegex = /^[a-zA-Z0-9_]{8,20}$/;
    if (!usernameRegex.test(username)){
        return res.status(400).json({message: 'Invalid username format'});
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)){
        return res.status(400).json({message: 'Invalid email format'});
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password_hash)){
        return res.status(400).json({message: 'Invalid password format'});
    }
    next();

}

module.exports = {validateCreateUser};