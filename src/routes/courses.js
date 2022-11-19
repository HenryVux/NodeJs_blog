const express = require('express');
const router = express.Router();

const courseController = require('../app/controllers/CourseController');

router.get('/create', courseController.create); //
router.get('/edit/:id', courseController.edit); // edit form - id
router.put('/:id', courseController.update); // save update - id
router.delete('/:id', courseController.destroy); // destroy - id [DELETE]
router.post('/store', courseController.store); // save
router.get('/:slug', courseController.show); // show detail

module.exports = router;
