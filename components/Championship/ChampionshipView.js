import React, { Component } from 'react';
import Reflux from 'reflux';
import { View,Image ,Modal, Share } from 'react-native';
import {connectStyle,List, ListItem, Left, Body, Icon, Text, Right,Button, Content} from 'native-base'

import Title from '../Title';
import { ChampionshipViewStore, ChampionshipViewActions } from '../../store/ChampionshipViewStore';
import { Linking } from 'expo';

const trophyImage = require('../../assets/images/championship/trophy.png')
const medalImage = require('../../assets/images/championship/medal.png')
const trophyCreatedImage = require('../../assets/images/championship/trophy-created.png')


class ChampionshipView extends Reflux.Component {
  championship = {
    id: null,
    name: null,
    start_date: null,
    end_date: null,
    user: {
      first_name: null,
      last_name: null
    }
  }
  state = {
    type : 'trivia',
    shareVisible:false
  }
  constructor(props) {
    super(props);
    this.championship = this.props.championship
    this.created = this.props.created || true
    this.state.shareVisible = this.created
    console.log(this.state)
    this.store = ChampionshipViewStore

  }

  onShare(){
    const c = this.championship
    const shareUrl = Linking.makeUrl('championships/' + c.id)
    Share.share(
      {
        title: 'Jugada Super Liga',
        message: "Hola te invito a mi torneo de amigos '"+c.name+"', para participar has click aquí " + shareUrl
      }
    );
  }


  componentDidMount(){
    ChampionshipViewActions.changeChampionship(this.championship.id)
    ChampionshipViewActions.ranking(this.championship.id, this.state.type)
  }
  formatDate(s){
    const pad = function(num) { return ('00'+num).slice(-2) };
    const d = new Date(s.split(" ")[0]);
    const day = pad(d.getDate());
    const month = pad(d.getMonth() + 1);
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  }
  viewItem(championship){
    this.props.navigation.navigate("ChampionshipView",{championship})
  }
  setShareVisible(visible) {
    this.setState({shareVisible: visible});
  }
  renderShare(){
    const styles = this.props.style
    let title = "FELICITACIONES!"
    let text = "Invitá a los amigos que quieras que participen en tu torneo:"
    
    return (
    <Modal
    style={styles.modal}
    animationType="slide"
    transparent={true}
    visible={this.state.shareVisible}
    onRequestClose={() => {
      
    }}>
    <View style={styles.modalContent}>


      <View style={styles.modalBody}>
      <Button transparent
            style={styles.modalCloseButton}
            onPress={() => {
              this.setShareVisible(!this.state.shareVisible);
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
              this.onShare();
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
  renderItems(){
    const styles = this.props.style;


    if(typeof this.state.ChampionshipView[this.state.type] == 'undefined'){
      return null;
    }
    return this.state.ChampionshipView[this.state.type].data.map((ranking,index)=>{
      let image = null;
      ranking.position = index + 1
      let positionMargin = null;
      if(ranking.position==1){
        image = <Image source={trophyImage} style={styles.trophyImage} />
        positionMargin = <View style={styles.positionMargin} />
      }
      if(ranking.position==2 || ranking.position==3 ){
        image = <Image source={medalImage} style={styles.medalImage} />
        positionMargin = <View style={styles.positionMargin} />
      }
      return (

        <ListItem avatar style={{...styles.listItem,...styles.listItemPosition[ranking.position]}} key={ranking.user_id}>
          <Left style={{...styles.listItemLeft,...styles.listItemPositionLeft[ranking.position]}}>
            <Text style={styles.positionText}>{ranking.position}º</Text>{positionMargin}
            {image}
          </Left>
          <Body style={{...styles.listItemBody,...styles.listItemPositionBody[ranking.position]}}>
            <Text style={styles.userNameText}>{ranking.user.first_name} {ranking.user.last_name}</Text>
          </Body>
          <Right style={{...styles.listItemRight,...styles.listItemPositionRight[ranking.position]}}>
            <Text style={styles.pointsText}>{ranking.points}p</Text>
          </Right>
        </ListItem>
      )
    })
  }
  rankingFilter = (type)=>{
    this.setState({type})
    ChampionshipViewActions.ranking(this.championship.id, type)
  }
  allRanking = () => {
    this.rankingFilter('all')
  }
  triviaRanking = () => {
    this.rankingFilter('trivia')
  }
  dayRanking = () => {
    this.rankingFilter('day')
  }
  weekRanking = () => {
    this.rankingFilter('week')
  }
  renderButtons(){
    const styles = this.props.style
    const selectedColor = '#72c4eb'
    let selected = {}
    selected[this.state.type] = {color: selectedColor}

    
    return (
    <View style={styles.buttons}>
      <Button transparent onPress={this.allRanking}>
        <Text style={{...styles.buttonText,...selected.all}}>Ranking Total</Text>
      </Button>
      <Text style={styles.buttonText}> | </Text>
      <Button transparent onPress={this.triviaRanking}>
        <Text style={{...styles.buttonText,...selected.trivia}}>Ultima trivia</Text>
      </Button>
      <Text style={styles.buttonText}> | </Text>
      <Button transparent onPress={this.weekRanking}>
        <Text style={{...styles.buttonText,...selected.week}}>Ranking Semanal</Text>
      </Button>
    </View>
    )
  }
  render() {
    const styles = this.props.style;
    return (
      <Content style={styles.container}>

        {this.renderShare()}
        <Title text={'TORNEO ' + this.championship.name}></Title>
        <View style={styles.titleContainer}>
          <Button transparent onPress={()=>this.onShare()}>
              <Icon name="share-alt-square" type="FontAwesome"/>
            </Button>
        </View>

        {this.renderButtons()}

        <List style={styles.list}>
          {this.renderItems()}
        </List>
        <Button style={styles.shareButton} onPress={this.onCreatePress}>
            <Icon name="user-plus" type="FontAwesome" style={styles.shareButtonIcon} />
        </Button>
      </Content>
    );
  }
}


export default connectStyle('SuperLiga.ChampionshipView')(ChampionshipView);