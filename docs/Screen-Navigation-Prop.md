---
 id: Screen-Navigation-Prop
title: Navigation属性
sidebar_label: Navigation属性
---

<!-- # Screen Navigation Prop -->

在你的应用程序中的每个页面都将接收到一个导航属性，其中包含以下内容：

* `navigate` - (助手) 链接到其他页面
* `state` - 页面当前的状态/路由
* `setParams` - (助手) 修改路由的参数
* `goBack` - (助手) 关闭当前页面并返回上一页
* `dispatch` - 向路由分发一个事件

**注意:** `navigation`的属性被传递给每个包含`navigator`的`navigation-aware`组件。最大的意外是某个`navigator`的`navigation`属性不包含辅助函数：(`navigate`, `goBack`, 等等)，可能只包含`state`和`dispatch`。为了使`navigate`能够使用`navigator`的`navigation`属性，你必须使用[action creator](/docs/Navigation-Actions)来进行事件分发

**注意事项与Redux有关**
> 大家不能成功关联redux的原因是：他们误以为`navigator`的顶级API（`navigation`的属性）是可配置的。如果没有获取到`navigation`的属性，`navigator`将会维持它的状态不变，但这并不是在集成了redux的应用中常用的功能。对于嵌套在主`navigator`的`navigator`,你总是希望将页面的`navigation`属性向下传递。这使得顶级`navigator`可以和所有的子`navigator`进行通信，并且传递`state`给子`navigator`。这样就只有顶层的路由需要集成redux，因为其他所有的路由都包含在顶层路由之内
## `navigate` - 链接到其他页面

在应用中使用此方法跳转到其他页面，请参阅一下几个参数：

`navigate(routeName, params, action)`

- `routeName` - 已在应用程序的路由器中注册的目标路由名称
- `params` - 合并到目标路由中的参数
- `action` - （高级）如果页面是`navigator`，则是在子路由中运行的子操作。 有关`action`的完整列表，请参阅[Actions Doc](/docs/Navigation-Actions)）。

```js
class HomeScreen extends React.Component {
  render() {
    const {navigate} = this.props.navigation;

    return (
      <View>
        <Text>This is the home screen of the app</Text>
        <Button
          onPress={() => navigate('Profile', {name: 'Brent'})}
          title="Go to Brent's profile"
        />
      </View>
     )
   }
}
```

## `state` - 页面当前的state/route

页面可以通过`this.props.navigation.state`来访问路由，将会返回如下的一个对象：

```js
{
  // the name of the route config in the router
  routeName: 'profile',
  //a unique identifier used to sort routes
  key: 'main0',
  //an optional object of string options for this screen
  params: { hello: 'world' }
}
```

```js
class ProfileScreen extends React.Component {
  render() {
    const {state} = this.props.navigation;
    // state.routeName === 'Profile'
    return (
      <Text>Name: {state.params.name}</Text>
    );
  }
}
```


## `setParams` - 改变路由的参数
触发`setParams`方法可以允许页面修改路由中的参数，这对于更新标题栏中的按钮和标题非常有用

```js
class ProfileScreen extends React.Component {
  render() {
    const {setParams} = this.props.navigation;
    return (
      <Button
        onPress={() => setParams({name: 'Lucy'})}
        title="Set title name to 'Lucy'"
      />
     )
   }
}
```

## `goBack` - 关闭当前页面并返回上一页
可选择提供一个key，这个key指定了要返回的路由，默认情况下，`goBack`将关闭调用此方法的路由（哪个页面调用`goBack`方法，关闭哪个页面）

**从指定的页面返回**

参考以下`navigation`的`state`：

```
{
  routes: [
    { routeName: 'HomeScreen', key: 'A' },
    { routeName: 'DetailScreen', key: 'B' },
    { routeName: 'DetailScreen', key: 'C' },
  ],
  index: 2
}
```

你现在在**C页面**，想返回到**主页面A**（同时关闭页面B和C）。这时候就需要指定一个key用于`goBack`：

```
navigation.goBack("B") // will go to screen A FROM screen B
```

如果只是从当前页面返回，调用`.goBack(null);`方法即可

```js
class HomeScreen extends React.Component {
  render() {
    const {goBack} = this.props.navigation;
    return (
      <View>
        <Button
          onPress={() => goBack()}
          title="Go back from this HomeScreen"
        />
        <Button
          onPress={() => goBack(null)}
          title="Go back from the currently active route"
        />
        <Button
          onPress={() => goBack('screen-123')}
          title="Go back from screen-123"
        />
      </View>
     )
   }
}
```

## `dispatch` - 向路由分发一个事件
使用`dispatch`发送所有的`navigation action`给路由，其他的`navigation`方法在后台使用`dispatch`方法

如果你想分发react-navigation的事件，你必须使用该库提供的·`action creators`

请参阅[Navigation Actions Docs](/docs/Navigation-Actions)了解可用`action`的完整列表

```js
import { NavigationActions } from 'react-navigation'

const navigateAction = NavigationActions.navigate({
  routeName: 'Profile',
  params: {},

  // navigate can have a nested navigate action that will be run inside the child router
  action: NavigationActions.navigate({ routeName: 'SubProfileRoute'})
})
this.props.navigation.dispatch(navigateAction)

```
