import React from 'react';
import { createSwitchNavigator,createDrawerNavigator, createStackNavigator } from 'react-navigation';


import MainTabNavigator from './MainTabNavigator';

import LoginScreen from '../screens/LoginScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CalendarScreen from '../screens/CalendarScreen';
import AwardScreen from '../screens/AwardScreen';
import BuyScreen from '../screens/BuyScreen';
import LogoutScreen from '../screens/LogoutScreen';

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
  Profile: {
    screen: ProfileScreen
  },
  Calendar: {
    screen: CalendarScreen
  },
  Award:{
    screen: AwardScreen
  },
  Buy:{
    screen: BuyScreen
  },
  Logout: {
    screen: LogoutScreen
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
