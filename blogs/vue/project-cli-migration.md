### dependencies

```
npm i webpack@4 --save-dev
npm i webpack-cli@3 --save-dev
npm i mini-css-extract-plugin@0 --save-dev
npm i optimize-css-assets-webpack-plugin@5 --save-dev
npm i script-ext-html-webpack-plugin@2 --save-dev
npm i vue-loader@15 --save-dev
npm i css-loader@1 --save-dev
npm i sass-loader@7 --save-dev
npm i vue-style-loader@4 --save-dev
npm i url-loader@1 --save-dev
npm i vue@2.6.0
npm i vue-template-compiler@2.6.0 --save-dev

npm uninstall extract-text-webpack-plugin
```

### webpack.prod.conf.js, webpack.test.conf.js:

remove `CommonsChunkPlugin`

add `module.optimization` 

### webpack.dev.conf.js

remove `NoEmitOnErrorsPlugin`

### webpack.base.conf.js

add `VueLoaderPlugin`

### build/utils.js

remove `ExtractTextPlugin`

add `MiniCssExtractPlugin`