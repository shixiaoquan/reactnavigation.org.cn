---
 id: TabNavigator
title: TabNavigator
sidebar_label: TabNavigator
---

<!-- # TabNavigator -->

用于使用`TabRouter`轻松设置带有多个选项卡的页面。 在线示例，请参阅 [our expo demo](https://exp.host/@react-navigation/NavigationPlayground).

```js
class MyHomeScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Home',
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('./chats-icon.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
  };

  render() {
    return (
      <Button
        onPress={() => this.props.navigation.navigate('Notifications')}
        title="Go to notifications"
      />
    );
  }
}

class MyNotificationsScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Notifications',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('./notif-icon.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
  };

  render() {
    return (
      <Button
        onPress={() => this.props.navigation.goBack()}
        title="Go back home"
      />
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26,
  },
});

const MyApp = TabNavigator({
  Home: {
    screen: MyHomeScreen,
  },
  Notifications: {
    screen: MyNotificationsScreen,
  },
}, {
  tabBarPosition: 'top',
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: '#e91e63',
  },
});
```

## API 定义

```js
TabNavigator(RouteConfigs, TabNavigatorConfig)
```

### RouteConfigs

`RouteConfigs`对象是一个从路由名称到路由配置的映射，他告诉导航该为路由呈现什么，参阅`StackNavigator`中的[example](/docs/api/navigators/StackNavigator.md#routeconfigs)

### TabNavigatorConfig

- `tabBarComponent` - 用作渲染`tab bar`的组件，例如`TabBarBottom`（这是iOS上的默认设置），`TabBarTop`（这是Android上的默认设置）。
- `tabBarPosition` - `tab bar`的位置, 可选值： `'top'` or `'bottom'`
- `swipeEnabled` - 是否允许滑动切换tab页
- `animationEnabled` - 是否在切换tab页时使用动画
- `configureTransition` - 给定`currentTransitionProps`和`nextTransitionProps`的函数，其返回一个配置对象，该对象用于描述tab页之间的动画
- `initialLayout` - 可以传递包含初始`height`和`width`的可选对象，用以防止[react-native-tab-view](https://github.com/react-native-community/react-native-tab-view#avoid-one-frame-delay)渲染中一个帧的延迟
- `tabBarOptions` - 配置`tab bar` ，详情见下文

传递到底层路由，用于修改导航逻辑的几个选项：

- `initialRouteName` - 第一次加载`tab bar`时路由的`routeName` 
- `order` - 定义了`tab bar`顺序的一个``routeNames`数组
- `paths` - 提供`routeName `到`path config`的映射，它覆盖了`routeConfigs`中设置的`path`。
- `backBehavior` - 返回按钮是否会导致`tab`切换到初始tab页？ 如果是，则设置为`initialRoute`，否则为`none`。 缺省为`initialRoute`。

### `TabBarBottom`的`tabBarOptions` (`TabBarBottom`为iOS的默认`tab bar`)

- `activeTintColor` - 当前选中的`tab bar`的文本颜色和图标颜色
- `activeBackgroundColor` - 当前选中的`tab bar`的背景色
- `inactiveTintColor` - 当前未选中的`tab bar`的文本颜色和图标颜色
- `inactiveBackgroundColor` - 当前未选中的`tab bar`的背景色
- `showLabel` - 是否显示`tab bar`的文本，默认是`true`
- `style` - `tab bar`的样式
- `labelStyle` - `tab bar`的文本样式
- `tabStyle` - `tab`页的样式
- `allowFontScaling` - 文本字体大小是否可以缩放取决于该设置，默认为true。

栗子:

```js
tabBarOptions: {
  activeTintColor: '#e91e63',
  labelStyle: {
    fontSize: 12,
  },
  style: {
    backgroundColor: 'blue',
  },
}
```

### `TabBarTop `的`tabBarOptions` (`TabBarTop `为Android的默认`tab bar`)
- `activeTintColor` - 当前选中的`tab bar`的文本颜色和图标颜色
- `inactiveTintColor` - 当前未选中的`tab bar`的文本颜色和图标颜色
- `showIcon` -  是否显示`tab bar`的图标，默认是`false`
- `showLabel` - 是否显示`tab bar`的文本，默认是`true`
- `upperCaseLabel` - 是否将文本转换为大小，默认是`true`
- `pressColor` - material design中的波纹颜色(仅支持Android >= 5.0)
- `pressOpacity` - 按下`tab bar`时的不透明度(仅支持iOS和Android < 5.0).
- `scrollEnabled` - 是否允许滑动切换
- `tabStyle` - tab页的样式
- `indicatorStyle` - tab 页指示符的样式 (tab页下面的一条线).
- `labelStyle` - `tab bar`的文本样式
- `iconStyle` - `tab bar`的图标样式
- `style` - `tab bar`的样式
- `allowFontScaling` - 文本字体大小是否可以缩放取决于该设置，默认为true。

栗子:

```js
tabBarOptions: {
  labelStyle: {
    fontSize: 12,
  },
  tabStyle: {
    width: 100,
  },
  style: {
    backgroundColor: 'blue',
  },
}
```

### Screen Navigation Options

#### `title`

可以用作`headerTitle` 和 `tabBarLabel`后备的通用标题。（`headerTitle` 和 `tabBarLabel`未设置时，就会使用`title`的值替代）

#### `tabBarVisible`

`tab bar`是否可见，缺省是`true`

#### `swipeEnabled`

是否允许tab页之间滑动切换，如果未设置，则使用`TabNavigatorConfig`的`swipeEnabled`选项

#### `tabBarIcon`

用于在`tab bar`中展示的React元素或一个传入`{ focused: boolean, tintColor: string }`返回`React.Node`的函数

#### `tabBarLabel`
用于在`tab bar`中展示的一个字符串或者一个传入`{ focused: boolean, tintColor: string }`返回`React.Node`的函数，如果未定义，则使用页面的`title`属性。如果像隐藏文本，请参阅上一小节中讲到的`tabBarOptions.showLabel`

#### `tabBarOnPress`
tab被点击时的回调函数；参数是一个对象，包含一下属性：

* `previousScene: { route, index }` ：正在离开的页面
* `scene: { route, index }` 被点击的页面
* `jumpToIndex` 执行跳转操作必须的参数

在跳转到下一个页面之前增加一个自定义的逻辑是有用的

### Navigator Props

由`TabNavigator(...)`创建的导航组件，请使用下面的属性：

- `screenProps` - 将其他选项传递给子页面和导航选项，例如：


 ```jsx
 const TabNav = TabNavigator({
   // config
 });

 <TabNav
   screenProps={/* this prop will get passed to the screen components as this.props.screenProps */}
 />
 ```
