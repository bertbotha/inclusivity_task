exports.works = function (){return true;}

function is_same_array ($array_1, $array_2){

    $array_1.sort();
    $array_2.sort();
    if($array_1.length != $array_2.length) {
        return false
    } else {
        var $is_same = true;
        for (var $i=0; $i<$array_1.length;$i++){
            if($array_1[$i] != $array_2[$i]){
                $is_same = false;
            }
        }
        if(!$is_same){
            console.log('not the same');
            console.log($array_1);
            console.log($array_2);
        }
        return $is_same;
    }

}
function royal ($sequence){
    return is_same_array($sequence, ['10', 'J', 'Q', 'K', 'A']);
}
function find_straight ($sequence){
    return false;
}
function aces_low ($sequence){
    return $sequence;
}

exports.is_straight = function($cards) {
    var $card_numbers = [];
    $cards.forEach(el => {
        if(el.length == 2){
            $card_numbers.push(el[0]);
        } else {
            $card_numbers.push('10');
        }
        
    });
    if( royal($card_numbers) ){
        return 'royal';
    } else if( find_straight($cards) || find_straight(aces_low($cards)) ) {
        return 'straight';
    } else {
        return false
    }
}