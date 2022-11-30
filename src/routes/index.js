const newsRouter = require('./news');
const siteRouter = require('./site');
const coursesRouter = require('./courses');
const meRouter = require('./me');
const cartRouter = require('./cart');

function route(app) {
    app.use('/me', meRouter);
    app.use('/news', newsRouter);
    app.use('/courses', coursesRouter);
    app.use('/cart', cartRouter);

    app.use('/', siteRouter);

    // app.use('/log', (req, res) => {
    //     let responseText = 'Hello World!<br>';
    //     responseText += `<small>Requested at: ${req.requestTime}</small>`;
    //     res.send(responseText);
    // });
}

module.exports = route;
