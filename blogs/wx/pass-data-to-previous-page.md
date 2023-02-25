---
title: 小程序页面返回传值四种解决方案总结
date: '2022-12-01 16:00:00'
sidebar: 'auto'
categories:
 - wx
tags:
 - wx
publish: true
---

## 小程序页面返回传值四种解决方案总结

> 来源: [小程序页面返回传值四种解决方案总结 - 掘金](https://juejin.cn/post/6986556857703727117)

### 使用场景

小程序从A页面跳转到B页面，在B页面选择一个值后返回到A页面，在A页面使用在B页面选中的值。例如：在购买订单页面跳转到地址列表，选择完地址以后回退到订单页面，订单页面的配送地址需要同步更新。

### 解决方案

常见的比容要容易解决的方案是使用小程序的全局存储globalData、本地缓存[storage](https://developers.weixin.qq.com/miniprogram/dev/api/storage/wx.setStorage.html)、获取小程序的页面栈，调用上一个Page的setData方法、以及利用[wx.navigateTo](https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.navigateTo.html)的events属性监听被打开页面发送到当前页面的数据。下面给大家简单对比下四种方法的优缺点：

### 1、使用globalData实现

```js
// page A
// 获取App.js实例
const app = getApp()
// 生命周期函数--监听页面显示
onShow() {
  if (app.globalData.backData) {
    this.setData({
      // 将B页面更新完的值渲染到页面上
      backData: app.globalData.backData
    }, () => {
      // 删除数据 避免onShow重复渲染
      delete app.globalData.backData
    })
  }
}
// page B
// 获取App.js实例
const app = getApp()
changeBackData(){
  app.globalData.backData = '我被修改了'
  wx.navigateBack()
}
```

### 2、使用本地缓存Storage实现

```js
// page A
onShow: function () {
    let backData = wx.getStorageSync('backData')
    if(backData){
      this.setData({
        backData
    }, () => {
        wx.removeStorageSync('backData')
    })
  }
},
// page B
changeBackData(){
  wx.setStorageSync('backData', '我被修改了')
  wx.navigateBack()
},
```

### 3、使用小程序的Page页面栈实现

使小程序的页面栈，比其他两种方式会更方便一点而且渲染的会更快一些，不需要等回退到A页面上再把数据渲染出来，在B页面上的直接就会更新A页面上的值，回退到A页面的时候，值已经被更新了。globalData和Storage实现的原理都是在B页面上修改完值以后，回退到A页面，触发onShow生命周期函数，来更新页面渲染。

```js
// page B
changeBackData(){
  const pages = getCurrentPages()
  const beforePage = pages[pages.length - 2]
  beforePage.setData({
    // 会直接更新A页面的数据，A页面不需要其他操作
    backData: "我被修改了"
  })
}
```

### 4、使用wx.navigateTo API的events实现

wx.navigateTo的events的实现原理是利用设计模式的发布订阅模式实现的，有兴趣的同学可以自己动手实现一个简单的，也可以实现相同的效果。

```js
//page A
goPageB() {
  wx.navigateTo({
    url: 'B',
    events: {
      //在events里面添加监听事件
      getBackData: res => {
      this.setData({
          backData: res.backData
        })
      },
    },
  })
},
// page B
changeBackData(){
  const eventChannel = this.getOpenerEventChannel()
    eventChannel.emit('getBackData', {  
    backData: '我被修改了'
  })
  wx.navigateBack()
}
```

### 总结

**1和2两种方法在页面渲染效果上比后面两种稍微慢一点，3和4两种方法在B页面回退到A页面之前已经触发了更新，而1和2两种方法是等返回到A页面之后，在A页面才触发更新。并且1和2两种方式，要考虑到A页面更新完以后要删除globalData和Storage的数据，避免onShow方法里面重复触发setData更新页面，所以个人更推荐大家使用后面的3和4两种方式。**