---
 id: Screen-Nav-Options
title: Navigation配置项
sidebar_label: Navigation配置项
---

<!-- # Screen Navigation Options -->

每个页面在父`navigator`中如何呈现，都有几项是可以配置的

#### 指定每个选项的两种方法

**静态配置：**
每个`navigation`选项都可以直接分配:

```js
class MyScreen extends React.Component {
  static navigationOptions = {
    title: 'Great',
  };
  ...
```

**动态配置：**
或者是一个函数，它接受一下参数，并返回一个`navigationOptions`，该选项将覆盖已定义路由和`navigator`的`navigationOptions`

- `props` - 页面组件可用的相同属性
  - `navigation` - 页面的[navigation prop](/docs/navigators/navigation-prop)，该`prop`包含`navigation.state`中的页面路由
  - `screenProps` - 从导航组件上层传递的属性
  - `navigationOptions` - 如果未提供新值，将使用默认或之前的选项

```js
class ProfileScreen extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: navigation.state.params.name + "'s Profile!",
    headerRight: <Button color={screenProps.tintColor} {...} />,
  });
  ...
```

`screenProps`在渲染时被传入，如果页面位于SimpleApp的`navigator`中：

```js
<SimpleApp
  screenProps={{tintColor: 'blue'}}
  // navigation={{state, dispatch}} // optionally control the app
/>
```

#### 通用的 Navigation Options
在每个`navigator`之间，`navigationOptions`的`title`选项都是通用的，它被用于设置给定页面的标题

```js
class MyScreen extends React.Component {
  static navigationOptions = {
    title: 'Great',
  };
  ...
```

与仅能由navigator视图使用的其他`navigationOptions`不同，环境可以使用`title`选型更新浏览器窗口或应用切换器的标题

#### 默认的 Navigation Options
常见的是在页面中定义`navigationOptions`，但是有时候在`navigator`中定义`navigationOptions`是非常有用的

想象下面的情况：
你的`TabNavigator`代表应用中的一个页面，并且嵌套在一个顶层的`StackNavigator`中：

```
StackNavigator({
  route1: { screen: RouteOne },
  route2: { screen: MyTabNavigator },
});
```

现在，你想改变标题栏的颜色当`route2`处于激活状态时。这对于`route1`来说很简单，对于`route2`本应该也很简单。这就是为什么默认的`navigationOptions`要这么设置，-他们只需在`navigator`上进行简单的设置：

```js
const MyTabNavigator = TabNavigator({
  profile: ProfileScreen,
  ...
}, {
  navigationOptions: {
    headerTintColor: 'blue',
  },
});
```

请注意，你仍然可以决定 **也** 在页级的页面上指定`navigationOptions`，例如上面的`ProfileScreen`。页面的 `navigationOptions` 将与来自`navigator`的默认`navigationOptions`通过key进行合并。只要`navigator`和页面定义了相同的选项（例如：`headerTintColor`），将会按照页面的配置执行。因此，你可以通过一下操作，在`ProfileScreen`处于激活状态时修改`headerTintColor`（标题栏的文本和图标颜色）：

```js
class ProfileScreen extends React.Component {
  static navigationOptions = {
    headerTintColor: 'black',
  };
  ...
}
```

## Navigation Option 相关
可用的`navigationOptions`列表，取决于页面添加到的`navigator`

检查可用项:

- [`drawer navigator`](/docs/DrawerNavigator#Screen-Navigation-Options)
- [`stack navigator`](/docs/StackNavigator#Screen-Navigation-Options)
- [`tab navigator`](/docs/TabNavigator#Screen-Navigation-Options)
