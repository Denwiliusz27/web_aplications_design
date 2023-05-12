var express = require('express');
var router = express.Router();

const offersController = require("../controllers/offersController")

//localhost:3000/oferta
router.post('/dodaj/:id', offersController.addOffer);

module.exports = router;