---
 id: Navigators
title: Navigators
sidebar_label: Navigators
---

<!-- # Navigators -->

导航器允许你定义应用程序的导航结构。 导航器还可以渲染通用元素，例如可以配置标题栏和选项卡栏。

实际上导航器只是普通的React组件。

## 内置导航器

`react-navigation`包含以下功能来帮助你创建导航器:

- [StackNavigator](/docs/StackNavigator) - 一次只渲染一个页面，并提供页面之间跳转的方法。 当打开一个新的页面时，它被放置在堆栈的顶部
- [TabNavigator](/docs/TabNavigator) - 渲染一个选项卡，让用户可以在几个页面之间切换
- [DrawerNavigator](/docs/DrawerNavigator) - 提供一个从屏幕左侧滑入的抽屉

## 使用导航器渲染页面

导航器渲染的仅仅是React组件对应的应用页面。

要了解如何创建页面，请阅读以下内容：
- [Screen `navigation` prop](/docs/Screen-Navigation-Prop) 允许调用调用导航操作，例如打开另一个页面
- [Screen `navigationOptions`](/docs/Screen-Nav-Options) 定制导航器显示如何显示（例如标题栏的标题，选项卡的标签）

### 调用导航顶层组件

如果你想在同一级别使用`Navigator`，你可以使用`react `的[`ref`](https://facebook.github.io/react/docs/refs-and-the-dom.html#the- ref-callback-attribute)选项：

```js
import { NavigationActions } from 'react-navigation';

const AppNavigator = StackNavigator(SomeAppRouteConfigs);

class App extends React.Component {
  someEvent() {
    // call navigate for AppNavigator here:
    this.navigator && this.navigator.dispatch(
      NavigationActions.navigate({ routeName: someRouteName })
    );
  }
  render() {
    return (
      <AppNavigator ref={nav => { this.navigator = nav; }} />
    );
  }
}
```
请注意，这个解决方案只能用在顶级导航器上。

## 导航容器

当导航器属性丢失时，内置的导航器可以像顶级导航器一样自动运行。 此功能提供了一个透明的导航容器，这是顶级导航属性的来源。

在渲染其中内部的导航器时，导航器的属性是可选的。 当它丢失时，容器进入并管理自己的导航状态。 它还处理URL，外部链接和Android返回按钮的集成。

为了方便起见，内置的导航器具有这种能力，因为在视图后他们使用`createNavigationContainer`方法。 通常，导航器需要导航属性才能正常工作。

顶级导航员接受以下属性：

### `onNavigationStateChange(prevState, newState, action)`

每次导航器管理的导航状态发生变化都会被调用的函数。 它接收之前的状态，导航的新状态以及触发状态改变的事件。 默认情况下，它将状态的改变打印到控制台。

### `uriPrefix`

应用程序可能处理的URI前缀。 这将在处理[深层链接](/docs/Deep-Linking)以提取传递给路由的路径时使用。

















