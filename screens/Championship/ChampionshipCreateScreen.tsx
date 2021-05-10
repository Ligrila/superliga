import React from 'react';

import {Container, Content, Button, Icon } from 'native-base'
import Wallpaper from '../../components/Wallpaper/Wallpaper';
import AppHeader from '../../components/AppHeader/AppHeader';
// Create
import CreateChampionship from '../../components/Championship/CreateChampionship'
// Navigation
import { useNavigation } from '@react-navigation/native';
// Styles
 import styles from './ChampionshipScreen.styles';

const bgSrc = require('../../assets/images/championship/bg_champion.png');

const ChampionshipCreateScreen = () => {
    const navigation = useNavigation();
    const returnButton = (<Button transparent onPress={()=>{
      navigation.navigate("ChampionshipHome")
    }}><Icon name='ios-arrow-back' /></Button>)
    
    return (
      <Container>
        <Wallpaper source={bgSrc}>
        <AppHeader return={returnButton}/>
        <Content 
            contentContainerStyle={styles.content} 
            padder>
          <CreateChampionship  />
        </Content>
        </Wallpaper>
      </Container>
    );
  
}

export default ChampionshipCreateScreen;
