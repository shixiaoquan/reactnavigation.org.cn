---
 id: Redux-Integration
title: Redux集成
sidebar_label: Redux集成
---

<!-- # Redux Integration -->

### Overview For Redux Integration
1. 想要在redux中处理你的应用程序的 `navigation` 状态，您可以将自己的 `navigation` 属性传递给 `navigator ` 。

2. 一旦将自己的 `navigation` 属性传递给 `navigator ` ，默认的[`navigation`](https://reactnavigation.org/docs/navigators/navigation-prop) 属性就会被销毁。你可能需要传递你想要访问的 `navigation` 属性。通常 [`state`](https://reactnavigation.org/docs/navigators/navigation-prop#state-The-screen's-current-stateroute) 和 [`dispatch`](https://reactnavigation.org/docs/navigators/navigation-prop#dispatch-Send-an-action-to-the-router) 的属性会被传递给 `navigator ` 。你将在本教程中学习如何传递这些属性。 既然你已经销毁了默认的属性，如果你尝试调用一些你没有明确传递的东西，那么它将不起作用。 因此，如果你没有将`dispatch`传递给 `navigator ` ，并且只传递了 `state` ，那么您将无法访问组件中的 `dispatch` 方法。

3.  `state` 将从被分配的 `reducer ` 到处理 `navigation` 状态和将成为 `redux` 的默认 `dispatch` 的 `dispatch` 。因此你将能够使用 `this.props.navigation.dispatch(ACTION)` 调度正常的  `redux` 方法。 `reducer ` 将根据调度的方法更新 `navigation` 状态，新的 `navigation` 状态将会被传递给 `navigator ` 。

### 有关Redux集成的详细信息
使用 `redux` ，你的应用程序的状态将由 `reducer ` 定义。每个导航路由都有一个叫做 `getStateForAction` 的 `reducer ` 。以下是在集成了 `redux` 的应用中如何使用 `navigator ` 的最简单示例：

```es6
import { addNavigationHelpers } from 'react-navigation';

const AppNavigator = StackNavigator(AppRouteConfigs);

const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('Login'));

const navReducer = (state = initialState, action) => {
  const nextState = AppNavigator.router.getStateForAction(action, state);

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
};

const appReducer = combineReducers({
  nav: navReducer,
  ...
});

class App extends React.Component {
  render() {
    return (
      <AppNavigator navigation={addNavigationHelpers({
        dispatch: this.props.dispatch,
        state: this.props.nav,
      })} />
    );
  }
}

const mapStateToProps = (state) => ({
  nav: state.nav
});

const AppWithNavigationState = connect(mapStateToProps)(App);

const store = createStore(appReducer);

class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}
```

一旦你这样做，你的 `navigation` 状态将会保存到你的 `redux` 存储中，你可以使用 `redux` 的调度功能来触发 `navigation` 的事件

请记住，当 `navigator ` 被给予一个  `navigation` 属性时，它会放弃对其内部状态的控制。这意味着你现在负责管理其状态、处理深层链接[Handling the Hardware Back Button in Android](#Handling-the-Hardware-Back-Button-in-Android)、等等

 `navigation` 状态在嵌套时自动从一个 `navigator ` 传递到另一个 `navigator ` ，请注意：为了使子 `navigator ` 从父 `navigator ` 中接收状态，你应该将其定义为一个页面

把这些应用到上面的例子中，你可以定义包含了一个嵌套的 `TabNavigator` 的 `AppNavigator` 来替代之前的，如下所示：

```es6
const AppNavigator = StackNavigator({
  Home: { screen: MyTabNavigator },
});
```

这样，只要在 `AppWithNavigationState` 中完成了 将 `AppNavigator`  `connect` 到Redux， `MyTabNavigator` 将自动获得像访问 `navigation` 属性一样访问 `navigation` 状态的权限。

## 所有的栗子

如果你想自己尝试一下，这儿有一个使用Redux的示例应用 [戳我](https://github.com/react-community/react-navigation/tree/master/examples/ReduxExample)

## Mocking tests
为了使jest测试能够与你的react-navigation应用一起工作，你需要修改 `package.json` 中jest的预设配置信息，参阅[这儿](https://facebook.github.io/jest/docs/tutorial-react-native.html#transformignorepatterns-customization):

```json
"jest": {
  "preset": "react-native",
  "transformIgnorePatterns": [
    "node_modules/(?!(jest-)?react-native|react-navigation)"
  ]
}
```

## Handling the Hardware Back Button in Android
使用一下的代码片段，你的导航组件将能够感知返回键的点击事件，并将正确处理与堆栈之间的交互。这在Android上非常有用。

```es6
import React from "react";
import { BackHandler } from "react-native";
import { addNavigationHelpers, NavigationActions } from "react-navigation";

const AppNavigation = TabNavigator(
  {
    Home: { screen: HomeScreen },
    Settings: { screen: SettingScreen }
  }
);

class ReduxNavigation extends React.Component {
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
  }
  onBackPress = () => {
    const { dispatch, nav } = this.props;
    if (nav.index === 0) {
      return false;
    }
    dispatch(NavigationActions.back());
    return true;
  };

  render() {
    const { dispatch, nav } = this.props;
    const navigation = addNavigationHelpers({
      dispatch,
      state: nav
    });

    return <AppNavigation navigation={navigation} />;
  }
}
