---
title: Vue跨域处理配置
date: '2022-01-26 10:00:00'
sidebar: 'auto'
categories:
 - vue
tags:
 - vue
publish: false
---

1. 根目录的vue.config.js文件:
```js
devServer: {
  proxy: {
    '/api': {
      target: 'http://abc.example.com:8888/api', // 需要跨域的接口地址
      changeOrigin: true,
      pathRewrite: { '^/api': '' }
    }
  },
  ...
  ...
}
```
2. 根目录的.env.development文件:
```js
# just a flag
ENV = 'development'

# base api
VUE_APP_BASE_API = '/api'
```