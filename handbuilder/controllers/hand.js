var SuiteController = require('./suites');
var CardController  = require('./cards');

// PRIVATE FUNCTIONS /////////////////////////////////////////////////////////////////////////////////

function final_hand ($is_flush, $hand) {
    var $final_hand = ($is_flush)? $hand + 'flush' : $hand;
    return $final_hand;
}

// PUBLIC FUNCTIONS //////////////////////////////////////////////////////////////////////////////////

exports.works = function(){return true;}

exports.make_hand = function($hand) {
    $hand_array = $hand.split(", ");
    if( $hand_array.length !== 5 ){
        return false;
    } else {
    ////////////////////////////////////////////////////////////////////////////////////////////////
        var $is_flush = SuiteController.is_flush($hand_array);

        var $final_hand = final_hand (
            $is_flush, // is this a flush?
            CardController.is_straight($hand_array)
        );
            
        return $final_hand;
    ////////////////////////////////////////////////////////////////////////////////////////////////
    }
}