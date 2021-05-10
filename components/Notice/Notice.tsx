import React, { Component } from 'react'
import { View,ImageBackground } from 'react-native'
import {Text } from 'native-base'

// Styles
import styles from './Notice.styles'
const bg = require('../../assets/images/noticeBg.png');



const  Notice = ({text}) => {


    return (
    <View style={styles.container}>
        <ImageBackground source={bg} style={styles.background}>
            <Text style={styles.text}> {text} </Text>
        </ImageBackground>
      </View>
    )
  
}

export default Notice;