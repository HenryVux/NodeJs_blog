const express = require('express');
const router = express.Router();

const cartController = require('../app/controllers/CartController');
// url: /cart shop
router.get('/', cartController.show); // index - show

module.exports = router;
