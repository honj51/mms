$(function() {

  $('.marker-loading').show();

  var href = location.href;
  var search = href.substr(href.search('qi.html') + 8);
  search = search.replace('?', '');
  var qiSearch = search.match(/(\bqi=\d+)/);
  var qi;
  if (qiSearch !== null && qiSearch.length > 0) {
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
    // console.log(qi);
    $.ajax({
      url: 'qi/' + qi + "/init.json?&random=" + (new Date()).getTime() + "-" + Math.random(),
      success: function(data) {
        // console.log(data);
        window.data1 = data;

        var baseUrl = data.baseUrl || "";
        if (data.audios) {
          createAudio(baseUrl, data.audios);
        };
        // 大喇叭
        var $mms = $('#mms-mm');
        if (data.mmsPng) {
          $mms[0].src = baseUrl + data.mmsPng;

          $mms.on('error', function() {
            $mms[0].src = 'icon/mms-mm.png';
          })
        } else if( data.theme === undefined ){
          // 如果没写主题的话，就采用这个默认皮肤
          // 大喇叭
          $mms[0].src = 'icon/mms-mm.png';
        }

        // title图片
        $('#mms-title').html(data.title);
        

        // var $titlePng = $('#title-png');
        // if (data.titlePng) {
        //   $titlePng[0].src = baseUrl + data.titlePng;

        //   $titlePng.on('error', function() {
        //     $titlePng[0].src = 'icon/title-default.png';
        //   })
        // } else if( data.theme === undefined ){
        //   // 如果没写主题的话，就采用这个默认皮肤
        //   // title图片
        //   $titlePng[0].src = 'icon/title-default.png';
        // }

        // qr图片
        if (data.qrPng) {
          var $qrPng = $('#qr-id');
          $qrPng[0].src = baseUrl + data.qrPng;

          $qrPng.on('error', function() {
            $qrPng[0].src = 'icon/qr-id.png';
          })
        } else if( data.theme === undefined ){
          // 如果没写主题的话，就采用这个默认皮肤
          // qr图片
          $qrPng[0].src = 'icon/qr-id.png';
        }

        if (data.bgColor) {
          $('body').css({
            "background": data.bgColor
          })
        }
        document.title = data.title + data.titleEnd || '萌萌说-盈保倍';

        // 如果主题文件写了，就直接添加成为主题文件
        if(data.theme !== undefined){
          $.get('theme/'+data.theme+'/theme.js',"",function( data ) {
            new Function(data)();
          }, "text/javascript");
          // $('body').append('<script type="text/javascript" src="theme/'+data.theme+'/theme.js"></script>');
        }

        $('.marker-loading').hide();
      },
      error: function() {
        // console.log(this);
        ajaxTime++;
        // 最多请求三次
        if (ajaxTime > 3) {
          $('.marker-loading').hide();
          $('#ajax-error').show();
          setTimeout(function() {
            location.href = './';
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
  function createAudio(base, datas) {
    $audio = $('<audio controls id="audio" style="position:absolute;z-index:-999;left:-100000px;top:-111111px;"></audio>');
    for (var i = datas.length; i--;) {
      var data = datas[i];
      if (data.length === 2) {
        $audio.append('<source src="' + base + data[1] + '" type="' + data[0] + '">');
      }
    }

    $('#audio-box').empty().append($audio);
    audiojs.events.ready(function() {
      audiojs.createAll();
    });
    // $audio = $audio || $('audio');
    setTimeout(function() {
      $audio = $('audio');
      // audio = $audio.get(0) || $('audio').get(0);
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
      // audio && audio.play && audio.play();
    }, 2000)

    // $('#page').addClass('play');
    /**
     * @name playAudio
     * @desc 自动播放音频
     * @depend ['zepto']
     * @return {null}
     **/
    function playAudio() {
      if ( audio && audio.currentTime && audio.currentTime <= 0) {
        setTimeout(function() {
          playAudio();
        }, 500);
      } else {
        $('.marker-loading').hide();
      }
    }
    setTimeout(function() {
      playAudio();
    }, 1000)
  }

  $('.marker').on('click', function(e) {
    var elem = e.target || e.srcElement;
    var $elem = $(elem);
    if ($elem.parents(".marker").length > 0) {
      e.stopPropagation();
    } else {
      var self = $(this).hide();
    }
  })


  /**
   * @name blurDoing
   * @desc 停止所有的视频音频
   * @depend ['zepto']
   * @return {null}
   **/
  function blurDoing() {
    // console && console.log && console.log('blur');
    var audios = document.getElementsByTagName('audio');
    var audio;
    for (var i = audios.length; i--;) {
      audio = audios[i];
      // console.log(audio)
      audio && audio.pause && audio.pause();
    }
    var videos = document.getElementsByTagName('video');
    var video;
    for (var i = videos.length; i--;) {
      video = videos[i];
      video && video.pause && video.pause();
    }
  }
  // 良好的用户体验很重要
  // document.body.onblur = blurDoing;
  // window.onblur = blurDoing;
  window.onbeforeunload = blurDoing;
  window.onunload = blurDoing;

})