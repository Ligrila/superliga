
import React from 'react';
// Stack
import { createStackNavigator } from '@react-navigation/stack';
import ChampionshipScreen from '../screens/Championship/ChampionshipScreen';
import ChampionshipCreateScreen from '../screens/Championship/ChampionshipCreateScreen';
import ChampionshipViewScreen from '../screens/Championship/ChampionshipViewScreen';
// Create
const Stack = createStackNavigator();


const ChampionshipNavigator = () => {
    return (
        <Stack.Navigator 
            initialRouteName="ChampionshipHome"
            headerMode="none"
        >
   {/* 
   
   ChampionshipHome: ChampionshipScreen,
      ChampionshipView: ChampionshipViewScreen,
      ChampionshipCreate: ChampionshipCreateScreen,
      ChampionshipEdit:ChampionshipEditScreen,
      ChampionshipEditUsers:ChampionshipEditUsersScreen,
      ChampionshipSubscribe: ChampionshipSubscribeScreen
   */}
            <Stack.Screen name="ChampionshipHome" component={ChampionshipScreen} />
            <Stack.Screen name="ChampionshipCreate" component={ChampionshipCreateScreen} />
            <Stack.Screen name="ChampionshipView" component={ChampionshipViewScreen} />
            {/* <Stack.Screen name="ChampionshipView" component={GameResultScreen} />
            <Stack.Screen name="ChampionshipCreate" component={GameEndScreen} />
            <Stack.Screen name="ChampionshipEdit" component={GameStartScreen} />
            <Stack.Screen name="ChampionshipEditUsers" component={GameHalfTimeEndScreen} />
            <Stack.Screen name="ChampionshipSubscribe" component={GameHalfTimeStartScreen} /> */}
        </Stack.Navigator>
    );
}





export default ChampionshipNavigator;