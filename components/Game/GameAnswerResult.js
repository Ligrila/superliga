import React, { Component } from "react";
import {
    View
} from "react-native";

import { Button, Text } from 'native-base'
import { connectStyle } from 'native-base';



import Layout from '../../constants/Layout';
import { TriviaQuestionActions } from "../../store/TriviaQuestion";


/**
 * 
 */

class GameAnswerResult extends Component {
    backToGamePlay = () => {
        if(!this.props.win){
            // mostrar pantalla de vidas si no las tiene
        }
        this.props.navigation.goBack();
    }
    render(){
        const styles = this.props.style;
        if(this.props.win){
            return(
                    <View style={styles.container}>
                        <Text style={styles.text}>Muy {"\n"}<Text style={styles.bigText}>Bien!</Text></Text>
                        <Text style={styles.subtext}>RESPUESTA {"\n"}CORRECTA</Text>
                        <Button block info rounded onPress={this.backToGamePlay} style={styles.button}><Text style={styles.buttonText}>Quiero seguir jugando</Text></Button>
                    </View>
            )
        }
        if(this.props.serverSuccess){
            return(
                <View style={styles.container}>
                    <Text style={styles.text}>Estas {"\n"}<Text style={styles.bigText}>fuera!</Text></Text>
                    <Text style={styles.subtext}>RESPUESTA {"\n"}INCORRECTA</Text>
                    <Button block info rounded onPress={this.backToGamePlay} style={styles.button}><Text style={styles.buttonText}>Seguir jugando</Text></Button>
                </View>
            )
        }

        return(
            <View style={styles.container}>
                <Text style={styles.text}><Text style={styles.bigText}>UPS!</Text></Text>
                <Text style={styles.subtext}>NO RESPONDISTE {"\n"} A TIEMPO</Text>
                <Button block info rounded onPress={this.backToGamePlay} style={styles.button}><Text style={styles.buttonText}>Seguir jugando</Text></Button>
            </View>
        )
    }
}



export default connectStyle('SuperLiga.GameAnswerResult')(GameAnswerResult);
