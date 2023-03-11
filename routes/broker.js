const express = require('express');
const BrokerController = require('../controller/BrokerController');
const router = express.Router();

router.get('/', BrokerController.getBrokerListing)

module.exports = router;
