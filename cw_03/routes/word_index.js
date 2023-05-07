var express = require('express');
var router = express.Router();
var mysql = require('mysql2');

const indexController = require('../controllers/indexController')

// 1 PODEJŚCIE
// /* GET home page. */
// // localhost:3000/
// router.get('/', function(req, res, next) {
//   // bierze szablon index.ejs i dodaje do niego dane (title) (literału obiektowego, klucza z 1 wartością)
//   res.render('index', { title: 'siemanko' , lname: 'Mareczek'});
// });

// 2 PODEJŚCIE z KONTROLLEREM
router.get('/', indexController.getIndex);

router.get('/form', indexController.getForm);

router.post('/get_currency', indexController.getCurrency)


// służy do określania tras - mówi który z plików w 'routes' mamy wykonać
module.exports = router;
