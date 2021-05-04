
import React from 'react';
// Stack
import { createStackNavigator } from '@react-navigation/stack';
import { TransitionPresets } from '@react-navigation/stack';
// Screens
import LoginScreen from '../screens/Auth/LoginScreen';
import LogoutScreen from '../screens/Auth/LogoutScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';



const Stack = createStackNavigator();


const AuthNavigator = () => {
    return (
        <Stack.Navigator 
            initialRouteName="Login" 
            screenOptions={{gestureEnabled: false}}
            headerMode="none">
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Logout" component={LogoutScreen} />
        </Stack.Navigator>
    );
}

export default AuthNavigator;