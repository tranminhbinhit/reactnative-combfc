import React from 'react';
import {StyleSheet, Image} from 'react-native';
import {NavigationActions, createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';

import * as colors from '../../constants/colors';

import Home from '../../pages/Home/Home';
import Login from '../../pages/Login/Login';
import Info from '../../pages/User/Info';
import Feedback from '../../pages/User/Feedback';
import Location from '../../pages/Location/Location';
import CameraDevice from '../../pages/Home/CameraDevice';
import TestLocation from '../../pages/Home/TestLocation';
import Search from '../../pages/Search/Search';
import FCDetail from '../../pages/FCDetail/FCDetail';
import FCInfo from '../../pages/FCDetail/FCInfo';

import TestControl from '../../pages/UnitTest/TestControl';
import EntryTask from '../../pages/UnitTest/EntryTask';
import TestPushNotification from '../../pages/UnitTest/TestPushNotification';

const routeConfigs = {
  Home: {
    screen: Home,
  },
  Search: {
    screen: Search,
  },
  FCDetail: {
    screen: FCDetail,
  },
  FCInfo: {
    screen: FCInfo,
  },
  Info: {screen: Info},
  Feedback: {screen: Feedback},
};
const settingsNavigator = {
  headerBackTitle: null,
  headerTintColor: colors.white,
  headerStyle: {
    backgroundColor: colors.pink,
  },
  headerTitleStyle: {
    fontSize: 18,
    fontWeight: '700',
  },
};

const HomeStackNavigator = createStackNavigator(routeConfigs, {
  initialRouteName: 'Home',
  navigationOptions: settingsNavigator,
});
const UserStackNavigator = createStackNavigator(routeConfigs, {
  initialRouteName: 'Info',
  navigationOptions: settingsNavigator,
});

const MyTabNavigator = createBottomTabNavigator(
  {
    HomeTab: {
      screen: HomeStackNavigator,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Image
            source={require('../../assets/home.png')}
            style={[styles.icon, {tintColor: tintColor}]}
          />
        ),
      },
    },
    UserTab: {
      screen: UserStackNavigator,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Image
            source={require('../../assets/user2.png')}
            style={[styles.icon, {tintColor: tintColor}]}
          />
        ),
      },
    },
  },
  {
    tabBarPosition: 'bottom',
    swipeEnabled: true,
    animationEnabled: false,
    tabBarOptions: {
      activeTintColor: colors.green,
      inactiveTintColor: colors.tintColor,
      showIcon: true,
      showLabel: false,
      style: {
        backgroundColor: colors.white,
        borderTopWidth: 1,
        borderTopColor: colors.gray,
      },
      indicatorStyle: {
        backgroundColor: colors.white,
      },
    },
    navigationOptions: ({navigation}) => ({
      tabBarOnPress: ({scene, jumpToIndex}) => {
        const {route, focused, index} = scene;
        if (focused) {
          if (route.index > 0) {
            const {key} = route.routes[1];
            navigation.dispatch(NavigationActions.back({key}));
          }
        } else {
          jumpToIndex(index);
        }
      },
    }),
  },
);

const RootStack = createStackNavigator(
  {
    TestControl: {
      screen: TestControl,
    },
    // Search: {
    //   screen: Search,
    // },
    // FCInfo: {
    //   screen: FCInfo,
    // },
    // FCDetail: {
    //   screen: FCDetail,
    // },
    // TestPushNotification: {
    //   screen: TestPushNotification,
    // },
    PingLocation: {
      screen: Location,
    },
    Main: {
      screen: MyTabNavigator,
    },
    Login: {
      screen: Login,
    },

    // Test
    CameraDevice: {
      screen: CameraDevice,
    },
    TestLocation: {
      screen: TestLocation,
    },
    EntryTask: {
      screen: EntryTask,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
);

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});

export default createAppContainer(RootStack);
