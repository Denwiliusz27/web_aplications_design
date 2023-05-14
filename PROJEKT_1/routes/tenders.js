var express = require('express');
var router = express.Router();

const tendersController = require('../controllers/tendersController')

/* GET home page. */
//localhost:3000/przetargi
router.get('/aktywne', tendersController.getActiveTenders);
router.get('/aktywne/:id/', tendersController.getActiveTender);


router.get('/zakonczone', tendersController.getCompletedTenders);
router.get('/zakonczone/:id', tendersController.getCompletedTender);

router.get('/dodaj', function (req, res) {
    res.send('dodaj')
});

module.exports = router;