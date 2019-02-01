exports.works = function(){return true;}

exports.make_hand = function($hand) {
    $hand_array = $hand.split(", ");
    if( $hand_array.length !== 5 ){
        return false;
    } else {
        return $hand_array;
    }
}

exports.final_hand = function($is_flush, $hand) {
    // return new Promise(function(resolve, reject){
    //     try {
            var $final_hand = ($is_flush)? $hand + ' flush' : $hand;
            // resolve($final_hand);
            return $final_hand;
    //     } catch (err) {
    //         reject(err);
    //     }
    // })
}