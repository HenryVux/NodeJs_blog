const Course = require('../models/Course');
const { multipleMongooseToObject, mongooseToObject } = require('../../util/mongoose');
const mongoose = require('../../util/mongoose');

class MeController {
    // [GET] /me
    show(req, res) {
        // res.render('me');
        res.send('MeController nè!');
    }
    // [GET] /me/stored/courses
    storedCourses(req, res, next) {
        Promise.all([Course.find({}), Course.countDocumentsDeleted()])
            .then(
                (
                    [courses, deletedCount], // (result - promise return array)
                ) =>
                    res.render('me/storedCourses', {
                        deletedCount, // inhert Object literal
                        courses: multipleMongooseToObject(courses),
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
}

module.exports = new MeController();
