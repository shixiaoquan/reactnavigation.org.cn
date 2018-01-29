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
The `Reset` action wipes the whole navigation state and replaces it with the result of several actions.

- `index` - *number* - required - Index of the active route on `routes` array in navigation `state`.
- `actions` - *array* - required - Array of Navigation Actions that will replace the navigation state.
- `key` - *string or null* - optional - If set, the navigator with the given key will reset. If null, the root navigator will reset.

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
#### How to use the `index` parameter
The `index` param is used to specify the current active route.

eg: given a basic stack navigation with two routes `Profile` and `Settings`.
To reset the state to a point where the active screen was `Settings` but have it stacked on top of a `Profile` screen, you would do the following:

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

Go back to previous screen and close current screen. `back` action creator takes in one optional parameter:
- `key` - *string or null* - optional - If set, navigation will go back from the given key. If null, navigation will go back from the currently active route.

```js
import { NavigationActions } from 'react-navigation'

const backAction = NavigationActions.back({
  key: 'Profile'
})
this.props.navigation.dispatch(backAction)

```

### SetParams

When dispatching `SetParams`, the router will produce a new state that has changed the params of a particular route, as identified by the key

- `params` - *object* - required - New params to be merged into existing route params
- `key` - *string* - required - Route key that should get the new params

```js
import { NavigationActions } from 'react-navigation'

const setParamsAction = NavigationActions.setParams({
  params: { title: 'Hello' },
  key: 'screen-123',
})
this.props.navigation.dispatch(setParamsAction)

```
