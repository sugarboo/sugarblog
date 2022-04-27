---
title: Git 常用命令
date: '2022-04-27 22:30:00'
sidebar: 'auto'
categories:
 - git
tags:
 - git
publish: true
---

## 初始化本地仓库

```
$ git init
```

## 把文件添加到暂存区(staged changes)

```
$ git add <file-name>

# 通常使用`*`来表示将当前所有更改添加到暂存区
$ git add *
```

## 把暂存区文件提交到本地仓库形成历史记录

```
$ git commit -m "<commit-message>"
```

## 添加远程仓库地址到本地

```
$ git remote add <local-branch-name> <ssh or https>
```

## 推送到远程仓库

```
$ git push -u <local-branch-name> <remote-branch-name>

# 推送的时候如果不改变远程仓库和分支的话就直接使用
$ git push
```

## 查看所有的远程仓库信息

```
$ git remote -v
```

## 删除指定的远程仓库

```
$ git remote rm <remote-name>
```

## 拉取远程分支到本地并创建本地分支

```
git fetch origin <remote-branch-name>:<local-branch-name>
```

## 修改远程仓库地址信息

```
$ ## git remote set-url <remote-name> <new ssh or https>
```

## 查看本地分支列表

```
$ git branch
```

## 查看本地和远程所有分支列表

```
$ git br -a
```

## 更新项目远程分支列表

```
$ git remote update <remote-name>
```

**optional tag: `-p or --prune`**
