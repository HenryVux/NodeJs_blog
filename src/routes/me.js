const express = require('express');
const router = express.Router();

const meController = require('../app/controllers/MeController');
// url: /me
router.get('/stored/courses', meController.storedCourses); // stored
router.get('/', meController.show); // index - show

module.exports = router;
