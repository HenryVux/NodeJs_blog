const path = require('path');
const morgan = require('morgan');
const express = require('express');
const { create } = require('express-handlebars');
// import midlewares
const SortMidleware = require('./app/midlewares/SortMidleware');

// hổ trợ PUT update form
const methodOverride = require('method-override');
// nạp route index
const route = require('./routes');
// nạp connect database
const db = require('./config/db');
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
// json
app.use(express.json());

// HTTP logger
// app.use(morgan('combined'));

//template engine
const hbs = create({
    extname: '.hbs',
    helpers: {        
        sum: (a, b) => (a + b),
        // toancong: (x, y) => x + y,
        // sortable: (field, sort, demoUser = () => {}) => {
        sortable: (field, sort) => {
            // console.log('--- sortable locals user ---');
            const sortType = field === sort.column ? sort.type : 'default';
            const icons = {
                default: 'oi oi-elevator',
                asc: 'oi oi-sort-ascending',
                desc: 'oi oi-sort-descending'
            };            
            const types = {
                default: 'desc',
                desc:'asc',
                asc:'desc'
            }
            const icon = icons[sortType];
            const type = types[sortType];

            return `<a href="?_sort&column=${field}&type=${type}">
                        <span class="${icon}"></span>
                    </a>`;
        },
        // comparision conditions
        ifCond: (op1, operator, op2, options) => {
            var result = false;
            switch(operator) {
              case '===':
                result = op1 == op2; 
                break;
              case '!==':
                result = op1 != op2;
                break;
              case '<=':
                result = op1 <= op2;
                break;
              case '>=':
                result = op1 >= op2;
                break;
              case '||':
                result = op1 || op2;
                break;
              case '&&':
                result = op1 && op2;
                break;
            }
            // console.log('---operator:',operator);
            return result ? options.fn(this) : options.inverse(this);
        },
        // --- end ---
        eachPage: (number) => {            
            let tagA ="";
            for (let i = 1; i <= number; i++) {             
                // console.log('so =', i);
                tagA = tagA+`<li class="page-item"><a class="page-link" href="/me/stored/courses2/${i}"><span class="">${i}</span></a></li>`;
            }            
            return tagA;
        },

        eachPaginate: (number) => {            
            let tagA ="";
            for (let i = 1; i <= number; i++) {             
                // console.log('so =', i);
                tagA = tagA+`<li class="page-item"><a class="page-link" href="/me/stored/courses/${i}"><span class="">${i}</span></a></li>`;
            }            
            return tagA;
        },

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
