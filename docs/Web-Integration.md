---
 id: Web-Integration
title: Web集成
sidebar_label: Web集成
---

<!-- # Web Integration -->

React Navigation路由在网络上运行并且允许你与本地应用共享导航逻辑。目前在 `react-navigation` 中绑定的视图只能在React Native上使用，但可能会随着[react-primitives](https://github.com/lelandrichardson/react-primitives)等将来的项目而改变。

## 示例应用
[英文官网](https://reactnavigation.org/) 就是用使用React Navigation [构建](https://github.com/react-community/react-navigation/blob/master/website/) 的，特别是使用了`createNavigator` 和 `TabRouter`


[中文官网（react-navigation中文网）](https://reactnavigation.org.cn/) 使用[docusaurus](https://docusaurus.io/) 创建

在这里查看 [App.js](https://github.com/react-community/react-navigation/blob/master/website/src/App.js) 源代码。

查看应用如何在服务端渲染的，请参阅 [Server.js](https://github.com/react-community/react-navigation/blob/master/website/src/Server.js) ；在浏览中，应用唤醒和渲染使用了 [BrowserAppContainer.js](https://github.com/react-community/react-navigation/blob/master/website/src/BrowserAppContainer.js) 。


## 更多内容即将推出
很快，本指南将被更全面的react-navigation在web上的用法所取代