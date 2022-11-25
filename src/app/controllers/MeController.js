const Course = require('../models/Course');
const { multipleMongooseToObject } = require('../../util/mongoose');
class MeController {
    // [GET] /me
    show(req, res) {
        // res.render('me');
        res.send('MeController nè!');
    }
    // [GET] /me/stored/courses
    storedCourses(req, res, next) {
        // res.json(res.locals._sort);
        let perPage = 5; // 5sp/trang
        let currPage = req.params.page || 1;

        let courseQuery = Course.find({})
            .skip((perPage * currPage) - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
            .limit(perPage);
        // console.log(req.query.column);        
        // sort column
        if(req.query.hasOwnProperty('_sort')){
            // res.json({message: 'sort ok'});
            // return;
            courseQuery = courseQuery.sort({name: 'desc'});
            courseQuery = courseQuery.sort({[req.query.column]: req.query.type});            
        }

        // Promise.all([Course.find({}), Course.countDocumentsDeleted()])
        Promise.all( [courseQuery, Course.countDocumentsDeleted(), Course.countDocumentsWithDeleted()] )
        // (result - promise return array)
            .then(([courses, deletedCount, countAllCourse]) =>
                    res.render('me/storedCourses', {
                        deletedCount, // inhert Object literal
                        courses: multipleMongooseToObject(courses),
                        // paginate handle
                        currPage,
                        countAllCourse,
                        numPages: Math.ceil(countAllCourse/perPage), // Sum page
                        //end
                    }),
            )
            .catch(next);

        // // [count list deleted] - Promise 1
        // Course.countDocumentsDeleted()
        //     .then((deletedCount) => {
        //         console.log('--deletedCount', deletedCount);
        //     })
        //     .catch(next);
        // // [list courses] - Promise 2
        // // who has to delete
        // // const idUser = mongooseToObject(() => '110011');
        // Course.find({}) // chi lay data deleteAt=null
        //     .then((courses) =>
        //         res.render('me/storedCourses', { courses: multipleMongooseToObject(courses) }),
        //     )
        //     .catch(next);
    }
    
    // [GET] /me/trash/courses
    trashCourses(req, res, next) {
        Course.findDeleted({})
            .then((courses) =>
                res.render('me/trashCourses', { courses: multipleMongooseToObject(courses) }),
            )
            .catch(next);
    }

    storedCoursesPage(req, res, next) {        
        let perPage = 5; // 5sp/trang
        let currPage = req.params.page || 1;
        // console.log('--storedCoursesPage page:', perPage, currPage);
        
        let courseQuery = Course.find({})
            .skip((perPage * currPage) - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
            .limit(perPage);
        // sort        
        if(req.query.hasOwnProperty('_sort')){            
            courseQuery = courseQuery.sort({name: 'desc'});
            courseQuery = courseQuery.sort({[req.query.column]: req.query.type});            
        }
        
        Promise.all( [courseQuery, Course.countDocumentsDeleted(), Course.countDocumentsWithDeleted()] )
        // (result - promise return array)            
            .then(([courses, deletedCount, countAllCourse]) =>                                        
                    res.render('me/storedCourses', {                        
                        deletedCount, // inhert Object literal
                        courses: multipleMongooseToObject(courses),
                        // paginate handle
                        currPage,
                        countAllCourse,
                        numPages: Math.ceil(countAllCourse/perPage), // Sum page
                        //end
                    }, 
                    // console.log('countAllCourse', countAllCourse, 'courses',courses.length,
                    //     'numPages:', Math.ceil(countAllCourse/(perPage)),
                    //     'countAllCourse:',countAllCourse, 'currPage', currPage)
                ),
            )
            .catch(next);        
    }
}

module.exports = new MeController();
