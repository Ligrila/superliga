import React, { useEffect, useState } from 'react';
import { RefreshControl } from 'react-native'
import { Container, Content, View } from 'native-base'
import Wallpaper from '../../components/Wallpaper/Wallpaper';
import AppHeader from '../../components/AppHeader/AppHeader';
import Championship from '../../components/Championship/Championship';
// Recoil
import { useRecoilCallback, useRecoilState } from 'recoil';
import { championshipAtom, championshipSelector } from '../../recoil/Championship.recoil'
// Styles
import styles from './ChampionshipScreen.styles';
import { ScrollView } from 'react-native-gesture-handler';
const bgSrc = require('../../assets/images/championship/bg_champion.png');

const ChampionshipScreen = () => {
    const [refreshing, setRefreshing] = useState(false);
    // Championship 
    const [championships, setChampionships] = useRecoilState(championshipAtom);
    // Update Awards
    const updateAwards = useRecoilCallback(({ snapshot }) => async () => {
        setRefreshing(true);
        const response = await snapshot.getPromise(championshipSelector);
        setChampionships(response);
        setRefreshing(false);
    }, [setChampionships, setRefreshing]);
    // Find When Mount
    useEffect(() => {
        updateAwards()
    }, [])

    const onRefresh = async () => {
        updateAwards()
    }
    return (
        <Container>
            <Wallpaper source={bgSrc} >
                <AppHeader />
                <Content
                    contentContainerStyle={styles.content}
                    refreshControl={
                        <RefreshControl
                            style={{ backgroundColor: '#transparent' }}
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            tintColor="#fff" // Ios
                            colors={['#282828', '#fff']} //android
                            title={''}
                            progressBackgroundColor="#fff"
                        />
                    }
                >
                    <Championship championships={championships} />

                </Content>
            </Wallpaper>
        </Container>
    );

}

export default ChampionshipScreen;