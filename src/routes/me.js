const express = require('express');
const router = express.Router();

const meController = require('../app/controllers/MeController');
// url: /me
router.get('/stored/courses', meController.storedCourses); // stored
router.get('/stored/courses/:page', meController.storedCourses); // paginate

router.get('/stored/courses2', meController.storedCoursesPage); // stored - code paginate
router.get('/stored/courses2/:page', meController.storedCoursesPage); // stored - code paginate

router.get('/trash/courses', meController.trashCourses); // trash
router.get('/', meController.show); // index - show

module.exports = router;
