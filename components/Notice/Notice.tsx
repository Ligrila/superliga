import React from 'react'
import { View, ImageBackground } from 'react-native'
import { Text } from 'native-base'

// Styles
import styles from './Notice.styles'
const bg = require('../../assets/images/noticeBg.png');
const arrow = require('../../assets/images/arrowNoticeBg.png');



const Notice = ({ text }) => {


    return (
        <View style={styles.container}>
            <ImageBackground
                resizeMode={'contain'}
                source={arrow} style={styles.arrow} />
            <View style={styles.background}>
                <Text style={styles.text}> {text} </Text>
            </View>
        </View>
    )

}

export default Notice;