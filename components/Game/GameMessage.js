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
    renderAward(){

        if(this.props.award && this.props.award.length > 0){
            const styles = this.props.style;
            return (
                <View>
                    <Text style={styles.awardText}>EL MEJOR DE 15</Text>
                    <Text style={styles.awardText}>PREGUNTAS SE</Text>
                    <Text style={styles.awardText}>SE LLEVA UNA {this.props.award.toUpperCase()}!</Text>
                </View>
            );
        }
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
                {this.renderAward()}
            </View>
        )
    }
}



export default connectStyle('SuperLiga.GameMessage')(GameMessage);
