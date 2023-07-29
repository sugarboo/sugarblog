---
title: Fiddler 抓包教程
date: '2023-07-29 15:00:00'
sidebar: 'auto'
categories:
 - others
tags:
 - others
publish: true
---

## Fiddler 介绍

`Fiddler`是一个通过代理的方式来进行抓包工具，运行时会在本地建立一个代理服务，通过其来抓取本地与服务器之间的所有 HTTP(s) 请求。


## Fiddler 下载

Fiddler 官网：[ Fiddler | Web Debugging Proxy and Troubleshooting Solutions ](https://www.telerik.com/fiddler)

> 💡 Windows 平台，可以选择下载免费的 Fiddler Classic 版本。 

## Fiddler 工作原理

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/10/16f8e0477631f3f8~tplv-t2oaga2asx-zoom-in-crop-mark:1512:0:0:0.awebp)

抓包其中涉及三个角色： `客户端` 、 `代理`、 `目标服务器`

- 原本正常访问网页或 App 路径是： 客户端 ---> 目标服务器
- 抓包，其实就加入了一个代理，此时路径为：客户端 ---> 代理 ---> 目标服务器
- 只有这三者产生一定的联系，才能进行拦截/抓取一些东西，客户端先访问代理，代理把客户端的信息记录下来，代理再去联系目标服务器，进而返回给客户端。

## 使用 Fiddler 抓包

1. 打开 Fiddler后，进入 `Tools/Options` 菜单，在 `HTTPS` 选项卡内，勾选 `Capture HTTPS CONNECTs`、`Decrypt HTTPS traffic`选项；在 `Connections` 选项卡内，勾选 `Allow remote computer to connect` 选项，并可以选择修改 Fiddler 抓包代理服务器的端口号。第一次配置会出现安装证书的请求，配置完毕后，重启 Fiddler 即可生效。

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/10/16f8e12c29f95725~tplv-t2oaga2asx-zoom-in-crop-mark:1512:0:0:0.awebp)

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/10/16f8e179c43e9f17~tplv-t2oaga2asx-zoom-in-crop-mark:1512:0:0:0.awebp)

2. **确保电脑与手机处于同一个局域网环境下**，配置手机安全证书。手机打开浏览器访问地址 `电脑IP:Fiddler 端口号` （如：`http://192.168.1.86:8888`），下载安装证书。电脑 IP 获取的方法：电脑运行 CMD，输入 `ipconfig` 命令后回车。

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/10/16f8e3c2071f4343~tplv-t2oaga2asx-zoom-in-crop-mark:1512:0:0:0.awebp)

3. 手机端访问地址之后， 点击 `You can download the FiddlerRoot certificate`，将 Fiddler 安全证书安装到我的设备中。

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/10/16f8e3ddd34bcc6e~tplv-t2oaga2asx-zoom-in-crop-mark:1512:0:0:0.awebp)

4. 若证书无法直接安装成功，`系统安全 ---> 凭据存储 ---> 从存储设备安装` 找到 `FiddlerRoot.cer` 文件进行安装。验证是否安装成功：点击 `信任的凭据 ---> 用户` 看是否安装成功。

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/10/16f8e443fa72f848~tplv-t2oaga2asx-zoom-in-crop-mark:1512:0:0:0.awebp)![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/10/16f8e4450efa3427~tplv-t2oaga2asx-zoom-in-crop-mark:1512:0:0:0.awebp)

1. 配置手机 wifi 代理。找到与**电脑连接中的网络处于同一个局域网环境下的 WiFi**，手动修改 WiFi 配置：`主机名` 一项，配置为电脑本机 IP；`端口`一项，配置为 Fiddler 中设置的端口号。

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/10/16f8e487713bceb6~tplv-t2oaga2asx-zoom-in-crop-mark:1512:0:0:0.awebp)
