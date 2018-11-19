import React, { Component } from "react";
import Reflux from "reflux";
import {
    View,
    Image,
    Vibration
} from "react-native";

import { Button, Text } from 'native-base'
import { connectStyle } from 'native-base';





const whistleImg = require('../../assets/images/whistle.png')

/**
 * 
 */

class GameMessage extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        Vibration.vibrate()
    }

    render(){
        const styles = this.props.style;
        const title = this.props.title;
        const bigText = this.props.bigText;


        
        return(
            <View style={styles.container}>
                <Image source={whistleImg} style={styles.image} />
                <Text style={styles.text}>{title}</Text>
                <Text style={styles.bigText}>{bigText}</Text>

            </View>
        )
    }
}



export default connectStyle('SuperLiga.GameMessage')(GameMessage);
