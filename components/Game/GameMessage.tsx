import React, { useEffect } from "react";
import {
    View,
    Image,
    Vibration
} from "react-native";

import { Text } from 'native-base'


import styles from './GameMessage.styles'
const whistleImg = require('../../assets/images/whistle.png')
const whistle2Img = require('../../assets/images/whistle2.png')

/**
 * 
 */

const GameMessage = (props) => {
    // constructor(props){
    //     super(props);
    // }
    useEffect(() => {
        Vibration.vibrate()
    }, [])

    const renderAward = () => {

        if (props.award && props.award.length > 0) {

            return (
                <View>
                    <Text style={styles.awardText}>EL MEJOR DE 15</Text>
                    <Text style={styles.awardText}>PREGUNTAS SE</Text>
                    <Text style={styles.awardText}>SE LLEVA UNA {props.award.toUpperCase()}!</Text>
                </View>
            );
        }
    }
    const renderWhistle = () => {
        
        if (props.whistle2) {
            return (<Image source={whistle2Img} style={styles.image} />)
        }
        return (<Image source={whistleImg} style={styles.image} />)
    }


    const title = props.title;
    const bigText = props.bigText;



    return (
        <View style={styles.container}>
            {renderWhistle()}
            <Text style={styles.text}>{title}</Text>
            <Text style={styles.bigText}>{bigText}</Text>
            {renderAward()}
        </View>
    )

}


export default GameMessage;

