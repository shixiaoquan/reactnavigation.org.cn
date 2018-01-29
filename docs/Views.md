---
 id: Views
title: 视图概述
sidebar_label: 视图概述
---

# <!--Views-->

Navigation视图是带有 `navigation.state`指定的 [`router`](/docs/Routers) 和 [`navigation`](/docs/Screen-Navigation-Prop) 属性的演示组件，并且可以显示多个页面。

Navigation视图是可以呈现当前导航状态的受控React组件。 他们管理页面，动画和手势的切换。 他们还呈现持久性的Navigation视图，如tabbar和标题。

## Built in Views

- [CardStack](https://github.com/react-community/react-navigation/blob/master/src/views/CardStack/CardStack.js) - 呈现一个适合任何平台的堆栈
    + [Card](https://github.com/react-community/react-navigation/blob/master/src/views/CardStack/Card.js) - 从卡片堆栈中呈现一个支持手势的卡片布局
    + [Header](https://github.com/react-community/react-navigation/blob/master/src/views/Header/Header.js) - 卡片堆栈的标题视图
- [Tabs](https://github.com/react-community/react-navigation/blob/master/src/views/TabView/TabView.js) - 一个可配置的switcher / pager
- [Drawer](https://github.com/react-community/react-navigation/blob/master/src/views/Drawer/DrawerView.js) - 带有一个从左侧滑入的抽屉的视图

## [Transitioner](/docs/Transitioner)
`Transitioner` 在转换过程中管理动画，可用于构建完全自定义的导航视图。 它在 `CardStack` 视图中使用。 [在这里了解更多关于`Transitioner` 的信息。](/docs/Transitioner)