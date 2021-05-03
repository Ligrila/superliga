
import React from 'react';
// Stack
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TransitionPresets } from '@react-navigation/stack';
// Sidebar 
import  Sidebar from '../components/SidebarDrawerContentComponent/Sidebar';
// Navigator
import GameNavigator from './GameNavigator';
// Drawer
const Drawer = createDrawerNavigator();  
// MainNavigator
const MainNavigator = () => {
    return (
        <Drawer.Navigator
            screenOptions={{
                gestureEnabled: true,
                ...TransitionPresets.SlideFromRightIOS,
            }}
            drawerContent={(props) => <Sidebar {...props} />} 
            >
            <Drawer.Navigator initialRouteName="GameLoading">
                <Drawer.Screen 
                    name="GameLoading" 
                    component={GameNavigator} 
                    options={{ drawerLabel: 'Inicio' }}
                />
            </Drawer.Navigator>
        </Drawer.Navigator>
    );
}

export default MainNavigator;