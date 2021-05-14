import React, { Component } from "react";
import Reflux from "reflux";
import {
    View
} from "react-native";

import { Button, Text } from 'native-base'




import Layout from '../../constants/Layout';
import { TriviaQuestionActions } from "../../store/TriviaQuestion";
import { PurchaseModalStore, PurchaseModalActions } from "../../store/PurchaseModalStore";

import styles from './GameAnswerResult.styles'

interface GameAnswerResult {
    win: any
    serverSuccess: any
    lives: any
    canceled: any,
    points: any
}

const GameAnswerResult = (props: GameAnswerResult) => {
    // constructor(props){
    //     super(props);
    //     this.store = PurchaseModalStore;
    // }

    // const backToGamePlayAndBuyLives = () => {
    //     if (!props.win) {
    //         // mostrar pantalla de vidas si no las tiene
    //     }
    //     PurchaseModalActions.setVisible(true);
    //     props.navigation.goBack();

    // }

    const points = props.points;
    const lives = props.lives;
    const canceled = props.canceled;

    //<Button block info rounded onPress={this.backToGamePlay} style={styles.button}><Text style={styles.buttonText}>Quiero seguir jugando</Text></Button>
    if (canceled) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Uhhh, pregunta cancelada!</Text>
            </View>
        )
    }
    if (props.win) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Sos un <Text style={styles.bigText}>crack!</Text></Text>
                <Text style={styles.subtext}>SUMAS {points} PUNTOS</Text>
            </View>
        )
    }
    if (props.serverSuccess) {
        if (lives > 1 /** a 1 porque todavia no se desconto la vida, se descuenta asincronicamente luego de mostrar está pantalla para darle fluidez al juego */) {
            return (
                <View style={styles.container}>
                    <Text style={styles.text}>Uhh, la pifiaste</Text>
                    <Text style={styles.subtext}>TE DESCUENTA 1 VIDA.</Text>
                </View>
            )
        } else {
            return (
                <View style={styles.container}>
                    <Text style={styles.text}>Sono el Silbato!</Text>
                    <Text style={styles.subtext}>PERDISTE{"\n"} {points} PUNTOS</Text>
                </View>
            );
        }

    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Sono el Silbato!</Text>
            <Text style={styles.subtext}>NO RESPONDISTE {"\n"} A TIEMPO</Text>
        </View>
    )

}


export default GameAnswerResult;
// export default connectStyle('SuperLiga.GameAnswerResult')(GameAnswerResult);
