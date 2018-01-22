let today = new Date();

let monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

let formattedDate = today.getDate()+' '+monthNames[today.getMonth()]+' '+ today.getFullYear();
let twentyFourOn = $('#hour-format').is(':checked');
$('#today').text(formattedDate);

let currentTime = '';


function setTimeFormat(){
    if($('#hour-format').is(':checked')){
        $("#hour-format").prop('checked', true);
        currentTime = today.getHours()+ ":"+today.getMinutes();
    } else {
        $("#hour-format").prop('checked', false); 
         currentTime = formatAmPm(today);
    }
    $('#currentTime').text(currentTime);
}     


if(twentyFourOn){
    let clockMinutes = today.getMinutes() < 10 ? '0'+today.getMinutes() : today.getMinutes();
    currentTime = today.getHours()+ ":"+clockMinutes;
} else{
    currentTime = formatAmPm(today); 
}


$('#today').text(formattedDate);

$('#currentTime').text(currentTime);

function setHoursAndMinutes(){
    for(let j=0; j<60; j++){
         $('#minute-list').append($('<div data-scroll-speed="9" class="minute" id="minute_'+j+'">'+(j<10?'0'+j:j)+'</div>'));
    }
    if($('#hour-format').is(':checked')){
        $('.ampm-field').css('display', 'none');
        for(let i = 0; i<24; i++){
            $('#hours-list').append($('<div data-scroll-speed="5" class="hour" id="hour_'+i+'">'+(i<10?'0'+i:i)+'</div>'));
        }
    } else {
        $('.ampm-field').css('display', 'block');
        for(let i=1; i<=12; i++){
            $('#hours-list').append($('<div id="hour_'+i+'">'+i+'</div>'));
        }
    }
    $('#hours-list').append($('<div>&nbsp;</div>'));
    $('#minute-list').append($('<div>&nbsp;</div>'));
}

function formatAmPm(currentDate) {
    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = (hours == 0) ? 12 : hours; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    formatedTime = hours + ':' + minutes + ' ' + ampm;
    return formatedTime;
}

function updateClock(){
    let hourField = $('#hiden-hour').val();
    let minuteField = $('#hiden-hour').val();
    let ampmField = $('#hiden-ampm').val();
    
    let updatedTime = ""
    if($('#hour-format').is(':checked')){
        updatedTime = hourField+ ':'+minuteField+' '+ampmField;    
    } else {
        updatedTime = hourField+ ':'+minuteField;   
    }
    
    $('#currentTime').text("");
    $('#currentTime').text(updatedTime);

    
}



$(document).ready(function () {
    let scrollerHeight  = $('#scroller-wrapper').height();
    let selectorTop     = scrollerHeight * .45;
    let selectorBottom  = scrollerHeight * .55;
    let middleOfScroll = scrollerHeight/2 ;
    $('#hours-list').on('scroll', function (event) {
        $('.hour').each(function () {
            let thisTop = $(this).offset().top - $('#hours-list').scrollTop();
            if($(this).offset().top >= 460 && ($(this).offset().top) <= 475){
                $('#'+$(this).attr('id')).addClass('selected-text');
                $('#hiden-hour').val($('#'+$(this).attr('id')).html());
            } else {
                $('#'+$(this).attr('id')).removeClass('selected-text');
            }
            
        });
    });
    
     $('#minute-list').on('scroll', function (event) {
          $('.minute').each(function () {
            let thisTop = $(this).offset().top - $('#minute-list').scrollTop();
            if($(this).offset().top >= 460 && ($(this).offset().top) <= 475){
                $('#'+$(this).attr('id')).addClass('selected-text');
                $('#hidden-minute').val($('#'+$(this).attr('id')).html());
            } else {
                $('#'+$(this).attr('id')).removeClass('selected-text');
            }
            
        });
     });
    
     $('#ampm-list').on('scroll', function (event) {
         $('.ampm').each(function(){
            let thisTop = $(this).offset().top - $('#ampm-list').scrollTop();
            if($(this).offset().top >= 460 && ($(this).offset().top) <= 475){
                $('#'+$(this).attr('id')).addClass('selected-text-ampm');
                $('#hidden-ampm').val($('#'+$(this).attr('id')).html());
            } else {
                $('#'+$(this).attr('id')).removeClass('selected-text-ampm');
            }
         });
     });
    
});




