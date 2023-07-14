---
publish: false
---

# CLI migration: update webpack 4.x to vue-cli

## Commits
[build(cli): update to @vue/cli 3.x](https://codeup.aliyun.com/642f90e6bff3b5aa545628c1/miaocangchina/miaocang-h5/commit/e50884dc51b4bdae51a411e45c12b9e2fe439843?branch=cli_vuecli)

[build(cli): update to @vue/cli 4.x](https://codeup.aliyun.com/642f90e6bff3b5aa545628c1/miaocangchina/miaocang-h5/commit/3a2c0276c1ef21618a12bdad3711bf7b320fab7c?branch=cli_vuecli)

## File Changes

### package.json

```shell
# dependencies
npm i core-js@3
npm uninstall ajv
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
npm i autoprefixer@9 -D
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

### build/* , config/*

delete these two directories.

### add environment variables specification files: .env[mode]

```
.env.production
.env.test
.env.development
```

### add babel.config.js

```js
module.exports = {
  presets: [
    '@vue/app'
  ]
}
```

### add vue.config.js

```js
"use strict";
const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

const name = "苗仓"; // page title
const port = 8090; // dev port

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
      "/newApi": {
        target: "http://mcapitest.miaocang.cc", // 接口的域名
        changeOrigin: true,
        pathRewrite: {
          "/newApi": "",
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
      config
        .plugin("ScriptExtHtmlWebpackPlugin")
        .after("html")
        .use("script-ext-html-webpack-plugin", [
          {
            // `runtime` must same as runtimeChunk name. default is `runtime`
            inline: /runtime\..*\.js$/,
          },
        ])
        .end();
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

### package.json
```json
// ...
"scripts": {
  "dev": "vue-cli-service serve",
  "start": "npm run dev",
  "prod": "vue-cli-service build --mode production",
  "test": "vue-cli-service build --mode test"
},
// ...

```

### src/main.js

```js
// 绑定 jquery
window.$ = window.jQuery = require('jquery');

```

### index.html -> public/index.html

## References