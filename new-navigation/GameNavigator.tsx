
import React from 'react';
// Stack
import { createStackNavigator } from '@react-navigation/stack';
// Screens
import GameScreen from '../screens/Game/GameScreen';
import GameStartScreen from '../screens/Game/GameStartScreen';
// Half Time
import GameHalfTimeEndScreen from '../screens/Game/GameHalfTimeEndScreen';
import GameHalfTimePlayScreen from '../screens/Game/GameHalfTimePlayScreen';
import GameHalfTimeStartScreen from '../screens/Game/GameHalfTimeStartScreen';
// Extra Play
import GameExtraPlayScreen from '../screens/Game/GameExtraPlayScreen';
// Banner
import BannerScreen from '../screens/Game/BannerScreen';
// Result ?
// import GameResultScreen from '../screens/GameScreen';
// End Screen
import GameEndScreen from '../screens/Game/GameEndScreen';


export const GAME_ROUTES_STRING = [
    'StartFirstTime',
    'GamePlay',
    'HalfTime',
    'GameHalfTimePlay',
    'HalfTimeStart',
    'GameExtraPlay',
    'GameEnd',
    'Banner',
    'GameLoading'
];

// Game 
import GameLoadingScreen from '../screens/Game/GameLoadingScreen';
// Create
const Stack = createStackNavigator();


const GameNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="GamePlay"
            headerMode="none"
            screenOptions={{

                gestureEnabled: false,
            }}

        >
            {/* 
            GamePlay: GameScreen,
            GameResult: GameResultScreen,
            GameEnd: GameEndScreen,
            StartFirstTime: GameStartScreen,
            HalfTime: GameHalfTimeEndScreen,
            HalfTimeStart: GameHalfTimeStartScreen,
            Banner: BannerScreen,
            GameHalfTimePlay: GameHalfTimePlayScreen,
            GameExtraPlay: GameExtraPlayScreen,
            GameLoading: GameLoadingScreen, */}
            {/* Start  */}
            <Stack.Screen name="StartFirstTime" component={GameStartScreen} />
            <Stack.Screen name="GamePlay" component={GameScreen} />
            {/* Half Time */}
            <Stack.Screen name="HalfTime" component={GameHalfTimeEndScreen} />
            <Stack.Screen name="GameHalfTimePlay" component={GameHalfTimePlayScreen} />
            <Stack.Screen name="HalfTimeStart" component={GameHalfTimeStartScreen} />
            {/* Extra Play */}
            <Stack.Screen name="GameExtraPlay" component={GameExtraPlayScreen} />
            {/* Results ? */}
            {/* <Stack.Screen name="GameResult" component={GameResultScreen} /> */}
            {/* End */}
            <Stack.Screen name="GameEnd" component={GameEndScreen} />
            {/* Banner */}
            <Stack.Screen name="Banner" component={BannerScreen} />

            {/* Loading */}
            <Stack.Screen name="GameLoading" component={GameLoadingScreen} />
        </Stack.Navigator>
    );
}


export default GameNavigator;