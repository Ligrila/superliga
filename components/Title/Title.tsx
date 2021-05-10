import React, { Component } from 'react'
import { View } from 'react-native'

import { Text } from 'native-base'

import styles from './Title.styles';
interface TitleProps {
    text: string,
    hiddeSeparator?: boolean
}

const Title = ({ text, hiddeSeparator }: TitleProps) => {

    return (
        <View style={styles.container}>
            {hiddeSeparator ? null : <View style={styles.separator}></View>}
            <Text style={styles.title}> {text}</Text>
        </View>
    )
}

export default Title;