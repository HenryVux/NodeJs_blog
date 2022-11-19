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
        Course.find({})
            .then((courses) =>
                res.render('me/storedCourses', { courses: multipleMongooseToObject(courses) }),
            )
            .catch(next);
    }
}

module.exports = new MeController();
