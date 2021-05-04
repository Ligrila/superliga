import React, { useState } from 'react';
import Reflux from 'reflux';
import {
    Image,
    TouchableOpacity,
    View,
    Share
} from 'react-native';
// Native Base
import { Text, Container, Content, Spinner } from 'native-base';
// Components
import Wallpaper from '../../components/Wallpaper/Wallpaper';
import AppHeader from '../../components/AppHeader/AppHeader';
import TriviaCarouselMinimal from '../../components/Trivia/TriviaCarouselMinimal';
import CheckDocument from '../../components/CheckDocument';
import NextTrivia2 from '../../components/NextTrivia2';
// Cache
import { CacheManager } from "react-native-expo-image-cache";
// Store
import { NextTriviaStore, NextTriviaActions } from '../../store/NextTriviaStore';
import { UsersStore } from '../../store/UserStore';
import { StatisticsStore, StatisticsActions } from '../../store/StatisticsStore';
// Navigation
import { useNavigation } from '@react-navigation/native';
// Assets
const bgSrc = require('../../assets/images/home_bg.png');
const triviaBgSrc = require('../../assets/images/home_trivia_bg.png');
const helpSrc = require('../../assets/images/home/help.png');
const shareSrc = require('../../assets/images/home/share.png');
const shopSrc = require('../../assets/images/home/shop.png');

// Styles
import styles from './HomeScreen.styles'


const HomeScreen = () => {
    // States 
    const [screenBg, setScreenBg] = useState(bgSrc);
    const [didMount, setDidMount] = useState(false);
    // Navigation
    const navigation = useNavigation();
    // constructor(props) {
    //     super(props);
    //     this.stores = [NextTriviaStore, UsersStore, StatisticsStore];
    // }
    // async componentDidMount() {
    //     StatisticsActions.update();

    //     await NextTriviaActions.get();
    //     const didMount = true;
    //     this.setState({ didMount });

    // }

    // componentWillUnmount() {
    //     const didMount = false;
    //     this.setState({ didMount });
    //     super.componentWillUnmount();

    // }

    const carouselChange = async (item) => {
        if (!didMount) {
            return;
        }
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
    const renderNextTrivia = () => {
        // if (!this.state.NextTrivia.hasData) return <Spinner />;
        // return (<TriviaCarouselMinimal navigation={this.props.navigation} onItem={this.carouselChange}></TriviaCarouselMinimal>)
        // return (
        //     <NextTrivia2 trivia={this.state.NextTrivia.Trivia} />
        // );

        return null;
    }
    const _showTriviasScreen = () => {
        navigation.navigate('TriviasScreen');
    }
    // componentDidUpdate() {
    //     if (this.state.CurrentTrivia.hasData) {
    //         const trivia = this.state.CurrentTrivia.Trivia;
    //         this.props.navigation.navigate('StartFirstTime', { trivia });
    //     }
    // }

    const goToTutorial = () => {
        navigation.navigate('Tutorial');

    }
    const goToPurchase = () => {
        navigation.navigate('LivePacks');

    }
    const share = () => {
        Share.share(
            {
                title: 'Jugada Super Liga',
                message: "Hola estoy jugando a Jugada Super Liga. Usa mi código '" + 'Ariel' + "' para registrate. https://www.jugadasuperliga.com/get"
                // message: "Hola estoy jugando a Jugada Super Liga. Usa mi código '" + this.state.user.username + "' para registrate. https://www.jugadasuperliga.com/get"
            }
        );
    }
    let points = 0;
    let lives = 0;
    let ranking = 0;
    let homeBg = screenBg;

    // if (this.state.hasInformation) {
    //     if (this.state.user.life) {
    //         lives = this.state.user.life.lives;
    //     }
    //     if (this.state.user.infinite_lives && this.state.user.infinite_lives[0]) {
    //         lives = '∞';
    //     }
    //     if (this.state.user.point) {
    //         points = this.state.user.point.points;
    //     }
    // }


    return (
        <Container>
            {/* <CheckDocument navigation={this.props.navigation} /> */}
            <Wallpaper source={homeBg}>
                {/* <AppHeader navigation={this.props.navigation} drawerOpen={() => { this.props.navigation.openDrawer() }} /> */}
                <Content>
                    <View style={styles.nextTriviaIconsContainer}>
                        {renderNextTrivia()}
                    </View>
                    <View style={styles.userStatisticsContainer}>
                        <View style={styles.userStatisticsItem}>
                            <Text style={styles.userStatisticsItemValue}>{points}</Text>
                            <Text style={styles.userStatisticsItemText}>PUNTOS</Text>
                        </View>
                        <View style={styles.userStatisticsItem}>
                            <View style={styles.userStatisticsSeparator}></View>
                        </View>
                        <View style={styles.userStatisticsItem}>
                            <Text style={styles.userStatisticsItemValue}>{ranking}</Text>
                            {/* <Text style={styles.userStatisticsItemValue}>{this.state.Statistics.ranking}</Text> */}
                            <Text style={styles.userStatisticsItemText}>RANKING</Text>
                        </View>
                        <View style={styles.userStatisticsItem}>
                            <View style={styles.userStatisticsSeparator}></View>
                        </View>
                        <View style={styles.userStatisticsItem}>
                            <Text style={styles.userStatisticsItemValue}>{lives}</Text>
                            <Text style={styles.userStatisticsItemText}>VIDAS</Text>
                        </View>
                    </View>
                    <View style={styles.actionsContainer}>
                        <View style={styles.actionsItem}>
                            <TouchableOpacity
                                onPress={goToTutorial}
                            >
                                <Image source={helpSrc} style={styles.actionsIcon} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.actionsItem}>
                            <TouchableOpacity
                                onPress={goToPurchase}

                            >
                                <Image source={shopSrc} style={styles.actionsIcon} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.actionsItem}>
                            <TouchableOpacity
                                onPress={share}

                            >
                                <Image source={shareSrc} style={styles.actionsIcon} />
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