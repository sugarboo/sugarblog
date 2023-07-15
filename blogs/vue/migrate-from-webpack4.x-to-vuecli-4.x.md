---
title: Vue 2.x 项目脚手架升级（二）：从 Webpack 4.x 迁移至 vue-cli 4.x
date: '2023-07-14 18:00:00'
sidebar: 'auto'
categories:
 - vue
tags:
 - vue
publish: true
---

## 第一步：更新依赖包版本，去除冗余依赖包

因为 `vue-cli` 已经内置了 `webpack`，所以项目中原有的 Webpack 相关依赖包，以及不必要的插件等等，都可以去除掉。

借此机会，也将该项目中原使用的已废弃的 `node-sass` 依赖包，替换为 `sass` 依赖包（即 `dart-sass` 库），并顺便清理了一些没有被引用的依赖包。

`vue-cli` 的 4.0+ 版本有以下几点注意事项：

1. 需要依赖 `core-js` ，此处选择安装了 `core-js 3.x` 的版本；
2. 使用 `vue-cli` 作为项目脚手架时，需要依赖 `vue-template-compiler` 这个库，且版本号应与 `dependencies` 中 `vue` 的版本号一致；
3. 若 `sass-loader` 安装的版本太高，启动 dev server 时会出现：`Error: PostCSS plugin autoprefixer requires PostCSS 8. Update PostCSS or downgrade this plugin` 的错误提示。此处选择安装 `sass-loader 8.x` 的版本后可以避免此错误；
4. `vue-cli` 脚手架已经内置了 `postcss` 和 `autoprefixer` 依赖库，无需重复安装。

```shell
# dependencies
npm i core-js@3
npm uninstall ajv
npm uninstall autoprefixer
npm uninstall babel-plugin-component
npm uninstall babel-polyfill
npm uninstall es6-promise
npm uninstall prettier
npm uninstall save
npm uninstall vconsole

# devDependencies
npm i @babel/core@7 -D
npm i @babel/register@7 -D
npm i @vue/cli-plugin-babel@4 -D
npm i @vue/cli-service@4 -D
npm i babel-plugin-component -D
npm i sass -D
npm i sass-loader@8 -D
npm i vue-template-compiler@2.6.14 -D
npm uninstall babel-core
npm uninstall babel-plugin-transform-runtime
npm uninstall babel-preset-stage-2
npm uninstall babel-register
npm uninstall babel-loader
npm uninstall connect-history-api-fallback
npm uninstall copy-webpack-plugin
npm uninstall css-loader
npm uninstall eventsource-polyfill
npm uninstall express
npm uninstall file-loader
npm uninstall friendly-errors-webpack-plugin
npm uninstall html-webpack-plugin
npm uninstall http-proxy-middleware
npm uninstall mini-css-extract-plugin
npm uninstall node-sass
npm uninstall opn
npm uninstall optimize-css-assets-webpack-plugin
npm uninstall ora
npm uninstall portfinder
npm uninstall rimraf
npm uninstall script-ext-html-webpack-plugin
npm uninstall semver
npm uninstall shelljs
npm uninstall uglifyjs-webpack-plugin
npm uninstall url-loader
npm uninstall vue-loader
npm uninstall vue-style-loader
npm uninstall vue-template-compiler
npm uninstall webpack
npm uninstall webpack-bundle-analyzer
npm uninstall webpack-cli
npm uninstall webpack-dev-middleware
npm uninstall webpack-hot-middleware
npm uninstall webpack-merge

```

## 第二步：清理原 Webpack 的打包配置项目文件

项目中原有的 Webpack 的打包配置项目文件，即 `build` 和 `config` 目录下的所有文件，直接删除即可。


## 第三步：添加 `vue-cli` 配置文件：`vue.config.js`

换用 `vue-cli` 作为项目脚手架后，原 dev server、打包相关等的配置需要在 `vue.config.js` 中实现。

