import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChampionshipNavigator from './ChampionshipNavigator';
import { Icon } from 'native-base';
import ChallengeNavigator from './ChallengeNavigator';
import { Variables } from '../styles';
import Layout from '../constants/Layout';
import { Platform } from 'react-native';
import AllChampionshipScreen from '../screens/Championship/AllChampionshipScreen';

const Tab = createBottomTabNavigator();

const ChampionshipTabNavigator = () => {
    return (
        <Tab.Navigator
            initialRouteName={'ChampionshipStack'}
            tabBarOptions={{
                activeTintColor: 'white',
                tabStyle: {
                    paddingVertical: 0,
                },
                labelStyle: {
                    fontFamily: Variables.openSans,
                    fontSize: 12
                },
                style: {
                    borderTopWidth: 0,
                    backgroundColor: Variables.dark,
                    height: Layout.isAndroid ? 70 : 90,
                    paddingTop: 10,
                    paddingBottom: Layout.isAndroid ? 10 : 30
                },
            }}
        >
            <Tab.Screen
                options={
                    {
                        tabBarLabel: 'Torneo amigos',
                        tabBarIcon: ({ color, size }) => (
                            <Icon
                                type="FontAwesome"
                                name="trophy"
                                color={color}
                                fontSize={size}
                                style={{ color: color }}
                            />)
                    }
                }
                name="ChampionshipStack"
                component={ChampionshipNavigator} />
            <Tab.Screen
                options={
                    {
                        tabBarLabel: 'Desafios',
                        tabBarIcon: ({ color, size }) => (
                            <Icon
                                type="FontAwesome"
                                name="handshake-o"
                                color={color}
                                fontSize={size}
                                style={{ color: color }}
                            />)
                    }
                }
                name="ChallengeStack"
                component={ChallengeNavigator} />
            <Tab.Screen
                options={
                    {
                        tabBarLabel: 'General',
                        tabBarIcon: ({ color, size }) => (
                            <Icon
                                type="FontAwesome"
                                name="group"
                                color={color}
                                fontSize={size}
                                style={{ color: color }}
                            />)
                    }
                }
                name="AllChampionshipStack"
                component={AllChampionshipScreen} />

        </Tab.Navigator>
    );
}

export default ChampionshipTabNavigator;