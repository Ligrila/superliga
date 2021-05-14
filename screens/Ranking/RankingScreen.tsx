import React from 'react';
import { Container, Content, View } from 'native-base';
import Wallpaper from '../../components/Wallpaper/Wallpaper';
import AppHeader from '../../components/AppHeader/AppHeader';
import Ranking from '../../components/Ranking/Raking';
import Logo from '../../components/Logo/Logo';

const bgSrc = require('../../assets/images/home_bg.png');

const RankingScreen = () => {

    return (
        <Container >
            <Wallpaper source={bgSrc}>
                <AppHeader logo={true}/>
                <Ranking />
            </Wallpaper>
        </Container>
    );



}

export default RankingScreen;