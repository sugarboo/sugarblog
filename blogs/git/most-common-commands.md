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

**optional tag: ** `-f or --force`

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

## 移除已被删除的远程分支

```
$ git remote prune <remote-name>
```

## 删除分支

```
# 删除本地分支
$ git branch -d <local-branch-name>

# 删除远程分支
git push <remote-name> --delete <remote-branch-name>
```

## 回退到某一次提交的版本

```
$ git reset <commit-id>
```

**optional tag:  ` --soft`, `--hard` , `--mixed`** 

> `--mixed`: 默认值, 可省略. 用于重置暂存区的文件与上一次的提交(commit)保持一致，工作区文件内容保持不变。
>
> `--soft`: 用于回退到某个版本
>
> `--hard`: 撤销工作区中所有未提交的修改内容，将暂存区与工作区都回到上一次版本，并删除之前的所有信息提交 **(会删除回退点之前的所有信息. 慎用)**

## 检出, 在本地审查和合并

```
# 1. 获取并检出此合并请求的分支
$ git fetch <remote-name>
$ git checkout -b <merging-local-branch-name> <remote-name>/<merging-remote-branch-name>

# 2. 本地审查变更

# 3. 合并分支并修复出现的任何冲突
$ git checkout <to-be-merged-remote-branch-name>
$ git merge --no-ff <merging-remote-branch-name>
## ↑ 此时VSCode窗口会自动弹出, 可以在VSCode中手动处理冲突 ↑

# 4. 推送合并的结果到远程仓库
git push <remote-name> <to-be-merged-remote-branch-name>
```

![Code - 阿里云](https://i.imgur.com/xXjfmQx.png)
