import React from 'react';
import { createSwitchNavigator,createDrawerNavigator, createStackNavigator } from 'react-navigation';


import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CalendarScreen from '../screens/CalendarScreen';
import AwardScreen from '../screens/AwardScreen';
import BuyScreen from '../screens/BuyScreen';
import LogoutScreen from '../screens/LogoutScreen';

import AuthLoadingScreen from '../screens/AuthLoadingScreen';

import {SidebarDrawerContentComponent} from '../components/SidebarDrawerContentComponent';

import Layout from '../constants/Layout';



const AuthStack = createStackNavigator(
  { 
    Login: LoginScreen 
  },
);

var Main = createDrawerNavigator({
  Home: {
    screen: HomeScreen
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
    drawerPosition: 'left',
    contentComponent: SidebarDrawerContentComponent,
    drawerOpenRoute: 'DrawerOpen',
    drawerWidth: Layout.window.width - 70,
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
