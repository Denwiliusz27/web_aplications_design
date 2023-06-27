var express = require('express');
var router = express.Router();

const offersController = require("../controllers/offersController")

//localhost:3000/oferty
router.post('/dodaj/:id', offersController.addOffer);
router.get('/:tender_id', offersController.getOffersForTender);

module.exports = router;
