var express = require('express');
var router = express.Router();

const items = require('../services/items.service');


router.post('/getItems', items.getUserItems);
router.post('/deleteOrder', items.deleteOrder);
router.post('/addItem', items.addItem);
router.post('/deleteUserData', items.deletAllUseData);
router.post('/updateOrder', items.editUserOrder);

module.exports = router