import React, { useCallback, useState } from 'react';
import { View, ImageBackground, TouchableOpacity } from 'react-native'
import { Container, Content, Button, Text, Toast } from 'native-base'
import Wallpaper from '../../components/Wallpaper/Wallpaper';
import AppHeader from '../../components/AppHeader/AppHeader';
import Loader from '../../components/Loader';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Api from '../../api/Api';
// Styles
import styles from './ChallengeRequestScreen.styles';
const challengeAcceptBg = require('../../assets/images/championship/challenge_accept_bg.png')
const bgSrc = require('../../assets/images/championship/bg2.png');

const defaultRouteParams = {
  challengeRequest: {
    isOnline: false,
    id: null
  },
  championship: {
    isOnline: false,
    name: ''
  },
  challengeChampionship: {
    name: ''
  }
}

const ChallengeRequestScreen = ({ route }) => {
  const { challengeRequest: challengeRequestParams, championship, challengeChampionship } = route.params || defaultRouteParams
  const [challengeRequest, setChallengeRequest] = useState<any>({
    done: false
  })
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const api = new Api();

  // Fetch the current challenge from the parameters to know if it is done
  const fetchCurrentChallengeRequest = useCallback(() => {
    setChallengeRequest({ challengeRequestParams })
  }, [challengeRequestParams])
  useFocusEffect(
    useCallback(() => {
      if (challengeRequestParams) {
      } fetchCurrentChallengeRequest();
    }, [challengeRequestParams])
  )
  const handlerOnAccept = async (accepted: boolean) => {
    // ChallengeRequestActions.save(this.challengeRequest.id, true)
    let response = await api.challengeResponse(challengeRequestParams.id, accepted);
    if (response && response.data) {
      setChallengeRequest({ ...response.data })
    }
    if (response.success) {
      const message = response.data.accepted ? '¡Has aceptado el desafío!' : 'El desafío fue rechazado correctamente'
      Toast.show({
        text: message,
        type: 'success',

      });
      navigation.navigate("ChallengeHome");
    } else {
      Toast.show({
        text: 'Ocurrió un erro al intentar guardar el desafio',
        type: 'danger',
      });
    }

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
    console.log('challengeRequest', challengeRequest)
    if (challengeRequest.done) {
      const acceptedText = challengeRequest.accepted ? 'aceptado' : 'rechazado';
      <View style={styles.buttonContainer}>
        <Text>Ya has {acceptedText} el desafio</Text>
      </View>
    }

    return (
      <View style={styles.buttonContainer}>
        <Button primary onPress={() => handlerOnAccept(true)}>
          <Text style={styles.buttonText}>Aceptar</Text>
        </Button>
        <Button onPress={() => handlerOnAccept(false)} style={styles.lastButton} danger>
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
            {`\nQUIERE DESAFIAR A TU EQUIPO\n`}
            <Text style={styles.textBold}>{championship.name.trim().toUpperCase()}</Text>
            {`\nPOR UNA SEMANA`}
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