exports.works = function (){return true;}

// PRIVATE VARS ////////////////////////////////////////////////////////////////////////////

var $aces_high = false;

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
    // convert to objects
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
        case 1 :
        $translated = 'Ace'
        break;
        default :
        $translated = $number.toString();
        break;
    }
    return $translated;
}

function translate_from_facecard($symbol){
    // convert to objects
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
        case 'A'  :
        $translated = '1'
        break;
        default :
        $translated = $symbol
        break;
    }
    if( $translated == '1' && $aces_high){
        $translated = '14';
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

    if(!$is_straight && !$aces_high){
        $aces_high = true;
        return find_straight($sequence);
    } else {
        return $is_straight;
    }
    
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

function translate_pairs($pairs){
    var $patterns = [];
    var $card;
    var $result;

    Object.keys($pairs).forEach(el=>{
        if($pairs[el] > 1){
            $card = el;
            $patterns.push($pairs[el]);
        }
    })
    $patterns.sort(sort_number);
    
    var $hands = {
        '2': "A pair of " + translate_to_facecard(parseInt(translate_from_facecard($card))) + "s",
        '3': "Three of a kind",
        '2,3': "Full House",
        '4': "Four of a kind",
        '2,2': "Two Pair"
    }

    if($patterns.toString() in $hands){
        $result = $hands[$patterns.toString()];
    } else {
        $result = false;
    }
    return $result;
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
    
    var $pairs_list = [];
    var $pairs = {};
    var $card_numbers = get_numbers($cards, false);
    var $result;
    $card_numbers.forEach(el=>{
        if($pairs_list.indexOf(el) > -1){
            $pairs[el]++;
        } else {
            $pairs[el]=1;
            $pairs_list.push(el);
        }
    });

    $result = translate_pairs($pairs);
    return $result;
}