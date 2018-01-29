---
 id: Navigation-Actions
title: Navigation事件
sidebar_label: Navigation事件
---

<!-- # Navigation Actions -->

所有导航操作都会返回一个可以使用`navigation.dispatch()`方法发送给路由的对象。

如果你想分发react-navigation的事件，你必须使用该库提供的·`action creators`

支持以下事件：

* [Navigate](#Navigate) - 导航到其他路由
* [Reset](#Reset) - 使用新的`state`替换当前的`state`
* [Back](#Back) - 返回到上一个`state`
* [Set Params](#SetParams) - 设置给定的路由的参数
* [Init](#Init) - 如果状态未定义，则用于初始化第一个状态

动作创建函数定义了`toString()`方法来返回事件类型，这使得第三方的Redux库很容易使用，包括[`redux-actions`](https://github.com/reduxactions/redux-actions)和[`redux-saga`](https://github.com/redux-saga/redux-saga)。

### Navigate
`Navigate`将使用`Navigate`事件执行的结果来更新当前的状态

- `routeName` - *字符串* - 必须 - 已在应用程序的路由器中注册的目标路由名称
- `params` - *Object* - 可选 - 合并到目标路由中的参数
- `action` - *Object* - 可选 - (高级）如果页面是`navigator`，则是在子路由中运行的子操作。 有关`action`的完整列表，请参阅[Actions Doc](/docs/Navigation-Actions)）。

```js
import { NavigationActions } from 'react-navigation'

const navigateAction = NavigationActions.navigate({

  routeName: 'Profile',

  params: {},

  action: NavigationActions.navigate({ routeName: 'SubProfileRoute'})
})

this.props.navigation.dispatch(navigateAction)

```

### Reset
`Reset`方法清除了所有的`navigation`属性，使用多个方法的结果替换了

- `index` - *数字型* - 必选项 - `navigation.state.routers`数组中当前`router`的索引
- `actions` - *数组* - 必选项 - 将要替换`navigation.state`的Action数组
- `key` - *字符串 或 null* - 可选项 - `navigator`将会使用设置的key重置；如果是`null`，根`navigator`将会重置

```js
import { NavigationActions } from 'react-navigation'

const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Profile'})
  ]
})
this.props.navigation.dispatch(resetAction)

```
#### 如何使用`index`参数
`index`参数用于指定当前的路由。

例如: 给定一个有两个路由（`Profile` 和 `Settings`）的基础班`stack navigation`,如果要将状态重置为：当前页面是`Settings`，但是它要在`Profile`上层，则需要执行以下操作：

```js
import { NavigationActions } from 'react-navigation'

const resetAction = NavigationActions.reset({
  index: 1,
  actions: [
    NavigationActions.navigate({ routeName: 'Profile'}),
    NavigationActions.navigate({ routeName: 'Settings'})
  ]
})
this.props.navigation.dispatch(resetAction)

```

### Back
返回到上一个页面，并且关闭当前页面。`back`方法带了一个可选的参数：
- `key` - *字符串 或 null* - 可选项 - 如果设置了，`navigation`将从key对应的页面返回；如果是`null`，则从当前页面返回

```js
import { NavigationActions } from 'react-navigation'

const backAction = NavigationActions.back({
  key: 'Profile'
})
this.props.navigation.dispatch(backAction)

```

### SetParams
当调用 `SetParams`方法时，路由将会返回一个改变了特定路由参数的状态

- `params` - *对象* - 必选项 - 被合并到当前路由参数中的新的参数
- `key` - *字符串* - 必选项 - 应该获得新参数的路由标识

```js
import { NavigationActions } from 'react-navigation'

const setParamsAction = NavigationActions.setParams({
  params: { title: 'Hello' },
  key: 'screen-123',
})
this.props.navigation.dispatch(setParamsAction)

```
