mms
===

萌萌说保险。

------

这是萌萌说保险项目组，项目线上版本存储在七牛静态存储，所以每次发布都需要进行更新部分文件。

目前暂时实现了 ```qi.html``` 这个页面，是详细第某期的萌萌说保险。 ```index.html``` 将在不久的将来进行。



##本地使用

1、保存到本地  
git clone git://github.com/ingbaobeigroup/mms.git  

2、到当前目录下面，使用静态文件存储，进行发布。  
这里采用了朴灵大神的静态文件服务器，  
先安装[nodejs](http://nodejs.org/)  

再安装 cnpm
```
$ npm i -g cnpm
```

再安装 anywhere
```
$ cnpm i -g anywhere
```

然后，运行
```
$ cd /path to project
$ anywhere 80
```

然后就能运行了。浏览器此时目测自动打开了这个网页了。

##文件架构
```
\mms
  index.html: 主页，不用解释。
  qi.html: 萌萌说第几期详情页面。
  \@
    \audio: 基本上没用了的赶脚
    \css: css的文件夹
      mms.css: 网站开发css
      mms.min.css: 网站压缩css
    \icon: 存放图片的
      loading.gif: 加载中png
      record-m.png: 收音机
      record-r.png: 收音机转动的
      mms-logo.png: 朋友圈分享的logo
      mms-mm.png: 默认png
      qr-id.png: 默认png
      title-default.png: 默认png
    \js: js文件夹
      zepto.js: zepto 库主要文件
      event.js: zepto 的事件js
      ajax.js: zepto 的ajax js
      mms.js: 萌萌说 qi.html 的js 
      mms.ingbaobei.com.js:萌萌说 qi.html 的js，开发版本，统一上面四个文件 
      mms.ingbaobei.com.min.js:萌萌说 qi.html 的js，生产版本，统一上面四个文件 
    \less:
      normalize.less: 大神的 normalize ，从bootstrap抄下来的。
      mms.less: 萌萌说 qi.html 的css
    \qi: 每次更新一期萌萌说，都要往里面更新数据啊。
      \latest: 最新版本萌萌说的信息获取的地方，适用于 qi.html 页面， 如果url 为 qi.html?qi=3 之类的就不适用了。
        init.json: 上面文件夹说明一切
      \3: 第三期版本的资源文件
        init.json: 第三期版本的数据文件
        audio.mp3: 第三期版本的 mp3 格式音频
        audio.ogg: 第三期版本的 ogg 格式音频
        mms.png: 上面那个大喇叭的图片，大小一定要按照这个比例进行。
        qr.png: 含有二维码的那个图片。
        title.png: 这一期的那个版本png title。

```

##发布新一期版本
