var express = require('express');
var router = express.Router();

const auctionsController = require('../controllers/auctionsController')

/* GET home page. */
//localhost:3000/przetargi
router.get('/aktualne', function (req, res) {
    res.send('aktualne');
});

router.get('/zakonczone', function (req, res) {
    res.send('zakończone');
});

router.get('/dodaj', function (req, res) {
    res.send('dodaj')
})

module.exports = router;