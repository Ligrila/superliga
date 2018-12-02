
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


/**
 * 
 */

class GameStatistics extends Reflux.Component {
    constructor(props){
        super(props);
        this.stores = [CurrentTriviaStatisticsStore]
    }

    componentDidMount(){
        CurrentTriviaStatisticsActions.update(this.props.trivia_id);
    }
    render(){
        const styles = this.props.style;
        const triviaType = this.props.trivia.type;
        let rankingStyle = styles.ranking;

        if(triviaType=='trivia'){
            rankingStyle = {...rankingStyle,color:'#4fc0fa'};
        }

        return(
            <View style={styles.container}>
                <Text style={rankingStyle}>{this.state.CurrentTriviaStatistics.ranking}</Text>
                <Text style={styles.title}>TU POSICIÓN</Text>
                <View style={styles.titleSeparatorContainer}><View style={styles.titleSeparator}></View></View>
                <Text style={styles.subtitle}>RESULTADOS DEL PARTIDO</Text>
                <View style={styles.statisticsContainer}>
                    <View style={styles.rowContainer}>
                    <StatisticItem type={triviaType} fill={this.state.CurrentTriviaStatistics.generalRanking} text="Puesto general" fillText={this.state.CurrentTriviaStatistics.generalRanking}/>
                    <StatisticItem type={triviaType} fill={this.state.CurrentTriviaStatistics.mediaHits} text={"aciertos totales\n vs media"} fillText={this.state.CurrentTriviaStatistics.mediaHits + "%"}/>
                    <StatisticItem type={triviaType} fill={this.state.CurrentTriviaStatistics.correctAnswers} text={"respuestas\n correctas"} fillText={this.state.CurrentTriviaStatistics.correctAnswers}/>
                    </View>
                    <View style={styles.rowContainer}>
                    <StatisticItem type={triviaType} fill={this.state.CurrentTriviaStatistics.wrongAnswers} text={"respuestas\n incorrectas"} fillText={this.state.CurrentTriviaStatistics.wrongAnswers}/>
                    <StatisticItem type={triviaType} fill={this.state.CurrentTriviaStatistics.triviaHits} text={"aciertos por\n incidencia"} fillText={this.state.CurrentTriviaStatistics.triviaHits + "%"}/>
                    <StatisticItem type={triviaType} fill={this.state.CurrentTriviaStatistics.usedLives} text={"vidas\n utilizadas"} fillText={this.state.CurrentTriviaStatistics.usedLives}/>
                    </View>

                </View>
            </View>
        )
    }
}



export default connectStyle('SuperLiga.GameStatistics')(GameStatistics);
