const Course = require('../models/Course');
const { multipleMongooseToObject } = require('../../util/mongoose');

class SiteController {
    // [GET] /home - index : callback
    // index(req, res) {
    //     Course.find({}, function (err, courses) {
    //         if (!err) {
    //             res.json(courses);
    //         } else {
    //             res.status(401).json({ error: '--- message error---' });
    //         }
    //     });
    //     // res.render('home');
    // }
    // [GET] /home - index : promise
    index(req, res, next) {
        Course.find({})
            // .then((courses) => res.json(courses))
            .then((courses) => {
                // courses = courses.map((khoahoc) => khoahoc.toObject());
                res.render('home', {
                    title: 'Home Page Title',
                    // courses, //courses: courses,
                    courses: multipleMongooseToObject(courses),
                });
            })
            .catch(next);
    }

    error(req, res) {
        res.render('error');
    }

    // [GET] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
