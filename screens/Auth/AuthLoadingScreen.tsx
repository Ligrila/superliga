
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
// Utilities
import AuthUtility from '../../utilities/Auth/Auth.utility';
// Helpers
import AuthHelper from '../../helpers/Auth/Auth.helper';
// Recpil
import { useSetRecoilState } from 'recoil';
import { authUserAtom, authUserLivesAtom } from '../../recoil/Auth.recoil';

const AuthLoadingScreen = () => {
    // Recoil
    const setAuthUser = useSetRecoilState(authUserAtom);
    const setAuthUserLives = useSetRecoilState(authUserLivesAtom);
    // Api
    const api = new Api();
    // Navigation
    const navigation = useNavigation();
    // Helper
    const authHelper = new AuthHelper();
    // Fetch the token from storage then navigate to our appropriate place
    const fnCheckIfLoggedIn = useCallback(async () => {
        console.log('fnCheckIfLoggedIn');
        let isLogin = false;
        try {
            if (await AuthUtility.checkIfLoggedIn()) {
                isLogin = true;
                const response = await api.getUserInformation();
                if (!response.success) {
                    throw new Error('Response Api');
                }
                const authUserFormatted = authHelper.formatAuthUser(response);
                // Set Atom User
                setAuthUser(authUserFormatted);
                // Set Atom User Lives
                setAuthUserLives(authUserFormatted.lives);            
            }          
        } catch (e) {
            console.log(e);
        }
        console.log('isLogin', isLogin)
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