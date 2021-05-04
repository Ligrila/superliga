
import React, { useCallback, useEffect } from 'react';
import {
    ActivityIndicator,
    StatusBar,
    StyleSheet,
    View,
} from 'react-native';
// Async Storage
import AsyncStorage from '@react-native-async-storage/async-storage';
// Api
import Api from '../../api/Api';
// Store To Remove :p
import { UsersActions, UsersStore } from '../../store/UserStore';
// Navigation
import { useNavigation } from '@react-navigation/native';

const AuthLoadingScreen = () => {
    // Api
    const api = new Api();
    // Navigatio
    const navigation = useNavigation();

    // Fetch the token from storage then navigate to our appropriate place
    const fnCheckIfLoggedIn = useCallback(async () => {
        console.log('fnCheckIfLoggedIn');
        let isLogin = false;
        try {
            const userToken = await AsyncStorage.getItem('token');
            console.log({ userToken })
            const tokenExpire = await AsyncStorage.getItem('tokenExpire') || 0;
            let timestamp = new Date().getTime();
            let notExpired = tokenExpire > timestamp;
            isLogin = (userToken && (tokenExpire !== null && notExpired)) ? true : false;
            if (isLogin) {
                // TODO: reveer esto, buscar una forma de detectar logouts en los request
                await UsersActions.update();

                const user = UsersStore.state.user;
                const hasInformation = UsersStore.state.hasInformation;

                if (!user) {
                    isLogin = false;
                }
                if (!hasInformation) {
                    isLogin = false;
                }
            }
        } catch (e) {
            //console.log(e);
        }
        //UsersActions.isLoggedIn(isLogin);

        if (isLogin) {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Main' }],
            });
        } else {
            navigation.navigate('Auth')
        }
        
    }, []);

    useEffect(() => {
        // Create an scoped async function in the hook
        // Execute the created function directly
        fnCheckIfLoggedIn();
    }, []);
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
        backgroundColor: '#fff',
    }
});

export default AuthLoadingScreen;