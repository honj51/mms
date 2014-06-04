$(function() {
  $('.marker-loading').show();
  var indexData;
  var getIndexDataTime = 0;
  /**
   * @name getIndexData
   * @desc 获取主页数据
   * @depend ['zepto']
   * @return {null}
   **/
  function getIndexData() {
    $.ajax({
      url: "./@/qi/index.all.json",
      data: "",
      success: function( data) {
        indexData = data;
        window.indexData = data;
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
        }
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
    var perpage = 10;
    active = active === undefined? 1 : parseInt(active, 10);
    // active = 4;
    var begin = ( active - 1 ) * perpage;
    var end = active  * perpage;
    var dataLength = indexData.length;
    // console.log(indexData.length);
    pagination.empty();
    mmsListBox.empty();
    for(; begin < end && begin < dataLength; begin++){
      var dataElem = indexData[begin];
      $dataElem[begin] = $dataElem[begin] || $('<a href="./qi.html?qi='+ dataElem.qi +'" class="list-group-item">' + 
          '<h4 class="list-group-item-heading">' + begin + " : " + dataElem.title +'</h4>' +
          '<p class="list-group-item-text"><span>'+ dataElem.author +'</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>'+ dataElem.date +'</span></p>' +
        '</a>');
      // console.log( $dataElem );
      mmsListBox.append( $dataElem[begin] );
    }

    pagination.empty();
    var maxPage = Math.ceil( indexData.length / perpage);
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