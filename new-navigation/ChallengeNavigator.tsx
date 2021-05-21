
import React from 'react';
// Stack
import { createStackNavigator } from '@react-navigation/stack';
import ChallengeCreateScreen from '../screens/Challenges/ChallengeCreateScreen';
import ChallengeScreen from '../screens/Challenges/ChallengeScreen';
import ChallengeRequestScreen from '../screens/Challenges/ChallengeRequestScreen';

// Create
const Stack = createStackNavigator();

export const CHALLELNGES_ROUTES_STRING = [
    "ChallengeHome",
    "ChallengeCreate" ,
    "ChampionshipView",
    "ChallengeRequest",
    "ChallengeView"
]

const ChallengeNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="ChallengeHome"
            headerMode="none"
            screenOptions={{

            }}

        >
            {/* 
   
 const ChallengesStack = createStackNavigator({
    ChallengeHome: ChallengeScreen,
    ChallengeCreate: ChallengeCreateScreen,
    ChallengeRequest: ChallengeRequestScreen,
    ChallengeView: ChallengeViewScreen

},
{
  headerMode: 'none',
});
   */}
            <Stack.Screen name="ChallengeHome" component={ChallengeScreen} />
            <Stack.Screen name="ChallengeCreate" component={ChallengeCreateScreen} />
            {/* <Stack.Screen name="ChampionshipView" component={ChampionshipViewScreen} /> */}
            <Stack.Screen name="ChallengeRequest" component={ChallengeRequestScreen} />
            {/* <Stack.Screen name="ChallengeView" component={ChampionshipEditUsersScreen} /> */}
        </Stack.Navigator>
    );
}





export default ChallengeNavigator;