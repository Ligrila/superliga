import React from 'react';

import { Container, Content, Button, Icon } from 'native-base'
import Wallpaper from '../../components/Wallpaper/Wallpaper';
import AppHeader from '../../components/AppHeader/AppHeader';

// View
import ChampionshipView from '../../components/Championship/ChampionshipView';
// Styles
import styles from './ChampionshipViewScreen.styles';
import ChallengeViewScreen from '../ChallengeViewScreen';
import { useNavigation } from '@react-navigation/native';
const bgSrc = require('../../assets/images/championship/bg_champion.png');




const ChampionshipViewScreen = ({ route }) => {

    const { championship, created } = route.params || { championship: {}, created: false };

    const navigation = useNavigation();

    const returnButton = (<Button transparent onPress={() => {
        navigation.navigate("ChampionshipHome")
    }}><Icon name='ios-arrow-back' /></Button>)
    return (
        <Container>
            <Wallpaper source={bgSrc}>
                <AppHeader return={returnButton}  logo={true}/>
                <Content contentContainerStyle={styles.content} >
                    <ChampionshipView championship={championship} created={created} />
                </Content>
            </Wallpaper>
        </Container>
    );
}

export default ChampionshipViewScreen;