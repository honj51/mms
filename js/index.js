$(function() {
  $('.marker-loading').show();
  var indexData;
  var getIndexDataTime = 0;
  
  // 七牛的cdn，用于音频加快，一般音频就不会修改的。
  var cdnBase = '';
  var host = location.host
  if( host === 'mms.ingbaobei.com' ){
    cdnBase = '//ibbmms.qiniudn.com/';
  } else {
    // 域名跳转
    setTimeout(function(){
      if(/^(\d+\.){3}\d+(\:\d+){0,1}$/.test(location.host) === false){
        location.href = '//mms.ingbaobei.com';
      }
    },100);
  }


  // 获取参数
  var str = location.search
  str = decodeURI(str);
  var key = "", 
    tKey = "";
  var keyRegex = /\bkey=([^;&=]+)/;
  var tKeyRegex = /\btkey=([^;&=]+)/;
  var keyMatch = str.match(keyRegex);
  var tKeyMatch = str.match(tKeyRegex);
  // console.log(keyMatch, tKeyMatch);
  if(keyMatch && keyMatch.length){
    key = keyMatch[1];
    var search = "/" + str;
    $('a[href="'+search+'"]').addClass("active");
    // alert(key);
  } else if(tKeyMatch && tKeyMatch.length){
    tKey = tKeyMatch[1];
    $('input[name="tkey"]').attr("placeholder", tKey);
    // alert(tKey);
  }


  /**
   * @name getIndexData
   * @desc 获取主页数据
   * @depend ['zepto']
   * @return {null}
   **/
  function selectIndexData(data) {
    var newData = [];
    var i = 0, dataTemp,
      l = data.length;
    if(key != ""){
      for(i = 0; i < l; i++){
        dataTemp = data[i];
        if(key == dataTemp.key){
          newData.push(dataTemp);
        }
      }
    } else if(tKey != ""){
      for(i = 0; i < l; i++){
        dataTemp = data[i];
        if(dataTemp.title.indexOf(tKey) > -1){
          newData.push(dataTemp);
        }
      }
    } else {
      newData = data;
    }
    return newData;
  }

  /**
   * @name getIndexData
   * @desc 获取主页数据
   * @depend ['zepto']
   * @return {null}
   **/
  function getIndexData() {
    $.ajax({
      url: "qi/index.all.json?&random=" + (new Date()).getTime() + "-" + Math.random(),
      data: "",
      dataType: "json",
      success: function( data) {
        indexData = selectIndexData(data);
        window.indexData = indexData;
        // console.log(data);
        $('.marker-loading').hide();
        getPage( location.href );
        buildDate(getPage( location.href ));
      }, 
      error: function() {
        window.console && console.log && console.log("getIndexDataTime:", getIndexDataTime)
        if( getIndexDataTime < 10 ){
          getIndexData();
        } else {
          $('.marker-loading').hide();
          $('#ajax-error').show();
          $('.mms-list-box').empty();
        }
        getIndexDataTime ++;
      }
    })
  }
  getIndexData();
  
  /**
   * @name getIndexData
   * @desc 获取主页数据
   * @depend ['zepto']
   * @return {null}
   **/
  var mmsListBox = $('.mms-list-box');
  var pagination = $('.pagination-box');
  var $page = [];
  var $dataElem = [];
  window.$page = $page;
  window.$dataElem = $dataElem;
  var oldActive = 1;
  function buildDate( active ) {
    // var perpage = 10;
    var perpage = 5;
    active = active === undefined? 1 : parseInt(active, 10);
    // active = 4;
    maxPage = Math.ceil( indexData.length / perpage);
    // 避免页码过大
    if( active > maxPage){
      active = 1;
      location.href ="#1";
    }
    var begin = ( active - 1 ) * perpage;
    var end = active  * perpage;
    var dataLength = indexData.length;
    var maxPage;
    // console.log(indexData.length);
    pagination.empty();
    mmsListBox.empty();
    for(; begin < end && begin < dataLength; begin++){
      var dataElem = indexData[begin];
      $dataElem[begin] = $dataElem[begin] || $('<a href="./qi.html?qi='+ dataElem.qi +'" class="list-group-item">' + 
          '<h4 class="list-group-item-heading">第' + dataElem.qi + "期 : " + dataElem.title +'</h4>' +
          '<p class="list-group-item-text"><span>'+ dataElem.author +'</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>'+ dataElem.date +'</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>'+ dataElem.key +'</span></p>' +
        '</a>');
      // console.log( $dataElem );
      mmsListBox.append( $dataElem[begin] );
    }
    if(indexData.length < 1){
      mmsListBox.append( '<a href="./" class="list-group-item">' + 
          '<h4 class="list-group-item-heading">暂无查询结果</h4>' +
          '<p class="list-group-item-text"><span></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span></span></p>' +
        '</a>' );
    }

    pagination.empty();
    // 分页
    if( dataLength > perpage ){
      // console.log("可以分页了。");
      var pageBegin = active-2;
      var pageEnd = active+3;
      if( pageBegin > 2 ){
        pagination.append('<li><a href="#1">1..</a></li>');
      } else if( pageBegin > 1 ){
        pagination.append('<li><a href="#1">1</a></li>');
      }
      for(; pageBegin < pageEnd && pageBegin <= maxPage; pageBegin++){
        if( pageBegin > 0 ){
          $page[pageBegin] = $page[pageBegin] || $('<li><a href="#'+pageBegin+'">' + pageBegin + '</a></li>');
          pagination.append( $page[pageBegin] );

        }
      }
      if( pageEnd < maxPage ){
        var last =  maxPage
        pagination.append('<li><a href="#'+last+'">..' + last + '</a></li>');
      } else if( pageEnd === maxPage ){
        var last =  maxPage
        pagination.append('<li><a href="#'+last+'">' + last + '</a></li>');
      }
      $page[oldActive] && $page[oldActive].removeClass && $page[oldActive].removeClass('active');
      $page[active].addClass('active');
      oldActive = active;
      // console.log(active);
    }
  }

  $('.pagination-box').on('click', function( e ) {
    // var a = $('a', $(this));
    // console.log(a.attr('href'));
    var elem = e.target || e.srcElement;
    window.elem = elem;
    if( elem.tagName === 'li' || elem.tagName === 'LI' ){
      elem = $('a', elem).get(0);
    }
    var str = elem.href;
    var nowPage = getPage(str);
    if( nowPage !== false ){
      buildDate( nowPage );
    }
  });

  /**
   * @name getPage
   * @desc 通过 href 获取 page
   * @depend ['zepto']
   * @return {null}
   **/
  function getPage( str ) {
    var match = str.match(/#(\d+)$/);
    // console.log( elem.href, match);
    if( match !== null ){
      return match[1];
    } else {
      return 1;
    }
  }
})