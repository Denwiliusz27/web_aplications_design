var express = require('express');
var router = express.Router();
var mysql = require('mysql2');

const worldController = require('../controllers/World_Controller')

router.get('/', worldController.getIndex);

module.exports = router;
