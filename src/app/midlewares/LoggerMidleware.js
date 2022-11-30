module.exports = function (req, res, next){
    const d = Date.now();
    const dformat = new Date(d);
    // console.log('--- LOGGER:', req.params, req.query);
    // console.log('--- DATE:',dformat.getDay().toString());
    // console.log('--- DATE:',dformat.getDate().toString());
    // console.log('--- DATE:',dformat.getMonth().toString());
    // console.log('--- DATE:',dformat.getFullYear().toString());
    next();
}