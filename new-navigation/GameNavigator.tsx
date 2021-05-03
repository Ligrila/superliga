
import React from 'react';
// Stack
import { createStackNavigator } from '@react-navigation/stack';
import { TransitionPresets } from '@react-navigation/stack';
// Screens
import HomeScreen from '../screens/HomeScreen';
import HomeScreen2 from '../screens/HomeScreen2';
import GameStack from '../screens/HomeScreen2';
import GameScreen from '../screens/GameScreen';
import GameResultScreen from '../screens/GameScreen';
import GameEndScreen from '../screens/GameEndScreen';
import GameStartScreen from '../screens/GameStartScreen';
import GameHalfTimeEndScreen from '../screens/GameHalfTimeEndScreen';
import GameHalfTimeStartScreen from '../screens/GameHalfTimeStartScreen';
import BannerScreen from '../screens/BannerScreen';
import GameHalfTimePlayScreen from '../screens/GameHalfTimePlayScreen';
import GameExtraPlayScreen from '../screens/GameExtraPlayScreen';
import GameLoadingScreen from '../screens/GameLoadingScreen';
// Create
const Stack = createStackNavigator();


const GamePlayNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="GamePlay"
            headerMode="none"
            screenOptions={{
                gestureEnabled: true,
                ...TransitionPresets.SlideFromRightIOS
            }}
        >
            <Stack.Screen name="GamePlay" component={GameScreen} />
            <Stack.Screen name="GameResult" component={GameResultScreen} />
            <Stack.Screen name="GameEnd" component={GameEndScreen} />
            <Stack.Screen name="StartFirstTime" component={GameStartScreen} />
            <Stack.Screen name="HalfTime" component={GameStartScreen} />
            <Stack.Screen name="HalfTimeStart" component={GameHalfTimeStartScreen} />
            <Stack.Screen name="Banner" component={BannerScreen} />
            <Stack.Screen name="GameHalfTimePlay" component={GameHalfTimePlayScreen} />
            <Stack.Screen name="GameExtraPlay" component={GameExtraPlayScreen} />
            <Stack.Screen name="GameLoading" component={GameLoadingScreen} />
        </Stack.Navigator>
    );
}



const GameNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="GameLoading"
            screenOptions={{
                gestureEnabled: true,
                ...TransitionPresets.SlideFromRightIOS
            }}
        >
            <Stack.Screen name="GameLoading" component={GameLoadingScreen} />
            <Stack.Screen name="HomeOld" component={HomeScreen} />
            <Stack.Screen name="Home" component={HomeScreen2} />
            <Stack.Screen name="GamePlay" component={GamePlayNavigator} />
        </Stack.Navigator>
    );
}

export default GameNavigator;