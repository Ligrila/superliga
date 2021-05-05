
import React from 'react';
// Stack
import { createDrawerNavigator } from '@react-navigation/drawer';
// Sidebar 
import Sidebar from '../components/SidebarDrawerContentComponent/Sidebar';
// Navigator
import GameNavigator from './GameNavigator';
// Layout
import Layout from '../constants/Layout'
// Drawer
const Drawer = createDrawerNavigator();
// MainNavigator
const MainNavigator = () => {
    return (
        <Drawer.Navigator
            drawerPosition={'left'}
            drawerContent={(props) => <Sidebar {...props} />}
            initialRouteName="GameLoadingStack"
            drawerStyle={{ width: Layout.window.width - 70 }}
         
        >
            <Drawer.Screen
                name="GameLoadingStack"
                component={GameNavigator}
                options={{ drawerLabel: 'Inicio' }}
            />
            
        </Drawer.Navigator>
    );
}

export default MainNavigator;