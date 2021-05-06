import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { Container, Content, Spinner } from 'native-base'
import Wallpaper from '../../components/Wallpaper';
import StatisticItem from '../../components/StatisticItem/StatisticItem';
import AppHeader from '../../components/AppHeader/AppHeader';
// import { StatisticsStore, StatisticsActions } from '../store/StatisticsStore';
import BigTitle from '../../components/Title/BigTitle';

import styles from './SatisticsScreen.styles'
import { useRecoilCallback, useRecoilState, useRecoilValue } from 'recoil';
import { statisticsAtom, statisticsSelector } from '../../recoil/Statistics.recoil';
import { useFocusEffect } from '@react-navigation/native';
import RefreshControl from '../../components/Refresh/RefreshControl';

// Bg
const bgSrc = require('../../assets/images/home_bg.png');

const StatisticsScreen = () => {
    // States
    const [refreshing, setRefreshing] = useState(false);
    // Recoil
    const [statistics, setStatistics] = useRecoilState(statisticsAtom);
    const updateStatistics = useRecoilCallback(({ snapshot }) => async () => {
        setRefreshing(true);
        const response = await snapshot.getPromise(statisticsSelector);
        setStatistics(response);
        setRefreshing(false)
    }, [setStatistics, setRefreshing]);
    const onRefresh = () => {
        updateStatistics();
    }
    useEffect(() => {
        updateStatistics();
    }, [])
    // useFocusEffect(
    //     useCallback(() => {
    //         updateStatistics()
    //         return () => { };
    //     }, []))
    return (
        <Container>
            <Wallpaper source={bgSrc}>
                <AppHeader />
                <BigTitle text={"ESTADISTICAS\nDE JUEGO"}></BigTitle>
                <Content
                    refreshing={refreshing}
                    refreshControl={
                        <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
                    }
                    padder
                    contentContainerStyle={styles.statistics}>
                    {statistics &&
                        <View style={styles.container}>
                            <View style={styles.rowContainer}>
                                <StatisticItem fill={statistics.points} text="puntos" fillText={statistics.points.toString()} />
                                <StatisticItem fill={statistics.mediaHits} text={"aciertos totales\n vs media"} fillText={statistics.mediaHits + "%"} />
                                <StatisticItem fill={statistics.correctAnswersPercentage} text={"respuestas\n correctas"} fillText={statistics.correctAnswers.toString()} />
                            </View>
                            <View style={styles.rowContainer}>
                                <StatisticItem fill={statistics.wrongAnswersPercentage} text={"respuestas\n incorrectas"} fillText={statistics.wrongAnswers.toString()} />
                                <StatisticItem fill={statistics.triviaHits} text={"aciertos por\n incidencia"} fillText={statistics.triviaHits + "%"} />
                                <StatisticItem fill={statistics.usedLives} text={"vidas\n utilizadas"} fillText={statistics.usedLives.toString()} />
                            </View>
                            <View style={styles.rowContainer}>
                                <StatisticItem fill={statistics.rankingPercentage} text={"puesto\n general"} fillText={statistics.ranking.toString()} />
                            </View>
                        </View>}
                </Content>
            </Wallpaper>
        </Container>
    );
}


export default StatisticsScreen;
// export default connectStyle('SuperLiga.StatisticsScreen')(StatisticsScreen);