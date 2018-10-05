import React, { Component } from "react";
import Reflux from "reflux";
import {
    View
} from "react-native";

import { Button, Text } from 'native-base'
import { connectStyle } from 'native-base';



import Layout from '../../constants/Layout';
import { TriviaQuestionActions } from "../../store/TriviaQuestion";
import { PurchaseModalStore, PurchaseModalActions } from "../../store/PurchaseModalStore";


/**
 * 
 */

class GameAnswerResult extends Reflux.Component {
    constructor(props){
        super(props);
        this.store = PurchaseModalStore;
    }

    backToGamePlayAndBuyLives = () => {
        if(!this.props.win){
            // mostrar pantalla de vidas si no las tiene
        }
        PurchaseModalActions.setVisible(true);
        this.props.navigation.goBack();
        
    }
    render(){
        const styles = this.props.style;
        const points = this.props.points;
        const lives = this.props.lives;

        //<Button block info rounded onPress={this.backToGamePlay} style={styles.button}><Text style={styles.buttonText}>Quiero seguir jugando</Text></Button>
        if(this.props.win){
            return(
                    <View style={styles.container}>
                        <Text style={styles.text}>Correcto <Text style={styles.bigText}>crack!</Text></Text>
                        <Text style={styles.subtext}>GANASTE {"\n"}<Text style={styles.subtextBold}>{points} PUNTOS</Text>{"\n"} Y SEGUIS{"\n"}PARTICIPANDO</Text>
                    </View>
            )
        }
        if(this.props.serverSuccess){
            if(lives>1 /** a 1 porque todavia no se desconto la vida, se descuenta asincronicamente luego de mostrar está pantalla para darle fluidez al juego */ ){
                return(
                    <View style={styles.container}>
                        <Text style={styles.text}>Uhh, le pifiaste</Text>
                        <Text style={styles.subtext}>TE DESCUENTA{"\n"} <Text style={styles.subtext}>1 VIDA...</Text></Text>
                    </View>
                )
            } else{
                return (
                <View style={styles.container}>
                <Text style={styles.text}>Sonó el silbato, te quedaste sin tiempo</Text>
                <Text style={styles.subtext}>PERDISTE{"\n"} <Text style={styles.subtextBold}>{points} PUNTOS</Text>{"\n"} </Text>
                    <Button block warning rounded onPress={this.backToGamePlayAndBuyLives} style={styles.button}><Text style={styles.buttonText}>Quiero Seguir jugando</Text></Button>
                </View>
                );
            }

        }

        return(
            <View style={styles.container}>
                <Text style={styles.text}>Sonó el silbato, te quedaste sin tiempo</Text>
                <Text style={styles.subtext}>NO RESPONDISTE {"\n"} A TIEMPO</Text>
            </View>
        )
    }
}



export default connectStyle('SuperLiga.GameAnswerResult')(GameAnswerResult);
