---
 id: StackRouter
title: StackRouter
sidebar_label: StackRouter
---

<!-- # StackRouter -->

管理逻辑导航堆栈，包括推送、弹出和处理路径分析以创建深度堆栈。

我们来看看一个简单的堆栈路由：

```js
const MyApp = StackRouter({
  Home: { screen: HomeScreen },
  Profile: { screen: ProfileScreen },
}, {
  initialRouteName: 'Home',
})
```


### RouteConfig
基本的堆叠路由需要一个路由配置对象。 这是一个示例配置：

```js
const MyApp = StackRouter({ // This is the RouteConfig:
  Home: {
    screen: HomeScreen,
    path: '',
  },
  Profile: {
    screen: ProfileScreen,
    path: 'profile/:name',
  },
  Settings: {
    // This can be handy to lazily require a screen:
    getScreen: () => require('Settings').default,
    // Note: Child navigators cannot be configured using getScreen because
    // the router will not be accessible. Navigators must be configured
    // using `screen: MyNavigator`
    path: 'settings',
  },
});
```

配置中的每个项目都可能有以下内容：

- `path` - 指定为堆栈中项目而解析的路径和参数
- `screen` - 指定页面组件或子 `navigator`
- `getScreen` - 为页面组件设置一个懒加载（不包括 `navigator` ）


### StackConfig
也传递给堆栈路由的配置选项。

- `initialRouteName` - 堆栈第一次加载时默认路由的 `routeName`
- `initialRouteParams` - 初始路由的默认参数
- `paths` - 提供一个从 `routeName` 到路径配置的映射，它复写了 `routeConfigs` 中的路径

### Supported Actions
堆叠路由可以响应以下导航操作。 如果可能的话，路由通常会将动作处理委托给子路由。

- Navigate - 如果 `routeName`匹配路由的 `routeConfigs` 中的某一个，将会在堆栈上推送新的路由
- Back - 返回
- Reset - 清除堆栈并提供新的操作来创建全新的导航状态
- SetParams - 页面分发的操作，用于更改当前路线的参数。
