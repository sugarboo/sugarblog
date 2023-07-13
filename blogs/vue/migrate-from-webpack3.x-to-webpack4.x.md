---
title: Vue 2 项目脚手架升级（一）：从 Webpack3.x 迁移至 Webpack 4.x
date: '2023-07-13 23:00:00'
sidebar: 'auto'
categories:
 - vue
tags:
 - vue
publish: true
---

## 第一步：更新依赖包版本

```shell
# /package.json

# dependencies
npm i vue@legacy

# devDependencies
npm i webpack@webpack-4 -D
npm i html-webpack-plugin@webpack-4 -D
npm i webpack-cli@3.3.12 -D
npm i webpack-bundle-analyzer@2 -D
npm i webpack-merge@4 -D
npm i script-ext-html-webpack-plugin -D
npm i uglifyjs-webpack-plugin@1 -D
npm i vue-loader@15.10.1 -D
npm i vue-style-loader@4 -D
npm i vue-template-compiler@2.6.14 -D
npm i mini-css-extract-plugin@0 -D
npm i optimize-css-assets-webpack-plugin@5 -D
npm i css-loader@1 -D
npm i sass-loader@7 -D
npm i ora@3 -D
npm i semver@5 -D
npm i shelljs@0 -D
npm i url-loader@1 -D
npm uninstall extract-text-webpack-plugin

```

## 第二步：将 `ExtractTextPlugin` 替换为 `MiniCssExtractPlugin`

参考以下代码，对 `build/utils.js` 文件进行修改：

```js
// build/utils.js

const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// ...
exports.cssLoaders = function (options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: process.env.NODE_ENV === 'production',
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    const loaders = [cssLoader]
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      loaders.push(MiniCssExtractPlugin.loader)
    } else {
      loaders.push('vue-style-loader')
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}
// ...

```

## 第三步：`vue-loader` 相关配置

完成第一步操作后，项目依赖的 `vue-loader` 的版本从 `<= 14` 升级到了 `15+`。而 `vue-loader` 库升级后的 `15+` 版本存在需要注意的 Breaking Changes。因此需要参考 `vue-loader` 提供的 [Migrating from v14 | Vue Loader](https://vue-loader.vuejs.org/migrating.html) 迁移指南，修改相关文件的配置。

### vue-loader.conf.js

`vue-loader <= 14` 的版本， `vue-loader` 相关的配置一般都是另外写在 `/build/vue-loader.conf.js` 这个文件内，然后在 `/build/webpack.base.conf.js` 引入该文件的。但是`vue-loader 15+` 版本需要在`/build/webpack.base.conf.js` 的 `plugins` 配置中引入 `vue-loader 15+` 新的 `VueLoaderPlugin` 插件，所以干脆把 `vue-loader` 的相关配置也直接写在 `/build/webpack.base.conf.js` 内就好了。原来写在 `/build/vue-loader.conf.js` 文件的配置直接删掉即可。

```js
// /build/vue-loader.conf.js

'use strict'

module.exports = {
  //You can set the vue-loader configuration by yourself.
}

```

### webpack.base.conf.js

1. 引入 `vue-loader 15+` 的 `VueLoaderPlugin` 插件；
2. `plugins` 配置项中追加 `new VueLoaderPlugin()`；
3. `rules` 配置项中补充 `.css`、 `scss` 等样式文件的 `loader` 配置。


```js
// /build/webpack.base.conf.js

const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  // ...
  plugins: [
    new VueLoaderPlugin()
  ],
  rules: [
    {
      test: /\.(css|scss|sass)$/,
      use: [
        'vue-style-loader',
        'css-loader',.
        'sass-loader'
      ]
    }
  ]
  // ...
}

```

## 第四步：修改 Webpack 打包配置相关的文件

Webpack 版本从 3.x 升级到 4.x 后，开发环境配置文件`/build/webpack.dev.conf.js`，以及生产环境配置文件`/build/webpack.prod.conf.js` 也要相应地做一些修改。

### webpack.dev.conf.js

开发环境的打包配置文件需要修改步骤如下：

1. 添加 `module.mode` 配置项；
2. 删除 `module.plugins` 中 已废弃的 `NoEmitOnErrorsPlugin`  插件。

### webpack.prod.conf.js

生产环境的打包配置文件修改的地方比较多，主要在于引入Webpack插件的变更以及具体插件配置（去除 `ExtractTextPlugin`，添加 `ScriptExtHtmlWebpackPlugin`、`MiniCssExtractPlugin`、`OptimizeCSSAssetsPlugin`、`UglifyJsPlugin`）；去除  `webpack 4.x` 不需要的 `HtmlWebpackPlugin` 的HTML打包排序相关配置；补充 `optimization` 配置项、以及 Webpack 打包分析逻辑调整等。

1. 添加 `module.mode` 配置项；
2. 删除 `module.plugins` 中 已废弃的 `ExtractTextPlugin`  插件；
3. 在 `module.plugins` 中添加 `ScriptExtHtmlWebpackPlugin`，`MiniCssExtractPlugin`，`OptimizeCSSAssetsPlugin`，`UglifyJsPlugin` 插件；
4. 添加 `module.optimization` 配置项。
5. 添加 Webpack 内置插件：`compression-webpack-plugin` 的配置；
6. 调整 `webpack-bundle-analyzer` 的打包分析配置。


```js
// /build/webpack.prod.conf.js

// ...
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',

  // ...
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash:8].js'),
    chunkFilename: utils.assetsPath('js/[name].[chunkhash:8].js')
  },
  
  // ...
  plugins: [
    // ...

    // extract css into its own file
    new MiniCssExtractPlugin({
      filename: utils.assetsPath('css/[name].[contenthash:8].css'),
      chunkFilename: utils.assetsPath('css/[name].[contenthash:8].css')
    }),

    new ScriptExtHtmlWebpackPlugin({
      //`runtime` must same as runtimeChunk name. default is `runtime`
      inline: /runtime\..*\.js$/
    }),

    // ...
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
        // elementUI: {
        //   name: 'chunk-elementUI', // 单独将 elementUI 拆包
        //   priority: 20, // 权重要大于 libs 和 app 不然会被打包进 libs 或者 app
        //   test: /[\\/]node_modules[\\/]element-ui[\\/]/
        // },
        commons: {
          name: 'chunk-commons',
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

// ...
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

## References
>
> [To v4 from v3 | webpack](https://webpack.js.org/migrate/4/)
>
> [Step by Step Migration - Webpack 3 to Webpack 4 - CodeProject](https://www.codeproject.com/Articles/1277835/Step-by-Step-Migration-Webpack-3-to-Webpack-4)
> 
> [Webpack upgrade from 3 to 4. All you need to know to upgrade Webpack… | by Sujaan Singh | Medium](https://medium.com/@sujankanwar/webpack-upgrade-from-3-to-4-687c6076c285)
>
> [update to webpack4 (#889) · PanJiaChen/vue-element-admin@378ca2c](https://github.com/PanJiaChen/vue-element-admin/commit/378ca2c217f94d3f31e2518116708092ee06f95c)
