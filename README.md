# minishop

> A Vue.js project

## 项目截图

![](https://raw.githubusercontent.com/suzhenhui/MyPicture/master/minishop/1.jpg)

## 技术栈

- **前端**：移动端，vue全家桶，mint-ui，Scss

- **后端**：Node，Express框架
- **数据库**：Mysql

## 项目构建
### 前端
前端在`vue-cli3`基础上开发，前端代码在`view/`文件夹中 

**移动端适配**: 使用vw实现移动端适配，借助Vue官网提供的构建工程以及一些PostCSS插件来完成。

**请求拦截器**：在`view/src/server/network`中，基于`axios`提供的`interceptors`对所有ajax的请求和响应添加相应操作，如请求头添加，token添加，响应后台错误状态码的识别与报错；简单封装了下axios请求，主要为get，post两种。

**css样式**：在`view/src/assets/style/`中，全局公共样式，初始化样式。

**模块化**：对路由与vuex做模块化封装。

### 后端
- 使用`Node`的`express`框架，连接`Mysql`数据库，做数据接口开发，数据的增删改查与简单封装。
- 利用Multer中间件处理上传的图片

## 传送门

url: http://szh.zjchuanbo.com

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
