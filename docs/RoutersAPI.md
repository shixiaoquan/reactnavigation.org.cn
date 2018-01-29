---
 id: RoutersAPI
title: 自定义路由接口
sidebar_label: 自定义路由接口
---

<!-- ## Custom Router API -->

您可以通过构建具有以下功能的对象来制作自己的路由：

```js
const MyRouter = {
  getStateForAction: (action, state) => ({}),
  getActionForPathAndParams: (path, params) => null,
  getPathAndParamsForState: (state) => null,
  getComponentForState: (state) => MyScreen,
  getComponentForRouteName: (routeName) => MyScreen,
};

// Now, you can make a navigator by putting the router on it:
class MyNavigator extends React.Component {
  static router = MyRouter;
  render() {
    ...
  }
}
```

![路由管理着URI、操作和导航状态之间的关系](https://reactnavigation.org/assets/routers-concept-map.png)


### `getStateForAction(action, state)`

定义 `navigation` 状态是为了响应给定的操作。当一个 `action` 被传入`props.navigation.dispatch（`，或者当任何一个辅助函数被调用，比如 `navigation.navigate（` ，该方法就会执行。

通常这中情况应该返回一个以下形式的 `navigation` 状态：

```
{
  index: 1, // identifies which route in the routes array is active
  routes: [
    {
      // Each route needs a name to identify the type.
      routeName: 'MyRouteName',

      // A unique identifier for this route in the routes array:
      key: 'myroute-123',
      // (used to specify the re-ordering of routes)

      // Routes can have any data, as long as key and routeName are correct
      ...randomRouteData,
    },
    ...moreRoutes,
  ]
}
```

如果路由在外部处理了这个动作，或者想要在不改变 `navigation` 状态的情况下修改它，这个函数将会返回`null`。

### `getComponentForRouteName(routeName)`
返回给定路由名称的子组件或 `navigator`。

路由的 `getStateForAction` 方法输出一个这样的状态：
```js
{
  index: 1,
  routes: [
    { key: 'A', routeName: 'Foo' },
    { key: 'B', routeName: 'Bar' },
  ],
}
```

基于状态中的 `routeNames`，路由负责在调用 `router.getComponentForRouteName('Foo')` 或 `router.getComponentForRouteName('Bar')`方法时返回有效的组件。

### `getComponentForState(state)`
返回对应 `state` 的组件

### `getActionForPathAndParams(path, params)`
返回用户导航到此路径时应使用的可选导航操作，并提供可选的查询参数。

### `getPathAndParamsForState(state)`
返回可以放入URL的路径和参数，可以将用户链接到应用中的相同位置。

从这里输出的路径/参数应该在传回到路由的getActionForPathAndParams方法时形成一个动作。 一旦执行完 `getStateForAction` 方法，应该会把你带到一个类似的状态。

### `getScreenOptions(navigation, screenProps)`
用于检索屏幕的导航选项。 必须提供页面当前的 `navigation` 属性和可选的 `navigation` 属性以及可能需要消耗的其他属性。

- `navigation` - 这是页面将使用的 `navigation` 属性，其中状态是指页面的路由/状态。 调度（Dispatch）将触发该屏幕上下文中的操作。
- `screenProps` - 您的导航选项可能需要消耗的其他属性
- `navigationOptions` - The previous set of options that are default or provided by the previous configurer 默认的或由之前的配置器提供的 `navigation` 选项

在一个示例的视图中，也许你需要获取已配置的标题：

```js
// First, prepare a navigation prop for your child, or re-use one if already available.
const screenNavigation = addNavigationHelpers({
  // In this case we use navigation.state.index because we want the title for the active route.
  state: navigation.state.routes[navigation.state.index],
  dispatch: navigation.dispatch,
});
const options = this.props.router.getScreenOptions(screenNavigation, {});
const title = options.title;
```
