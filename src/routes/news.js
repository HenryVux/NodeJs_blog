const express = require('express');
const router = express.Router();

const newController = require('../app/controllers/NewsController');

router.get('/:slug', newController.show); // detail
router.get('/', newController.index); // index

module.exports = router;
