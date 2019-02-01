exports.works = function (){return true;}

function get_suite ($card) {
    return ($card.length == 2)? $card[1].toUpperCase() : $card[2].toUpperCase();
}

exports.is_flush = function($hand_array){
    var $suite;
    var $on_suite = true;
    
    $suite = get_suite($hand_array[0]);
    
    $hand_array.forEach(el => {
        if( get_suite(el) !== $suite ){ 
            $on_suite = false; 
        }
    });
    return $on_suite;
}