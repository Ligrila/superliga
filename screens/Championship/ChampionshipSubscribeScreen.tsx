import React, { useCallback, useState } from 'react';
import { View } from 'react-native'
import { Container, Content, Button, Text, Icon } from 'native-base'
import Wallpaper from '../../components/Wallpaper/Wallpaper';
import AppHeader from '../../components/AppHeader/AppHeader';
import Loader from '../../components/Loader/Loader';
import Title from '../../components/Title/Title';
import Api from '../../api/Api';
import Notice from '../../components/Notice/Notice';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
// Styles
import styles from './ChampionshipSubscribeScreen.styles'
const bgSrc = require('../../assets/images/championship/bg_champion.png');


const ChampionshipSubscribeScreen = ({ route }) => {
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState<any | null>(null);
  const navigation = useNavigation();
  const api = new Api()
  const { championship } = route.params || { championship: null, created: false };

  const subscribeToChampionship = useCallback(async() => {
    const response = await api.subscribeChampionship(championship.id)
    setLoading(false);
    setResponse(response);
  }, [championship])
  useFocusEffect(
    useCallback(() => {
      if (championship) {
        subscribeToChampionship()
      }
    }, [championship])
  )

  // championship = {
  //   id: null
  // }
  // state = {
  //   loading: true,
  //   response: null
  // }
  // constructor(props) {
  //   super(props);
  //   this.championship = this.props.navigation.getParam('championship', this.championship);
  //   this.api = new Api;

  // }
  // async componentDidMount() {
  //   const response = await this.api.subscribeChampionship(this.championship.id)
  //   console.log({ response })
  //   this.setState({ loading: false, response: response })

  // }
  const viewChampionship = (championship) => {
    navigation.navigate('ChampionshipView', { championship })
  }
  const renderMessage = () => {
    if (loading) {
      return null;
    }
    let message = `Ya te has inscripto al torneo o la solicitud es inválida`;
    let button: any = null
    if (response && response.success) {
      const name = response.data.name
      message = `¡Felicitaciones! Ya estás participando del torneo de amigos "${name}"`;
      button = (<Button block
        onPress={() => viewChampionship(response.data)}
        primary><Text style={styles.buttonText}>Ver torneo</Text></Button>)
    }

    return (
      <View style={styles.messageView}>
        <Notice text={message} />
        <Text />
        {button}
      </View>
    )
  }
  const returnButton = (<Button transparent onPress={() => {
    navigation.navigate("ChampionshipHome")
  }}><Icon name='ios-arrow-back' /></Button>)

  return (
    <Container>
      <Wallpaper source={bgSrc}>
        <AppHeader return={returnButton} />
        <Content contentContainerStyle={styles.content} padder>
          <Loader loading={loading} />
          <Title text={'INSCRIPCIÓN TORNEO \n SUPERLIGA'}></Title>
          {renderMessage()}
        </Content>
      </Wallpaper>
    </Container>
  );

}
export default ChampionshipSubscribeScreen;

// export default connectStyle('SuperLiga.ChampionshipSubscribeScreen')(ChampionshipSubscribeScreen);