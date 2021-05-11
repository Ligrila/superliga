import React, { useEffect, useState } from 'react';
import {
    View,
    RefreshControl
} from 'react-native';
// Native Base
import { Button, Container, Content, Icon } from 'native-base';
// Components
import Wallpaper from '../../components/Wallpaper/Wallpaper';
import AppHeader from '../../components/AppHeader/AppHeader';
import TriviaCarouselMinimal from '../../components/Trivia/TriviaCarouselMinimal';
import CheckDocument from '../../components/CheckDocument/CheckDocument';

// Cache
import { CacheManager } from "react-native-expo-image-cache";
// Navigation
import { useNavigation } from '@react-navigation/native';
// Assets
const bgSrc = require('../../assets/images/home_bg.png');
const triviaBgSrc = require('../../assets/images/home_trivia_bg.png');
// const helpSrc = require('../../assets/images/home/help.png');
// const shareSrc = require('../../assets/images/home/share.png');
// const shopSrc = require('../../assets/images/home/shop.png');

// Styles
import styles from './HomeNextMatchsScreen.styles'
import Logo from '../../components/Logo/Logo';
// Recoil
import { useRecoilCallback, useRecoilState } from 'recoil';
import { homeBannerAtom, homeBannerSelector } from '../../recoil/HomeBanner.recoil';





const HomeNextMatchsScreen = () => {
    // Navigation
    const navigation = useNavigation();
    // States 
    const [screenBg, setScreenBg] = useState(bgSrc);
    const [refreshing, setRefreshing] = useState(false);
    const [, setHomeBanner] = useRecoilState(homeBannerAtom)
    // Update Calendar
    const updateHomeScreen = useRecoilCallback(({ snapshot }) => async () => {
        setRefreshing(true);
        const responseBanner = await snapshot.getPromise(homeBannerSelector);
        setHomeBanner({ ...responseBanner });
        setRefreshing(false);
    });
    // onRefresh 
    const onRefresh = async () => {
        await updateHomeScreen();
    };
    // Carousel Change
    const carouselChange = async (item) => {
        if (item.type == 'trivia') {
            setScreenBg(triviaBgSrc)
            return;
        }
        if (item.type == 'banner') {
            const path = await CacheManager.get(item.banner, {}).getPath();
            setScreenBg(path)
            return;
        }
        setScreenBg(bgSrc)
    }
    const returnButton = (<Button transparent onPress={() => {
        navigation.navigate("Home")
    }}><Icon name='ios-arrow-back' /></Button>)
    // First
    useEffect(() => {
        updateHomeScreen()
    }, [])

    return (
        <Container>
            <CheckDocument /> 
            <Wallpaper source={screenBg}>
                {/* Header */}
                <AppHeader return={returnButton} />
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
                    {/* Logo */}
                    <Logo />
                    <View style={styles.nextTriviaIconsContainer}>
                        <TriviaCarouselMinimal onItem={carouselChange} />
                    </View>
                </Content>
            </Wallpaper>
        </Container>
    );


}
export default HomeNextMatchsScreen;
// export default connectStyle('SuperLiga.HomeScreen2')(HomeScreen2);