mms
===

萌萌说保险。 [mms.ingbaobei.com](http://mms.ingbaobei.com/index.html)  

------

这是萌萌说保险项目组，项目线上版本存储在七牛静态存储，所以每次发布都需要进行更新部分文件。

目前暂时实现了 ```qi.html``` 这个页面，是详细第某期的萌萌说保险。 ```index.html``` 为萌萌说保险的首页。


##开发分支
仓库只保存master分支。


##本地使用

1、保存到本地  
```
git clone https://github.com/ingbaobeigroup/mms.git  
```

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
  \audio: 基本上没用了的赶脚
  \css: css的文件夹
    qi.css: qi.html css
    qi.min.css: qi.html 压缩css
    index.css: index.html css
    index.css: index.html 压缩 css
  \icon: 存放图片的
    loading.gif: 加载中png
    mms-logo.png: 朋友圈分享的logo
    mms-mm.png: 默认png
    qr-id.png: 默认png
    title-default.png: 默认png
  \js: js文件夹
    zepto.js: zepto 库主要文件
    event.js: zepto 的事件js
    ajax.js: zepto 的ajax js
    qi.js: 萌萌说 qi.html 的js 
    mms.ingbaobei.com.qi.js:萌萌说 qi.html 的js，开发版本，统一上面四个文件 
    mms.ingbaobei.com.qi.min.js:萌萌说 qi.html 的压缩 js，生产版本，统一上面四个文件
    index.js: 萌萌说 index.html 的js 
    mms.ingbaobei.com.index.js:萌萌说 index.html 的js，开发版本，统一上面四个文件 
    mms.ingbaobei.com.index.min.js:萌萌说 index.html 的压缩 js，生产版本，统一上面四个文件 
  \less:
    normalize.less: 大神的 normalize ，从bootstrap抄下来的。
    qi.less: 萌萌说 qi.html 的css
    index.less: 萌萌说 qi.html 的css
  \theme: 萌萌说主题文件，加紧了主题，就不需要进行每次都进行切图了。
    \1: 主题1。
    \2: 主题2。
    \3: 主题3。
    \4: 主题4。
    \5: 主题5。
      mms.png: 大喇叭的图片。
      qr.png: 二维码的图片。
      theme.js: 主题的配置文件。
  \qi: 每次更新一期萌萌说，都要往里面更新数据啊。
    \latest: 最新版本萌萌说的信息获取的地方，适用于 qi.html 页面， 如果url 为 qi.html?qi=3 之类的就不适用了。
      init.json: 上面文件夹说明一切
    \3: 第三期版本的资源文件
      init.json: 第三期版本的数据文件
      audio.m4a: 第三期版本的 m4a 格式音频
      title.png: 这一期的那个版本png title。
    index.all.json: 暂时还没用到，不过也要写进去
```
##发布一个主题
```
  \mms\theme\
    \主题名
      mms.png: 大喇叭的图片。
      qr.png: 二维码的图片。
      theme.js: 主题文件。
```
以后每次增加主题都需要在这里添加，按照这里的格式以及文件名。
如上的文件格式，发布一个主题。
例如发布 99999 主题。
需要把 99999 主题对应的 ```mms.png``` 和 ```qr.png``` 放进主题文件夹，然后，写一个 ```theme.js```，格式如下：

```
$(function() {
  // 主题编号，一定要对应文件夹名字
  var theme = '5'; 
  // 背景颜色
  var bgc = '#ffcc99'; 

  $('html, body').css({
    "background": bgc
  })
  // 大喇叭
  var $mms = $('#mms-mm');
  $mms[0].src = 'theme/' + theme + '/mms.png';
  $mms.on('error', function() {
    $mms[0].src = 'icon/mms-mm.png';
  })

  // qr图片
  var $qrPng = $('#qr-id');
  $qrPng[0].src = 'theme/' + theme + '/qr.png';
  $qrPng.on('error', function() {
    $qrPng[0].src = 'icon/qr-id.png';
  })
})
```
复制上面代码，改动两个地方，
发布 99999 期，就把 5 改为 99999
```
// 主题编号，一定要对应文件夹名字
var theme = '5'; 
```
改为对应的主题文件夹的名字。如下
```
// 主题编号，一定要对应文件夹名字
var theme = '99999'; 
```
这个主题背景颜色是 #0f0,
```
// 背景颜色
var bgc = '#ffcc99';
```
就把 #ffcc99 改为 #0f0
```
// 背景颜色
var bgc = '#0f0';
```
改为对应的背景颜色值。
然后放在和 ```mms.png``` 和 ```qr.png``` 同一层目录即可。





##发布新一期版本

上面提到的文件架构里面 

```\qi\``` 是用于发布新一期版本的。所以每次发布的时候都在这下面进行发布。每一次发布的期数必须是数字，因为程序里面做了限制。

例如发布第 99999 期版本。首先在 ```\qi\``` 下面创建一个 ```99999``` 的文件夹，然后仿照第三期的文件结构，进行搭建资源，放进以下几个属于新一期萌萌说的资源文件
```
init.json: 第 99999 期版本 的数据文件
audio.mp3: 第 99999 期版本 的 mp3 格式音频
audio.ogg: 第 99999 期版本 的 ogg 格式音频
title.png:  第 99999 期版本 这一期的那个版本png title。
```
特别注意的是：可能不是每一天都进行风格的变动，所以会有一个默认的 风格，就是 ```\icon\``` 里面的那几张 ```png```，是和第三期基本相同的风格来的。所以能够不进行 png 的资源处理。
后面将陆续把不同的风格进行设置进去。
 
发布版本，需要进行 数据文件的修改，就是刚刚 99999 的那个文件夹里面的 ```init.json``` 的数据的修改，改为如下的形式 注意 ```//``` 后面为注释，不要写进去啊啊。

```javascript
{
  "baseUrl": "", // 字段暂时去掉。
  "qi": "99999", // 99999，就是第几期了。
  "theme": "4", // 第几个 主题文件。
  "date": "2014/05/28", // 按照这个格式写版本的发布时间，精确到天，一天发布几个版本的话，没必要精确到几点了。
  "author": "萌萌", // 作者，默认萌萌
  "app": "mms", // app名字，默认 mms
  "title": "爱情那点事儿~", // 这一期的title前缀，每期都不同
  "titleEnd": "萌萌说-盈保倍", // 这一期的title后缀，默认这样子
  "titlePng": "title.png", // 这一期的title 图片，就是上面的那个 title.png 的名字，反正名字你随便修，写进这里能正确访问进行了。 可以不写，会使用 ```icon/title-default.png``` 的默认图片。
  "audios": [
    ["audio/mp4","audio.m4a"],
    ["audio/mpeg","audio.mp3"],
    ["audio/ogg","audio.ogg"]
  ] // 最后就是这个音频了。这个音频为多维数组的形式的，```audios``` 为一个数组，数组长度不知，默认里面的音频数据都需要支持所有移动端浏览器就行了。所以每一个子数组下面，都会有两个值，第一个是 ```audio``` 的 ```type``` 属性值，第二个就是 ```src```路径了。
}
```

写完了这个 ```json``` 文件之后，保存啦。

然后为了统一最新版本的， 把这个最新发布的版本里面的刚刚这个 ```init.json``` 文件复制到 ```qi/latest``` 文件里面，替换原来的，替换之前先备份，不然出错没地方改回来，统一下备份的格式吧，改名改成 ```init.bak.版本号.json```，例如 99999 版本的 是 ```init.bak.99999.json```。。。。。
还有一个地方，需要写进 ```qi/index.all.json``` 里面，后期会用到的。
把这个 json 的最前面，增加一个数据元：
```javascript
{
  "qi": "99999", // 第几期
  "date": "2014/05/28", // 发布时间
  "author": "萌萌", //作者，默认萌萌
  "title": "爱情那点事儿~", // 这一期的主题
  "key":"保险干货"//这一期的分类
}
```

测试吧。看看是否发布了这一期版本。

先运行服务，当然上面已经运行了就不要在跑服务了，反正开不成功
```
anywhere 80
```
然后浏览器会蹦个页面出来对吧，不管他了，访问这里，查看最新版本的
```
http://你的ip/qi.html
```
如果想看特定版本的，例如刚刚的 99999 版本。记得那个 ```qi=99999``` 里面的 ```99999``` 是版本号啊 
```
http://你的ip/qi.html?qi=99999
```

本地测试没问题是吧，有问题，就继续重头回跑过流程吧。没问题了，通过微信客户端打开这个网站，当然这个时候可以登录微信网页版把链接发送到对话窗口就能打开啦。

测试手机都没问题之后，就发布吧。

##发布到主页
刚刚是发布了一起萌萌说了，那在 ```index.html``` 里面没有看到是吧。那就把数据添加进去吧。
打开 ```/mms/qi/index.all.json``` 能看到一大堆的东西是吧。
按照这种格式。
```
{
  "qi": "1",
  "date": "2014/05/26",
  "author": "萌萌",
  "title": "盈保倍",
  "key": "分类"
},
```
把上面的那段东西，改为对应的数据，添加到这个文件的最早一个大括号之前。
其中 字段 ```qi``` 为第几期， 字段 ```date``` 为发布的时间， ```author``` 为那个录音的声音主人，默认萌萌。和那一期版本文件里面的字段需要一致。 ```title``` 就是这一期的主题啦。
写完之后，保存，打开 http://你的ip/index.html 查看效果，如果没看到刷新出来，那么说，上面那段东西写错了个地方了。重来咯。
ok测试成功的话，提交到七牛对应的地址，然后刷新网址就行。

##发布
刚刚本地发布了第 ```99999``` 的萌萌说，然后就发布七牛上吧，让全世界的人都看到。合并到主分支即可。

例如 ```/qi/99999/``` 里面的资源，选择上传，输入前缀 ```/qi/99999/```。
然后覆盖 ```/qi/latest/``` 里面的，记得覆盖之前要删除了，才能覆盖。

最后一步就是清空缓存了。点击 ```空间设置``` -> ```高级设置``` ，缓存刷新 里面有个 ```去刷新``` 这样子一个按钮是吧，点击，文本方式 打开 工程根目录 下面的那个 ```clearcache``` ，复制第一个空行之上的所有东西，黏贴进去，确定，行了。

##查看效果
打开 chrome 或其他浏览器。
关闭所有的 隐私模式 下面的网页，再新打开一个 隐私模式 的网页，chrome 下面快捷键 ``` ctrl + shift + n ``` 就能打开，然后输入
```
http://mms.ingbaobei.com/qi.html?qi=99999
```
打开，就能查看 99999 期的萌萌说。
输入
```
http://mms.ingbaobei.com/qi.html
```
打开，就能查看 最新一期 的萌萌说。 [最新一期掐这里](http://mms.ingbaobei.com/qi.html)  
没啥错误的话，就可以了。如果有错误。那就只能重新发布了。肯定是操作失误就对了。

##提交版本
效果算是查看完毕了，那就 提交版本吧。把这个提交到github上面，管理员会做事的了。至于怎么提交，这个见仁见智，反正 git 这个工具，基本都懂，不同平台，都不同。


##怎么开发这个？
项目的 css 采用的是 less 编写，使用 [koala](http://koala-app.com/) 进行编译。min 版本使用 grunt 压缩，
然后 js 是使用 grunt 进行 构建的，开发版本可以使用单独的 js 引入进行开发。
生产版本必须安装环境，然后构建。
安装环境
1、nodejs
2、npm
3、cnpm
然后，``` cnpm install ```
最后大刀下去
``` grunt ``` 即可。 ```Gruntfile.js``` 里面已经写好了 ```default``` 任务了。



##如何获取远程主分支的代码。
参考下面的几个步骤，如果有存在冲突，必须在合并完之后先进行冲突后再提交。
一下为指令：
```
git remote -v r-1

git fetch r-1

git merge r-1/master

git status
```


##版本：

v2.1.0
增加菜单和搜索功能。
菜单：home，保险干货，热点聚焦，独家视角

v2.0.0
转移到本地服务器，七牛只用于音频加速。

以下版本都没记录，大概说明下

v1.1.0
发布 index.html.

v1.0.0
发布 qi.html .