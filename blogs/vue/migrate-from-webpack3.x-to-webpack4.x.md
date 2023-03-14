---
title: Vue 2 远古项目升级：从 Webpack3.x 迁移至 Webpack 4.x
date: '2023-03-14 23:00:00'
sidebar: 'auto'
categories:
 - vue
tags:
 - vue
publish: false
---

## 背景

公司现有的一个移动端H5项目，其中的Vue 环境基础依赖包至今一直没有进行过升级，仍然是基于 `Webpack 3.x` 的 `vue-webpack-template` 基础环境搭建的，并且还用着更让人抓狂的 `node-sass` 库（在Windows环境下，必须安装并配置 `Python 2.x` 环境才能正常使用，否则项目永远无法成功安装依赖包并跑起来！）。忍无可忍的我终于下定决心：给该项目的 Vue 基础环境升级来一次彻底的升级。

## 参考

升级的第一步是：将老掉牙的 `Webpack 3.x` 升级到 `Webpack 4.x` 版本。这里我参考了著名的 `Vue 2.x` 开源项目： `vue-element-admin` 的升级步骤。
> [update to webpack4 (#889) · PanJiaChen/vue-element-admin@378ca2c](https://github.com/PanJiaChen/vue-element-admin/commit/378ca2c217f94d3f31e2518116708092ee06f95c)

## 第一步

对照 `vue-element-admin` 的 `package.json` 文件，修改当前项目的 `package.json` 文件。

**old**
```json
{
  "name": "h5-2",
  "version": "1.0.0",
  "description": "A Vue.js project",
  "author": "",
  "private": true,
  "scripts": {
    "dev": "node build/dev-server.js",
    "start": "npm run dev",
    "prod": "node build/build.js",
    "test": "node build/test.js"
  },
  "dependencies": {
    "ajv": "^6.2.1",
    "axios": "^0.19.0",
    "babel-plugin-component": "^1.1.1",
    "babel-polyfill": "^6.26.0",
    "better-scroll": "^1.15.2",
    "element-resize-detector": "^1.2.1",
    "element-ui": "2.13.0",
    "es6-promise": "^4.2.8",
    "html2canvas": "^1.0.0-rc.1",
    "jquery": "^3.5.1",
    "mint-ui": "^2.2.9",
    "multifunctional-datepicker": "^1.0.3",
    "prettier": "2.0.5",
    "save": "^2.4.0",
    "vant": "^2.10.14",
    "vconsole": "^3.3.4",
    "video.js": "^7.6.0",
    "videojs-contrib-hls": "^5.15.0",
    "vue": "^2.5.2",
    "vue-meta-info": "^0.1.1",
    "vue-router": "^3.2.0",
    "vue-slider-component": "^2.4.4",
    "vuex": "^3.1.1"
  },
  "devDependencies": {
    "autoprefixer": "^7.1.2",
    "babel-core": "^6.22.1",
    "babel-loader": "^7.1.1",
    "babel-plugin-import": "^1.13.1",
    "babel-plugin-transform-runtime": "^6.22.0",
    "babel-preset-env": "^1.3.2",
    "babel-preset-stage-2": "^6.22.0",
    "babel-register": "^6.22.0",
    "chalk": "^2.0.1",
    "connect-history-api-fallback": "^1.3.0",
    "copy-webpack-plugin": "^4.0.1",
    "css-loader": "^0.28.0",
    "eventsource-polyfill": "^0.9.6",
    "express": "^4.14.1",
    "extract-text-webpack-plugin": "^3.0.0",
    "file-loader": "^1.1.4",
    "friendly-errors-webpack-plugin": "^1.6.1",
    "html-webpack-plugin": "^2.30.1",
    "http-proxy-middleware": "^0.20.0",
    "node-sass": "^4.14.1",
    "opn": "^5.1.0",
    "optimize-css-assets-webpack-plugin": "^3.2.0",
    "ora": "^1.2.0",
    "portfinder": "^1.0.13",
    "rimraf": "^2.6.0",
    "sass-loader": "^6.0.6",
    "semver": "^5.3.0",
    "shelljs": "^0.7.6",
    "url-loader": "^0.5.8",
    "vue-loader": "^13.3.0",
    "vue-style-loader": "^3.0.1",
    "vue-template-compiler": "^2.5.2",
    "webpack": "^3.6.0",
    "webpack-bundle-analyzer": "^2.9.1",
    "webpack-dev-middleware": "^1.12.0",
    "webpack-hot-middleware": "^2.18.2",
    "webpack-merge": "^4.1.0"
  },
  "engines": {
    "node": ">= 4.0.0",
    "npm": ">= 3.0.0"
  },
  "browserslist": [
    "> 1%",
    "last 2 versions",
    "not ie <= 8"
  ]
}

```

**new**
```json
{
  "name": "h5-2",
  "version": "1.0.0",
  "description": "A Vue.js project",
  "author": "",
  "private": true,
  "scripts": {
    "dev": "node build/dev-server.js",
    "start": "npm run dev",
    "prod": "node build/build.js",
    "test": "node build/test.js"
  },
  "dependencies": {
    "ajv": "^6.2.1",
    "axios": "^0.19.0",
    "babel-plugin-component": "^1.1.1",
    "babel-polyfill": "^6.26.0",
    "better-scroll": "^1.15.2",
    "element-resize-detector": "^1.2.1",
    "element-ui": "2.13.0",
    "es6-promise": "^4.2.8",
    "html2canvas": "^1.0.0-rc.1",
    "jquery": "^3.5.1",
    "mint-ui": "^2.2.9",
    "multifunctional-datepicker": "^1.0.3",
    "prettier": "2.0.5",
    "save": "^2.4.0",
    "vant": "^2.10.14",
    "vconsole": "^3.3.4",
    "video.js": "^7.6.0",
    "videojs-contrib-hls": "^5.15.0",
    "vue": "^2.5.10",
    "vue-meta-info": "^0.1.1",
    "vue-router": "^3.2.0",
    "vue-slider-component": "^2.4.4",
    "vuex": "^3.1.1"
  },
  "devDependencies": {
    "autoprefixer": "^8.5.0",
    "babel-core": "^6.22.1",
    "babel-loader": "^7.1.5",
    "babel-plugin-import": "^1.13.1",
    "babel-plugin-transform-runtime": "^6.23.0",
    "babel-preset-env": "^1.7.0",
    "babel-preset-stage-2": "^6.22.0",
    "babel-register": "^6.22.0",
    "chalk": "^2.4.1",
    "connect-history-api-fallback": "^1.3.0",
    "copy-webpack-plugin": "^4.5.2",
    "css-loader": "^1.0.0",
    "eventsource-polyfill": "^0.9.6",
    "express": "^4.14.1",
    "file-loader": "^1.1.11",
    "friendly-errors-webpack-plugin": "^1.7.0",
    "html-webpack-plugin": "^4.0.0",
    "http-proxy-middleware": "^0.20.0",
    "mini-css-extract-plugin": "^0.4.1",
    "node-sass": "^4.14.1",
    "opn": "^5.1.0",
    "optimize-css-assets-webpack-plugin": "^5.0.0",
    "ora": "^3.0.0",
    "portfinder": "^1.0.13",
    "rimraf": "^2.6.0",
    "sass-loader": "^7.0.3",
    "script-ext-html-webpack-plugin": "^2.0.1",
    "semver": "^5.5.0",
    "shelljs": "^0.8.2",
    "uglifyjs-webpack-plugin": "^1.2.7",
    "url-loader": "^1.0.1",
    "vue-loader": "^15.3.0",
    "vue-style-loader": "^4.1.2",
    "vue-template-compiler": "^2.5.17",
    "webpack": "^4.16.5",
    "webpack-bundle-analyzer": "^2.13.1",
    "webpack-cli": "^3.1.0",
    "webpack-dev-middleware": "^1.12.0",
    "webpack-dev-server": "^3.1.5",
    "webpack-hot-middleware": "^2.18.2",
    "webpack-merge": "^4.1.4"
  },
  "engines": {
    "node": ">= 6.0.0",
    "npm": ">= 3.0.0"
  },
  "browserslist": [
    "> 1%",
    "last 2 versions",
    "not ie <= 8"
  ]
}

```

## 第二步
根据第一步的升级过程可见，项目依赖的 `vue-loader` 的版本从 `<= 14` 升级到了 `15+`。而 `vue-loader` 库升级后的 `15+` 版本存在需要注意Breaking Changes。因此需要参考 `vue-loader` 提供的[从v14迁移指南](https://vue-loader.vuejs.org/migrating.html)，对 `@/build/webpack.base.conf.js` 以及 `@/build/vue-loader.conf.js` 作相应的修改。

### vue-loader.conf.js
`vue-loader <= 14` 的版本， `vue-loader` 相关的配置一般都是另外写在 `@/build/vue-loader.conf.js` 这个文件内，然后在 `@/build/webpack.base.conf.js` 引入该文件的。但是`vue-loader 15+` 版本需要在`@/build/webpack.base.conf.js` 的 `plugins` 配置中引入 `vue-loader 15+` 新的 `VueLoaderPlugin` 插件，所以干脆把 `vue-loader` 的相关配置也直接写在 `@/build/webpack.base.conf.js` 内就好了。原来写在 `@/build/vue-loader.conf.js` 文件的配置直接删掉即可。

### webpack.base.conf.js
`@/build/webpack.base.conf.js` 是webpack的基础配置文件，升级 `vue-loader 15+` 后，该文件需要改动的地方有：
1. 引入 `vue-loader 15+` 的 `VueLoaderPlugin` 插件
2. `rules` 配置项中补充 `.css`、 `scss` 等样式文件的 `loader` 配置
3. `plugins` 配置项中追加 `new VueLoaderPlugin()`

```js
//  vue-loader.conf.js

'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const { VueLoaderPlugin } = require('vue-loader') // 🆕

var webpack = require("webpack");

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: ["babel-polyfill", "./src/main.js"]
  },
  //第三方库
  // externals: {
  //   'html2canvas':'html2canvas',
  //   'echarts':'echarts',
  // },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',//js es6支持
        include: [
          resolve('src'),
          resolve('test'),
          resolve('node_modules/multifunctional-datepicker'),
          resolve('node_modules/webpack-dev-server/client')
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      // 🆕
      // this will apply to both plain `.css` files
      // AND `<style>` blocks in `.vue` files
      {
        test: /\.(css|scss)$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(), // 🆕
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      jquery: "jquery",
      "window.jQuery": "jquery"
    })
  ]
}

```

## 第三步
`Webpack` 版本从3.x升级到4.x后，开发环境配置文件`@/build/webpack.dev.conf.js`，以及生产环境配置文件`@/build/webpack.prod.conf.js` 也要相应地做一些修改。

### webpack.dev.conf.js
```js
// webpack.dev.conf.js

'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  mode: 'development', // 🆕
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new FriendlyErrorsPlugin()
  ]
})

```

### webpack.prod.conf.js
生产环境配置文件修改的地方比较多，主要在于引入Webpack插件的变更以及具体插件配置（去除 `ExtractTextPlugin`，添加 `ScriptExtHtmlWebpackPlugin`、`MiniCssExtractPlugin`、`OptimizeCSSAssetsPlugin`、`UglifyJsPlugin`）；去除 `webpack 4.x`不需要的`HtmlWebpackPlugin` 的HTML打包排序相关配置；补充`optimization`配置项、以及Webpack打包分析逻辑调整等。

```js
// webpack.prod.conf.js

'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const env = config.build.env

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash:8].js'),
    chunkFilename: utils.assetsPath('js/[name].[chunkhash:8].js')
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    // extract css into its own file
    new MiniCssExtractPlugin({
      filename: utils.assetsPath('css/[name].[contenthash:8].css'),
      chunkFilename: utils.assetsPath('css/[name].[contenthash:8].css')
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: config.build.index,
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // default sort mode uses toposort which cannot handle cyclic deps
      // in certain cases, and in webpack 4, chunk order in HTML doesn't
      // matter anyway
    }),
    new ScriptExtHtmlWebpackPlugin({
      //`runtime` must same as runtimeChunk name. default is `runtime`
      inline: /runtime\..*\.js$/
    }),
    // keep chunk.id stable when chunk has no name
    new webpack.NamedChunksPlugin(chunk => {
      if (chunk.name) {
        return chunk.name
      }
      const modules = Array.from(chunk.modulesIterable)
      if (modules.length > 1) {
        const hash = require('hash-sum')
        const joinedHash = hash(modules.map(m => m.id).join('_'))
        let len = nameLength
        while (seen.has(joinedHash.substr(0, len))) len++
        seen.add(joinedHash.substr(0, len))
        return `chunk-${joinedHash.substr(0, len)}`
      } else {
        return modules[0].id
      }
    }),
    // keep module.id stable when vender modules does not change
    new webpack.HashedModuleIdsPlugin(),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        libs: {
          name: 'chunk-libs',
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: 'initial' // 只打包初始时依赖的第三方
        },
        elementUI: {
          name: 'chunk-elementUI', // 单独将 elementUI 拆包
          priority: 20, // 权重要大于 libs 和 app 不然会被打包进 libs 或者 app
          test: /[\\/]node_modules[\\/]element-ui[\\/]/
        },
        commons: {
          name: 'chunk-comomns',
          test: resolve('src/components'), // 可自定义拓展你的规则
          minChunks: 3, // 最小公用次数
          priority: 5,
          reuseExistingChunk: true
        }
      }
    },
    runtimeChunk: 'single',
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          mangle: {
            safari10: true
          }
        },
        sourceMap: config.build.productionSourceMap,
        cache: true,
        parallel: true
      }),
      // Compress extracted CSS. We are using this plugin so that possible
      // duplicated CSS from different components can be deduped.
      new OptimizeCSSAssetsPlugin()
    ]
  }
})

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.generateAnalyzerReport || config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin

  if (config.build.bundleAnalyzerReport) {
    webpackConfig.plugins.push(
      new BundleAnalyzerPlugin({
        analyzerPort: 8080,
        generateStatsFile: false
      })
    )
  }

  if (config.build.generateAnalyzerReport) {
    webpackConfig.plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename: 'bundle-report.html',
        openAnalyzer: false
      })
    )
  }
}

module.exports = webpackConfig

```
