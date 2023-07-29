---
title: H5 唤起 App
date: '2023-07-29 16:00:00'
sidebar: 'auto'
categories:
 - others
tags:
 - others
publish: true
---

> 原文地址：[ 如何自动打开你的 App？ - 掘金 ](https://juejin.cn/post/7201521440612974649)

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e49bcdaf475240b7b548d249dc489a06~tplv-k3u1fbpfcp-zoom-crop-mark:3024:3024:3024:1702.awebp?)

## URL Scheme

首先是最原始的方式 URL Scheme。

> URL Scheme 是一种特殊的 URL，用于定位到某个应用以及应用的某个功能。

它的格式一般是： `[scheme:][//authority][path][?query] `

scheme 代表要打开的应用，每个上架应用商店的 App 所注册的 scheme 都是唯一的；后面的参数代表应用下的某个功能及其参数。

### 在 IOS 上配置 URL Scheme

在 XCode 里可以轻松配置

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d26069a9c9d4489681e0a9ba317aa0a4~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

### 在 Android 上配置 URL Scheme

Android 的配置也很简单，在 AndroidManifest.xml 文件下添加以下配置即可

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/feecdd536f814378bc0020813224097d~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

### 通过访问链接自动打开 App

配置完成后，只要访问 URL Scheme 链接，系统便会自动打开对应 scheme 的 App。

因此，我们可以实现一个简单的 H5 页面来承载这个跳转逻辑，然后在页面中通过调用 `location.href=schemeUrl 或者 <a href='schemeUrl' />` 等方式来触发访问链接，从而自动打开 App

### 优缺点分析

优点： 这个是最原始的方案，因此最大的优点就是兼容性好

缺点：

1. 通过 scheme url 这种方式唤起 App，对于 H5 中间页面是无法感知的，并不知道是否已经成功打开 App
2. 部分浏览器有安全限制，自动跳转会被拦截，必须用户手动触发跳转（即 location.href 行不通，必须 a 标签）
3. 一些 App 会限制可访问的 scheme，你必须要在白名单内，否则也会被拦截跳转
4. 通过 scheme url 唤起 App 时，浏览器会提示你是否确定要打开该 App，会影响用户体验

## DeepLink

通过上述缺点我们可以看出，传统的 URL Scheme 在用户体验上是存在一定缺陷的。

因此，DeepLink 诞生了。

DeepLink 的宗旨就是通过传统的 HTT P链接就可以唤醒app，而如果用户没有安装APP，则会跳转到该链接对应的页面。

### IOS Universal Link

在 IOS 上一般称之为 Universal Link。

**【配置你的 Universal Link 域名】**

首先要去 Apple 的开发者平台上配置你的 domains，假设是： `mysite.com`

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2e664df28ce5442794bc86f5975ed3f1~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

**【配置 apple-app-site-association 文件】**

在该域名根目录下创建一个 .well-known 路径，并在该路径下放置 apple-app-site-association 文件。

文件内容包含 appID 以及 path，path如果配置 /app 则表示访问该域名下的 /app 路径均能唤起App

该文件内容大致如下：

    
    
```json
{
  "applinks": {
    "apps": [],
    "details": [
      {
        "appID": "xxx", // 你的应用的 appID
        "paths": [ "/app/*"]
      }
    ]
  }
}

```

**【系统获取配置文件】**

上面两步配置成功后，当用户 首次安装App 或者后续每次 覆盖安装App 时，系统都会主动去拉取域名下的配置文件。

> 即系统会主动去拉取 `https://mysite.com/.well-known/apple-app-site-association` 这个文件

然后根据返回的 appID 以及 path 判断访问哪些路径是需要唤起哪个App

**【自动唤起 App】**

当系统成功获取配置文件后，只要用户访问 [mysite.com/app/xxx](https%3A%2F%2Fmysite.com%2Fapp%2Fxxx) 链接，系统便会自动唤起你的 App。

同时，客户端还可以进行一些自定义逻辑处理：

客户端会接收到 NSUserActivity 对象，其 actionType 为 NSUserActivityTypeBrowsingWeb，因此客户端可以在接收到该对象后做一些跳转逻辑处理。

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d4cb8b8aa85c49489691ec0098fd87fe~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

### Android DeepLink

与 IOS Universal Link 原理相似，Android系统也能够直接通过网站地址打开应用程序对应的内容页面，而不需要用户选择使用哪个应用来处理网站地址

**【配置 AndroidManifest.xml】**
在 AndroidManifest 配置文件中添加对应域名的 intent-filter：

scheme 为 https / http；

host 则是你的域名，假设是： `mysite.com`

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a76712a1193142e0bb1841a297dc82c0~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

**【生成 assetlinks.json 文件】**

首先要去 Google [developers.google.com/digital-ass…](https://developer.android.com/studio/write/app-link-indexing?hl=zh-cn) 生成你的 assetlinks json 文件。

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/78e681e022114919b4b40a64daaaa65f~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

**【配置 assetlinks.json 文件】**

生成文件后，同样的需要在该域名根目录下创建一个 .well-known 路径，并在该路径下放置 assetlinks.json 配置文件，文件内容包含应用的package name 和对应签名的sha哈希

**【系统获取配置文件】**

配置成功后，当用户 首次安装App 或者后续每次 覆盖安装App 时，系统会进行以下校验：

1. 如果 intent-filter 的 autoVerify 设置为 true，那么系统会验证其

- Action 是否为 android.intent.action.VIEW
- Category 是否为android.intent.category.BROWSABLE 和 android.intent.category.DEFAULT
- Data scheme 是否为 http 或 https

1. 如果上述条件都满足，那么系统将会拉取该域名下的 json 配置文件，同时将 App 设置为该域名链接的默认处理App

**【自动唤起 App】**

当系统成功获取配置文件后，只要用户访问 [mysite.com/app/xxx](https%3A%2F%2Fmysite.com%2Fapp%2Fxxx) 链接，系统便会自动唤起你的 App。

### 优缺点分析

**【优点】**

1. 用户体验好：可以直接打开 App，没有弹窗提示
2. 唤起App失败则会跳转链接对应的页面

**【缺点】**

1. iOS 9 以后才支持 Universal Link，
2. Android 6.0 以后才支持 DeepLink
3. DeepLink 需要依赖远程配置文件，无法保证每次都能成功拉取到配置文件

## 推荐方案： DeepLink + H5 兜底

基于前面两种方案的优缺点，我推荐的解决方案是配置 DeepLink，同时再加上一个 H5 页面作为兜底。

首先按照前面 DeepLink 的教程先配置好 DeepLink，其中访问路径配置为 `https://mysite.com/app`

接着，我们就可以在 `https://mysite.com/app` 路径下做文章了。在该路径下放置一个 H5 页面，内容可以是引导用户打开你的 App。

当用户访问 DeepLink 没有自动打开你的 App 时，此时用户会进入浏览器，并访问  `https://mysite.com/app` 这个 H5 页面。

在 H5 页面中，你可以通过浏览器 ua 获取当前的系统以及版本：

1. 如果是 Android 6.0 以下，那么可以尝试用 URL Scheme 去唤起 App
2. 如果是 IOS / Android 6.0 及以上，那么此时可以判断用户未安装 App。这种情况下可以做些额外的逻辑，比如重定向到应用商店引导用户去下载之类的