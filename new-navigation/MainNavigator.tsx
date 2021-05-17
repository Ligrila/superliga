
import React from 'react';
// Stack
import { createDrawerNavigator } from '@react-navigation/drawer';
// Sidebar 
import Sidebar from '../components/SidebarDrawerContentComponent/Sidebar';
// Navigator
import GameNavigator from './GameNavigator';
// Layout
import Layout from '../constants/Layout'
// Screens
import GameLoadingScreen from '../screens/Game/GameLoadingScreen';
import HomeScreen from '../screens/Home/HomeScreen';
import ProfileScreen from '../screens/User/ProfileScreen';
import EditProfileScreen from '../screens/User/EditProfileScreen';
import CalendarScreen from '../screens/Calendar/CalendarScreen';
import StatisticsScreen from '../screens/Statistics/StatisticsScreen';
import AwardsScreen from '../screens/Awards/AwardsScreen';
import RankingScreen from '../screens/Ranking/RankingScreen';
import PurchaseScreen from '../screens/Purchase/PurchaseScreen';
import ChampionshipNavigator from './ChampionshipNavigator';
import HomeNextMatchsScreen from '../screens/Home/HomeNextMatchsScreen';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';



const Stack = createStackNavigator();

const Screens = ({ navigation }) => {
    return (
        <Stack.Navigator
            headerMode="none"
            initialRouteName="Home"
            screenOptions={{
                ...TransitionPresets.SlideFromRightIOS,
                gestureEnabled: false
            }}>

            {/* <Stack.Screen name="GameLoading" component={GameLoadingScreen} /> */}
            <Stack.Screen name="GamePlayStack" 
                options={{
                    gestureEnabled: false
                }}
                component={GameNavigator} />
            {/* Home */}
            <Stack.Screen name="Home" component={HomeScreen}  />
            <Stack.Screen name="HomeNextMatchs" component={HomeNextMatchsScreen} />
            {/* Profile */}
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="EditProfile" component={EditProfileScreen} />
            {/* Fixture */}
            <Stack.Screen name="Fixture" component={CalendarScreen} />
            {/* Statistics */}
            <Stack.Screen name="Statistics" component={StatisticsScreen} />
            {/* Awards */}
            <Stack.Screen name="Awards" component={AwardsScreen} />
            {/* Ranking */}
            <Stack.Screen name="Ranking" component={RankingScreen} />
            {/* Purchase */}
            <Stack.Screen name="Purchase" component={PurchaseScreen} />
            {/* Championship */}
            <Stack.Screen name="ChampionshipStack" component={ChampionshipNavigator} />            
        </Stack.Navigator>
    );
};


// Drawer
const Drawer = createDrawerNavigator();
// MainNavigator
const MainNavigator = () => {
    return (
        <Drawer.Navigator

            drawerPosition={'left'}
            drawerContent={(props) => <Sidebar {...props} />}
            initialRouteName="GameLoading"
            drawerStyle={{ width: Layout.window.width - 70 }}
            // drawerContentOptions={{}}
            screenOptions={{
                gestureEnabled: true,
                swipeEnabled: true
            }}
        >
            <Drawer.Screen name="Screens">
                {props => <Screens {...props} />}
            </Drawer.Screen>
        </Drawer.Navigator>
    );
}

export default MainNavigator;
