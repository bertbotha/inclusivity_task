var SuiteController = require('../controllers/suites');
var CardController  = require('../controllers/cards');

// This is just to make sure unit tests are working
describe('Testing HandBuilder', function() {

    it('loads and runs on declared tests', function(done) {
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
  
  });