import React from 'react';
import { createSwitchNavigator,createDrawerNavigator, createStackNavigator } from 'react-navigation';


import MainTabNavigator from './MainTabNavigator';

import LoginScreen from '../screens/LoginScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';

import {SidebarDrawerContentComponent} from '../components/SidebarDrawerContentComponent';



const AuthStack = createStackNavigator(
  { 
    Login: LoginScreen 
  },
);

var Main = createDrawerNavigator({
  Home: {
    screen: MainTabNavigator
  },
  Login: {
    screen: LoginScreen
  }
},{
    drawerPosition: 'right',
    contentComponent: SidebarDrawerContentComponent,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle'
  }
);

export default createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  AuthLoading: AuthLoadingScreen,
  Main: Main,
  Auth: AuthStack

},
{
  initialRouteName: 'AuthLoading'
});
