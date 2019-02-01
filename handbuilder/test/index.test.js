var SuiteController = require('../controllers/suites');
var CardController  = require('../controllers/cards');
var HandController  = require('../controllers/hand');

// This is just to make sure unit tests are working
describe('Testing Basics', function() {

    it('Mocha loads and runs on declared tests', function(done) {
      if (5 == 5) {
        done();
      } else {
        done(new Error("Not sure what's happened."));
      }
    });

    it('loads SuiteController correctly', function(done){
      if(SuiteController.works()){
        done();
      } else {
        done(new Error("SuiteController did not load properly"));
      }
    });

    it('loads CardController correctly', function(done){
      if(CardController.works()){
        done();
      } else {
        done(new Error("CardController did not load properly"));
      }
    });

    it('loads HandController correctly', function(done){
      if(HandController.works()){
        done();
      } else {
        done(new Error("CardController did not load properly"));
      }
    });
  
  });

  describe('Testing logic', function(){

    it('HandController can interperet hands correctly', function(done){
      if(HandController.make_hand('2H, 3H, 4H, 5H, 6H')){
        done();
      } else {
        done(new Error("HandController failed to interperet a hand"));
      }
    });

    it('HandController knows when a poker hand is not exactly 5 cards', function(done){
      if(!HandController.make_hand('2H, 3H, 4H, 5H')){
        done();
      } else {
        done(new Error("HandController let an illegitimate hand through"));
      }
    });

    it('SuiteController can tell when a hand is a flush', function(done){
      if(SuiteController.is_flush(['2H', '3H', '4H', '5H', '6H'])){
        done();
      } else {
        done(new Error("SuiteController could not identify a flush"));
      }
    });
    
    it('SuiteController can tell when a hand is not a flush', function(done){
      if(!SuiteController.is_flush(['2H', '3H', '4H', '5H', '6D'])){
        done();
      } else {
        done(new Error("SuiteController thinks everything is a flush"));
      }
    });

    it('CardController can recognise a royal straight', function(done){
      var $case = CardController.is_straight(['10H', 'JH', 'QH', 'KH', 'AH']);
      if($case == 'royal '){
        done();
      } else {
        done(new Error("CardController does not recognise a royal straight: " + $case));
      }
    });

    it('CardController can recognise when there is no straight', function(done){
      var $case = CardController.is_straight(['10H', 'JH', 'QH', 'KH', '3H']);
      if($case == ''){
        done();
      } else {
        done(new Error("CardController does not recognise a flush: " + $case));
      }
    });

    it('HandController and CardController can recognise a flush', function(done){
      var $cards_array = ['2H', '3H', '4H', '5H', '8H'];
      var $flush = SuiteController.is_flush($cards_array);
      var $case =  
      HandController.final_hand(
        $flush,
        CardController.is_straight($cards_array)
      );
      if($case == 'flush'){
        done();
      } else {
        done(new Error("HandController and CardController did not recognise a flush: " + $case));
      }
    });

    it('HandController and CardController can recognise a straight flush', function(done){
      var $cards_array = ['2H', '5H', '6H', '3H', '4H'];
      var $flush = SuiteController.is_flush($cards_array);
      var $case =  
      HandController.final_hand(
        $flush,
        CardController.is_straight($cards_array)
      );
      if($case == 'straight flush'){
        done();
      } else {
        done(new Error("HandController and CardController did not recognise a straight flush: " + $case));
      }
    });

  });