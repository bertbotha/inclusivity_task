var express = require('express');
var router = express.Router();

// var SuiteController = require('../controllers/suites');
// var CardController  = require('../controllers/cards');
var HandController  = require('../controllers/hand');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/', function(req, res) {

  var $cards_array = HandController.make_hand(req.body.hand);
  if(!$cards_array){
    res.json({
      status: 'error',
      error_message: 'Please ensure you have used correct formatting for your request and that your hand contains 5 cards.',
      request: req.body.hand
    })
  } else {
    res.json({
      status: 'ok',
      request: req.body.hand,
      response: $cards_array
    });
  }

  // if( SuiteController.is_flush($cards_array) ){

  /* 
  Knowing if all the cards are of the same suite eliminates a number of possibilities.
  If true then the result could only be:
  Flush
  Straight Flush
  Royal Flush
  And if false the result cannot be one of these three
  */

  //   var $final_hand = 
  //   HandController.final_hand(
  //     true, // is this a flush?
  //     CardController.is_straight($cards_array)
  //   );
  //   console.log($final_hand);
  //   res.json({
  //     status: 'ok',
  //     request: req.body.hand,
  //     response: $final_hand
  //   });

  // } else {
  //   console.log('not flush');
  // }

  res.json({
    status: 'ok',
    request: req.body.hand
  })

});

module.exports = router;
