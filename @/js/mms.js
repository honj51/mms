$(function(){
  $('.marker').show();
  var $audio = $('#audio');
  var audio = $audio[0];
  audio.load();
  $audio.on('ended', function() {
    $('#page').removeClass('play');
  });
  $audio.on('stop', function() {
    $('#page').removeClass('play');
  });
  $audio.on('pause', function() {
    $('#page').removeClass('play');
  });
  $audio.on('play', function() {
    $('.marker').hide();
    $('#page').addClass('play');
  });
  audio && audio.play && audio.play();
  function playAudio(){
    // console.log(audio.currentTime);
    if( audio.currentTime <= 0){
      playAudio();
    } else {
      $('.marker').hide();
    }
  }
  setTimeout(function(){
    playAudio();
  }, 500)
})