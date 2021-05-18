
import React  from "react";
import {
    View
} from "react-native";

import { Spinner, Text } from 'native-base'



import StatisticItem from "../StatisticItem";

import styles from './GameStatistics.styles';
import { useRecoilValueLoadable } from "recoil";
import { currentTriviaStatisticSelector } from "../../recoil/CurrentTriviaStatistic.recoil";


/**
 * 
 */

const GameStatistics = ({ trivia_id, trivia }) => {
    

    const triviaType = trivia.type;
    let rankingStyle = styles.ranking;

    const statistic = useRecoilValueLoadable(currentTriviaStatisticSelector(trivia_id));

    if (triviaType == 'trivia') {
        rankingStyle = { ...rankingStyle, color: '#cc366b' };
    }
    if(statistic.state === 'loading'){
        return <Spinner />
    }
    if(statistic.state === 'hasValue'){
        const currentStatistic: any = statistic.contents.data;
        if(!currentStatistic){
            return null
        }
        return (
            <View style={styles.container}>
                <Text style={rankingStyle}>{currentStatistic.ranking}</Text>
                <Text style={styles.title}>TU POSICIÓN</Text>
                <View style={styles.titleSeparatorContainer}><View style={styles.titleSeparator}></View></View>
                <Text style={styles.subtitle}>RESULTADOS DEL PARTIDO</Text>
                <View style={styles.statisticsContainer}>
                    <View style={styles.rowContainer}>
                        <StatisticItem type={triviaType} fill={currentStatistic.generalRanking} text="Puesto general" fillText={currentStatistic.generalRanking} />
                        <StatisticItem type={triviaType} fill={currentStatistic.mediaHits} text={"aciertos totales\n vs media"} fillText={currentStatistic.mediaHits + "%"} />
                        <StatisticItem type={triviaType} fill={currentStatistic.correctAnswers} text={"respuestas\n correctas"} fillText={currentStatistic.correctAnswers} />
                    </View>
                    <View style={styles.rowContainer}>
                        <StatisticItem type={triviaType} fill={currentStatistic.wrongAnswers} text={"respuestas\n incorrectas"} fillText={currentStatistic.wrongAnswers} />
                        <StatisticItem type={triviaType} fill={currentStatistic.triviaHits} text={"aciertos por\n incidencia"} fillText={currentStatistic.triviaHits + "%"} />
                        <StatisticItem type={triviaType} fill={currentStatistic.usedLives} text={"vidas\n utilizadas"} fillText={currentStatistic.usedLives} />
                    </View>
    
                </View>
            </View>
        )
    }
    return null;


}

export default GameStatistics;

// export default connectStyle('SuperLiga.GameStatistics')(GameStatistics);
