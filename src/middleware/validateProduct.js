const validateCreateProduct = (req, res, next) => {
    const {name, price, stock_quantity} = req.body;
    if (!name || price === undefined || stock_quantity === undefined){
        return res.status(400).json({message: 'Name, price and stock quantity are required'});
    }

    if (price < 0){
        return res.status(400).json({message: 'Price must be a positive number'});
    }
    if (stock_quantity < 0){
        return res.status(400).json({message: 'Stock quantity must be a positive number'});
    }
    next();
}

module.exports = {validateCreateProduct};