
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
import { CurrentTriviaStatisticsStore, CurrentTriviaStatisticsActions } from "../../store/CurrentTriviaStatisticsStore";
import BigTitle from "../Title/BigTitle";
import StatisticItem from "../StatisticItem";
import { NextTriviaStore } from "../../store/NextTriviaStore";



/**
 * 
 */

class GameStatistics extends Reflux.Component {
    constructor(props){
        super(props);
        this.stores = [CurrentTriviaStatisticsStore,NextTriviaStore]
    }

    componentDidMount(){
        CurrentTriviaStatisticsActions.update(this.state.CurrentTrivia.Trivia.id);
    }
    render(){
        const styles = this.props.style;

        
        return(
            <View style={styles.container}>
                <BigTitle text={"ESTADISTICAS DE JUEGO"}></BigTitle>
                <View style={styles.statisticsContainer}>
                    <View style={styles.rowContainer}>
                    <StatisticItem fill={this.state.CurrentTriviaStatistics.points} text="puntos" fillText={this.state.CurrentTriviaStatistics.points}/>
                    <StatisticItem fill={this.state.CurrentTriviaStatistics.mediaHits} text={"aciertos totales\n vs media"} fillText={this.state.CurrentTriviaStatistics.mediaHits + "%"}/>
                    <StatisticItem fill={this.state.CurrentTriviaStatistics.correctAnswers} text={"respuestas\n correctas"} fillText={this.state.CurrentTriviaStatistics.correctAnswers}/>
                    </View>
                    <View style={styles.rowContainer}>
                    <StatisticItem fill={this.state.CurrentTriviaStatistics.wrongAnswers} text={"respuestas\n incorrectas"} fillText={this.state.CurrentTriviaStatistics.wrongAnswers}/>
                    <StatisticItem fill={this.state.CurrentTriviaStatistics.triviaHits} text={"aciertos por\n incidencia"} fillText={this.state.CurrentTriviaStatistics.triviaHits + "%"}/>
                    <StatisticItem fill={this.state.CurrentTriviaStatistics.usedLives} text={"vidas\n utilizadas"} fillText={this.state.CurrentTriviaStatistics.usedLives}/>
                    </View>
                    <View style={styles.rowContainer}>
                    <StatisticItem fill={this.state.CurrentTriviaStatistics.ranking} text={"puesto\n general"} fillText={this.state.CurrentTriviaStatistics.ranking}/>
                    </View>
                </View>
            </View>
        )
    }
}



export default connectStyle('SuperLiga.GameStatistics')(GameStatistics);
