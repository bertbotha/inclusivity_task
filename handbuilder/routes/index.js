var express = require('express');
var router = express.Router();

var SuiteController = require('../controllers/suites');
var CardController  = require('../controllers/cards');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/', function(req, res) {
  res.json({
    test: 'ok',
    body: req.body.hand
  })
});

module.exports = router;
