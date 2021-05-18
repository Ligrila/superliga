import React, { useCallback } from 'react';
import { Container, Content } from 'native-base'
import GameMessage from '../../components/Game/GameMessage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import MakeItRain from '../../components/MakeItRain';
import Wallpaper from '../../components/Wallpaper/Wallpaper';
import AppHeader from '../../components/AppHeader/AppHeader';

import styles from './GameStartScreen.styles'

const bgSrc = require('../../assets/images/bg.png');


const GameHalfTimeEndScreen = () => {

  const navigation = useNavigation();

  // constructor(props) {
  //   super(props)
  // };



  // componentDidMount(){
  //   this.timer = setTimeout( () => {
  //     this.props.navigation.goBack()
  //   },  
  //   6000 
  //   );
  // }

  // componentWillUnmount(){
  //   clearTimeout(this.timer);
  // }

  useFocusEffect(
    useCallback(() => {
      const timer = setTimeout(() => {
        navigation.navigate("GamePlay")
      },
        6000
      );
      return () => {
        clearTimeout(timer);
      };
    }, []))

  const renderMessage = () => {
    return (
      <GameMessage title="Termino el primer" bigText='tiempo!'></GameMessage>
    )
  }

  const renderRain = () => {
    return (<MakeItRain />)
  }

  return (
    <Container>
      <Wallpaper source={bgSrc}>
        {renderRain()}
        <AppHeader game={false} logo={true} />
        <Content padder contentContainerStyle={styles.container}>
          {renderMessage()}
        </Content>
      </Wallpaper>
    </Container>
  );


}

export default GameHalfTimeEndScreen;