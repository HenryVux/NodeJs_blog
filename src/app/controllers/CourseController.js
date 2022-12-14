const Course = require('../models/Course');
const { mongooseToObject } = require('../../util/mongoose');
const { reset } = require('nodemon');

class CourseController {
    // [GET] /courses/:slug
    show(req, res, next) {
        // console.log('--LOG:', req.params.slug);
        Course.findOne({ slug: req.params.slug })
            .then(
                // (course) => res.json(course),
                (course) => res.render('courses/show', { course: mongooseToObject(course) }),
            )
            .catch(next);
    }
    // [GET] /courses/create
    create(req, res, next) {
        res.render('courses/create');
    }
    // [POST] /courses/store
    store(req, res, next) {
        // res.json(req.body);
        // console.log('--STORE--', req.body);
        const formData = req.body;
        formData.image = `https://img.youtube.com/vi/${formData.videoId}/sddefault.jpg`;
        // formData._id = 1;// auto_increment : mongoose sequence github
        const course = new Course(formData);
        course.save()
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
            // .catch((error) => {});
    }
    // [CRUD]
    // [GET] /courses/edit/:id
    edit(req, res, next) {
        // res.send('chinh sua');
        // console.log('--EDIT--', req.params);
        Course.findById(req.params.id)
            .then((course) => res.render('courses/edit', { course: mongooseToObject(course) }))
            .catch(next);
    }
    // [PUT] /courses/:id
    update(req, res, next) {
        // console.log('--UPDATE--', req.params);
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }
    // [PATCH] /courses/:id
    restore(req, res, next) {
        // console.log('--RESTORE--', req.params);
        Course.restore({ _id: req.params.id })
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }
    // [DELETE] /courses/:id
    destroy(req, res, next) {
        // console.log('--DELETE--', req.params);
        // Course.deleteOne({ _id: req.params.id })
        // soft delete
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
    // [FORCE DELETE] /courses/:id/force
    forceDestroy(req, res, next) {
        // console.log('--FORCE DELETE--', req.params);
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD

    handleAction(req, res, next) {
        // res.json(req.body);
        console.log("-- handleAction:",req.body);//req.body["action"], req.body["courseIds"], 
        
        switch (req.body.actionHandle) {
            case 'delete':
                // delete array - read mongoose
                Course.delete({ _id: {$in: req.body.courseIds} }) 
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            case 'forcedelete-1':
                // delete array - read mongoose
                Course.deleteOne({ _id: {$in: req.body.courseIds} })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            case 'restore':
                // delete array - read mongoose
                Course.restore({ _id: {$in: req.body.courseIds} }) 
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.json({message: 'action is invalid'});
                // res.render('error');
                break;
        }
        // res.send('handleAction');
        // res.redirect('/courses/formAction');
    }
}

module.exports = new CourseController();
