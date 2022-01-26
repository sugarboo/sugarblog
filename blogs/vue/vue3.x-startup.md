---
title: Vite搭建 Vue 3.x + Vue Router + Vuex + TypeScript 项目
date: '2022-01-26 10:01:00'
sidebar: 'auto'
categories:
 - vue
tags:
 - vue
publish: true
---

## 检查Node版本
```
# 查看当前已安装的node版本(Vite 需要 Node.js 版本 >= 12.0.0)

$ node -v
```
## 使用Vite 创建项目
使用命令行工具, 在待创建项目的目录下, 运行以下命令
```
# 使用 NPM:

$ npm init vite@latest

# 使用 Yarn:

$ yarn create vite
```
## 选择Vite 配置项
```
# 输入待创建的项目名
? Project name: » 项目名

# 选择项目所使用的框架, 这里我们选择vue
? Select a framework: 
	vanilla
>	vue
	react
	...

# 选择项目所使用的变量, 这里我们选择vue-ts
? Select a variant:
	vue
>	vue-ts

# 回车, 项目创建完成
Done. Now run:

  cd 项目名
  yarn
  yarn dev
```
## 安装需要的依赖包
> 使用Vite创建的项目, 默认安装的依赖只有 Vue 和 Vite 包. 因此, 需要我们手动安装及配置 Vue Router, Vuex 等依赖包.
```
# 进入项目目录

$ cd 项目名

# 安装Vue Router, Vuex 等依赖包

$ npm install vue-router@next
$ npm install vuex@next
$ npm install @types/node -D

# 或

$ yarn add vue-router@next
$ yarn add vuex@next
$ yarn add @types/node -D
```
## 项目具体配置
### /vite.config.ts: 配置 vite.config.ts
```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],

    /* 配置扩展名及@别名 */
    resolve: {
        extensions: ['.js', '.ts', '.vue', '.json'],
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },

    /* 配置开发环境端口号及跨域处理 */
    server: {
        port: 3333,
        proxy: { '/^api': '在这里输入接口的baseURL' }
    }
})
```
### /src/router/index.ts: 创建路由目录及配置文件
```typescript
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
```
### /src/main.ts: 在主入口文件中引入路由配置文件
```typescript
// 引入路由配置文件并挂载
import router from './router/index'

createApp(App).use(router).mount('#app')
```

