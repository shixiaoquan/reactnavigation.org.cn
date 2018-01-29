---
 id: Routers
title: 路由概述
sidebar_label: 路由概述
---

<!-- # Routers -->

路由定义组件的 `navigation` 状态，并允许开发人员定义可处理的路径和操作。

## 内置的路由

`react-navigation` 附带的一些标准路由：

- [StackRouter](/docs/routers/stack)
- [TabRouter](/docs/routers/tab)


## 使用路由
要手动创建 `navigation` ，请在组件上放置一个静态 `router` 。 （要快速制作带有内置组件的 `navigation` ，可以使用 [内置 `navigation`](/docs/Navigators/) 代替）

```js
class MyNavigator extends React.Component {
    static router = StackRouter(routes, config);
    ...
}
```

现在，你可以在另一个 `navigation` 中将此组件用作页面，而 `MyNavigator` 的导航逻辑将由此 `StackRouter` 定义。

## 自定义路由
请参阅 [定制路由API规范](/docs/RoutersAPI) 了解 `StackRouter` 和 `TabRouter` 的API。 您可以根据需要复写原路由的功能：

### Custom Navigation Actions
为了复写导航行为，可以在 `getStateForAction` 中重写 `navigation` 状态逻辑，并手动操作 `routes` 和 `index`。

```js
const MyApp = StackNavigator({
  Home: { screen: HomeScreen },
  Profile: { screen: ProfileScreen },
}, {
  initialRouteName: 'Home',
})

const defaultGetStateForAction = MyApp.router.getStateForAction;

MyApp.router.getStateForAction = (action, state) => {
  if (state && action.type === 'PushTwoProfiles') {
    const routes = [
      ...state.routes,
      {key: 'A', routeName: 'Profile', params: { name: action.name1 }},
      {key: 'B', routeName: 'Profile', params: { name: action.name2 }},
    ];
    return {
      ...state,
      routes,
      index: routes.length - 1,
    };
  }
  return defaultGetStateForAction(action, state);
};
```

### Blocking Navigation Actions
有时您可能想要阻止某些导航活动，具体取决于您的路由。

```js
import { NavigationActions } from 'react-navigation'

const MyStackRouter = StackRouter({
  Home: { screen: HomeScreen },
  Profile: { screen: ProfileScreen },
}, {
  initialRouteName: 'Home',
})

const defaultGetStateForAction = MyStackRouter.router.getStateForAction;

MyStackRouter.router.getStateForAction = (action, state) => {
  if (
    state &&
    action.type === NavigationActions.BACK &&
    state.routes[state.index].params.isEditing
  ) {
    // Returning null from getStateForAction means that the action
    // has been handled/blocked, but there is not a new state
    return null;
  }

  return defaultGetStateForAction(action, state);
};
```


### Handling Custom URIs
也许你的应用具有内置路由无法处理的特殊URI。 你可以扩展路由的`getActionForPathAndParams`方法。

```js

import { NavigationActions } from 'react-navigation'

const MyApp = StackNavigator({
  Home: { screen: HomeScreen },
  Profile: { screen: ProfileScreen },
}, {
  initialRouteName: 'Home',
})
const previousGetActionForPathAndParams = MyApp.router.getActionForPathAndParams;

Object.assign(MyApp.router, {
  getActionForPathAndParams(path, params) {
    if (
      path === 'my/custom/path' &&
      params.magic === 'yes'
    ) {
      // returns a profile navigate action for /my/custom/path?magic=yes
      return NavigationActions.navigate({
        routeName: 'Profile',
        action: NavigationActions.navigate({
          // This child action will get passed to the child router
          // ProfileScreen.router.getStateForAction to get the child
          // navigation state.
          routeName: 'Friends',
        }),
      });
    }
    return previousGetActionForPathAndParams(path, params);
  },
});
```
