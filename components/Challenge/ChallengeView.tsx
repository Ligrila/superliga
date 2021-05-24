import React, { useCallback, useState } from 'react';
import { View, Image, Modal, RefreshControl } from 'react-native';
import { List, ListItem, Left, Body, Icon, Text, Right, Button, Content, RnViewStyleProp } from 'native-base'
import { ChallengeViewStore, ChallengeViewActions } from '../../store/ChallengeViewStore';
import { Variables } from '../../styles';
import { useFocusEffect } from '@react-navigation/native';
import BigTitle from '../Title/BigTitle';
import { ScrollView } from 'react-native-gesture-handler';
import Loader from '../Loader';
import Api from '../../api/Api';
// Styles
import styles from './ChallengeView.styles';
import Notice from '../Notice/Notice';
const trophyImage = require('../../assets/images/championship/trophy.png')
const medalImage = require('../../assets/images/championship/medal.png')
const trophyCreatedImage = require('../../assets/images/championship/trophy-created.png')


const ChallengeView = ({ challenge, notified }) => {

  // Modal
  const [notificationVisible, setNotificationVisible] = useState(false);
  // Filter
  const [rankingFilter, setRankingFilter] = useState('trivia');
  // Loading
  const [loading, setLoading] = useState(true);
  // Refreshing
  const [refreshing, setRefreshing] = useState(false)
  // Api
  const api = new Api();
  // Ranking
  const [ranking, setRanking] = useState<any>({
    all: null,
    trivia: null,
    week: null
  });
  // Notified
  const fetchNotified = useCallback(async () => {
    if (notified) {
      setNotificationVisible(true)
    }
  }, [challenge, notified])
  useFocusEffect(
    useCallback(() => {
      fetchNotified();
    }, [notified, challenge])
  )
  // Fetch Ranking
  const fetchRanking = useCallback(async () => {
    // const response = await api.championshipRanking(challenge.id, rankingFilter);
    // console.log('challenge', challenge, rankingFilter)
    const response = await api.challengeRanking(challenge.id, rankingFilter);
    const data = response && response.data ? {...response.data} : null
    setRanking(prevState => ({ ...prevState, [rankingFilter]: data }));
  }, [challenge, rankingFilter])
  // Fetch Data
  const fetchRankingData = useCallback(async () => {
    // If not have data update
    if (!ranking[rankingFilter]) {
      setLoading(true);
      await fetchRanking()
      setLoading(false);
    }
    // await fetchRanking()
  }, [challenge, rankingFilter])

  // On Change Filter and Championship
  useFocusEffect(
    useCallback(() => {
      if (challenge && challenge.id) {
        fetchRankingData();
      }
    }, [rankingFilter])
  )

  // On Refresh
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchRanking();
    setRefreshing(false)

  }
  // Modal
  const renderNotification = () => {

    const title = "FELICITACIONES!"
    const text = "Tu desafrio fue aceptado"

    return (
      <Modal
        style={styles.modal}
        animationType="slide"
        transparent={true}
        visible={notificationVisible}
        onRequestClose={() => {

        }}>
        <View style={styles.modalContent}>


          <View style={styles.modalBody}>
            <Button transparent
              style={styles.modalCloseButton}
              onPress={() => {
                setNotificationVisible(false);
              }}>
              <Icon style={styles.modalCloseButtonIcon} type="FontAwesome" name="times"></Icon>
            </Button>
            <Image source={trophyCreatedImage} style={styles.trophyCreatedImage} />
            <Text style={styles.modalTitle}>{title}</Text>
            <Text style={styles.modalText}>{text}</Text>
          </View>
        </View>
      </Modal>)
  }
  const renderItem = (position, points, name) => {
    let image: any = null;

    if (position == 1) {
      image = <Image source={trophyImage} style={styles.trophyImage} />
    }
    if (position == 2 || position == 3) {
      image = <Image source={medalImage} style={styles.medalImage} />
    }
    let variantBg: RnViewStyleProp | null = null;
    if (position === 1) {
      variantBg = { backgroundColor: Variables.championshipItemBg }
    }
    if (position === 2) {
      variantBg = { backgroundColor: Variables.championshipItemVariantBg }
    }
    if (position === 3) {
      variantBg = { backgroundColor: '#ae966f' }
    }
    const styleLeft = styles[`listItemPositionLeft${position}`] ? styles[`listItemPositionLeft${position}`] : null;
    const itemBody = styles[`listItemBody${position}`] ? styles[`listItemBody${position}`] : null;
    return (

      <ListItem avatar style={[styles.listItem]} key={position}>
        <Left style={[styles.listItemLeft, styleLeft]}>
          <Text style={styles.positionText}>{position < 9 ? `0${position}` : position}º</Text>
          {image}
        </Left>
        <Body style={[
          styles.listItemBody,
          itemBody,
          position % 2 === 0 ? null : styles.listItemBodyVariant,
          variantBg
        ]}>
          <Text style={styles.userNameText}>{name}</Text>
        </Body>
        <Right style={[
          styles.listItemRight,
          position % 2 === 0 ? null : styles.listItemBodyVariant,
          variantBg
        ]}>
          <Text style={styles.pointsText}>{points}p</Text>
        </Right>
      </ListItem >
    )
  }

  const renderItems = () => {

    if (loading) {
      return null
    }
    if (!ranking[rankingFilter]) {
      return null;
    }
    if (!ranking[rankingFilter].championship1 && !ranking[rankingFilter].championship2) {
      return (
        <Notice text="Sin datos." />
      )
    }
    const championship1 = ranking[rankingFilter].championship1;
    const championship2 = ranking[rankingFilter].championship2;

    const items:any = [];

    if (championship1.points >= championship2.points) {
      items.push(renderItem(1, championship1.points, championship1.name))
      items.push(renderItem(2, championship2.points, championship2.name))
    } else {
      items.push(renderItem(1, championship2.points, championship2.name))
      items.push(renderItem(2, championship1.points, championship1.name))
    }

    return items;



  }
  // Handle Ranking Filter
  const handlerRankingFilter = (type) => {
    setRankingFilter(type)
  }
  // Render Buttons
  const renderButtons = () => {
    const selectedColor = '#89c9ec'
    const selected = { color: selectedColor };
    return (
      <View style={styles.buttons}>
        <Button
          style={[styles.button]}
          transparent onPress={() => handlerRankingFilter('all')}>
          <Text style={[styles.buttonText, rankingFilter === 'all' ? selected : null]}>Ranking Total</Text>
        </Button>

        <Button
          style={[styles.button]}
          transparent onPress={() => handlerRankingFilter('trivia')}>
          <View style={styles.separator}></View>
          <Text style={[styles.buttonText, rankingFilter === 'trivia' ? selected : null]}>Ultima trivia</Text>
          <View style={styles.separator}></View>
        </Button>

        <Button
          style={[styles.button]}
          transparent onPress={() => handlerRankingFilter('week')}>
          <Text style={[styles.buttonText, rankingFilter === 'week' ? selected : null]}>Ranking Semanal</Text>
        </Button>
      </View>
    )
  }
  // const title = challenge ?  `${challenge.championship1.name}  VS  ${challenge.championship2.name}` : 'DESAFIO';
  return (
    <Content
      style={styles.container}
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
      {renderNotification()}
      <View style={styles.title}>
        <BigTitle
          hideSeparator={true}
          text={`DESAFIO`} />
      </View>
      {renderButtons()}
      <ScrollView style={{ flex: 1 }}>
        <Loader loading={loading} />
        <List style={styles.list}>
          {renderItems()}
        </List>
      </ScrollView>

    </Content>
  );

}


export default ChallengeView;