---
 id: Guide-Nested
title: 嵌套导航
sidebar_label: 嵌套导航
---

<!-- # Nesting Navigators -->

组合使用各种形式的导航在移动应用中是常见的，React Navination中的路由和导航是可组合的，这使你可以为你的应用定义一个复杂的导航结构

对于我们的聊天应用程序，我们希望在第一个屏幕上放置几个Tab，以查看最近的聊天记录或所有联系人。

## 介绍 Tab Navigator

在`App.js`中创建一个新的`TabNavigator`：

```js
import { TabNavigator } from "react-navigation";

class RecentChatsScreen extends React.Component {
  render() {
    return <Text>List of recent chats</Text>
  }
}

class AllContactsScreen extends React.Component {
  render() {
    return <Text>List of all contacts</Text>
  }
}

const MainScreenNavigator = TabNavigator({
  Recent: { screen: RecentChatsScreen },
  All: { screen: AllContactsScreen },
});
```

If the `MainScreenNavigator` was rendered as the top-level navigator component, it would look like this:
如果`MainScreenNavigator `渲染为顶部导航组件，则它将如下所示：
<figure class="half">
    <img src="https://reactnavigation.org/assets/examples/simple-tabs-android.png" width="300">
    <img src="https://reactnavigation.org/assets/examples/simple-tabs-iphone.png" width="300">
</figure>

## 将导航器嵌套到页面中

我们希望这些选项卡在应用程序的首屏中可见，但堆栈中的新页面应该覆盖这些选项卡。

让我们将`TabNavigator`作为页面添加到我们[上一节](/docs/Guide-Intro)中设置的顶层`StackNavigator`中.

```js
const SimpleApp = StackNavigator({
  Home: { screen: MainScreenNavigator },
  Chat: { screen: ChatScreen },
});
```

因为`MainScreenNavigator`正在被当作一个页面使用，所以我们可以给他设置`navigationOptions`

```js
const SimpleApp = StackNavigator({
  Home: {
    screen: MainScreenNavigator,
    navigationOptions: {
      title: 'My Chats',
    },
  },
  Chat: { screen: ChatScreen },
})
```

让我们也为链接到聊天页面的每个标签添加一个按钮：

```js
<Button
  onPress={() => this.props.navigation.navigate('Chat', { user: 'Lucy' })}
  title="Chat with Lucy"
/>
```

现在我们把一个导航器放在另一个导航器中，这样就可以在导航器之间使用`navigate`方法了：
<figure class="half">
    <img src="https://reactnavigation.org/assets/examples/nested-android.png" width="300">
    <img src="https://reactnavigation.org/assets/examples/nested-iphone.png" width="300">
</figure>

## 将导航器嵌套在组件中

有时需要嵌套一个被包装的导航器到组件中。 这在导航器只占用屏幕一部分空间的情况下非常有用。 为了将子导航器连接到导航树中，需要父导航器的`navigation`属性。

```js
const SimpleApp = StackNavigator({
  Home: { screen: NavigatorWrappingScreen },
  Chat: { screen: ChatScreen },
});
```

在这种情况下，`NavigatorWrappingScreen `不是导航器，但是它将导航器作为其输出的一部分。

如果此导航器呈现空白，则将`<View>`更改为`<View style = {{flex：1}}>`。

```js
class NavigatorWrappingScreen extends React.Component {
  render() {
    return (
      <View>
        <SomeComponent/>
        <MainScreenNavigator/>
      </View>
    );
  }
}
```

To wire `MainScreenNavigator` into the navigation tree, we assign its `router` to the wrapping component. This makes `NavigatorWrappingScreen` "navigation aware", which tells the parent navigator to pass the navigation object down. Since the `NavigatorWrappingScreen`'s `router` is overridden with the child navigator's `router`, the child navigator will receive the needed `navigation`.
为了将`MainScreenNavigator`连接到导航树中，我们将其`router`分配给包装组件。 这使得`NavigatorWrappingScreen`导航感知，它告诉父导航器向下传递导航对象。 由于`NavigatorWrappingScreen`的`router`被子导航器的`router`覆盖，因此子导航器将接收所需的`navigation`。

```js
class NavigatorWrappingScreen extends React.Component {
  render() {
    return (
      <View>
        <SomeComponent/>
        <MainScreenNavigator navigation={this.props.navigation}/>
      </View>
    );
  }
}
NavigatorWrappingScreen.router = MainScreenNavigator.router;
```
