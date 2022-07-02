# pupublog(vue2+koa2+mysql)

## 前言

一直想拥有一个属于自己的博客网站，用来总结自己的学习心得，因为发现自己记性不好，知识学完就忘，并且学到的知识不成体系，东一块西一块，这样就导致了，当每次间隔一段时间不用某个技术时，都需要重学一遍（其实学习就是个重复的过程，这种现象也很正常）。

那么既然有了想法，就开始行动起来...

- 项目调研

  当在`github`和`gitee`搜索使用`express`或者`koa`开发的博客项目时，发现都只是很简单的一些demo，并且年代很久远，所以最终决定参考一个`java`的博客项目：[蘑菇博客](https://gitee.com/moxi159753/mogu_blog_v2)，（PS：文档写的简直是太nice了，并且作者非常励志和耐心，在蘑菇博客的交流群里问了很多问题都帮忙解决了，很是感谢，`java`方向的可以学习一下。）

  另外在实现管理端时，还参考了另外一个项目，[smart-admin](https://gitee.com/lab1024/smart-admin?_from=gitee_search)，是由1024实验室团队开发的一套互联网企业级的通用型中后台解决方案，后端也是用java写的，不过我主要参考的是前端代码（PS：写的是太好了，各种vue2的高级用法，非常推荐学前端的同学好好学习一下这个项目）。

  当把所有的运行环境在本地安装好，项目成功跑起后，就开始了我的改造之旅...

  最终目标：前端和后台管理端参考蘑菇博客的UI，代码书写风格参考smart-admin，自己重零设计实现一遍；将`java`写的后台服务改造为`node`，使用koa2来自己搭建后台，数据库使用mysql；

- 技术选型

  最终的技术选型为：

  | 名称                                       | 技术选型 |
  | ------------------------------------------ | -------- |
  | 前台和管理端`vue-blog-web``vue-blog-amdin` | vue2     |
  | 后台服务`koa-blog-service`                 | koa2     |
  | 数据库                                     | mysql    |
  
  于是就有了`pupublog`，一个`vue2+koa2+mysql`实现的单人博客项目
  
  具体的项目细节文档，正在补充，敬请期待
  
  （PS：前端无论是使用`react`还是`vue`，后端无论是`express`或者`koa2`或者`egg`等等，其实都是可以的，选择一个做下去就行了，做来做去发现前端最重要的还是基础。做这样一个项目也是为了体验一下从零开发一个项目的感受，然后部署上线、写文档，开源，这样一个过程，虽然花费了很多时间，但是最后也收获了很多，后期会继续完善的，欢迎大家提issure和留言评论，如哪里有错误的地方，也欢迎指正，让我们共同进步💪）

## 项目亮点

- 博客参考[蘑菇博客](https://gitee.com/moxi159753/mogu_blog_v2?_from=gitee_search)的UI，重构前后台页面，前端代码编写风格以及目录结构参考[smart-admin](https://gitee.com/lab1024/smart-admin?_from=gitee_search)。

  基于vue2-cli脚手架，从零构建项目。对axios进行二次封装，使用mixin对公共模块代码抽离，使用keep-alive组件对路由进行缓存，优化性能，使用路由守卫对错误地址进行拦截，使用vuex对全局状态管理，合理的使用cookie、localStorage、indexDb本地缓存实现功能开发，遵循高内聚低耦合的特点封装组件，模块与路由命名达到见名知意，复杂页面逻辑都有注释。

- 仿照[Gitee](https://gitee.com/hrbust_cheny/pupu_blog)，重写了留言和评论组件。

  支持emoji回复，留言审核，留言举报，留言点赞，留言删除（管理员对所有留言具有删除权限）。当留言审核未通过时，仅自己可见（避免非法输入）。

- 仿照[掘金](https://juejin.cn/)，重写了文章目录组件。 

  根据HTML文章文档，自动生成文章目录，支持点击标题目录跳转到指定位置处，并高亮显示。支持滑动高亮 （会判断当前滑动位置，高亮对应标题）

- 仿照[现代JavaScript教程](https://zh.javascript.info/)的目录样式，重写了专题模块。

- 仿照[掘金](https://juejin.cn/)登录，重写了登录模块，现已支持Gitee登录和QQ登录。

  点击按钮会在页面新打开窗口，当登录成功后，窗口自动关闭。通过window.opener.postMessage实现跨窗口通信，获取token。

- 为了满足业务需求，使用koa2重写了后台接口，从零搭建后台项目工程。

  良好的目录结构，目录层级为，router（后端路由）->controller（参数接收和返回前台数据）->validation（参数校验）->service（业务逻辑）->dao（操作数据库）->sql（各模块的sql语句） 

- 为了提高接口和后台页面开发效率，自定义代码生成器 

  用代码去写代码，减少重复工作，提高准确率，只需编写关键逻辑代码即可。开发效率大幅度提高，从三天一个模块（增删改查+分页，前台页面和后台接口），缩短为十分钟。 

  代码生成器执行逻辑如下：

  1. 在package.json编写script脚本，npm run add 执行生成器入口文件。 
  2. 通过fs.readline，逐行解析导出的数据库文件xxx.sql，解析成json对象。 
  3. 通过第三方包inquirer，从控制台接收输入参数，与解析器交互。输入包括：新创建的模块名称，需要操作的数据表，前台代码生成位置 
  4. 读取定义好的模板，通过输入的参数和基础数据，将模板替换成正确的代码，然后分别写入各自的文件目录下

- 支持Markdown编辑，使用的[vditor](https://b3log.org/vditor/)第三方库

- 支持文档的导入导出（md格式）

- 支持图片上传

- 等等等等

## 技术使用

- 前端`vue2`

    | 技术                | 说明                                                         | 官网                                                         |
    | ------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
    | vue@2.5.2           | 前端页面开发                                                 | [https://cn.vuejs.org/v2/guide/](https://cn.vuejs.org/v2/guide/) |
    | axios@0.21.1        | 向后端发送数据请求工具                                       | [https://github.com/axios/axios](https://github.com/axios/axios) |
    | dayjs@1.10.5        | 时间转换工具                                                 | [https://dayjs.fenxianglu.cn/category/](https://dayjs.fenxianglu.cn/category/) |
    | element-ui@2.15.1   | 前端组件库                                                   | [https://element.eleme.cn/#/zh-CN/component/installation](https://element.eleme.cn/#/zh-CN/component/installation) |
    | js-cookie@3.0.1     | 轻量处理cookies工具                                          | [https://github.com/js-cookie/js-cookie](https://github.com/js-cookie/js-cookie) |
    | nprogress@0.2.0     | 顶部页面加载进度条工具                                       | [https://github.com/rstacruz/nprogress](https://github.com/rstacruz/nprogress) |
    | vue-fragment@1.5.2  | 类似于小程序的`block`标签，不会渲染到页面中，辅助渲工具      | [https://github.com/Thunberg087/vue-fragment](https://github.com/Thunberg087/vue-fragment) |
    | vue-router@3.0.1    | vue前端路由                                                  | [https://router.vuejs.org/zh/installation.html](https://router.vuejs.org/zh/installation.html) |
    | vuex@3.6.2          | vue全局状态管理                                              | [https://vuex.vuejs.org/zh/](https://vuex.vuejs.org/zh/)     |
    | echarts@4.2.1       | 可视化图标库                                                 | [https://echarts.apache.org/zh/index.html](https://echarts.apache.org/zh/index.html) |
    | vditor@3.8.5        | 一款浏览器端的 Markdown 编辑器，支持所见即所得（富文本）、即时渲染（类似 Typora）和分屏预览模式 | [https://ld246.com/article/1549638745630](https://ld246.com/article/1549638745630) |
    | node-sass@4.14.1    | 将.scss转换为css工具                                         | [https://github.com/sass/node-sass](https://github.com/sass/node-sass) |
    | sass-loader@7.3.1   | node-sass的依赖，版本号必须对应                              | [https://github.com/webpack-contrib/sass-loader](https://github.com/webpack-contrib/sass-loader) |
    | webpack@4.16.5      | 强大的打包工具                                               | [https://webpack.docschina.org/concepts/](https://webpack.docschina.org/concepts/) |
    | dexie.js            | `IndexedDB`的包装工具，简化`IndexedDB`的原生api              | [https://dexie.org/docs/Tutorial/Getting-started](https://dexie.org/docs/Tutorial/Getting-started) |
    | highlight           | 前端代码高亮                                                 | [https://highlightjs.org/usage/](https://highlightjs.org/usage/) |
    | vuedraggable@2.24.3 | 前端拖拽组件                                                 | [https://github.com/SortableJS/Vue.Draggable](https://github.com/SortableJS/Vue.Draggable) |

- 后端`koa2`

    | 技术               | 说明                                                         | 官网                                                         |
    | ------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
    | koa2@2.0.0-alpha.7 | 一款基于nodejs的web开发框架，开发后台服务使用                | [https://koa.bootcss.com/](https://koa.bootcss.com/)         |
    | axios@0.21.4       | 后台向第三方发送请求，比如第三方登录的时候使用               | [https://github.com/axios/axios](https://github.com/axios/axios) |
    | bcryptjs@2.4.3     | 密码加密工具，存入数据库的密码是hash值                       | [https://github.com/dcodeIO/bcrypt.js](https://github.com/dcodeIO/bcrypt.js) |
    | dayjs@1.10.5       | 时间转换工具                                                 | [https://dayjs.fenxianglu.cn/category/](https://dayjs.fenxianglu.cn/category/) |
    | ejs@3.1.6          | 模板引擎，将.ejs文件解析为html                               | [https://ejs.co/#docs](https://ejs.co/#docs)                 |
    | jsonwebtoken@8.5.1 | JWT认证，将用户信息解析成token串，返回给前台，后台通过用户携带的token来识别用户，用户后台登录 | [https://github.com/auth0/node-jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) |
    | jszip@3.7.1        | 后台将查询的数据解析成zip包，前台通过a标签直接下载           | [https://stuk.github.io/jszip/](https://stuk.github.io/jszip/) |
    | koa-body@4.2.0     | koa接收post参数中间件，也可以接收前台上传的文件              | [https://github.com/koajs/koa-body](https://github.com/koajs/koa-body) |
    | koa-passport@4.1.4 | koa拦截器中间件，可以对需要登录才能访问的接口进行拦截，搭配`passport-jwt`使用 | [https://github.com/rkusa/koa-passport](https://github.com/rkusa/koa-passport) |
    | passport-jwt@4.0.0 | 拦截路由，解析token中间件                                    | [https://github.com/mikenicholson/passport-jwt](https://github.com/mikenicholson/passport-jwt) |
    | koa-router@10.0.0  | 后台接口路由中间件                                           | [https://github.com/koajs/router/blob/master/API.md](https://github.com/koajs/router/blob/master/API.md) |
    | koa-static@5.0.0   | 暴露项目文件夹中的文件供外部访问                             | [https://github.com/koajs/static](https://github.com/koajs/static) |
    | koa-views@7.0.1    | 模板渲染中间件                                               | [https://github.com/queckezz/koa-views](https://github.com/queckezz/koa-views) |
    | koa2-cors@2.0.6    | 配置跨域                                                     | [https://github.com/zadzbw/koa2-cors](https://github.com/zadzbw/koa2-cors) |
    | log4js@6.3.0       | 日志中间件                                                   | [https://github.com/log4js-node/log4js-node](https://github.com/log4js-node/log4js-node) |
    | marked@2.1.3       | md转换为html，导入文章时使用，存在数据库的是html格式的字符串 | [https://marked.js.org/#usage](https://marked.js.org/#usage) |
    | mysql@2.18.1       | 数据库操作                                                   | [https://github.com/mysqljs/mysql](https://github.com/mysqljs/mysql) |
    | turndown@7.1.1     | html转换为md格式，导出的文章是md文件                         | [https://github.com/mixmark-io/turndown](https://github.com/mixmark-io/turndown) |
    | uuid@8.3.2         | 生成唯一的字符串，用作数据库的主键id                         | [https://github.com/uuidjs/uuid](https://github.com/uuidjs/uuid) |


## 演示环境

阿里云：`CentOS 7.9 64位` `2核 2 GB` `40GB云盘` `2MB带宽`

> 演示前端：http://8.141.57.223:20518/
>
> 演示后端：http://8.141.57.223:20519/
>
> 演示账号`admin`，密码`123123`

## 线上地址

[http://bnbiye.cn](http://bnbiye.cn)

## 目录说明

```shell
|-pupublog 仓库克隆下来的跟目录
	|-code-build  代码生成器，一键生成接口代码和管理端代码
	|-koa-blog-service 服务端
	|-vue-blog-admin 博客后台管理端
	|-vue-blog-web 博客前端
```

## 环境搭建

### 开发工具

| 工具               | 说明                     | 官网                                                         |
| ------------------ | ------------------------ | ------------------------------------------------------------ |
| Visual Studio Code | 前端和node服务端开发工具 | [https://code.visualstudio.com/](https://code.visualstudio.com/) |
| Webstorm           | 前端和node服务端开发工具 | [https://www.jetbrains.com/webstorm/](https://www.jetbrains.com/webstorm/) |
| Navicat            | 数据库连接工具           | [https://www.navicat.com.cn/](https://www.navicat.com.cn/)   |
| SQLyog             | 数据库连接工具           | [https://webyog.com/](https://webyog.com/)                   |

> tip：`Vscode`或者`Webstorm`用哪个都行，看个人习惯，`Navicat`和`SQLyog`也是一样，选择一个自己喜欢的使用
>
> `Vscode`或者`Webstorm`我都会用，数据库连接工具我比较习惯`Navicat`

### 开发环境

| 工具   | 版本号  | 下载                                                         |
| ------ | ------- | ------------------------------------------------------------ |
| nodejs | 14.16.1 | [https://nodejs.org/en/](https://nodejs.org/en/)             |
| mysql  | 5.7.19  | [https://downloads.mysql.com/archives/community/](https://downloads.mysql.com/archives/community/) |

## 本地运行

1. 克隆仓库`git clone https://gitee.com/hrbust_cheny/pupu_blog.git `

2. 本地安装`mysql`数据库

3. 使用`Navicat`连接本地数据库，新建数据库`pupublog`，然后导入数据库文件`pupublog.sql`（tip：数据库文件存放在`/koa-blog-service/`目录下）

4. 执行下面的`sql`语句，新建管理员用户

   ```sql
   delete from t_admin_user where uid = '-1';
   insert into t_admin_user( uid, user_name, user_password, order_num, create_time, update_time ) values ('-1','admin','$2a$10$2veC0JLAmmOavUlyyDN25.3vRix0nyH9Vf5lAcI8DRyQgKGnQBKVG',-1,localtime(),localtime());
   -- 创建了一个账号为admin的用户，密码是123123
   ```

5. 运行服务端`koa-blog-service`

   ```shell
   ## 进入到 koa-blog-service 目录下，安装依赖 /pupublog/koa-blog-service
   npm install --registry=https://registry.npm.taobao.org
   ## 全局安装 supervisor，文件变更会自动重启node服务
   npm install -g supervisor
   ## 启动node服务
   npm run dev
   ```

   记得更改`/koa-blog-service/src/constant/config.js`文件中的配置

   ```js
   // /koa-blog-service/src/constant/config.js
   // mysql配置
   const database = {
       host: 'localhost', // 连接的服务器
       port: 3306, // mysql服务运行的端口
       database: 'pupublog', // 连接的数据库
       user: 'root', // 你数据库的用户名
       password: 'xxx' //数据库密码
   }
   /**
    * 1、如果是本地运行
    *  http://localhost:20517
    * 2、如果是部署到服务器，正式生产环境
    *  http://你的ip:20517 或者是你的域名
    * 
    */
   const baseUrl = 'http://localhost:20517'
   /**
    * Gitee第三方登录的相关参数
    */
   const giteeLogin = {
       client_id: '你自己申请的客户id',
       client_secret: '你自己申请的密钥',
       expires: 3600, // token默认过期时间，单位是秒 3600s就是一小时
   }
   ```

6. 运行管理端`vue-blog-admin`

   ```shell
   ## 进入到 vue-blog-admin 目录下，安装依赖 /pupublog/vue-blog-admin
   npm install --registry=https://registry.npm.taobao.org
   ## 启动管理端项目
   npm run dev
   ```

7. 运行前端`vue-blog-web`

   ```shell
   ## 进入到 vue-blog-web 目录下，安装依赖 /pupublog/vue-blog-web
   npm install --registry=https://registry.npm.taobao.org
   ## 启动管理端项目
   npm run dev
   ```

## 最后

本人是一年开发经验的小前端，项目是在空闲时间完成的，后期还会慢慢完善功能，目前先暂停一阵，备战面试，加油加油💪

## 网站部分截图

![image-20211019151848001](README/image-20211019151848001.png)

![image-20211019151910556](README/image-20211019151910556.png)

![image-20211019151928688](README/image-20211019151928688.png)

![image-20211019151939859](README/image-20211019151939859.png)

![image-20211019151951221](README/image-20211019151951221.png)

![image-20211019152005304](README/image-20211019152005304.png)

![image-20211019152012305](README/image-20211019152012305.png)

![image-20211019152055054](README/image-20211019152055054.png)

![image-20211019152132390](README/image-20211019152132390.png)

![image-20211019152141653](README/image-20211019152141653.png)

![image-20211019152200418](README/image-20211019152200418.png)

![image-20211019152212758](README/image-20211019152212758.png)

![image-20211019152225550](README/image-20211019152225550.png)

![image-20211019152247541](README/image-20211019152247541.png)

![image-20211019152309534](README/image-20211019152309534.png)

![image-20211019152334933](README/image-20211019152334933.png)

![image-20211019153033135](README/image-20211019153033135.png)

