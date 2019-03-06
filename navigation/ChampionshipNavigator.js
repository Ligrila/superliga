import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';



import ChampionshipScreen from '../screens/ChampionshipScreen';
import ChampionshipViewScreen from '../screens/ChampionshipViewScreen';
import ChampionshipCreateScreen from '../screens/ChampionshipCreateScreen';
import ChampionshipSubscribeScreen from '../screens/ChampionshipSubscribeScreen';

import Layout from '../constants/Layout';
import ChallengeScreen from '../screens/ChallengeScreen';
import ChallengeCreateScreen from '../screens/ChallengeCreateScreen';

const ChampionshipStack = createStackNavigator(
    {
      ChampionshipHome: ChampionshipScreen,
      ChampionshipView: ChampionshipViewScreen,
      ChampionshipCreate: ChampionshipCreateScreen,
      ChampionshipSubscribe: ChampionshipSubscribeScreen
  
  
    },
    {
      headerMode: 'none',
    }
  )



ChampionshipStack.navigationOptions = {
  tabBarLabel: 'Torneo amigos',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name="trophy"
    />
  ),
};

const ChallengesStack = createStackNavigator({
    ChallengeHome: ChallengeScreen,
    ChallengeCreate: ChallengeCreateScreen

},
{
  headerMode: 'none',
});

ChallengesStack.navigationOptions = {
  tabBarLabel: 'Desafios',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name="handshake-o"

    />
  ),
};





export default createBottomTabNavigator({
    ChampionshipStack,
    ChallengesStack,

},
{
  tabBarOptions: {
    labelStyle: {
      fontFamily: 'OpenSans',
      fontSize: Layout.h(22),

    },
    activeTintColor:'#fff',
    inactiveTintColor: '#ccc',

    tabStyle: {

    },

   style: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right:0,
      backgroundColor: 'rgba(28, 28, 28, 0.8)',
    },
  }
}
);
