# CLI migration: update webpack 3.x to webpack 4.x

## Commits

[build(cli): update to webpack 4.x](https://codeup.aliyun.com/642f90e6bff3b5aa545628c1/miaocangchina/miaocang-h5/commit/45b8c62d0ec4185d55cfd90740cf9316d05dc3d6?branch=cli_webpack4)

## File Changes

### package.json

```shell
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

### build/utils.js

replace `ExtractTextPlugin` by `MiniCssExtractPlugin`.

### build/vue-loader.conf.js

clear this file.

### build/webpack.base.conf.js

add `VueLoaderPlugin` in `module.plugins`;

### build/webpack.dev.conf.js

add `module.mode`;

remove `NoEmitOnErrorsPlugin` in `module.plugins`.

### build/webpack.prod.conf.js, build/webpack.test.conf.js

add `module.mode`;

remove `ExtractTextPlugin`;

add `ScriptExtHtmlWebpackPlugin`, `MiniCssExtractPlugin`, `OptimizeCSSAssetsPlugin`, `UglifyJsPlugin`;

add `module.optimization`.

## References
>
> [To v4 from v3 | webpack](https://webpack.js.org/migrate/4/)
>
> [Step by Step Migration - Webpack 3 to Webpack 4 - CodeProject](https://www.codeproject.com/Articles/1277835/Step-by-Step-Migration-Webpack-3-to-Webpack-4)
> 
> [Webpack upgrade from 3 to 4. All you need to know to upgrade Webpack… | by Sujaan Singh | Medium](https://medium.com/@sujankanwar/webpack-upgrade-from-3-to-4-687c6076c285)
>
> [update to webpack4 (#889) · PanJiaChen/vue-element-admin@378ca2c](https://github.com/PanJiaChen/vue-element-admin/commit/378ca2c217f94d3f31e2518116708092ee06f95c)