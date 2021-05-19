import React from 'react';
import { Container, Content, Button, Icon, View } from 'native-base'
import Wallpaper from '../../components/Wallpaper/Wallpaper';
import AppHeader from '../../components/AppHeader/AppHeader';

// View
import ChampionshipView from '../../components/Championship/ChampionshipView';
// Styles
import styles from './ChampionshipViewScreen.styles';
import { useNavigation } from '@react-navigation/native';
;
const bgSrc = require('../../assets/images/championship/bg_champion.png');




const ChampionshipViewScreen = ({ route }) => {
    // Route
    const { championship, created } = route.params || { championship: {}, created: false };
    // Navigation
    const navigation = useNavigation();




    const returnButton = (<Button transparent onPress={() => {
        navigation.navigate("ChampionshipHome")
    }}><Icon name='ios-arrow-back' /></Button>)
    return (
        <Container>
            <Wallpaper source={bgSrc}>
                <AppHeader return={returnButton} logo={true} />
                <View style={{ flex: 1 }}>
                    <ChampionshipView championship={championship} created={created} />
                </View>
            </Wallpaper>
        </Container>
    );
}

export default ChampionshipViewScreen;