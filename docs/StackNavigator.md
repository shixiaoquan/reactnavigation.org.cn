---
 id: StackNavigator
title: StackNavigator
sidebar_label: StackNavigator
---

<!-- # StackNavigator -->

默认情况下，`StackNavigator`被配置为拥有相似的iOS和Android外观：新的页面在iOS上从右侧滑入，在Android上从底部淡入。 在iOS上，`StackNavigator`也可以配置为页面从底部滑入。

```jsx

class MyHomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  }

  render() {
    return (
      <Button
        onPress={() => this.props.navigation.navigate('Profile', {name: 'Lucy'})}
        title="Go to Lucy's profile"
      />
    );
  }
}

const ModalStack = StackNavigator({
  Home: {
    screen: MyHomeScreen,
  },
  Profile: {
    path: 'people/:name',
    screen: MyProfileScreen,
  },
});
```

## API 定义

```js
StackNavigator(RouteConfigs, StackNavigatorConfig)
```

### RouteConfigs

路由配置对象是从路由名称到路由配置的映射，告诉导航器该路由应该呈现什么。

```js
StackNavigator({

  // For each screen that you can navigate to, create a new entry like this:
  Profile: {

    // `ProfileScreen` is a React component that will be the main content of the screen.
    screen: ProfileScreen,
    // When `ProfileScreen` is loaded by the StackNavigator, it will be given a `navigation` prop.

    // Optional: When deep linking or using react-navigation in a web app, this path is used:
    path: 'people/:name',
    // The action and route params are extracted from the path.

    // Optional: Override the `navigationOptions` for the screen
    navigationOptions: ({navigation}) => ({
      title: `${navigation.state.params.name}'s Profile'`,
    }),
  },

  ...MyOtherRoutes,
});
```

### StackNavigatorConfig

`router`的选项：

- `initialRouteName` - 设置堆栈的默认页面。 必须匹配`RouteConfigs`中的一个`key`。
- `initialRouteParams` - 初始化路由的参数
- `navigationOptions` - 用于页面的默认导航选项
- `paths` - 用于覆盖`RouteConfigs`中设置的`path`的一个映射

视觉选项:

- `mode` - 定义页面渲染和转换的风格：
  - `card` - 使用标准的iOS和Android页面转换风格，此项为缺省。
  - `modal` - 使页面从屏幕底部滑入，这是一种常见的iOS模式。 只适用于iOS，在Android上不起作用。
- `headerMode` - 定义标题该如何渲染：
  - `float` - 渲染一个放在顶部的标题栏，并在页面改变时显示动画。 这是iOS上的常见模式。
  - `screen` - 每个页面上都有一个标题栏，标题栏与页面一起淡入淡出。 这是Android上的常见模式。
  - `none` - 没有标题栏
- `cardStyle` - 使用这个属性覆盖或者扩展堆栈中单个`Card`的默认样式。
- `transitionConfig` - 返回一个与默认页面的`transitionConfig`(参见[类型定义](https://github.com/react-community/react-navigation/blob/master/src/TypeDefinition.js))合并的对象的函数。 提供的函数将传递以下参数：
	- `transitionProps` - 新页面跳转的属性。
	- `prevTransitionProps` - 上一个页面跳转的属性
	- `isModal` - 指定页面是否为`modal`。
- `onTransitionStart` - `card`跳转动画开始时要调用的函数。
- `onTransitionEnd` - `card`跳转动画结束时要调用的函数。

### Screen Navigation Options

#### `title`

可当作`headerTitle`的备用的字符串。 此外，将用作`tabBarLabel`（如果嵌套在TabNavigator中）或`drawerLabel`（如果嵌套在DrawerNavigator中）的后备。

#### `header`

可以是React元素或给定了`HeaderProps`然后返回一个React元素的函数，显示为标题。 设置为`null`隐藏标题。

#### `headerTitle`

字符串、React元素或被当作标题的React组件。默认显示`title`属性的值。当使用一个组件时，它会收到`allowFontScaling`，`style`和`children`属性。 标题字符串在`children`中进行传递。

#### `headerTitleAllowFontScaling`

标题栏中标题字体是否应该缩放取决于文本大小是否可以设置。 默认为true。

#### `headerBackTitle`

iOS上的返回按钮的文字使用的字符串，或者使用`null`来禁用。 默认为上一个页面的`headerTitle`。

#### `headerTruncatedBackTitle`

当`headerBackTitle `不适合在屏幕显示时（一般是因为文字太多），返回按钮使用的标题字符串。 默认是`Back`。

#### `headerRight`

显示在标题栏右侧的React元素。

#### `headerLeft`

用于在标题栏左侧展示的React元素或组件。当一个组件被渲染时，它会接收到很多的属性（`onPress`, `title`, `titleStyle` 等等， - 请检查 `Header.js` 的完整列表）

#### `headerStyle`

标题栏的样式

#### `headerTitleStyle`

标题栏中标题的样式

#### `headerBackTitleStyle`

标题栏中返回按钮标题的样式

#### `headerTintColor`

标题栏的色调

#### `headerPressColorAndroid`

material design中的波纹颜色 (仅支持Android >= 5.0)

#### `gesturesEnabled`

是否可以使用手势来关闭此页面。 在iOS上默认为true，在Android上默认为false。

#### `gestureResponseDistance`

一个对象，用以覆盖从屏幕边缘开始触摸到手势被识别的距离。 它具有以下属性：

- `horizontal` - *数值型* - 水平方向的距离，默认值25
- `vertical` - *数值型* - 垂直方向的距离，默认值135.

#### `gestureDirection`

字符串，用来设置关闭页面的手势方向，默认（`default`）是从做往右，`inverted`是从右往左

### Navigator Props

使用`StackNavigator(...)`方法创建的导航组件，使用了如下属性：

- `screenProps` - 传递其他选项给子页面，例如：


 ```jsx
 const SomeStack = StackNavigator({
   // config
 });

 <SomeStack
   screenProps={/* this prop will get passed to the screen components as this.props.screenProps */}
 />
 ```

### 栗子

请参阅这些栗子 [SimpleStack.js](https://github.com/react-community/react-navigation/tree/master/examples/NavigationPlayground/js/SimpleStack.js) and [ModalStack.js](https://github.com/react-community/react-navigation/tree/master/examples/NavigationPlayground/js/ModalStack.js) 。 它们作为[NavigationPlayground](https://github.com/react-community/react-navigation/tree/master/examples/NavigationPlayground) 应用的一部分，你可以在本地运行

你也可以直接在手机上查看这些示例，方法是访问[our expo demo](https://exp.host/@react-navigation/NavigationPlayground).

#### 自定义页面跳转方式的`StackNavigator`

 ```js
const ModalNavigator = StackNavigator(
  {
    Main: { screen: Main },
    Login: { screen: Login },
  },
  {
    headerMode: 'none',
    mode: 'modal',
    navigationOptions: {
      gesturesEnabled: false,
    },
    transitionConfig: () => ({
      transitionSpec: {
        duration: 300,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
      },
      screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps;
        const { index } = scene;

        const height = layout.initHeight;
        const translateY = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [height, 0, 0],
        });

        const opacity = position.interpolate({
          inputRange: [index - 1, index - 0.99, index],
          outputRange: [0, 1, 1],
        });

        return { opacity, transform: [{ translateY }] };
      },
    }),
  }
);
 ```

标题也可以使用`transitionConfig`中的`headerLeftInterpolator`，`headerTitleInterpolator`和`headerRightInterpolator`字段进行配置。
