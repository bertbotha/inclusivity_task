exports.works = function (){return true;}

// PRIVATE FUNCTIONS ///////////////////////////////////////////////////////////////////////

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
        return $is_same;
    }

}

function translate_to_facecard($number){
    var $translated = '';
    switch($number){
        case 11 :
        $translated = 'Jack'
        break;
        case 12 :
        $translated = 'Queen'
        break;
        case 13 :
        $translated = 'King'
        break;
        case 14 :
        $translated = 'Ace'
        break;
        default :
        $translated = $number.toString();
        break;
    }
    return $translated;
}

function translate_from_facecard($symbol){
    var $translated = '';
    switch($symbol){
        case 'J' :
        $translated = '11'
        break;
        case 'Q' :
        $translated = '12'
        break;
        case 'K' :
        $translated = '13'
        break;
        case 'A' :
        $translated = '14'
        break;
        default :
        $translated = $symbol
        break;
    }
    return $translated;
}
function sort_number ($a, $b) {
    return $a-$b;
}

function convert_to_numbers ($cards) {
    var $card_numbers = [];
    $cards.forEach(el => {
        $card_numbers.push(parseInt(el));
    });
    $card_numbers.sort(sort_number);
    return $card_numbers;
}

function royal ($sequence){
    return is_same_array($sequence, ['10', 'J', 'Q', 'K', 'A']);
}
function find_straight ($sequence){
    var $num_sequence = convert_to_numbers($sequence);
    var $is_straight = true;
    $num_sequence.forEach(function($number, $key){
        if($key+1 < $num_sequence.length){
            if($number != $num_sequence[$key+1]-1){
                $is_straight = false;
            }
        }
    });
    return $is_straight;
}

function get_highest_card ($cards) {
    var $highest = 0;
    var $card_numbers = get_numbers($cards, true);
        $card_numbers = convert_to_numbers($card_numbers);
        $card_numbers.forEach(el=>{
            if(el > $highest){$highest = el;}
        });
        return translate_to_facecard($highest);
}

function get_numbers ($cards, $translate){
    var $card_numbers = [];
    $cards.forEach(el => {
        if(el.length == 2){
            if(!$translate){
                $card_numbers.push(el[0]);
            } else {
                $card_numbers.push(translate_from_facecard(el[0]));
            }
        } else {
            $card_numbers.push('10');
        }
    });
    return $card_numbers;
}

// PUBLIC FUNCTIONS ///////////////////////////////////////////////////////////////////////////

exports.get_highest_card = function ($cards) {
    var $highest = 0;
    var $card_numbers = get_numbers($cards, true);
        $card_numbers = convert_to_numbers($card_numbers);
        $card_numbers.forEach(el=>{
            if(el > $highest){$highest = el;}
        });
        return translate_to_facecard($highest);
}

exports.is_straight = function($cards) {

    var $card_numbers = get_numbers($cards, false);
    var $straight_card_numbers = get_numbers($cards, true);

    if( royal($card_numbers) ){
        return 'royal ';
    } else if( find_straight($straight_card_numbers) ) {
        return this.get_highest_card($cards) + ' high straight ';
    } else {
        return false;
    }
}

exports.find_pairs = function($cards) {
    return 'Two Pair';
}