---
 id: withNavigation
title: withNavigation
sidebar_label: withNavigation
---

<!--# withNavigation-->

[`withNavigation`](https://github.com/react-navigation/react-navigation/blob/master/src/views/withNavigation.js) 是一个高阶组件，它将 `navigation` 属性传递给一个包装了的组件。 当你无法将 `navigation` 属性直接传递给组件时，或者在深度嵌套的子组件中不想传递它时，这个组件将很有用。

## 栗子

```js
import { Button } 'react-native';
import { withNavigation } from 'react-navigation';

const MyComponent = ({ to, navigation }) => (
    <Button title={`navigate to ${to}`} onPress={() => navigation.navigate(to)} />
);

const MyComponentWithNavigation = withNavigation(MyComponent);


// or use decorators:

@withNavigation
export default class MainScreen extends Component {
  ...
}
```
