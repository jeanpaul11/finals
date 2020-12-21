var express = require('express');
var router = express.Router();

const prices = require('../services/prices.service');


router.get('/getPrices', prices.getPrices);


module.exports = router