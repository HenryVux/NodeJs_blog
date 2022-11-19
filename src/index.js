const path = require('path');
const morgan = require('morgan');
const express = require('express');
const { create } = require('express-handlebars');
// hổ trợ PUT update form
const methodOverride = require('method-override');
// nạp route index
const route = require('./routes');
// nạp connect database
const db = require('./config/db');
db.connect(); // db connect

const app = express();
const port = 3011;

app.use(express.static(path.join(__dirname, './public')));
// express 4.6 - body-parser - json
app.use(
    express.urlencoded({
        extended: true,
    }),
);

// override with POST having ?_method=PUT
app.use(methodOverride('_method'));
// json
app.use(express.json());

// HTTP logger
// app.use(morgan('combined'));

//template engine
const hbs = create({
    extname: '.hbs',
    helpers: {
        sum: (a, b) => a + b,
        toancong: (x, y) => x + y,
    },
});
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

// config view
app.set('views', path.join(__dirname, './resources', 'views'));
// console.log('--PATH:', path.join(__dirname, './resources/views'));

// router init
route(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
