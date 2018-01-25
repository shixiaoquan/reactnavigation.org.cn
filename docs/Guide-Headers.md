---
 id: Guide-Headers
title: 配置标题栏
sidebar_label: 配置标题栏
---

<!-- # Configuring the Header -->

标题仅适用于`StackNavigator`。

在前面的例子中，我们创建了一个`StackNavigator`用来在我们的应用程序中展示几个页面。

当跳转到聊天页面时，我们可以通过将它们提供给导航器来指定新路线的参数。 在这种情况下，我们希望在聊天页面上提供人员的姓名：

```js
this.props.navigation.navigate('Chat', { user:  'Lucy' });
```

参数`user`可以从聊天界面访问：

```js
class ChatScreen extends React.Component {
  render() {
    const { params } = this.props.navigation.state;
    return <Text>Chat with {params.user}</Text>;
  }
}
```

### 设置标题栏的标题

接下来，标题栏的标题可以配置为使用页面的参数：

```js
class ChatScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Chat with ${navigation.state.params.user}`,
  });
  ...
}
```

<figure class="half">
    <img src="https://reactnavigation.org/assets/examples/basic-header-android.png" width="300">
    <img src="https://reactnavigation.org/assets/examples/basic-header-iphone.png" width="300">
</figure>

### 添加右侧的按钮

然后我们可以添加一个允许我们添加一个自定义的右侧按钮的[`header` 选项](/docs/Screen-Nav-Options#Stack-Navigation-Options) ：

```js
static navigationOptions = {
  headerRight: <Button title="Info" />,
  ...
```

```phone-example
header-button
```

导航选项可以使用[navigation prop](/docs/navigators/navigation-prop)）来定义。 让我们根据路由参数渲染一个不同的按钮，并设置按钮按下时调用`navigation.setParams`。

```js
static navigationOptions = ({ navigation }) => {
  const { state, setParams } = navigation;
  const isInfo = state.params.mode === 'info';
  const { user } = state.params;
  return {
    title: isInfo ? `${user}'s Contact Info` : `Chat with ${state.params.user}`,
    headerRight: (
      <Button
        title={isInfo ? 'Done' : `${user}'s info`}
        onPress={() => setParams({ mode: isInfo ? 'none' : 'info' })}
      />
    ),
  };
};
```

现在，标题可以与页面的路由或`state`交互了：
<figure class="half">
    <img src="https://reactnavigation.org/assets/examples/header-button-android.png" width="300">
    <img src="https://reactnavigation.org/assets/examples/header-button-iphone.png" width="300">
</figure>

### 屏幕组件与标题的交互

有时，标题栏需要访问页面组件的属性，例如函数或`state`。

比方说，我们要创建一个“编辑联系人信息”的页面，在标题中有一个保存按钮。 我们希望在保存时将保存按钮替换为一个`ActivityIndicator `。

```js
class EditInfoScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    let headerRight = (
      <Button
        title="Save"
        onPress={params.handleSave ? params.handleSave : () => null}
      />
    );
    if (params.isSaving) {
      headerRight = <ActivityIndicator />;
    }
    return { headerRight };
  };

  state = {
    nickname: 'Lucy jacuzzi'
  }

  _handleSave = () => {
    // Update state, show ActivityIndicator
    this.props.navigation.setParams({ isSaving: true });

    // Fictional function to save information in a store somewhere
    saveInfo().then(() => {
      this.props.navigation.setParams({ isSaving: false});
    })
  }

  componentDidMount() {
    // We can only set the function after the component has been initialized
    this.props.navigation.setParams({ handleSave: this._handleSave });
  }

  render() {
    return (
      <TextInput
        onChangeText={(nickname) => this.setState({ nickname })}
        placeholder={'Nickname'}
        value={this.state.nickname}
      />
    );
  }
}
```

**Note**: 由于`handleSave`参数只在组件挂载时设置，因此不能立即在`navigationOptions`函数中使用。 在`handleSave`设置之前，我们传递一个空的函数到`Button`-组件，以便立即渲染并避免闪烁。

要查看其余的标题选项，请参阅 [navigation options document](/docs/Stack-Nav-Options#Stack-Navigation-Options).

作为`setParams`的替代方法，您可能需要考虑使用状态管理库，例如[MobX](https://github.com/mobxjs/mobx) 或者 [Redux](https://github.com/reactjs/redux)，当页面跳转时，传递一个包含屏幕渲染所需数据的对象，以及可能要调用的函数，修改数据，发出网络请求等。这样， 屏幕组件和静态`navbarOptions`块将有权访问该对象。 当采用这种方法时，请确保考虑了深度链接，在只有JavaScript原函数被作为导航器属性传递到页面的情况下，效果最好。 如果需要进行深度链接，可以使用[higher order component (HOC)](https://reactjs.org/docs/higher-order-components.html)将原函数转换为屏幕组件所期望的对象。
















