import React from 'react';
import { createSwitchNavigator,createDrawerNavigator, createStackNavigator } from 'react-navigation';


import HomeScreen from '../screens/HomeScreen';
import GameScreen from '../screens/GameScreen';
import GameResultScreen from '../screens/GameResultScreen';
import LoginScreen from '../screens/LoginScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CalendarScreen from '../screens/CalendarScreen';
import AwardScreen from '../screens/AwardScreen';
import BuyScreen from '../screens/BuyScreen';
import LogoutScreen from '../screens/LogoutScreen';

import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import GameLoadingScreen from '../screens/GameLoadingScreen';

import {SidebarDrawerContentComponent} from '../components/SidebarDrawerContentComponent';

import Layout from '../constants/Layout';

import {Icon,Text} from 'native-base'

const AuthStack = createStackNavigator(
  { 
    Login: LoginScreen 
  },
);

var GameSwitcher = createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  GameLoading: GameLoadingScreen,
  Home: HomeScreen,
  GamePlay: GameScreen,

},
{
  initialRouteName: 'GameLoading'
});


var Main = createDrawerNavigator({
  HomeSwitcher: {
    screen: GameSwitcher,
    navigationOptions: {
      title: "Inicio",
      drawerLabel: () =>{
        return (
          <Text><Icon name='home' type='FontAwesome' /> Inicio</Text>
        )
      }
    }
  },
  GameResult:{
    screen: GameResultScreen,
    navigationOptions: {
      drawerLabel: () => null
    }
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

