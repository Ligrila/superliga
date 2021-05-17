import React, { useCallback, useState } from 'react';

import { TouchableOpacity, Image, Share } from 'react-native';
import { Container, Content } from 'native-base'

import Wallpaper from '../../components/Wallpaper/Wallpaper';

import AppHeader from '../../components/AppHeader/AppHeader';

import GameMessage from '../../components/Game/GameMessage';
import GameStatistics from '../../components/Game/GameStatistics';
import MakeItRain from '../../components/MakeItRain';

import styles from './GameEndScreen.styles';
import { useFocusEffect } from '@react-navigation/native';
const bgSrc = require('../../assets/images/bg.png');
const bgProgrammedTriviaSrc = require('../../assets/images/programmed-trivia-bg.png');
const shareSrc = require('../../assets/images/share.png');


const GameEndScreen = ({ route }) => {

  const { trivia, currentTriviaId } = route.params ;
  const [messageRendered, setMessageRendered] = useState(false);

  // goToHomeTimeout = null;
  // goToStatisticsTimeout = null;
  // currentTriviaId = false;

  // state = {
  //   messageRendered: false
  // }

  // constructor(props) {
  //   super(props)
  //   this.currentTriviaId = this.props.navigation.getParam("currentTriviaId",false);
  //   this.trivia = this.props.navigation.getParam("trivia",false);

  // };

  // componentDidMount(){
  //   this.goToHomeTimeout = setTimeout( () => {
  //     this.props.navigation.navigate('Home')
  //   },  
  //   15000
  //   );
  // }

  const share = () => {
    let message = "Hola he terminado una Trivia en Jugada SuperLiga. https://www.jugadasuperliga.com/get"
    Share.share(
      {
        title: 'Jugada Super Liga',
        message: message
      }
    );
  }



  // componentWillUnmount(){
  //   clearTimeout(this.goToHomeTimeout);
  //   clearTimeout(this.goToStatisticsTimeout);
  // }
  const renderShare = () => {
    if (!messageRendered) {
      return null;
    }
    return (
      <TouchableOpacity style={styles.shareContainer} onPress={share}>
        <Image source={shareSrc} style={styles.shareImg}></Image>
      </TouchableOpacity>
    )
  }
  const renderMessage = () => {
    if (messageRendered) {
      return (<GameStatistics trivia_id={currentTriviaId} trivia={trivia} />)
    }

    if (trivia.type = 'trivia') {
      return (<GameMessage title="Termino la" bigText="trivia!" whistle2={true}></GameMessage>)
    }

    return (
      <GameMessage title="Termino el" bigText="partido!"></GameMessage>
    )
  }

  const renderRain = () => {
    if (messageRendered) {
      return null;
    }
    return (<MakeItRain />)
  }

  // Focus
  useFocusEffect(
    useCallback(() => {
      const timerMessageRendered = setTimeout(() => {
        setMessageRendered(true);
      },
        5000
      );
      return () => {
        clearTimeout(timerMessageRendered);
      };
    }, []))

  // Background
  let screenBg = bgSrc;
  if (trivia.type == 'trivia') {
    screenBg = bgProgrammedTriviaSrc
  }

  return (
    <Container>
      <Wallpaper source={screenBg}>
        {renderRain()}
        <AppHeader game={false} logo={true}  />
        <Content padder contentContainerStyle={styles.contentContainer}>
          {renderMessage()}
          {renderShare()}
        </Content>
      </Wallpaper>
    </Container>
  );
}
export default GameEndScreen;
// export default connectStyle('SuperLiga.StatisticsScreen')(GameEndScreen);