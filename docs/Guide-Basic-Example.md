---
id: Guide-Basic-Example
title:基础范例
sidebar_label: 基础范例
---

<!--# Hello Mobile Navigation-->

让我们使用React Navigation创建一个兼容Android和iOS的简单聊天类应用。

## 设置和安装

首先，确保你[React Native环境配置完成](http://facebook.github.io/react-native/docs/getting-started.html)。 然后，创建一个新项目并添加`react-navigation`：

```sh
# Create a new React Native App
react-native init SimpleApp
cd SimpleApp

# Install the latest version of react-navigation from npm
npm install --save react-navigation

# Run the new app
react-native run-android
# or:
react-native run-ios
```

如果你在使用 `create-react-native-app` 而不是 `react-native init`，请按如下操作:

```sh
# Create a new React Native App
create-react-native-app SimpleApp
cd SimpleApp

# Install the latest version of react-navigation from npm
npm install --save react-navigation

# Run the new app
npm start

# This will start a development server for you and print a QR code in your terminal.
```

确保您可以看到示例应用程序在iOS和/或Android上成功运行：
<figure class="half">
    <img src="https://reactnavigation.org/assets/examples/bare-project-android.png" width="300">
    <img src="https://reactnavigation.org/assets/examples/bare-project-iphone.png" width="300">
</figure>

我们希望在iOS和Android上共享代码，所以我们先删除index.js的内容（或者是index.ios.js和index.android.js的内容，如果你使用的React Native是0.49之前的版本），然后用`import './App'`替换它。这之后，我们需要为我们的应用程序的实现创建一个新的文件`App.js`（如果您使用`create-react-native-app`，则已经完成）

## 介绍 Stack Navigator

对于我们的应用来说，之所以使用`StackNavigator`，因为从概念上讲，我们想要获得一个`card stack`的运动效果，把每个新页面放在堆栈的顶部，返回时把该页面从堆栈顶部移除。 让我们从一个页面开始：

```js
import React from 'react';
import {
  AppRegistry,
  Text,
} from 'react-native';
import { StackNavigator } from 'react-navigation';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };
  render() {
    return <Text>Hello, Navigation!</Text>;
  }
}

export const SimpleApp = StackNavigator({
  Home: { screen: HomeScreen },
});

AppRegistry.registerComponent('SimpleApp', () => SimpleApp);
```

如果你使用的是 `create-react-native-app`，那么现在的`App.js`将要改为如下所示：

```js
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome'
  };
  render() {
    return <Text>Hello, Navigation!</Text>;
  }
}

const SimpleApp = StackNavigator({
  Home: { screen: HomeScreen }
});

export default class App extends React.Component {
  render() {
    return <SimpleApp />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

```

页面的`title`可以在[static `navigationOptions`](/docs/Screen-Nav-Options)）中配置，这里还有很多选项可以用来设置页面的显示

现在iPhone和Android应用程序都应该显示相同的页面：
<figure class="half">
    <img src="https://reactnavigation.org/assets/examples/first-screen-android.png" width="300">
    <img src="https://reactnavigation.org/assets/examples/first-screen-iphone.png" width="300">
</figure>

## 新增一个页面

在`App.js`中新增一个名为`ChatScreen`的页面，将其放在`HomeScreen`下面

```js
// ...

class HomeScreen extends React.Component {
    //...
}

class ChatScreen extends React.Component {
  static navigationOptions = {
    title: 'Chat with Lucy',
  };
  render() {
    return (
      <View>
        <Text>Chat with Lucy</Text>
      </View>
    );
  }
}

```

然后我们可以在连接到`ChatScreen`的`HomeScreen`组件上添加一个按钮：我们通过设置要跳转到的页面的`RouteName`，来使用[screen navigation prop](/docs/navigators/navigation-prop)提供的`navigate`方法，这次是`Chat`

```js
class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Text>Hello, Chat App!</Text>
        <Button
          onPress={() => navigate('Chat')}
          title="Chat with Lucy"
        />
      </View>
    );
  }
}
```

(*别忘了从`react-native`中导入`View ` 和 `Button`* `import { AppRegistry, Text, View, Button } from 'react-native';`)

但是，只有我们告诉`StackNavigator`，`Chat`页面的位置，方法才会生效，如下所示：

```js
export const SimpleApp = StackNavigator({
  Home: { screen: HomeScreen },
  Chat: { screen: ChatScreen },
});
```

现在，你可以跳转到新的页面，然后返回：
<figure class="half">
    <img src="https://reactnavigation.org/assets/examples/first-navigation-android.png" width="300">
    <img src="https://reactnavigation.org/assets/examples/first-navigation-iphone.png" width="300">
</figure>

## 传参

将一个名字硬编码到`ChatScreen`中并非理想的做法。 如果我们可以传递一个名字用来渲染，那么它会更有用，所以让我们来这么做吧。

除了在导航函数中指定目标`routeName`外，我们还可以传递将被放入新路由的参数。 首先，我们编辑“HomeScreen”组件，将`user`参数传递给路由。

```js
class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Text>Hello, Chat App!</Text>
        <Button
          onPress={() => navigate('Chat', { user: 'Lucy' })}
          title="Chat with Lucy"
        />
      </View>
    );
  }
}
```

然后，我们可以编辑ChatScreen组件来显示我们的通过路由传入的`user`参数：

```js
class ChatScreen extends React.Component {
  // Nav options can be defined as a function of the screen's props:
  static navigationOptions = ({ navigation }) => ({
    title: `Chat with ${navigation.state.params.user}`,
  });
  render() {
    // The screen's current route is passed in to `props.navigation.state`:
    const { params } = this.props.navigation.state;
    return (
      <View>
        <Text>Chat with {params.user}</Text>
      </View>
    );
  }
}
```

Now you can see the name when you navigate to the Chat screen. Try changing the `user` param in `HomeScreen` and see what happens!
现在，可以在跳转到`Chat`页面时看到传递过来的名字。 尝试改变`HomeScreen`中的`user`参数，看看会发生什么！
<figure class="half">
    <img src="https://reactnavigation.org/assets/examples/first-navigation-android.png" width="300">
    <img src="https://reactnavigation.org/assets/examples/first-navigation-iphone.png" width="300">
</figure>
