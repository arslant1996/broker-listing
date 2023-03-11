const express = require('express');
const router = express.Router();
const broker = require('./broker')

router.use('/', broker)

module.exports = router;
