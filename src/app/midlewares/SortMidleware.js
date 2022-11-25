module.exports = function SortMidleware (req, res, next){
    console.log('-- midlewares --');
    // res.locals._thunghiemUser = 'user locals: vuhoang';
    res.locals._sort = {
        enabled: false,
        column: '',
        type: 'default'
    }

    if(req.query.hasOwnProperty('_sort')){
        console.log('-- SortMidleware --> sort --');
        // res.locals._sort.enabled = true;
        // res.locals._sort.column = req.query.column;
        // res.locals._sort.type = req.query.type;
        // code tắt
        Object.assign(res.locals._sort, {
            enabled: true, 
            column: req.query.column, 
            type: req.query.type 
        });
    }

    next();
}