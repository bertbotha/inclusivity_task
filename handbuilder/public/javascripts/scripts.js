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
        $('.result_container').hide();
        $('.error_container').hide();
        if( $response.status == "ok" ){
            $('.result_container p span').text($response.response);
            $('.result_container').show();
        } else if( $response.status == "error" ) {
            $('.error_container p span').html($response.error_message + '<br /><br />Refer to the example below for more details.');
            $('.error_container').show();
        }
        
    });
}