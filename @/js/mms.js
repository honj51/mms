$(function(){

  /**
   * @name stopAllAudio
   * @desc 停止所有音频
   * @depend ['zepto']
   * @return {null}
   **/
  function stopAllAudio() {
    var audio = $('audio');
    audio.each(function(index, elem) {
      if (elem && elem.pause) {
        elem.pause();
      }
    })
  }
  /**
   * @name closeAudio
   * @desc 关闭所有音频
   * @depend ['zepto']
   * @return {null}
   **/
  function closeAudio(){
    alert('sfsdf');
    stopAllAudio();
  }
  window.onbeforeunload = closeAudio;
  window.onunload = closeAudio;

})
  $('.marker-loading').show();

  var href = location.href;
  var search = href.substr(href.search('qi.html')+8);
  search = search.replace('?', '');
  var qiSearch = search.match(/(\bqi=\d+)/);
  var qi;
  if( qiSearch !== null && qiSearch.length > 0 ){
    qi = qiSearch[0].substr('3');
  }
  // 默认第三期
  qi = qi || 'latest'; 
  // 进行ajax 抓数据
  var ajaxTime = 1;
  /**
   * @name ajaxGet
   * @desc ajax获取mms信息
   * @depend ['zepto']
   * @return {null}
   **/
  function ajaxGet() {
    $.ajax({
      url: '/@/qi/' + qi + "/init.json?&random=" + Math.random(), 
      success: function( data ){
        // console.log(data);

        var baseUrl = data.baseUrl;
        if(data.audios){
          createAudio( baseUrl, data.audios);
        };
        // 大喇叭
        var $mms = $( '#mms-mm' );
        if( data.mmsPng ) {
          $mms[0].src = baseUrl + data.mmsPng;
          
          $mms.on('error', function() {
            $mms[0].src = '/@/icon/mms-mm.png';
          })
        } else {
          $mms[0].src = '/@/icon/mms-mm.png';
        }

        // title图片
        var $titlePng = $( '#title-png' );
        if( data.titlePng ) {
          $titlePng[0].src = baseUrl + data.titlePng;
          
          $titlePng.on('error', function() {
            $titlePng[0].src = '/@/icon/title-default.png';
          })
        } else {
          $titlePng[0].src = '/@/icon/title-default.png';
        }

        // title图片
        if( data.qrPng ) {
          var $qrPng = $( '#qr-id' );
          $qrPng[0].src = baseUrl + data.qrPng;
          
          $qrPng.on('error', function() {
            $qrPng[0].src = '/@/icon/qr-id.png';
          })
        } else{
          $qrPng[0].src = '/@/icon/qr-id.png';
        }

        if( data.bgColor ){
          $('body').css({
            "background": data.bgColor
          })
        }
        document.title = data.title + data.titleEnd || '萌萌说-盈保倍';

        $('.marker-loading').hide();
      },
      error: function() {
        ajaxTime ++;
        // 最多请求三次
        if( ajaxTime > 3){
          $('.marker-loading').hide();
          $('#ajax-error').show();
          setTimeout( function () {
            location.href = '/';
          }, 5000)
          // alert('出错，请重新打开。');
        } else {
          ajaxGet();
        }
      }
    });
  } 
  ajaxGet();

  // var $audio = $('#audio');
  var $audio, audio;
  /**
   * @name createAudio
   * @desc 创建当前的音频
   * @depend ['zepto']
   * @return {null}
   **/
  function createAudio(base,datas) {
    $audio = $('<audio autoplay controls id="audio" sssssstyle="position:absolute;z-index:-999;left:-100000px;top:-111111px;"></audio>');
    for( var i = datas.length; i-- ; ){
      var data = datas[i];
      if( data.length === 2 ){
        $audio.append('<source src="'+ base + data[1] + '" type="' + data[0] + '">');
      }
    }

    $('#audio-box').empty().append($audio);
    audio = $audio.get(0);
    audio && audio.load && audio.load();
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
      $('#page').addClass('play');
    });
    audio && audio.play && audio.play();
    /**
   * @name playAudio
   * @desc 自动播放音频
   * @depend ['zepto']
   * @return {null}
   **/
    function playAudio(){
      if( audio.currentTime <= 0 ){
        setTimeout(function(){
          playAudio();
        }, 500);
      } else {
        $('.marker-loading').hide();
      }
    }
    setTimeout(function(){
      playAudio();
    }, 1000)
  }

  $('.marker').on('click', function(e) {
    var elem = e.target || e.srcElement;
    var $elem = $(elem);
    if( $elem.parents(".marker").length > 0 ){
      e.stopPropagation();
    } else {
      var self = $(this).hide();
    }
  })
