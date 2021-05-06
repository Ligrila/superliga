import React, { Component } from 'react'
import { View } from 'react-native'

import { Text } from 'native-base'

import styles from './Title.styles';

const Title = ({ text }) => {

    return (
        <View style={styles.container}>
            <View style={styles.separator}></View>
            <Text style={styles.title}> {text}</Text>
        </View>
    )
}

export default Title;