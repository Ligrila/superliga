
import React from 'react';
// Stack
import { createStackNavigator } from '@react-navigation/stack';
import { TransitionPresets } from '@react-navigation/stack';
// Screens
import LoginScreen from '../screens/Auth/LoginScreen';
import LogoutScreen from '../screens/Auth/LogoutScreen';



const Stack = createStackNavigator();


const AuthNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Login" headerMode="none"
            screenOptions={{
                gestureEnabled: true,
                ...TransitionPresets.SlideFromRightIOS
            }}
            >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Logout" component={LogoutScreen} />
        </Stack.Navigator>
    );
}

export default AuthNavigator;