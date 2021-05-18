import React, { useCallback, useEffect, useState } from 'react';
import {
    View,
    RefreshControl,
} from 'react-native';
// Native Base
import { Container, Content, Text } from 'native-base';
// Components
import Wallpaper from '../../components/Wallpaper/Wallpaper';
import AppHeader from '../../components/AppHeader/AppHeader';
import { TouchableOpacity } from 'react-native-gesture-handler';
import NextTrivia from '../../components/NextTrivia/NextTrivia';
import { AntDesign } from '@expo/vector-icons';
import CheckDocument from '../../components/CheckDocument/CheckDocument';
// Navigation
import { useFocusEffect, useNavigation } from '@react-navigation/native';

// Recoil
import { useRecoilCallback, useRecoilState } from 'recoil';
import { nextTriviaAtom, nextTriviaSelector } from '../../recoil/NextTrivia.recoil';

// Assets
const bgSrc = require('../../assets/images/home_bg.png');
// const triviaBgSrc = require('../../assets/images/home_trivia_bg.png');
// const helpSrc = require('../../assets/images/home/help.png');
// const shareSrc = require('../../assets/images/home/share.png');
// const shopSrc = require('../../assets/images/home/shop.png');
// Api
import Api from '../../api/Api';
// Styles
import styles from './HomeScreen.styles'
import { currentTriviaAtom, currentTriviaSelector } from '../../recoil/CurrentTrivia.recoil';



const HomeScreen = () => {
    // Api
    const api = new Api();
    // Navigation
    const navigation = useNavigation();
    // States 
    const [screenBg, setScreenBg] = useState(bgSrc);
    const [refreshing, setRefreshing] = useState(false);
    // Recoil
    const [nextTrivia, setNextTrivia] = useRecoilState(nextTriviaAtom)
    const [currentTrivia, setCurrentTrivia] = useRecoilState(currentTriviaAtom);

    // Current Trivia
    const updateCurrentTrivia = useRecoilCallback(({ snapshot }) => async () => {
        const currentTriviaResponse = await snapshot.getPromise(currentTriviaSelector);
        const currentTriviaObj = currentTriviaResponse ? { ...currentTriviaResponse } : currentTriviaResponse;
        setCurrentTrivia(currentTriviaObj);
    });
    // Update Calendar
    const updateHomeScreen = useRecoilCallback(({ snapshot }) => async () => {
        setRefreshing(true);
        const responseNextTrivia = await snapshot.getPromise(nextTriviaSelector);
        setNextTrivia({ ...responseNextTrivia });
        setRefreshing(false);
    });
    // onRefresh 
    const onRefresh = async () => {
        await updateCurrentTrivia();
        await updateHomeScreen();
    };

    // On Press Next Matchs
    const handlerOnPressNextMatchs = () => {
        navigation.navigate('HomeNextMatchs')
    }

    // useEffect(() => {
    //     offset.value = withSequence(
    //         withTiming(-10, { duration: 600 }),
    //         withRepeat(withTiming(10, { duration: 600 }), -1, true),
    //         withTiming(0, { duration: 100 })
    //     );
    //     console.log('nextTrvia', nextTrivia)
    // }, [nextTrivia])
    // Call When is Focus
    useFocusEffect(
        useCallback(() => {
            if (currentTrivia && currentTrivia.hasData) {
                const trivia = {
                    type : currentTrivia.data.type
                }
                navigation.navigate('GamePlayStack', {
                    screen: 'StartFirstTime',
                    params: { trivia }
                });
            }
        }, [currentTrivia])
    );
    // First
    useEffect(() => {
        updateHomeScreen()
    }, [])

    useFocusEffect(
        useCallback(() => {
            updateCurrentTrivia();
            return () => { };
        }, []))
    const onFinishCountDown = () => {
        updateCurrentTrivia();
    }
    return (
        <Container>
            <CheckDocument />
            <Wallpaper source={screenBg}>
                {/* Header */}
                <AppHeader logo={true} />
                {/* Main Content */}
                <Content
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
                    contentContainerStyle={{ flex: 1 }}>
                    <View style={styles.nextTriviaIconsContainer}>
                        {nextTrivia.hasData && <NextTrivia
                            trivia={nextTrivia.data}
                            onFinishCountDown={onFinishCountDown}
                        />}
                        <View style={styles.nextMatchContainer}>
                            <TouchableOpacity onPress={handlerOnPressNextMatchs} style={styles.nextMatchButton}>
                                <Text style={styles.nextMatchText}>ver siguientes partidos</Text>
                                <AntDesign name="arrowdown" size={24} color="#fff" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </Content>
            </Wallpaper>
        </Container>
    );


}
export default HomeScreen;
// export default connectStyle('SuperLiga.HomeScreen2')(HomeScreen2);