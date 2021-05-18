import React, { Component } from 'react'
import { Image } from 'react-native'
import { View } from 'native-base'
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
// Style
import styles from './Logo.styles';
import { useNavigation } from '@react-navigation/native';

interface LogoProps {
    disablePress?: boolean,
    game?: boolean
}

const Logo = ({ disablePress, game }: LogoProps) => {
    // Navigation
    const navigation = useNavigation();
    const navigateTo = () => {
        if(game){
            navigation.navigate('Main', {
            screen: 'Home'
          });
        }else{
             navigation.navigate('Home')
        }
        
        
    }
    return (
        <View style={styles.container}>
            {disablePress &&
                <View
                    style={styles.logoContainer}
                >
                    <Image
                        style={styles.logo}
                        source={require('../../assets/images/app_logo.png')} />
                </View>
            }
            {!disablePress &&
                <TouchableOpacity
                    style={styles.logoContainer}
                    onPress={navigateTo}
                >
                    <Image
                        style={styles.logo}
                        source={require('../../assets/images/app_logo.png')} />
                </TouchableOpacity>}
        </View>
    )
}

export default Logo;
