import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './types';
import MainNavigator from './MainNavigator';
import AuthNavigator from './AuthNavigator';
import AuthLoadingScreen from '../screens/Auth/AuthLoadingScreen';
import { navigationRef } from './RootNavigation';
import { useRecoilState } from 'recoil';
import { navigationAtomState } from '../recoil/Navigation.recoil';

// import { promiseSetRecoil, promiseGetRecoil } from "recoil-outside"


export default function Navigation(props) {
  const [, setNavigationState] = useRecoilState(navigationAtomState)
  const onStateChange = async (state) => {
    // console.log('onStateChange', state)
    setNavigationState(state);
  }
  return (
    <NavigationContainer ref={navigationRef} onStateChange={onStateChange}>
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
    <Stack.Navigator
      initialRouteName={'AuthLoading'}
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}
    >
      <Stack.Screen name="AuthLoading" component={AuthLoadingScreen} />
      <Stack.Screen name="Auth" component={AuthNavigator} />
      <Stack.Screen name="Main" component={MainNavigator} />
    </Stack.Navigator>
  );
}