```js
"use strict";
const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

const name = "title"; // page title
const port = 8888; // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  publicPath: "/",
  outputDir: "dist",
  assetsDir: "static",
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true,
    },
    proxy: {
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      "/devApi": {
        target: "http://foo.bar.dev", // 接口的域名
        changeOrigin: true,
        pathRewrite: {
          "/devApi": "",
        },
      },
    },
    after(app) {
      require("@babel/register");
      const bodyParser = require("body-parser");

      // parse app.body
      // http://expressjs.com/en/4x/api.html#req.body
      app.use(bodyParser.json());
      app.use(
        bodyParser.urlencoded({
          extended: true,
        })
      );
    },
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        "@": resolve("src"),
      },
    },
  },
  chainWebpack(config) {
    config.plugins.delete("preload"); // TODO: need test
    config.plugins.delete("prefetch"); // TODO: need test

    // set preserveWhitespace
    config.module
      .rule("vue")
      .use("vue-loader")
      .loader("vue-loader")
      .tap((options) => {
        options.compilerOptions.preserveWhitespace = true;
        return options;
      })
      .end();

    config.when(process.env.NODE_ENV === "development", (config) =>
      config.devtool("cheap-source-map")
    );

    config.when(process.env.NODE_ENV !== "development", (config) => {
      config.optimization.splitChunks({
        chunks: "all",
        cacheGroups: {
          libs: {
            name: "chunk-libs",
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: "initial", // only package third parties that are initially dependent
          },
          // elementUI: {
          //   name: 'chunk-elementUI', // split elementUI into a single package
          //   priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
          //   test: /[\\/]node_modules[\\/]element-ui[\\/]/
          // },
          commons: {
            name: "chunk-commons",
            test: resolve("src/components"), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      });
      config.optimization.runtimeChunk("single");
    });
  },
};

```

## 第四步：更新 `package.json` 中的脚本命令

换用 `vue-cli` 作为项目脚手架后，需要将原 Webpack 的脚本命令替换为 `vue-cli` 的脚本命令。

```json
// package.json

// ...
"scripts": {
  "dev": "vue-cli-service serve",
  "start": "npm run dev",
  "prod": "vue-cli-service build --mode production",
  "test": "vue-cli-service build --mode test"
},
// ...

```

## 第五步：添加 node 环境变量声明文件

使用 `vue-cli` 作为脚手架的项目，可以添加文件名格式为：`env.[mode]` 的 node 环境变量声明文件，用于区分各环境的 `node.process.env`、`base api` 等配置。例如：

```shell
# .env.development

# just a flag
ENV = 'development'

# base api
# VUE_APP_BASE_API = '/dev-api'

```

## 第六步：添加 `babel.config.js` 以代替原 `.babelrc`

把 `babel` 升级到 7.0+ 版本后，可以添加 `babel.config.js` 来代替原有的 `.babelrc` 配置文件，配置项与原 `.babelrc` 文件中的类似。添加完成后，原 `.babelrc` 文件可以删除掉。

```js
// babel.config.js
module.exports = {
  presets: [
    // https://github.com/vuejs/vue-cli/tree/master/packages/@vue/babel-preset-app
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    [
      "import",
      {
        libraryName: "vant",
        libraryDirectory: "es",
        style: true,
      },
      "vant",
    ],
    [
      "component",
      {
        libraryName: "element-ui",
        styleLibraryName: "theme-chalk",
      },
      "element-ui",
    ],
  ],
};

```

## 第七步：挂载 Vue 示例

换用 `vue-cli` 作为项目脚手架后，`src/main.js` 中挂载 Vue 示例的逻辑代码会失效，需要换用新写法。

```js
// src/main.js

// ...

/* old */
new Vue({
  el: "#app",
  router,
  store,
  template: "<App/>",
  components: { App },
});


/* new */
new Vue({
  render: (h) => h(App),
  store,
  router,
  components: { App },
}).$mount("#app");

```

## 第八步：绑定 jQuery

由于该项目用到了 `jQuery` 库，并在原 webpack 配置文件中绑定了 `$` 作为全局变量以便于调用 `jQuery` 库的 API。但是，在进行第二步操作时，该文件已被删除。故需要在 `src/main.js` 实现类似绑定，以确保原有功能的正常运行。

```js
// src/main.js

// ...
// 绑定 jquery
window.$ = window.jQuery = require('jquery');

// ...

```

## 第九步：全局替换 css 深度选择器修饰符：`/deep/` -> `::v-deep`

`vue-cli` 4.0+ 的版本，深度选择器的修饰符需要改为 `::v-deep`。

## 第十步：静态文件

将原项目中的静态文件，如 `index.html` 等，移动至 `public/*` 目录下。

## References

> [Overview | Vue CLI](https://v4.cli.vuejs.org/guide/)

> [[release] 4.0.0 (#1291) · PanJiaChen/vue-element-admin@b94e69b](https://github.com/PanJiaChen/vue-element-admin/commit/b94e69be6f9a5cb42741c77c5039bdf7eb155add)
