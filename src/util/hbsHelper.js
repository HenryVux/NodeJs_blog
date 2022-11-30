var helper = {
    sum: (a, b) => (a + b),
    toancong: (x, y) => x + y,    
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
    eachPaginate: (number) => {            
        let tagA ="";
        for (let i = 1; i <= number; i++) {             
            // console.log('so =', i);
            tagA = tagA+`<li class="page-item"><a class="page-link" href="/me/stored/courses/${i}"><span class="">${i}</span></a></li>`;
        }            
        return tagA;
    },

    eachPage: (number, currPage) => {            
        let dis = (currPage == 1 || currPage == '') ? "disabled" : "";
        let dis2;// = (currPage == number) ? "disabled" : "";
        let tagA =`<li class="page-item ${dis}">
                        <a class="page-link" href="/me/stored/courses2">Frist</a>
                    </li>
                    <li class="page-item">
                        <a class="page-link" href="/me/stored/courses2/${currPage}">Prev</a>
                    </li>`;
        for (let i = 1; i <= number; i++) {                             
            tagA += `<li class="page-item ${dis}">
                        <a class="page-link" href="/me/stored/courses2/${i}"><span class="">${i}</span></a>
                    </li>`;
        }
        tagA += `<li class="page-item">
                    <a class="page-link" href="/me/stored/courses2/${currPage}">Next</a>
                </li>
                <li class="page-item ${dis2}">
                    <a class="page-link" href="/me/stored/courses2/${number}">Last</a>
                </li>`;
        return tagA;
    },
}
module.exports = helper;