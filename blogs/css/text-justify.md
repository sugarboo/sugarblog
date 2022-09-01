---
title: CSS实现单行文本两端对齐
date: '2022-09-01 09:00:00'
sidebar: 'auto'
categories:
 - css
tags:
 - css
publish: true
---

## 方式1
```css
.class {
  /* 需要固定容器的宽度 */
  width: 100px;
  text-align: justify;
  text-align-last: justify;
  /* 兼容IE浏览器 */
  text-justify: distribute-all-lines;
}
```

## 方式2：借助伪类
```css
.class {
  /* 需要固定容器的宽度 */
  width: 100px;
  text-align: justify;
  /* 兼容IE浏览器 */
  text-justify: distribute-all-lines;
}

.class:after {
  content: '';
  width: 100%;
  display: inline-block;
}
```