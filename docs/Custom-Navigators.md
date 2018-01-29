---
 id: Custom-Navigators
title: 自定义Navigator
sidebar_label: 自定义Navigator
---

<!-- # Custom Navigators -->

任何具有[router](/docs/Routers/)的React组件就是一个`navigator`。这是一个使用[router's API](/docs/RoutersAPI/)获取用于渲染的当前组件的基础版组件：

```js
class MyNavigator extends React.Component {
  static router = MyRouter;
  render() {
    const { state, dispatch } = this.props.navigation;
    const { routes, index } = state;

    // Figure out what to render based on the navigation state and the router:
    const Component = MyRouter.getComponentForState(state);

    // The state of the active child screen can be found at routes[index]
    let childNavigation = { dispatch, state: routes[index] };
    // If we want, we can also tinker with the dispatch function here, to limit
    // or augment our children's actions

    // Assuming our children want the convenience of calling .navigate() and so on,
    // we should call addNavigationHelpers to augment our navigation prop:
    childNavigation = addNavigationHelpers(childNavigation);

    return <Component navigation={childNavigation} />;
  }
}
```

## Navigation 属性
发送给`navigator`的Navigation属性只包含`state`和`dispatch`。这是`navigator`的当前状态，以及发送事件请求的事件通道

所有`navigator`都是受控制的组件：它们总是显示通过`props.navigation.state`进入的内容，它们改变状态的唯一方法是将操作发送到`props.navigation.dispatch`。

`navigator`可以通过[定制他们的路由](/docs/Routers/)为父`navigator`指定自定义行为。 例如，`navigator`可以通过从`router.getStateForAction`返回 `null` 来指定什么时候应该阻止动作。 或者，`navigator`可以通过重写`router.getActionForPathAndParams`来输出相关的导航动作，并在`router.getStateForAction`中处理这个动作。

### Navigation 状态
传递给 `navigator` 的 `props.navigation.state` 的`navigator`状态具有如下的结构：

```
{
  index: 1, // identifies which route in the routes array is active
  routes: [
    {
      // Each route needs a name, which routers will use to associate each route
      // with a react component
      routeName: 'MyRouteName',

      // A unique id for this route, used to keep order in the routes array:
      key: 'myroute-123',

      // Routes can have any additional data. The included routers have `params`
      ...customRouteData,
    },
    ...moreRoutes,
  ]
}
```

### Navigation Dispatchers
`navigator` 可以调度导航事件，例如“转到指定的URI”，“返回”。

如果处理成功，调度程序将返回“true”，否则返回“false”。

## API for building custom navigators
为帮助开发人员实现自定义导航器，React Navigation提供了以下公共方法：

### `createNavigator`
该公共方法以标准方式将 [router](/docs/Routers/) 和 [navigation view](/docs/Views/) 组合在一起：
```js
const MyApp = createNavigator(MyRouter)(MyView);
```

这一切幕后做的事情是这样的：
```js
const MyApp = ({ navigation }) => (
  <MyView router={MyRouter} navigation={navigation} />
);
MyApp.router = MyRouter;
```

### `addNavigationHelpers`
使用`state`和`dispatch`来创建一个空的 `navigator` 的 `navigation` 属性，并且在页面的 `navigation` 属性中增加所有的各种功能，比如`navigation.navigate()`和`navigation.goBack()`。 这些函数只是创建 `action` 并将其发送到 `dispatch`的助手。

### `createNavigationContainer`
如果您希望您的 `navigator` 可用作顶级组件（无需导入 `navigation` 属性），则可以使用`createNavigationContainer`。 当 `navigation` 属性丢失时，此公共方法将使您的 `navigator` 像顶级 `navigator` 一样工作。 它将管理应用状态，并与应用级导航功能（如处理传入和传出链接、Android后退按钮行为）进行集成。
























