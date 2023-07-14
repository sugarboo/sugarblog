---
title: 在 Vue 项目中安装Tailwind CSS
date: '2022-01-26 10:02:00'
sidebar: 'auto'
categories:
 - vue
tags:
 - vue
publish: false
---

## 安装 Tailwind CSS

```
# 使用npm
$ npm install tailwindcss -D

# 使用yarn
$ yarn add tailwindcss -D
```

## 创建 Tailwind CSS 配置文件

```
npx tailwindcss init
```

## 配置tailwind.config.js
> Since Tailwind no longer uses PurgeCSS under the hood, we’ve renamed the purge option to content to better reflect what it’s for: ...

```js
// ./tailwind.config.js
module.exports = {
  // Tailwind CSS 3.0版本开始, 不再使用purgeCSS进行打包优化. 使用`content`配置项代替原`purge`配置项.
  content: [
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
  ],
  theme: {
    extend: {},
  },
  plugins: []
  // 配置前缀, 防止类名与其他UI框架冲突
  // prefix: 'tw-'
}
```



## 安装 PostCSS 和 autoprefixer
```
## 使用npm
$ npm install postcss autoprefixer -D

# 使用yarn
$ yarn add postcss autoprefixer -D
```

## 创建 PostCSS 配置文件

```js
// ./postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: { config: './tailwind.config.js' },
    autoprefixer: { config: require('autoprefixer') }
  }
}
```

## 引入TailWindCSS

在`src/assets` 目录下创建tailwindcss.css

```js
// ./src/assets/tailwindcss.css

@tailwind base;
@tailwind components;
@tailwind utilities;
```

然后在 `/src/main.js` 文件中引入

```
// /src/main.js
import './assets/tailwindcss.css'
```

## 测试 TailwindCSS

在 `/src/App.vue` 中添加如下代码

```html
<div class="p-3 bg-green-500 text-white">Hello Tailwind CSS</div>
```

然后打开 `http://localhost:8080/` 查看效果，如果出现了预期的样式，则说明集成 `Tailwind` 成功。

