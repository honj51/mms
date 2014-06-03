$(function() {
  // 主题编号，一定要对应文件夹名字
  var theme = '3';
  // 背景颜色
  var bgc = '#ffcdcb';

  $('body').css({
    "background": bgc
  })
  // 大喇叭
  var $mms = $('#mms-mm');
  $mms[0].src = '/@/theme/' + theme + '/mms.png';
  $mms.on('error', function() {
    $mms[0].src = './@/icon/mms-mm.png';
  })

  // qr图片
  var $qrPng = $('#qr-id');
  $qrPng[0].src = '/@/theme/' + theme + '/qr.png';
  $qrPng.on('error', function() {
    $qrPng[0].src = './@/icon/qr-id.png';
  })


})