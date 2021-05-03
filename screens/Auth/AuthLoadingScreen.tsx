import React, { useEffect } from 'react'
// React Native
import { StyleSheet, View, Text} from 'react-native'
// Navigation
import { useNavigation } from '@react-navigation/native';
// Async Storage
import AsyncStorage from '@react-native-async-storage/async-storage';

// Auth Loading Screen
const AuthLoadingScreen = () => {
    const navigation = useNavigation();
    const checkIfLoggedIn = async () => {
        const isLoggedIn = await AsyncStorage.getItem("token");
        return isLoggedIn;
    };

    useEffect(() => {
        // Create an scoped async function in the hook
        async function fnCheckIfLoggedIn() {
            const isLoggedIn = await checkIfLoggedIn();
            //@Todo
            navigation.navigate('Auth');
        }
        // Execute the created function directly
        fnCheckIfLoggedIn();
    }, [navigation]);

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Loading Auth</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        paddingVertical: 20
    },
    titleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    title: {
        fontSize: 20
    }
})

export default AuthLoadingScreen