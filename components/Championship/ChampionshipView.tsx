import React, { Component, useCallback, useEffect, useState } from 'react';
import Reflux from 'reflux';
import { View, Image, Modal, Share, RefreshControl } from 'react-native';
import {
  List,
  ListItem,
  Left,
  Body,
  Icon,
  Text,
  Right,
  Button,
  Content,
  RnViewStyleProp
} from 'native-base'
// Linking
import * as Linking from "expo-linking";
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import BigTitle from '../Title/BigTitle';
import Api from '../../api/Api';
import { ScrollView } from 'react-native-gesture-handler';
import Loader from '../Loader/Loader';
import Notice from '../Notice/Notice';
// Styles
import styles from './ChampionshipView.styles';
import { Variables } from '../../styles';
const trophyImage = require('../../assets/images/championship/trophy.png')
const medalImage = require('../../assets/images/championship/medal.png')
const trophyCreatedImage = require('../../assets/images/championship/trophy-created.png')



const ChampionshipView = ({ championship, created }) => {
  // Modal
  const [shareVisible, setShareVisible] = useState(false);
  // Filter
  const [rankingFilter, setRankingFilter] = useState('trivia');
  // Loading
  const [loading, setLoading] = useState(true);
  // Refreshing
  const [refreshing, setRefreshing] = useState(false)

  const [ranking, setRanking] = useState<any>({
    all: null,
    trivia: null,
    week: null
  });
  // Api
  const api = new Api();
  // Created
  const fetchCreated = useCallback(async () => {
    if (created) {
      setShareVisible(true)
    }
  }, [championship, created])
  useFocusEffect(
    useCallback(() => {
      fetchCreated();
    }, [created, championship])
  )

  // Fetch Ranking
  const fetchRanking = useCallback(async () => {
    const response = await api.championshipRanking(championship.id, rankingFilter);
    const data = [...response.data]
    setRanking(prevState => ({ ...prevState, [rankingFilter]: data }));
  }, [championship, rankingFilter])
  // Fetch Data
  const fetchRankingData = useCallback(async () => {
    // If not have data update
    if (!ranking[rankingFilter]) {
      setLoading(true);
      await fetchRanking()
      setLoading(false);
    }
    // await fetchRanking()
  }, [championship, rankingFilter])

  // On Change Filter and Championship
  useFocusEffect(
    useCallback(() => {
      if (championship && championship.id) {
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
  // On Share
  const onShare = () => {
    const c = championship
    let shareUrl = Linking.makeUrl('championships/' + c.id)
    if (shareUrl.startsWith("jugadasuperliga://")) {
      shareUrl = shareUrl.replace("jugadasuperliga://", 'https://www.jugadasuperliga.com/')
    }
    Share.share(
      {
        title: 'Jugada Super Liga',
        message: "Hola te invito a mi torneo de amigos '" + c.name + "', para participar has click aquí " + shareUrl
      }
    );
  }
  // Render Share
  const renderShare = () => {

    let title = "FELICITACIONES!"
    let text = "Invitá a los amigos que quieras que participen en tu torneo!"

    return (
      <Modal
        style={styles.modal}
        animationType="slide"
        transparent={true}
        visible={shareVisible}
        onRequestClose={() => {

        }}>
        <View style={styles.modalContent}>


          <View style={styles.modalBody}>
            <Button transparent
              style={styles.modalCloseButton}
              onPress={() => {
                setShareVisible(!shareVisible);
              }}>
              <Icon style={styles.modalCloseButtonIcon} type="AntDesign" name="close"></Icon>
            </Button>
            <Image source={trophyCreatedImage} style={styles.trophyCreatedImage} />
            <Text style={styles.modalTitle}>{title}</Text>
            <Text style={[styles.modalText, styles.modalSubtitle]}>CREASTE TU TORNEO.</Text>
            <Text style={styles.modalText}>{text}</Text>
            <View style={styles.modalButtons}>
              <Button primary
                onPress={() => {
                  onShare();
                }}
                style={styles.modalShareButton}
              >
                <Icon style={styles.modalShareButtonIcon} type="AntDesign" name="adduser"></Icon>
              </Button>

            </View>
          </View>
        </View>
      </Modal>)
  }
  // Render Items
  const renderItems = () => {
    if (loading) {
      return null
    }
    if (!ranking[rankingFilter]) {
      return null;
    }
    if (ranking[rankingFilter].length === 0) {
      return (
        <Notice text="Sin datos." />
      )
    }


    return ranking[rankingFilter].map((ranking, index) => {
      let image: any = null;
      ranking.position = index + 1

      if (ranking.position == 1) {
        image = <Image source={trophyImage} style={styles.trophyImage} />
      }
      if (ranking.position == 2 || ranking.position == 3) {
        image = <Image source={medalImage} style={styles.medalImage} />
      }
      let variantBg: RnViewStyleProp | null = null;
      if (ranking.position === 1) {
        variantBg = { backgroundColor: Variables.championshipItemBg}
      }
      if (ranking.position === 2) {
        variantBg = { backgroundColor: Variables.championshipItemVariantBg }
      }
      if (ranking.position === 3) {
        variantBg = { backgroundColor: '#ae966f' }
      }
      const styleLeft = styles[`listItemPositionLeft${ranking.position}`] ? styles[`listItemPositionLeft${ranking.position}`] : null;
      const itemBody = styles[`listItemBody${ranking.position}`] ? styles[`listItemBody${ranking.position}`] : null;
      return (

        <ListItem avatar style={[styles.listItem]} key={index}>
          <Left style={[styles.listItemLeft, styleLeft]}>
            <Text style={styles.positionText}>{ranking.position < 9 ? `0${ranking.position}` : ranking.position}º</Text>
            {image}
          </Left>
          <Body style={[
            styles.listItemBody,
            itemBody,
            ranking.position % 2 === 0 ? null : styles.listItemBodyVariant,
            variantBg
          ]}>
            <Text style={styles.userNameText}>{ranking.user.first_name} {ranking.user.last_name}</Text>
          </Body>
          <Right style={[
            styles.listItemRight,
            ranking.position % 2 === 0 ? null : styles.listItemBodyVariant,
            variantBg
          ]}>
            <Text style={styles.pointsText}>{ranking.points}p</Text>
          </Right>
        </ListItem >
      )
    })
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
  return (
    <>
      {/* Share */}
      {renderShare()}
      {/* Main Content */}
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
        <View style={styles.title}>
          <BigTitle
            hideSeparator={true}
            text={championship.name} />
        </View>
        {renderButtons()}

        <ScrollView style={{ flex: 1 }}>
          <Loader loading={loading} />
          <List style={styles.list}>
            {renderItems()}
          </List>
        </ScrollView>
      </Content>
      {/* Share Button */}
      <Button style={styles.shareButton} onPress={onShare}>
        <Icon type="AntDesign" name="adduser" style={styles.shareButtonIcon} />
      </Button>
    </>
  );

}

export default ChampionshipView;