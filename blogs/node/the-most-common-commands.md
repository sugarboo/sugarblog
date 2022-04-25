---
title: NPM & Yarn 常用命令
date: '2022-04-25 23:00:00'
sidebar: 'auto'
categories:
 - node
tags:
 - node
publish: true
---

## 安装依赖

### npm
```
$ npm install
or
$ npm install <package-name>
```

**common optional tag:**
`-D or --save-dev`
`-g or --global`

### yarn
```
$ yarn
or
$ yarn add <package-name>
```

**common optional tag:**
`-D or --save-dev`
`-g or -global`

## 移除依赖

### npm
```
$ npm uninstall <package-name>
```

**common optional tag:**
`-D or --save-dev`
`-g or --global`

### yarn
```
$ yarn remove <package-name>
```

**common optional tag:**
`-D or --save-dev`
`-g or -global`

## 项目编译

## npm
```
$ npm run build
```

## yarn
```
$ yarn build
```

## 查看当前npm / Yarn版本

## npm
```
$ npm -v
or
$npm --version
```

## yarn
```
$ yarn -v
or
$yarn --version
```

## 清除缓存

## npm
```
$ npm cache clean
```

## yarn
```
$ yarn cache clean
```


## 查看已安装的全局依赖

### NPM
```
$ npm list -g --depth 0
```

### Yarn
```
$ yarn global list
```
