---
title: Windows 10/11 为微软拼音导入小鹤双拼方案
date: '2022-05-05 21:00:00'
sidebar: 'auto'
categories:
 - others
tags:
 - others
publish: true
---

## 背景

微软拼音目前已经相对完善，除了词库方面外，与目前国产输入法使用体验差异不大，可以作为日常输入法使用了。

但微软拼音目前仅内置三套双拼方案：微软双拼、智能ABC、自然码；其他双拼方案需要手动添加，这里带来两种快捷添加方法，免去一个键位一个键位调整。

## 方法一

通过导入注册表的方式来快捷添加。注册表内容为：
```
Windows Registry Editor Version 5.00

[HKEY_CURRENT_USER\Software\Microsoft\InputMethod\Settings\CHS]
"Enable Cloud Candidate"=dword:00000000
"Enable Dynamic Candidate Ranking"=dword:00000001
"EnableExtraDomainType"=dword:00000001
"Enable self-learning"=dword:00000001
"EnableSmartSelfLearning"=dword:00000001
"EnableLiveSticker"=dword:00000000
"Enable EUDP"=dword:00000001
"Enable Double Pinyin"=dword:00000001
"UserDefinedDoublePinyinScheme0"="小鹤双拼*2*^*iuvdjhcwfg^xmlnpbksqszxkrltvyovt"
"DoublePinyinScheme"=dword:0000000a
```

新建`.txt`文本，复制粘贴以上内容后保存，将文件后缀更改为 `.reg` 后双击导入注册表即可。

>💡 Tips: 如果用的是VS Code等默认使用UTF-8编码的编辑器，而Windows系统使用了GBK编码，那“小鹤双拼”会被识别为乱码。这个问题不影响实际使用，只是在输入法设置里能看到。有强迫症的注意把文件改成GBK编码即可。

## 方法二

手动添加注册表项目。

1. `Windows + R`调出命令运行框，输入：`regedit`后确认打开注册表；
2. 打开以下路径：`HKEY_CURRENT_USER\Software\Microsoft\InputMethod\Settings\CHS`
3. 新建字符串值，字符串名称为：`UserDefinedDoublePinyinScheme0`，值为：`"小鹤双拼*2*^*iuvdjhcwfg^xmlnpbksqszxkrltvyovt"`
4. 退出后进入微软拼音设置，即可看到小鹤双拼方案已存在，选择保存即可。

> 来源: [Windows 10/11 为微软拼音导入小鹤双拼方案 - 简书](https://www.jianshu.com/p/181c6d08fb1a)

> 参考: [一键为微软输入法添加小鹤双拼键位 - 知乎](https://zhuanlan.zhihu.com/p/174778114)
