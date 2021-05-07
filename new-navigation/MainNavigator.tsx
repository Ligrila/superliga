
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
        >
            <Drawer.Screen name="GameLoading" component={GameLoadingScreen} />
            <Drawer.Screen name="GamePlay" component={GameNavigator} />
            <Drawer.Screen name="Home" component={HomeScreen} />
            {/* Profile */}
            <Drawer.Screen name="Profile" component={ProfileScreen} />
            <Drawer.Screen name="EditProfile" component={EditProfileScreen} />
            {/* Fixture */}
            <Drawer.Screen name="Fixture" component={CalendarScreen} />
            {/* Statistics */}
            <Drawer.Screen name="Statistics" component={StatisticsScreen} />
            {/* Awards */}
            <Drawer.Screen name="Awards" component={AwardsScreen} />
            {/* Ranking */}
            <Drawer.Screen name="Ranking" component={RankingScreen} />
        </Drawer.Navigator>
    );
}

export default MainNavigator;
