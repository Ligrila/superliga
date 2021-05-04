
import React, { useCallback, useEffect } from 'react';
import Reflux from 'reflux';
import {
    ActivityIndicator,
    StatusBar,
    StyleSheet,
    View,
} from 'react-native';

import Api from '../../api/Api';

import { NextTriviaStore } from '../../store/NextTriviaStore'
import { useNavigation } from '@react-navigation/native';

const GameLoadingScreen = () => {
    const api = new Api();
    const navigation = useNavigation();

    // Render any loading content that you like here
    const fetchTrivia = useCallback(async () => {
        try {
            let ct = await api.getCurrentTrivia();
            if (ct) {
                const gameInProgress = ct.success;
                console.log('gameInProgress')
                navigation.navigate(gameInProgress ? 'GamePlay' : 'Home');
            }
            navigation.navigate('Home');
        } catch (e) {
            console.log('fetchTrivia', e);
        }
    }, [api])
    useEffect(() => {
        fetchTrivia();
    }, [])
    return (
        <View style={styles.container}>
            <ActivityIndicator />
            <StatusBar barStyle="default" />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    }
});

export default GameLoadingScreen;