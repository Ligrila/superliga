import React from 'react';

import {  Container, Content, Button, Icon } from 'native-base'
import Wallpaper from '../../components/Wallpaper/Wallpaper';
import AppHeader from '../../components/AppHeader/AppHeader';
import CreateChallenge from '../../components/Challenge/CreateChallenge';
import { useNavigation } from '@react-navigation/native';

// Styles
const bgSrc = require('../../assets/images/championship/bg.png');



const ChallengeCreateScreen = ({ route }) => {
  const { championship } = route.params || { championship: null };

  const navigation = useNavigation();
  const returnButton = (<Button transparent onPress={() => {
    navigation.navigate("ChallengeHome")
  }}><Icon name='ios-arrow-back' /></Button>)

  return (

    <Container>
      <Wallpaper source={bgSrc}>
        <AppHeader
          logo={true}
          return={returnButton} />
        
          <CreateChallenge
            championship={championship}
             />
      </Wallpaper>
    </Container>
  );

}

export default ChallengeCreateScreen;
// connectStyle('SuperLiga.ChallengeScreen')(ChallengeCreateScreen);