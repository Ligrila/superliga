
import React, { useCallback, useState } from 'react';
import { StyleSheet, } from 'react-native';
import Api from '../../api/Api';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Container, Content } from 'native-base';
// Components
import Wallpaper from '../../components/Wallpaper/Wallpaper';
import AppHeader from '../../components/AppHeader/AppHeader';
import Logo from '../../components/Logo/Logo';

const homeBg = require('../../assets/images/home_bg.png');


const GameLoadingScreen = () => {
    const api = new Api();
    const navigation = useNavigation();
    const useForceUpdate = () => useState()[1];
    useForceUpdate()
    // Render any loading content that you like here
    const fetchTrivia = useCallback(async () => {
        try {
            let ct = await api.getCurrentTrivia();
            console.log('fetchTrivia', ct)
            if (ct) {
                const gameInProgress = ct.success;
                const route = gameInProgress ? 'GamePlay' : 'Home'
                navigation.navigate(route);
            }
            navigation.navigate('Home');
        } catch (e) {
            console.log('fetchTrivia error', e);
            navigation.navigate('Home');
        }
    }, [])

    // https://reactnavigation.org/docs/use-focus-effect/
    /**
     * Sometimes we want to run side-effects when a screen is focused. 
     * A side effect may involve things like adding an event listener, 
     * fetching data, updating document title, etc. 
     * While this can be achieved using focus and blur events, 
     * it's not very ergonomic.
     */
    useFocusEffect(
        useCallback(() => {
            fetchTrivia();
            return () => { };
        }, []))
    return (
        <Container>
            {/* <CheckDocument navigation={this.props.navigation} /> */}
            <Wallpaper source={homeBg}>
                {/* Header */}
                <AppHeader logo={true}/>
                {/* Main Content */}
                <Content>
                </Content>
            </Wallpaper>
        </Container>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default GameLoadingScreen;