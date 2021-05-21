import React, { useCallback, useState } from 'react';
import { View, Alert, RefreshControl } from 'react-native';
import { Toast, Text, Content } from 'native-base'

import Title from '../Title';

import Notice from '../Notice';
import Loader from '../Loader';
import ChampionshipItem from '../Championship/ChampionshipItem';



import styles from './CreateChallenge.styles'
import Api from '../../api/Api';
import { useFocusEffect } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';


const CreateChallenge = ({ championship: championshipProps }) => {
  // state = {

  // }
  // constructor(props) {
  //   super(props);
  //   this.stores = [CreateChallengeStore, AllChampionshipsStore, UsersStore];
  //   this.championship = this.props.championship;

  // }

  // componentDidMount(){
  //   AllChampionshipsActions.list(null, true)

  // }
  const api = new Api()
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allChampionShip, setAllChampionship] = useState<any>(null);
  const fnFetchChampionships = useCallback(async () => {
    const response = await api.allChampionshipList(null, true);
    if (response && response.success) {
      setAllChampionship(response.data);
    } else {
      setAllChampionship([]);
    }
  }, [])
  const fetchChampionships = useCallback(async () => {
    setLoading(true)
    await fnFetchChampionships();
    setLoading(false)
  }, []);
  const onRefresh = async () => {
    setRefreshing(true);
    fnFetchChampionships();
    setRefreshing(false)
  }
  useFocusEffect(
    useCallback(() => {
      fetchChampionships()
    }, [])
  )

  const onCreateChallenge = (response) => {
    //console.log({response})
    if (response.success) {
      Toast.show({
        text: "La invitación fue enviada correctamente.",
        duration: 5000,
        type: "success"
      })

    } else {
      Toast.show({
        text: "No se pudo enviar la invitación a este torneo.",
        duration: 5000,
        type: "danger"
      })
    }
    // if (typeof (this.createdUnsubscribe) == 'function') {
    //   this.createdUnsubscribe();
    // }
  }
  const createChallenge = async (championship) => {

    const response = await api.createChallenge(championship.id, championshipProps.id);
    console.log('create', response)
    onCreateChallenge(response);

  }

  const onChallenge = (championship) => {
    Alert.alert(
      'Desafiar torneo',
      '¿Estás seguro de desafiar este torneo?',
      [
        {
          text: 'Cancelar',
          onPress: () => { },
          style: 'cancel',
        },
        { text: '¡Si, desafiar!', onPress: () => createChallenge(championship) },
      ],
      { cancelable: false },
    );
  }

  const renderItems = () => {
    if (!allChampionShip) {
      return null;
    }
    if (allChampionShip.length == 0) {
      return (
        <Notice text="No hemos encontrado ningun torneo" />
      )
    }

    return allChampionShip.map((ranking, index) => {
      const championship = { ...ranking.championship, position: ranking.position, points: ranking.points }
      const altrow = index % 2 === 0
      return (
        <ChampionshipItem
          key={championship.id}
          altrow={altrow}
          championship={championship}
          onChallenge={() => onChallenge(championship)}
        />
      )
    })
  }

  return (
    <Content
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl
          style={{ backgroundColor: '#transparent' }}
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor="#fff" // Ios
          colors={['#282828', '#fff']} //android
          title={''}
          progressBackgroundColor="#fff"
        />
      }
    >
      <Loader loading={loading} />
      <Title text={'DESAFIA \n OTROS EQUIPOS'}></Title>
      <View style={styles.listHeader}>
        <View style={styles.row}>
          <View style={styles.colh1}>
          </View>
          <View style={styles.colh2}>
            <Text style={styles.text}>nr.jug</Text>
          </View>
          <View style={styles.colh3}>
            <Text style={styles.text}>pnts.</Text>
          </View>
        </View>
      </View>
      <ScrollView style={styles.list}>
        {renderItems()}
      </ScrollView>
    </Content>
  );

}


export default CreateChallenge;
// connectStyle('SuperLiga.CreateChallenge')(CreateChallenge);