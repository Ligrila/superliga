import React from 'react';

import { Container, Button, Icon, View } from 'native-base'
import Wallpaper from '../../components/Wallpaper/Wallpaper';
import AppHeader from '../../components/AppHeader/AppHeader';
import ChallengeView from '../../components/Challenge/ChallengeView';
import { useNavigation } from '@react-navigation/native';

const bgSrc = require('../../assets/images/championship/bg2.png');


const ChallengeViewScreen = ({ route }) => {

  const { challenge, notified } = route.params || { challenge: null, notified: false }
  // challenge = {
  //   id: null,
  //   name: null,
  //   challenge1:{},
  //   challenge2:{}
  // }
  // constructor(props){
  //   super(props);
  //   this.challenge = this.props.navigation.getParam('challenge', this.challenge);
  //   this.notified = this.props.navigation.getParam('notified', false);

  // }
  const navigation = useNavigation();
  const returnButton = (<Button transparent onPress={() => {
    navigation.navigate("ChallengeHome")
  }}><Icon name='ios-arrow-back' /></Button>)

  return (
    <Container>
      <Wallpaper source={bgSrc}>
        <AppHeader logo={true} return={returnButton} />
        <View style={{ flex: 1 }}>
          <ChallengeView
            challenge={challenge}
            notified={notified}
          />
        </View>
      </Wallpaper>
    </Container>
  );

}

export default ChallengeViewScreen;