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

String that can be used as a fallback for `headerTitle`. Additionally, will be used as a fallback for `tabBarLabel` (if nested in a TabNavigator) or `drawerLabel` (if nested in a DrawerNavigator).

#### `header`

React Element or a function that given `HeaderProps` returns a React Element, to display as a header. Setting to `null` hides header.

#### `headerTitle`

String, React Element or React Component used by the header. Defaults to scene `title`. When a component is used, it receives `allowFontScaling`, `style` and `children` props. The title string is passed in `children`.

#### `headerTitleAllowFontScaling`

Whether header title font should scale to respect Text Size accessibility settings. Defaults to true.

#### `headerBackTitle`

Title string used by the back button on iOS, or `null` to disable label. Defaults to the previous scene's `headerTitle`.

#### `headerTruncatedBackTitle`

Title string used by the back button when `headerBackTitle` doesn't fit on the screen. `"Back"` by default.

#### `headerRight`

React Element to display on the right side of the header.

#### `headerLeft`

React Element or Component to display on the left side of the header. When a component is used, it receives a number of props when rendered (`onPress`, `title`, `titleStyle` and more - check `Header.js` for the complete list).

#### `headerStyle`

Style object for the header

#### `headerTitleStyle`

Style object for the title component

#### `headerBackTitleStyle`

Style object for the back title

#### `headerTintColor`

Tint color for the header

#### `headerPressColorAndroid`

Color for material ripple (Android >= 5.0 only)

#### `gesturesEnabled`

Whether you can use gestures to dismiss this screen. Defaults to true on iOS, false on Android.

#### `gestureResponseDistance`

Object to override the distance of touch start from the edge of the screen to recognize gestures. It takes the following properties:

- `horizontal` - *number* - Distance for horizontal direction. Defaults to 25.
- `vertical` - *number* - Distance for vertical direction. Defaults to 135.

#### `gestureDirection`

String to override the direction for dismiss gesture. `default` for normal behaviour or `inverted` for right-to-left swipes.

### Navigator Props

The navigator component created by `StackNavigator(...)` takes the following props:

- `screenProps` - Pass down extra options to child screens, for example:


 ```jsx
 const SomeStack = StackNavigator({
   // config
 });

 <SomeStack
   screenProps={/* this prop will get passed to the screen components as this.props.screenProps */}
 />
 ```

### Examples

See the examples [SimpleStack.js](https://github.com/react-community/react-navigation/tree/master/examples/NavigationPlayground/js/SimpleStack.js) and [ModalStack.js](https://github.com/react-community/react-navigation/tree/master/examples/NavigationPlayground/js/ModalStack.js) which you can run locally as part of the [NavigationPlayground](https://github.com/react-community/react-navigation/tree/master/examples/NavigationPlayground) app.

You can view these examples directly on your phone by visiting [our expo demo](https://exp.host/@react-navigation/NavigationPlayground).

#### Modal StackNavigator with Custom Screen Transitions

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

Header transitions can also be configured using `headerLeftInterpolator`, `headerTitleInterpolator` and `headerRightInterpolator` fields under `transitionConfig`.
