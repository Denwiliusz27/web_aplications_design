var express = require('express');
var router = express.Router();

/* GET users listing. */
// localhost:3000/test/
router.get('/', function(req, res, next) {
    // res.send('test');
    res.render('form');
});

router.post('/form', function (req, res, next) {
   res.render('index', {title: req.body.student, lname: 'siemanko'})
});

module.exports = router;
