var express = require('express');
const { default: transactions } = require('../../app/src/components/transactions');
var router = express.Router();

const transactions = require('../services/transactions.service');


router.get('/getPaymentType', transactions.getTransactions);


module.exports = router