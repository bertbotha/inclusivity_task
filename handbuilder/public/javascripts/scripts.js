$(document).ready(init);

function init () {
    console.log('DOM ready');
    $('#get_hand').on('click', doBuildHand);
}

function doBuildHand () {
    var $hand = $('#txt_hand').val();

    var $request_object = {
        hand: $hand
    }

    $.post('/', $request_object, function($response){
        console.log($response);
    });
}