module.exports = function(options){
    return function(req, res, next){
        console.log('--- My midlewares', options);
        console.log('URL:', req.originalUrl);
        next();
    }
}