const loggerMiddleware = (req, res, next) =>{
    console.log('============ REQUEST ============');
    console.log('Method: ', req.method);
    console.log('URL: ',req.originalUrl);
    console.log('Date: ', new Date());
    console.log('=================================');
    next();
}

module.exports = loggerMiddleware;