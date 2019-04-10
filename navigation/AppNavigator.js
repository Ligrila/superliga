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
import TutorialScreen from '../screens/TutorialScreen';
import GameHalfTimeEndScreen from '../screens/GameHalfTimeEndScreen';
import GameHalfTimeStartScreen from '../screens/GameHalfTimeStartScreen';
import GameStartScreen from '../screens/GameStartScreen';
import GameHalfTimePlayScreen from '../screens/GameHalfTimePlayScreen';
import GameExtraPlayScreen from '../screens/GameExtraPlayScreen';

import AboutScreen from '../screens/AboutScreen';

import ChampionshipNavigator from './ChampionshipNavigator'
import NotificationScreen from '../screens/NotificationScreen';
import ContactScreen from '../screens/ContactScreen';
import InAppBrowserScreen from '../screens/InAppBrowserScreen';
import EditProfileScreen from '../screens/EditProfileScreen';





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
    StartFirstTime: GameStartScreen,
    HalfTime: GameHalfTimeEndScreen,
    HalfTimeStart: GameHalfTimeStartScreen,
    GameHalfTimePlay: GameHalfTimePlayScreen,
    GameExtraPlay: GameExtraPlayScreen,
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
          <SidebarItem label={"Jugar"} icon="gamepad" />
        )
      }
    }
  },
  Notification:{
    screen: NotificationScreen,
    navigationOptions: {
      title: "Notificaciones",
      drawerLabel: () =>{
        return (
          <SidebarItem label={"Notificaciones"} icon="comment" />
        )
      }
    }
  },
  Championship:{
    screen: ChampionshipNavigator,
    navigationOptions: {
      drawerLabel: () =>{
        return (
          <SidebarItem label={"Torneo amigos"} icon="trophy"  />
        )
      }
    }
  },
  LivePacks: {
    screen: LivePacksScreen,
    navigationOptions: {
      drawerLabel: () =>{
        return (
          <SidebarItem label={"Comprar"} icon="shopping-cart" />
        )
      },
      mode: 'modal',
      headerMode: 'none',
    }
  },
  Calendar: {
    screen: CalendarScreen,
    navigationOptions: {
        drawerLabel: () =>{
          return (
            <SidebarItem label={"Fixture"} icon="calendar" />
          )
        }
      }
  },
  InAppBrowser: {
    screen: InAppBrowserScreen,
    navigationOptions: {
      drawerLabel: () => null
    }
  },
  EditProfile: {
    screen: EditProfileScreen,
    navigationOptions: {
      drawerLabel: () => null
    }
  },
  /*Awards:{
    screen: AwardsScreen,
    navigationOptions: {
      drawerLabel: () =>{
        return (
          <SidebarItem label={"Premios"} icon="gift" />
        )
      }
    }
  },*/
  Statistics:{
    screen: StatisticsScreen,
    navigationOptions: {
      drawerLabel: () =>{
        return (
          <SidebarItem label={"Estadisticas"} icon="bar-chart" />
        )
      }
    }
  },
  Tutorial: {
    screen: TutorialScreen,
    navigationOptions: {
      title: "Tutorial",
      drawerLabel: () => null
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

  Ranking:{
    screen: RankingScreen,
    navigationOptions: {
      drawerLabel: () =>{
        return (
          <SidebarItem label={"Ranking"} icon="list-ol" />
        )
      }
    }
  },


  Contact: {
    screen: ContactScreen,
    navigationOptions: {
      drawerLabel: () =>{
        return (
          <SidebarItem label={"Contacto"} icon="send" />
        )
      }
    }
  },

  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      drawerLabel: () =>{
        return (
          <SidebarItem label={"Mi perfil"} icon="user" />
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
          <SidebarItem label={"Reglas del juego"} icon="legal" />
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


  About:{
    screen: AboutScreen,
    navigationOptions: {
      drawerLabel: () =>{
        return (
          <SidebarItem label={"Acerca"} icon="soccer-ball-o" />
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

