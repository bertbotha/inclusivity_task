var SuiteController = require('./suites');
var CardController  = require('./cards');

// PRIVATE FUNCTIONS /////////////////////////////////////////////////////////////////////////////////

function final_hand ($is_flush, $hand) {
    if(!$hand){return false;}
    var $final_hand = ($is_flush)? $hand + 'flush' : $hand;
    return $final_hand.trim();
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

        // is it a straight?
        var $final_hand = final_hand (
            $is_flush, // is this a flush?
            CardController.is_straight($hand_array)
        );

        if(!$final_hand && !$is_flush){
            $final_hand = CardController.find_pairs($hand_array);
        } else if (!$final_hand && $is_flush){
            $final_hand = CardController.get_highest_card($hand_array) + ' high flush';
        }

        return $final_hand;
    ////////////////////////////////////////////////////////////////////////////////////////////////
    }
}