---
title: node-sass 安装失败的解决方法
date: '2023-03-17 23:00:00'
sidebar: 'auto'
categories:
 - node
tags:
 - node
publish: true
---

## 前言

node-sass 依赖包，常见于一些较老的前端项目中，在 Windows 下常常会出现安装失败的情况。解决这个问题的常见方法是安装指定版本的 Python 并为其配置环境变量。但是，其实还存在着一种不需要安装 Python 环境的更简单更优雅的解决方法。

## 原因剖析

npm 安装 node-sass 依赖时，需要从 github 的 node-sass repo 上下载 binding.node 这个二进制文件。由于国内网络环境的问题，这个下载时间可能会很长，甚至导致超时失败。这时就需要借助 node-gyp 来进行编译，此过程需要依赖 Python 环境。

因此，如果不想安装并配置 Python环境的话，可以自行在 node-sass 的 github repo 中下载所需的 binding.node 文件到本地目录，然后在安装 node-sass 时直接在这个本地目录下找到该文件，省去在安装过程中下载 binding.node 的步骤即可。具体步骤如下：

## 解决方法

### 1. 下载node-sass安装所需的 .node 文件

首先，需要在命令行运行以下命令，查看当前 node 环境的 process 相关版本号：

```shell
node -p "[process.platform, process.arch, process.versions.modules].join('-')"
```

在 [Releases · sass/node-sass](https://github.com/sass/node-sass/releases) 中找到对应版本的 binding.node 文件并下载到本地目录中（注意：文件目录路径中不要有空格或中文）。

![pic](https://imgur.com/rwKREIR.png)

### 2. 设置 `SASS_BINARY_PATH` 环境变量
在命令行运行如下命令，将 binding.node 文件的本地存放路径，配置到 `SASS_BINARY_PATH` 环境变量中。

```shell
Set-Variable -Name "SASS_BINARY_PATH" -Value "D:\FED\utils\win32-x64-83_binding.node"
```

![pic](https://imgur.com/rwKREIR.png)

执行完上述步骤，就大功告成了。回到需要安装 node-sass 依赖包的前端项目，就可以顺利完成安装依赖包的操作了。

> 参考资料：[node-sass安装失败解决方法总结(终有一款适合你)_node.js_脚本之家](https://www.jb51.net/article/268608.htm)