const path = require('path');
const morgan = require('morgan');
const express = require('express');
const { create } = require('express-handlebars');
// import midlewares
const SortMidleware = require('./app/midlewares/SortMidleware');
// const LoggerMidleware = require('./app/midlewares/LoggerMidleware');
const myMidleware = require('./app/midlewares/myMidleware');

// hổ trợ PUT update form
const methodOverride = require('method-override');
// nạp route index
const route = require('./routes');
// nạp connect database
const db = require('./config/db');
// const { log } = require('console');
db.connect(); // db connect

const app = express();
const port = 3011;

// use static folder
app.use(express.static(path.join(__dirname, './public')));
// express 4.6 - body-parser - json
// submit từ form
app.use(    
    express.urlencoded({
        extended: true,
    }),
);
// override with POST having ?_method=PUT
app.use(methodOverride('_method'));

// custom midlewares
app.use(SortMidleware);
// app.use(myMidleware({option1: '1', option2: '2'}));

// json
app.use(express.json());

// HTTP logger
// app.use(morgan('combined'));

// template engine
const hbs = create({
    extname: '.hbs',
    helpers: require('./util/hbsHelper'),
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
