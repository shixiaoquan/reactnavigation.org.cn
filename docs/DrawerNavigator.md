---
 id: DrawerNavigator
title: DrawerNavigator
sidebar_label: DrawerNavigator
---

<!-- # DrawerNavigator -->

用于轻松设置一个带有抽屉导航的页面，请参阅[our expo demo](https://exp.host/@react-navigation/NavigationPlayground).

```js
class MyHomeScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Home',
    drawerIcon: ({ tintColor }) => (
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
    drawerLabel: 'Notifications',
    drawerIcon: ({ tintColor }) => (
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
    width: 24,
    height: 24,
  },
});

const MyApp = DrawerNavigator({
  Home: {
    screen: MyHomeScreen,
  },
  Notifications: {
    screen: MyNotificationsScreen,
  },
});
```

使用`...navigate('DrawerOpen')`和`...navigate('DrawerClose')`打开和关闭抽屉

```js
this.props.navigation.navigate('DrawerOpen'); // open drawer
this.props.navigation.navigate('DrawerClose'); // close drawer
```
If you would like to toggle the drawer you can navigate to `'DrawerToggle'`, and this will choose which navigation is appropriate for you given the drawers current state.

如果你想切换抽屉，你可以使用`...navigate('DrawerToggle')`，将根据抽屉当前的状态自动设置

```js
// fires 'DrawerOpen'/'DrawerClose' accordingly
this.props.navigation.navigate('DrawerToggle');
```

## API 定义

```js
DrawerNavigator(RouteConfigs, DrawerNavigatorConfig)
```

### RouteConfigs

`RouteConfigs `对象是从路由名称到路由配置的一个映射，它告诉导航器，路由应该呈现什么内容，参见 `StackNavigator`的[这个栗子](/docs/StackNavigator.md#routeconfigs)


### DrawerNavigatorConfig
- `drawerWidth` - 抽屉的宽度，或者使用一个函数返回宽度值
- `drawerPosition` - 抽屉的位置，可选项：`left` or `right`，默认`left`
- `contentComponent` - 用于呈现抽屉内容的组件，例如导航`Item`。 接收抽屉的导航属性。 默认为`DrawerItems`。 有关更多信息，请参见下文。
- `contentOptions` - 配置抽屉的内容，详情见下文
- `useNativeAnimations` - 是否使用原生动画，默认`true`.
- `drawerBackgroundColor` - 抽屉的背景色，默认是`white`.

几个被传递到底层的路由，用于修改导航逻辑的选项

- `initialRouteName` - 初始路由的路由名称
- `order` - 定义了`drawer item`顺序的一个`routeNames`数组
- `paths` - 提供`routeName `到`path config`的映射，它覆盖了`routeConfigs`中设置的`path`。
- `backBehavior` - 返回按钮是否返回初始路由？ 如果是，则设置为`initialRoute`，否则为`none`。 缺省为`initialRoute`。

### 提供一个自定义的`contentComponent`

The default component for the drawer is scrollable and only contains links for the routes in the RouteConfig. You can easily override the default component to add a header, footer, or other content to the drawer. By default the drawer is scrollable and supports iPhone X safe area. If you customize the content, be sure to wrap the content in a SafeAreaView:
抽屉的默认组件是可滚动的，只包含RouteConfig中路由的链接。 你可以轻松地覆盖默认组件，以将头部，底部或其他内容添加到抽屉中。 默认情况下，抽屉是可滚动的，并支持iPhone X安全区域。 如果你自定义内容，请务必将内容包装在`SafeAreaView`中：

```js
import { DrawerItems, SafeAreaView } from 'react-navigation';

const CustomDrawerContentComponent = (props) => (
  <ScrollView>
    <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
      <DrawerItems {...props} />
    </SafeAreaView>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
```

### `DrawerItems`的`contentOptions`

- `items` - 路由数组，可以被修改或者覆盖
- `activeItemKey` - 确定活动路由的key
- `activeTintColor` - 选中的`DrawerItem`的文本和图标颜色
- `activeBackgroundColor` - 选中的`DrawerItem`的背景色
- `inactiveTintColor` - 未选中的`DrawerItem`的文本和图标颜色
- `inactiveBackgroundColor` - 未选中的`DrawerItem`的背景色
- `onItemPress(route)` - `DrawerItem`被点击时触发的事件
- `itemsContainerStyle` - `DrawerItem`容器的样式
- `itemStyle` - 每个`DrawerItem`的样式, 可以包含文本或图标
- `labelStyle` - 当文本是字符串时，设置`DrawerItem`中文本的样式
- `iconContainerStyle` - 用于覆盖`View`图标容器的样式

#### 栗子:

```js
contentOptions: {
  activeTintColor: '#e91e63',
  itemsContainerStyle: {
    marginVertical: 0,
  },
  iconContainerStyle: {
    opacity: 1
  }
}
```

### Screen Navigation Options

#### `title`
可以用作`headerTitle` 和 `drawerLabel`备用的通用标题（如果`headerTitle` 和 `drawerLabel`未定义，则使用`title`替代）

#### `drawerLabel`
可以是字符串、React元素或一个传入`{ focused: boolean, tintColor: string }`返回`React.Node`的函数，用于在抽屉侧边栏中展示。当该项未定义时，就会使用`title`

#### `drawerIcon`
可以是React元素或一个传入`{ focused: boolean, tintColor: string }`返回`React.Node`的函数，用于在抽屉侧边栏中展示

#### `drawerLockMode`
指定抽屉的[lock mode](https://facebook.github.io/react-native/docs/drawerlayoutandroid.html#drawerlockmode) 。 也可以在顶级路由中使用`screenProps.drawerLockMode`动态更新。

### Navigator 属性

使用 `DrawerNavigator(...)`方法创建的导航组件，拥有如下属性

- `screenProps` - 将其他选项传递给子页面，例如：

 ```jsx
 const DrawerNav = DrawerNavigator({
   // config
 });

 <DrawerNav
   screenProps={/* this prop will get passed to the screen components and nav options as props.screenProps */}
 />
 ```

 ### 嵌套 `DrawerNavigation`

请注意，如果你嵌套了`DrawerNavigation`，则抽屉会显示在父导航的下方。 