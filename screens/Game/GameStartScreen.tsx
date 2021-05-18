import React, { useCallback, useEffect, useRef, useState } from 'react';


import Wallpaper from '../../components/Wallpaper/Wallpaper';
import AppHeader from '../../components/AppHeader/AppHeader';
import GameMessage from '../../components/Game/GameMessage';
import MakeItRain from '../../components/MakeItRain';
import { Container, Content } from 'native-base';

// Navigation
import { useFocusEffect, useNavigation } from '@react-navigation/native';
// Styles
const bgSrc = require('../../assets/images/bg.png');
const bgProgrammedTriviaSrc = require('../../assets/images/programmed-trivia-bg.png');

import styles from './GameStartScreen.styles'


const GameStartScreen = ({ route }) => {
  const [currentBg, setCurrentBg] = useState(bgSrc)
  const timeout = useRef<any>()
  const { trivia } = route.params;
  const navigation = useNavigation();

  const fetchBg = useCallback(() => {
    if (trivia && trivia.type == 'trivia') {
      setCurrentBg(bgProgrammedTriviaSrc);
    } else {
      setCurrentBg(bgSrc);
    }
  }, [trivia])
  useFocusEffect(
    useCallback(() => {
      if (trivia) {
        // fetchBg()
      }
    }, [trivia]))
  useFocusEffect(
    useCallback(() => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
      timeout.current = setTimeout(() => {
        navigation.navigate("GamePlay")
      }, 6000);
      
      return () => {
        clearTimeout(timeout.current);
      };
    }, []))


  const renderMessage = () => {
    if (trivia && trivia.type == 'trivia') {
      return (
        <GameMessage title="Arranca la" bigText='trivia!' award={trivia.award} whistle2={true}></GameMessage>
      )
    }
    return (
      <GameMessage title="Comienza el" bigText='partido!'></GameMessage>
    )
  }

  const renderRain = () => {
    return (<MakeItRain />)
  }


  return (
    <Container>
      <Wallpaper source={currentBg}>
        {renderRain()}
        <AppHeader game={false} logo={true} logoDisablePress={true} />
        <Content padder contentContainerStyle={styles.container}>
          {renderMessage()}
        </Content>
      </Wallpaper>
    </Container>
  );
}

//export default connectStyle('SuperLiga.StatisticsScreen')(GameStartScreen);
export default GameStartScreen;