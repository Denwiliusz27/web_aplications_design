var express = require('express');
var router = express.Router();

const tendersController = require('../controllers/tendersController')

/* GET home page. */
//localhost:3000/przetargi
router.get('/aktualne', tendersController.getTenders);

router.get('/zakonczone', function (req, res) {
    res.send('zakończone');
});

router.get('/dodaj', function (req, res) {
    res.send('dodaj')
})

module.exports = router;