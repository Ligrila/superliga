import React from "react";
import {
    View
} from "react-native";
import { Text } from 'native-base'
import styles from './GameWait.styles';

const GameWait = ({ text }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{text}</Text>
        </View>
    )

}

export default GameWait;

