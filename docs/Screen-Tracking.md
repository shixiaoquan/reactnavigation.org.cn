---
 id: Screen-Tracking
title: 页面跟踪和分析
sidebar_label: 页面跟踪和分析
---

<!-- # Screen tracking and analytics -->

此示例展示了如何执行页面跟踪并发送给Google Analytics。 该方法可以适用于任何其他的移动应用分析SDK。

## 页面跟踪
当使用内置的 `navigation` 容器时，我们可以使用 `onNavigationStateChange` 方法来跟踪页面

```js
import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge';

const tracker = new GoogleAnalyticsTracker(GA_TRACKING_ID);

// gets the current screen from navigation state
function getCurrentRouteName(navigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.routes) {
    return getCurrentRouteName(route);
  }
  return route.routeName;
}

const AppNavigator = StackNavigator(AppRouteConfigs);

export default () => (
  <AppNavigator
    onNavigationStateChange={(prevState, currentState) => {
      const currentScreen = getCurrentRouteName(currentState);
      const prevScreen = getCurrentRouteName(prevState);

      if (prevScreen !== currentScreen) {
        // the line below uses the Google Analytics tracker
        // change the tracker here to use other Mobile analytics SDK.
        tracker.trackScreenView(currentScreen);
      }
    }}
  />
);
```

## 使用了Redux的页面跟踪
使用Redux时，我们可以编写一个Redux中间件来跟踪页面。为了这个目的，我们将重用上一节的 `getCurrentRouteName` 方法

```js
import { NavigationActions } from 'react-navigation';
import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge';

const tracker = new GoogleAnalyticsTracker(GA_TRACKING_ID);

const screenTracking = ({ getState }) => next => (action) => {
  if (
    action.type !== NavigationActions.NAVIGATE
    && action.type !== NavigationActions.BACK
  ) {
    return next(action);
  }

  const currentScreen = getCurrentRouteName(getState().navigation);
  const result = next(action);
  const nextScreen = getCurrentRouteName(getState().navigation);
  if (nextScreen !== currentScreen) {
    // the line below uses the Google Analytics tracker
    // change the tracker here to use other Mobile analytics SDK.
    tracker.trackScreenView(nextScreen);
  }
  return result;
};

export default screenTracking;
```

## 创建Redux存储并应用上面的中间件
 `screenTracking` 中间件可以在创建时应用到存储中，有关详细信息，请参阅[Redux集成](Redux-Integration.md)
 
```js
const store = createStore(
  combineReducers({
    navigation: navigationReducer,
    ...
  }),
  applyMiddleware(
    screenTracking,
    ...
    ),
);
```
