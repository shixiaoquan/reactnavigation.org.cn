---
 id: Guide-Quick-Start
title: 快速开始
sidebar_label: 快速开始
---

<!-- # Hello Mobile Navigation -->
只需安装`react-navigation`的npm package, 就可以开始使用React Navigation了

### 使用 NPM 安装

```
npm install --save react-navigation
```

### 使用 Yarn 安装

```
yarn add react-navigation
```

要开始使用React Navigation，您必须先创建一个navigator，React Navigation带有三种默认的navigator。

- `StackNavigator` - 为应用程序提供了一种页面切换的方法，每次切换时，新的页面会放置在堆栈的顶部
- `TabNavigator` - 用于设置具有多个Tab页的页面
- `DrawerNavigator` - 用于设置抽屉导航的页面

## 创建 StackNavigator

`StackNavigator `是最常见的一种`navigator`，所以我们将用其进行基本演示。 首先，创建一个`StackNavigator`。

```javascript
import { StackNavigator } from 'react-navigation';

const RootNavigator = StackNavigator({

});

export default RootNavigator;
```

我们可以把页面添加到这个`StackNavigator`. 每个`key`代表着一个页面.

```javascript
import React from 'react';
import { View, Text } from 'react-native';
import { StackNavigator } from 'react-navigation';

const HomeScreen = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Home Screen</Text>
  </View>
);

const DetailsScreen = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Details Screen</Text>
  </View>
);

const RootNavigator = StackNavigator({
  Home: {
    screen: HomeScreen,
  },
  Details: {
    screen: DetailsScreen,
  },
});

export default RootNavigator;
```

现在让我们为导航栏添加一个标题。

```javascript
...

const RootNavigator = StackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      headerTitle: 'Home',
    },
  },
  Details: {
    screen: DetailsScreen,
    navigationOptions: {
      headerTitle: 'Details',
    },
  },
});

export default RootNavigator;
```

最后，我们将能够从`Home`页面跳转到`Details`页面。 当你用一个navigator注册一个组件时，这个组件将会添加一个`navigator`属性。 这个`navigator`属性能够控制不同页面间的跳转。

为了从`Home`页面跳转到`Details`页面，我们将使用 `navigation.navigate`，方法如下:

```javascript
...
import { View, Text, Button } from 'react-native';

const HomeScreen = ({ navigation }) => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Home Screen</Text>
    <Button
      onPress={() => navigation.navigate('Details')}
      title="Go to details"
    />
  </View>
);

...
```

懂了吧! 当然，这只是将[StackNavigator](/docs/navigators/stack)和React Navigation作为一个整体使用的的基础。 
这里是这个例子的完整代码:

```javascript
import React from 'react';
import { View, Text, Button } from 'react-native';
import { StackNavigator } from 'react-navigation'; // 1.0.0-beta.14

const HomeScreen = ({ navigation }) => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Home Screen</Text>
    <Button
      onPress={() => navigation.navigate('Details')}
      title="Go to details"
    />
  </View>
);

const DetailsScreen = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Details Screen</Text>
  </View>
);

const RootNavigator = StackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      headerTitle: 'Home',
    },
  },
  Details: {
    screen: DetailsScreen,
    navigationOptions: {
      headerTitle: 'Details',
    },
  },
});

export default RootNavigator;
```

## 创建 TabNavigator

为了使用`TabNavigator`，首先导入`TabNavigator`并创建一个名为`RootTabs`的组件

```javascript
import { TabNavigator } from 'react-navigation';

const RootTabs = TabNavigator({

});

export default RootTabs;
```

然后我们需要创建一些页面，并将它们添加到我们创建的的`TabNavigator`中。


```javascript
import React from 'react';
import { View, Text } from 'react-native';
import { TabNavigator } from 'react-navigation';

const HomeScreen = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Home Screen</Text>
  </View>
);

const ProfileScreen = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Profile Screen</Text>
  </View>
);

const RootTabs = TabNavigator({
  Home: {
    screen: HomeScreen,
  },
  Profile: {
    screen: ProfileScreen,
  },
});

export default RootTabs;
```

Getting there! Now let's explicity set a label and icon for the tab bar.
现在，我们给每个`Tab Bar`设置一个明确的标签

