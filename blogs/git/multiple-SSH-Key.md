---
title: 为Git配置多个SSH Key
date: '2022-01-26 10:03:00'
sidebar: 'auto'
categories:
 - git
tags:
 - git
publish: true
---

## 查看已生成的SSH Key

```
$ cat ~/.ssh/id_rsa.pub
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/6eda4716040b410bbb36f555f4e0c1a1.jpg#pic_center)


## 生成另外的SSH Key

```
$ ssh-keygen -t rsa -C '在这里输入你的邮箱' -f ~/.ssh/新的文件名_id_rsa
```

选择配置项的时候一路回车, 使用默认值即可. 成功后, 可以看到`~/.ssh`目录下新增了两个文件. 
![在这里插入图片描述](https://img-blog.csdnimg.cn/60c3320ce200497c9fc8bd5bcfb180ec.jpg?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAa250aA==,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)


```
cat ~/.ssh/新的文件名_id_rsa.pub
```

使用该命令查看新生成的SSH Key, 将其添加到仓库中.

## 配置SSH config

在`~/.ssh`目录下生成config文件. 

```
$ touch ~/.ssh/config
```

用记事本打开该文件, 添加如下配置 (`Host`和`HostName`填写git服务器的域名，`IdentityFile`填写私钥的路径): 

```
# github
Host github.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/id_rsa

# aliyun
Host code.aliyun.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/新的文件名_id_rsa
```

## 测试SSH Key

使用以下命令分别测试`GitHub`和`code.aliyun`, 查看`SSH Key`是否添加成功.

```
ssh -T git@github.com
ssh -T git@code.aliyun.com
```