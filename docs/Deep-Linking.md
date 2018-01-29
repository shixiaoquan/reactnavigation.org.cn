---
 id: Deep-Linking
title: 深层链接
sidebar_label: 深层链接
---

<!-- # Deep Linking -->

在本指南中，我们将设置我们的应用来处理外部URI。 让我们从 [我们在入门指南](/docs/Guide-Intro)中创建的SimpleApp开始。

在这个例子中，我们需要一个像 `mychat://chat/Taylor` 这样的URI来打开我们的应用，并直接链接到Taylor的聊天页面。

## 配置

之前，我们已经定义了一个这样的 `navigator`:

```js
const SimpleApp = StackNavigator({
  Home: { screen: HomeScreen },
  Chat: { screen: ChatScreen },
});
```

我们想希望像 `chat/Taylor` 这样的路径链接到"Chat"页面，并将 `user` 作为参数传递过去。让我们用一个 `path` 重新配置我们的"Chat"页面，告诉路由该匹配什么相对路径，以及提取哪些参数。这个 `path` 的规范是 `chat/:user`。

```js
const SimpleApp = StackNavigator({
  Home: { screen: HomeScreen },
  Chat: {
    screen: ChatScreen,
    path: 'chat/:user',
  },
});
```


### URI Prefix
接下来，让我们配置我们的导航容器，从应用的传入URI中提取 `path`

```js
const SimpleApp = StackNavigator({...});

// on Android, the URI prefix typically contains a host in addition to scheme
const prefix = Platform.OS == 'android' ? 'mychat://mychat/' : 'mychat://';

const MainApp = () => <SimpleApp uriPrefix={prefix} />;
```

## iOS
让我们根据 `mychat://` 这个URI方案来配置原生的iOS应用

在 `SimpleApp/ios/SimpleApp/AppDelegate.m`中:

```
// Add the header at the top of the file:
#import <React/RCTLinkingManager.h>

// Add this above the `@end`:
- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url
  sourceApplication:(NSString *)sourceApplication annotation:(id)annotation
{
  return [RCTLinkingManager application:application openURL:url
                      sourceApplication:sourceApplication annotation:annotation];
}
```

在Xcode中，使用 `SimpleApp/ios/SimpleApp.xcodeproj` 打开项目。 在侧边栏中选择项目并导航到信息选项卡。 向下滚动到“网址类型”并添加一个。 在新的URL类型中，将标识符和url方案设置为您所需的url方案。

![添加了mychat的Xcode项目信息URL类型](https://reactnavigation.org/assets/xcode-linking.png)

现在你可以在Xcode中点击“run”，或者在命令行上重新构建：

```sh
react-native run-ios
```

在模拟器上测试URI，请运行以下命令：

```
xcrun simctl openurl booted mychat://chat/Taylor
```

在真机中测试URI, 打开Safari输入 `mychat://chat/Taylor`。

## Android
要在Android中配置外部链接，您可以在清单文件中创建一个新的 `Intent `。

在 `SimpleApp/android/app/src/main/AndroidManifest.xml` 文件中的 `MainActivity` 入口处添加一个类型为 `VIEW` 的 `intent-filter`：

```
<intent-filter>
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <data android:scheme="mychat"
          android:host="mychat" />
</intent-filter>
```

现在，重新安装应用:

```sh
react-native run-android
```
测试Android中的Intent处理，请运行如下命令：

```
adb shell am start -W -a android.intent.action.VIEW -d "mychat://mychat/chat/Taylor" com.simpleapp
```

```phone-example
linking
```
