import React, { useState } from 'react';
import { View, ImageBackground, TouchableOpacity } from 'react-native'
import { Container, Content, Button, Text, Toast } from 'native-base'
import Wallpaper from '../../components/Wallpaper/Wallpaper';
import AppHeader from '../../components/AppHeader/AppHeader';
import Loader from '../../components/Loader';
// import { ChallengeRequestStore, ChallengeRequestActions } from '../store/ChallengeRequestStore';
// import { ChallengesActions } from '../store/ChallengesStore';
import { useNavigation } from '@react-navigation/native';
// Styles
import styles from './ChallengeRequestScreen.styles';
const challengeAcceptBg = require('../../assets/images/championship/challenge_accept_bg.png')
const bgSrc = require('../../assets/images/championship/bg2.png');

const defaultRouteParams = {
  challengeRequest : {
    isOnline: false,
    id: null
  },
  championship : {
    isOnline: false,
    name: ''
  },
  challengeChampionship : {
    name: ''
  }
}

const ChallengeRequestScreen = ({ route }) => {
  const { challengeRequest, championship, challengeChampionship } = route.params || defaultRouteParams
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  // constructor(props){
  //   super(props);
  //   this.challengeRequest = this.props.navigation.getParam('challengeRequest', this.challengeRequest);
  //   this.championship = this.props.navigation.getParam('championship', this.championship);
  //   this.challengeChampionship = this.props.navigation.getParam('challengeChampionship', this.challengeChampionship);
  //   this.store = ChallengeRequestStore

  // }
  // async componentDidMount(){

  //   ChallengeRequestActions.response.listen((response) => {
  //     if (response.success) {
  //       const message = response.data.accepted ? '¡Has aceptado el desafío!' : 'El desafío fue rechazado correctamente'
  //       if (response.data.accepted) {
  //         ChallengesActions.list()
  //       }
  //       Toast.show({
  //         text: message,
  //         type: 'success',

  //       });
  //       this.props.navigation.navigate("ChallengeHome");
  //     } else {
  //       Toast.show({
  //         text: 'Ocurrió un erro al intentar guardar el desafio',
  //         type: 'danger',
  //       });
  //     }

  //   })
  // }


  const accept = () => {
    // ChallengeRequestActions.save(this.challengeRequest.id, true)
  }
  const reject = () => {
    // ChallengeRequestActions.save(this.challengeRequest.id, false)
  }

  const onHide = () => {
    navigation.navigate('Notifications');
  }
  const renderHide = () => {

    return (
      <View style={styles.close}>
        <TouchableOpacity
          style={styles.closeTouchable}
          onPress={onHide}
        >
          <Text style={styles.closeText}>X</Text>
        </TouchableOpacity>
      </View>
    )
  }
  const renderButtons = () => {

    if (challengeRequest.done) {
      const acceptedText = challengeRequest.accepted ? 'aceptado' : 'rechazado';
      <View style={styles.buttonContainer}>
        <Text>Ya has {acceptedText} el desafio</Text>
      </View>
    }

    return (
      <View style={styles.buttonContainer}>
        <Button primary onPress={accept}>
            <Text style={styles.buttonText}>Aceptar</Text>
            </Button>
        <Button onPress={reject} style={styles.lastButton} danger>
            <Text style={styles.buttonText}>Rechazar</Text>
          </Button>
      </View>
    )
  }
  const renderMessage = () => {

    return (
      <ImageBackground source={challengeAcceptBg} style={styles.bg}>
        {renderHide()}
        <View style={styles.messageContainer}>
          <Text style={styles.title}>DESAFÍO</Text>
          <Text style={styles.text}>
          <Text style={styles.textBold}>{challengeChampionship.name.trim().toUpperCase()}</Text>
            {` QUIERE DESAFIAR A TU EQUIPO `}
            <Text style={styles.textBold}>{championship.name.trim().toUpperCase()}</Text>
            {` POR UNA SEMANA`}
            </Text>
          {renderButtons()}
        </View>
      </ImageBackground>
    )
  }

  return (
    <Container>
      <Wallpaper source={bgSrc}>
        <AppHeader logo={true} />
        <Content contentContainerStyle={styles.content} padder>
          <Loader loading={loading} />
          {renderMessage()}
        </Content>
      </Wallpaper>
    </Container>
  );

}

export default ChallengeRequestScreen;