---
title: 物流端小程序 - 开发文档
date: '2022-07-28 18:00:00'
sidebar: 'auto'
categories:
 - mc
tags:
 - mc
publish: true
keys:
 - 'f896badeeb682becbc1afddf85559259'
---

> [物流端小程序-供应链开发PRD文档V2.0](https://docs.qq.com/doc/DYXFGVUJDZVlUQW5R)

## 1. 登录 / 注册
### 1.1 使用手机号登录
- 微信手机号登录
- 短信验证码登录
### 1.2 隐私政策，用户服务协议，使用条款
- 需要同意上述协议方可登录
- 上述协议页面应在H5项目中写
### 1.3 非招商用户登录后跳转到欢迎入驻H5页面

## 2. 底部导航栏
### 2.1 TabBar
- 共3个Tab：`首页`、`运单`、`我的`

## 3. 首页
### 3.1 页面结构
- 顶部卡片：车牌号码与接单状态、驾驶证认证状态
- 我的待办卡片
- 当前任务
### 3.2 设置接单状态
- 点击顶部卡片区域中的`车牌号码与接单状态`按钮，弹出设置接单状态弹出层，可在弹出层内操作`设置接单状态`开关
- 打开`设置接单状态`开关时，触发一次性消息订阅提醒
- 若司机当前有进行中的订单，则不允许修改接单状态
### 3.3 查看驾驶证认证状态
- 点击顶部卡片区域中的`驾驶证认证状态`按钮，弹出认证状态弹出层
- 弹出层包含字段：实名认证、司机驾驶证、司机从业资格证、车辆行驶证、车辆道路运输证
### 3.4 我的待办卡片
- `待接单`按钮：点击跳转到订单Tab，筛选待接单状态订单
- `待装车`按钮：点击跳转到订单Tab，筛选待装车状态订单
- `运输中`按钮：点击跳转到订单Tab，筛选运输中状态订单
- `待结算`按钮：点击跳转到订单Tab，筛选待结算状态订单
### 3.5 当前任务
- 点击当前任务区域，获取微信位置信息。跳转到运单详情页