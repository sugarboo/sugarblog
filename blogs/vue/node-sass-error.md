---
title: node-sass@4.x 依赖包安装失败的解决方法
date: '2022-04-21 16:30:00'
sidebar: 'auto'
categories:
 - vue
tags:
 - vue
publish: true
---

# node-sass@4.x 依赖包安装失败的解决方法

> 问题原因主要是windows平台缺少编译环境

## 解决办法

1. 先运行： `npm install -g node-gyp`

2. 然后运行：`npm install --global --production windows-build-tools`

3. 最后运行：`npm config set python Python的安装路径`

