import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './types';
import MainNavigator from './MainNavigator';
// import LinkingConfiguration from './LinkingConfiguration';
import AuthNavigator from './AuthNavigator';
import AuthLoadingScreen from '../screens/Auth/AuthLoadingScreen';
// import BottomTabNavigator from './BottomTabNavigator';



// Navigation
export default function Navigation(props) {
  return (
    <NavigationContainer>
      <RootNavigator isLoggedIn={props.isLoggedIn} />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator(props) {
  // const initialRouteName = props.isLoggedIn ? 'Main' : 'Auth'
  return (
    <Stack.Navigator initialRouteName={'AuthLoading'}
      screenOptions={{ headerShown: false, }}>

      <Stack.Screen name="AuthLoading" component={AuthLoadingScreen} />
      <Stack.Screen name="Auth" component={AuthNavigator} />
      <Stack.Screen name="Main" component={MainNavigator} />
    </Stack.Navigator>
  );
}





