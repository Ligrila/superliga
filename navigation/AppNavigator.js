import React from 'react';
import { createSwitchNavigator,createDrawerNavigator, createStackNavigator } from 'react-navigation';


import HomeScreen from '../screens/HomeScreen';
import GameScreen from '../screens/GameScreen';
import GameResultScreen from '../screens/GameResultScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen.';
import ProfileScreen from '../screens/ProfileScreen';
import CalendarScreen from '../screens/CalendarScreen';
import AwardsScreen from '../screens/AwardsScreen';
import BuyScreen from '../screens/BuyScreen';
import LogoutScreen from '../screens/LogoutScreen';

import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import GameLoadingScreen from '../screens/GameLoadingScreen';

import {SidebarDrawerContentComponent, SidebarItem} from '../components/SidebarDrawerContentComponent';

import Layout from '../constants/Layout';

import {Icon,Text} from 'native-base'
import StatisticsScreen from '../screens/StatisticsScreen';
import TriviasScreen from '../screens/TriviasScreen';
import PurchaseScreen from '../screens/PurchaseScreen';


const AuthStack = createStackNavigator(
  { 
    Login: LoginScreen,
    Register: RegisterScreen
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
          <SidebarItem label={"Jugar"} source={require('../assets/images/menu/awards.png')}/>
        )
      }
    }
  },
  TriviasScreen:{
    screen: TriviasScreen,
    navigationOptions: {
      drawerLabel: () => null
    }
  },
  GameResult:{
    screen: GameResultScreen,
    navigationOptions: {
      drawerLabel: () => null
    }
  },
  Purchase:{
    screen: PurchaseScreen,
    navigationOptions: {
      drawerLabel: () => null
    }
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      drawerLabel: () =>{
        return (
          <SidebarItem label={"Mi perfil"} source={require('../assets/images/menu/profile.png')}/>
        )
      }
    }
  },
  Calendar: {
    screen: CalendarScreen,
    navigationOptions: {
        drawerLabel: () =>{
          return (
            <SidebarItem label={"Fixture"} source={require('../assets/images/menu/fixture.png')}/>
          )
        }
      }
  },
  Awards:{
    screen: AwardsScreen,
    navigationOptions: {
      drawerLabel: () =>{
        return (
          <SidebarItem label={"Premios"} source={require('../assets/images/menu/awards.png')}/>
        )
      }
    }
  },
  /*Buy:{
    screen: BuyScreen,
    navigationOptions: {
      drawerLabel: () =>{
        return (
          <SidebarItem label={"Comprar"} source={require('../assets/images/menu/buy.png')}/>
        )
      }
    }
  },*/
  Statistics:{
    screen: StatisticsScreen,
    navigationOptions: {
      drawerLabel: () =>{
        return (
          <SidebarItem label={"Estadisticas"} source={require('../assets/images/menu/statistics.png')}/>
        )
      }
    }
  },
  Logout: {
    screen: LogoutScreen,
    navigationOptions: {
      drawerLabel: () =>{
        return (
          <SidebarItem label={"Cerrar sesion"} source={require('../assets/images/menu/awards.png')}/>
        )
      }
    }
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

