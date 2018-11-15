import React from 'react';
import { createSwitchNavigator,createDrawerNavigator, createStackNavigator } from 'react-navigation';


import HomeScreen from '../screens/HomeScreen';
import HomeScreen2 from '../screens/HomeScreen2';

import GameScreen from '../screens/GameScreen';
import GameResultScreen from '../screens/GameResultScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen.';
import ProfileScreen from '../screens/ProfileScreen';
import CalendarScreen from '../screens/CalendarScreen';
import AwardsScreen from '../screens/AwardsScreen';
import BuyScreen from '../screens/BuyScreen';
import LogoutScreen from '../screens/LogoutScreen';
import RankingScreen from '../screens/RankingScreen';

import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import GameLoadingScreen from '../screens/GameLoadingScreen';

import {SidebarDrawerContentComponent, SidebarItem} from '../components/SidebarDrawerContentComponent';

import Layout from '../constants/Layout';

import {Icon,Text} from 'native-base'
import StatisticsScreen from '../screens/StatisticsScreen';
import TriviasScreen from '../screens/TriviasScreen';
import PurchaseScreen from '../screens/PurchaseScreen';
import LivePacksScreen from '../screens/LivePacksScreen';
import BrowserScreen from '../screens/BrowserScreen';
import GameRulesScreen from '../screens/GameRulesScreen';
import GameEndScreen from '../screens/GameEndScreen';



const AuthStack = createStackNavigator(
  { 
    Login: LoginScreen,
    Browser: {
      screen: BrowserScreen,
      navigationOptions: {
        drawerLabel: () => null
      }
    },
    Register: RegisterScreen
  },
  {
    initialRouteName: 'Login'
  }
);

const GameStack = createStackNavigator(
  {
    GamePlay: GameScreen,
    GameResult: GameResultScreen,
    GameEnd: GameEndScreen,
    GameLoading: GameLoadingScreen,

  },
  {
    headerMode: 'none',
  }
)

var GameSwitcher = createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  GameLoading: GameLoadingScreen,
  HomeOld: HomeScreen,
  Home: HomeScreen2,
  GamePlay: GameStack ,

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
          <SidebarItem label={"Jugar"} icon="gamepad" source={require('../assets/images/menu/awards.png')}/>
        )
      }
    }
  },
  Rules: {
    screen: GameRulesScreen,
    navigationOptions: {
      title: "Reglas",
      drawerLabel: () =>{
        return (
          <SidebarItem label={"Reglas del juego"} icon="legal" source={require('../assets/images/menu/awards.png')}/>
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
          <SidebarItem label={"Mi perfil"} icon="user" source={require('../assets/images/menu/profile.png')}/>
        )
      }
    }
  },
  Calendar: {
    screen: CalendarScreen,
    navigationOptions: {
        drawerLabel: () =>{
          return (
            <SidebarItem label={"Fixture"} icon="calendar" source={require('../assets/images/menu/fixture.png')}/>
          )
        }
      }
  },
  LivePacks: {
    screen: LivePacksScreen,
    navigationOptions: {
      drawerLabel: () =>{
        return (
          <SidebarItem label={"Comprar"} icon="shopping-cart" source={require('../assets/images/menu/profile.png')}/>
        )
      },
      mode: 'modal',
      headerMode: 'none',
    }
  },
  Awards:{
    screen: AwardsScreen,
    navigationOptions: {
      drawerLabel: () =>{
        return (
          <SidebarItem label={"Premios"} icon="trophy" source={require('../assets/images/menu/awards.png')}/>
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
          <SidebarItem label={"Estadisticas"} icon="bar-chart" source={require('../assets/images/menu/statistics.png')}/>
        )
      }
    }
  },
  Ranking:{
    screen: RankingScreen,
    navigationOptions: {
      drawerLabel: () =>{
        return (
          <SidebarItem label={"Ranking"} icon="list-ol" source={require('../assets/images/menu/statistics.png')}/>
        )
      }
    }
  },

 
  
  Logout: {
    screen: LogoutScreen,
    navigationOptions: {
      drawerLabel: () => null
      /*drawerLabel: () =>{
        return (
          <SidebarItem label={"Cerrar sesion"} source={require('../assets/images/menu/awards.png')}/>
        )
      }*/
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