> 我们将在例子中使用[`react-native-vector-icons`](https://github.com/oblador/react-native-vector-icons)，
> 如果你的项目中没有安装，请自行安装。

```javascript
...
import Ionicons from 'react-native-vector-icons/Ionicons';

...

const RootTabs = TabNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons
          name={focused ? 'ios-home' : 'ios-home-outline'}
          size={26}
          style={{ color: tintColor }}
        />
      ),
    },
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      tabBarLabel: 'Profile',
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons
          name={focused ? 'ios-person' : 'ios-person-outline'}
          size={26}
          style={{ color: tintColor }}
        />
      ),
    },
  },
});

export default RootTabs;
```

这将确保`tabBarLabel`是一致的（使用嵌套的`navigator `时很重要），并且还会设置一个`tabBarIcon`。 这个图标默认情况下会在iOS上默认显示，因为它使用了标签栏组件，这与Android上的标准设计模式一致。

你可以在查看下面的完整代码:

```javascript
import React from 'react';
import { View, Text } from 'react-native';
import { TabNavigator } from 'react-navigation'; // 1.0.0-beta.14
import Ionicons from 'react-native-vector-icons/Ionicons'; // Supported builtin module

const HomeScreen = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Home Screen</Text>
  </View>
);

const ProfileScreen = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Profile Screen</Text>
  </View>
);

const RootTabs = TabNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons
          name={focused ? 'ios-home' : 'ios-home-outline'}
          size={26}
          style={{ color: tintColor }}
        />
      ),
    },
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      tabBarLabel: 'Profile',
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons
          name={focused ? 'ios-person' : 'ios-person-outline'}
          size={26}
          style={{ color: tintColor }}
        />
      ),
    },
  },
});

export default RootTabs;
```

## 创建 DrawerNavigator

为了使用`DrawerNavigator `，首先导入`DrawerNavigator `并创建一个名为`RootDrawer`的组件.

```javascript
import { DrawerNavigator } from 'react-navigation';

const RootDrawer = DrawerNavigator({

});

export default RootDrawer;
```

然后我们需要创建一些页面，并将它们添加到我们创建的的`DrawerNavigator `中。

```javascript
import React from 'react';
import { View, Text } from 'react-native';
import { DrawerNavigator } from 'react-navigation';

const HomeScreen = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Home Screen</Text>
  </View>
);

const ProfileScreen = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Profile Screen</Text>
  </View>
);

const RootDrawer = DrawerNavigator({
  Home: {
    screen: HomeScreen,
  },
  Profile: {
    screen: ProfileScreen,
  },
});

export default RootDrawer;
```

现在，我们给每个`DrawerItem`设置一个明确的标签和图标

> 我们将在例子中使用[`react-native-vector-icons`](https://github.com/oblador/react-native-vector-icons)，
> 如果你的项目中没有安装，请自行安装。

```javascript
...
import Ionicons from 'react-native-vector-icons/Ionicons';

...

const RootDrawer = DrawerNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      drawerLabel: 'Home',
      drawerIcon: ({ tintColor, focused }) => (
        <Ionicons
          name={focused ? 'ios-home' : 'ios-home-outline'}
          size={20}
          style={{ color: tintColor }}
        />
      ),
    },
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      drawerLabel: 'Profile',
      drawerIcon: ({ tintColor, focused }) => (
        <Ionicons
          name={focused ? 'ios-person' : 'ios-person-outline'}
          size={20}
          style={{ color: tintColor }}
        />
      ),
    },
  },
});

export default RootDrawer;
```

要打开抽屉，你可以从屏幕左侧向右滑动,也可以选择使用我们即将添加到`Home `组件的方法`navigation.navigate（'DrawerToggle'）`。 

确保你已经从`react-native`中导入了`Button`组件。

```javascript
...

const HomeScreen = ({ navigation }) => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Home Screen</Text>
    <Button
      onPress={() => navigation.navigate('DrawerToggle')}
      title="Open Drawer"
    />
  </View>
);

...
```

你可以查看下面的完整代码：

```javascript
import React from 'react';
import { View, Text } from 'react-native';
import { DrawerNavigator } from 'react-navigation'; // 1.0.0-beta.14
import Ionicons from 'react-native-vector-icons/Ionicons'; // Supported builtin module

const HomeScreen = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Home Screen</Text>
  </View>
);

const ProfileScreen = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Profile Screen</Text>
  </View>
);


const RootDrawer = DrawerNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      drawerLabel: 'Home',
      drawerIcon: ({ tintColor, focused }) => (
        <Ionicons
          name={focused ? 'ios-home' : 'ios-home-outline'}
          size={26}
          style={{ color: tintColor }}
        />
      ),
    },
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      drawerLabel: 'Profile',
      drawerIcon: ({ tintColor, focused }) => (
        <Ionicons
          name={focused ? 'ios-person' : 'ios-person-outline'}
          size={26}
          style={{ color: tintColor }}
        />
      ),
    },
  },
});

export default RootDrawer;
```
