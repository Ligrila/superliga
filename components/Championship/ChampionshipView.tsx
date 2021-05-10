import React, { Component, useCallback, useEffect, useState } from 'react';
import Reflux from 'reflux';
import { View, Image, Modal, Share } from 'react-native';
import {
  List,
  ListItem,
  Left,
  Body,
  Icon,
  Text,
  Right,
  Button,
  Content
} from 'native-base'
import Title from '../Title/Title';
import { ChampionshipViewStore, ChampionshipViewActions } from '../../store/ChampionshipViewStore';
// Linking
import * as Linking from "expo-linking";
// Styles
import styles from './ChampionshipView.styles';
import { useNavigation } from '@react-navigation/native';
import Logo from '../Logo/Logo';
import BigTitle from '../Title/BigTitle';
const trophyImage = require('../../assets/images/championship/trophy.png')
const medalImage = require('../../assets/images/championship/medal.png')
const trophyCreatedImage = require('../../assets/images/championship/trophy-created.png')



const ChampionshipView = ({ championship, created }) => {
  // Navigation
  const navigation = useNavigation();
  // States
  const [shareVisible, setShareVisible] = useState(false);
  const [rankingFilter, setRankingFilter] = useState('trivia');
  // Current Championship
  const [currentChampionship, setCurrentChampionship] = useState<any>(null);
  // championship = {
  //   id: null,
  //   name: null,
  //   start_date: null,
  //   end_date: null,
  //   user: {
  //     first_name: null,
  //     last_name: null
  //   }
  // }
  // state = {
  //   type: 'trivia',
  //   shareVisible: false
  // }
  // constructor(props) {
  //   super(props);
  //   this.championship = this.props.championship
  //   this.created = this.props.created || false
  //   this.state.shareVisible = this.created
  //   this.store = ChampionshipViewStore
  // }
  // Fetch Data
  const fetchData = useCallback(async () => {
    if (created) {
      setShareVisible(true)
    }
  }, [championship, created, setShareVisible])
  useEffect(() => {
    if (championship.id) {
      fetchData()
    }
  }, [championship, fetchData])
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


  // componentDidMount() {
  //   ChampionshipViewActions.changeChampionship(this.championship.id)
  //   ChampionshipViewActions.ranking(this.championship.id, this.state.type)
  // }

  const formatDate = (s) => {
    const pad = function (num) { return ('00' + num).slice(-2) };
    const d = new Date(s.split(" ")[0]);
    const day = pad(d.getDate());
    const month = pad(d.getMonth() + 1);
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  }
  const viewItem = (championship) => {
    navigation.navigate("ChampionshipView", { championship })
  }

  const renderShare = () => {

    let title = "FELICITACIONES!"
    let text = "Invitá a los amigos que quieras que participen en tu torneo:"

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
              <Icon style={styles.modalCloseButtonIcon} type="FontAwesome" name="times"></Icon>
            </Button>
            <Image source={trophyCreatedImage} style={styles.trophyCreatedImage} />
            <Text style={styles.modalTitle}>{title}</Text>
            <Text style={styles.modalText}>CREASTE TU TORNEO.</Text>
            <Text style={styles.modalText}>{text}</Text>
            <View style={styles.modalButtons}>
              <Button primary
                onPress={() => {
                  onShare();
                }}
                style={styles.modalShareButton}
              >
                <Icon style={styles.modalShareButtonIcon} type="FontAwesome" name="user-plus"></Icon>
              </Button>

            </View>
          </View>
        </View>
      </Modal>)
  }
  const renderItems = () => {


    if (!currentChampionship) {
      return null;
    }
    return currentChampionship.data.map((ranking, index) => {
      let image: any = null;
      ranking.position = index + 1
      let positionMargin: any = null;
      if (ranking.position == 1) {
        image = <Image source={trophyImage} style={styles.trophyImage} />
        positionMargin = <View style={styles.positionMargin} />
      }
      if (ranking.position == 2 || ranking.position == 3) {
        image = <Image source={medalImage} style={styles.medalImage} />
        positionMargin = <View style={styles.positionMargin} />
      }
      return (

        <ListItem avatar style={{ ...styles.listItem, ...styles.listItemPosition[ranking.position] }} key={ranking.user_id}>
          <Left style={[
            styles.listItemLeft,
            // ...styles.listItemPositionLeft[ranking.position] 
          ]}>
            <Text style={styles.positionText}>{ranking.position}º</Text>{positionMargin}
            {image}
          </Left>
          <Body style={[
            styles.listItemBody,
            // ...styles.listItemPositionBody[ranking.position] 
          ]}>
            <Text style={styles.userNameText}>{ranking.user.first_name} {ranking.user.last_name}</Text>
          </Body>
          <Right style={[
            styles.listItemRight,
            // ...styles.listItemPositionRight[ranking.position] 
          ]}>
            <Text style={styles.pointsText}>{ranking.points}p</Text>
          </Right>
        </ListItem>
      )
    })
  }
  const handlerRankingFilter = (type) => {
    setRankingFilter(type)
    // ChampionshipViewActions.ranking(this.championship.id, type)
  }

  const renderButtons = () => {
    const selectedColor = '#89c9ec'
    const selected = { color: selectedColor };


    return (
      <View style={styles.buttons}>
        <Button transparent onPress={() => handlerRankingFilter('all')}>
          <Text style={[styles.buttonText, rankingFilter === 'all' ? selected : null]}>Ranking Total</Text>
        </Button>
        <View style={styles.separator}></View>
        <Button transparent onPress={() => handlerRankingFilter('trivia')}>
          <Text style={[styles.buttonText, rankingFilter === 'trivia' ? selected : null]}>Ultima trivia</Text>
        </Button>
        <View style={styles.separator}></View>
        <Button transparent onPress={() => handlerRankingFilter('week')}>
          <Text style={[styles.buttonText, rankingFilter === 'week' ? selected : null]}>Ranking Semanal</Text>
        </Button>
      </View>
    )
  }

  return (
    <Content style={styles.container}>
      {renderShare()}
      <Logo />
      <View style={styles.title}>
        <BigTitle
          hiddeSeparator={true}
          text={championship.name} />
      </View>
      {renderButtons()}
      { currentChampionship &&
        <>


          <List style={styles.list}>
            {renderItems()}
          </List>
          <Button style={styles.shareButton} onPress={onShare}>
            <Icon name="user-plus" type="FontAwesome" style={styles.shareButtonIcon} />
          </Button>
        </>
      }
    </Content>
  );

}

export default ChampionshipView;