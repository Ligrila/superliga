
import React from 'react';
// Stack
import { createStackNavigator } from '@react-navigation/stack';
import ChampionshipScreen from '../screens/Championship/ChampionshipScreen';
import ChampionshipCreateScreen from '../screens/Championship/ChampionshipCreateScreen';
import ChampionshipViewScreen from '../screens/Championship/ChampionshipViewScreen';
import ChampionshipEditScreen from '../screens/Championship/ChampionshipEditScreen';
import ChampionshipEditUsersScreen from '../screens/Championship/ChampionshipEditUsersScreen';
import ChampionshipSubscribeScreen from '../screens/Championship/ChampionshipSubscribeScreen';
// Create
const Stack = createStackNavigator();

export const CHAMPIONSHIP_ROUTES_STRING = [
    "ChampionshipHome",
    "ChampionshipCreate",
    "ChampionshipView",
    "ChampionshipEdit",
    "ChampionshipEditUsers",
    "ChampionshipSubscribe"
]

const ChampionshipNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="ChampionshipHome"
            headerMode="none"
            screenOptions={{

            }}

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
            <Stack.Screen name="ChampionshipEdit" component={ChampionshipEditScreen} />
            <Stack.Screen name="ChampionshipEditUsers" component={ChampionshipEditUsersScreen} />
            <Stack.Screen name="ChampionshipSubscribe" component={ChampionshipSubscribeScreen} />
        </Stack.Navigator>
    );
}





export default ChampionshipNavigator;