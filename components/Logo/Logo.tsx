import React, { Component } from 'react'
import { Image } from 'react-native'
import { View } from 'native-base'
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
// Style
import styles from './Logo.styles';
import { useNavigation } from '@react-navigation/native';



const Logo = () => {
    // Navigation
    const navigation = useNavigation();
    const navigateTo = ()=>{
        navigation.navigate('GameLoading')
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity 
                style={styles.logoContainer}
                onPress={navigateTo}
                >
                <Image 
                    style={styles.logo}
                    source={require('../../assets/images/app_logo.png')} />
            </TouchableOpacity>
        </View>
    )
}

export default Logo;
