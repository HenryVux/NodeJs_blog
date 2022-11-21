const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');

router.get('/search', siteController.search); // Search
router.get('/home', siteController.index); // Home
router.get('/error', siteController.error); // Home
router.get('/', siteController.index); // Home

module.exports = router;
