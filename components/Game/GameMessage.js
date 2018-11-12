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

        
        return(
            <View style={styles.container}>
                <Image source={whistleImg} style={styles.image} />
                <Text style={styles.text}>{title}</Text>
            </View>
        )
    }
}



export default connectStyle('SuperLiga.GameMessage')(GameMessage);
