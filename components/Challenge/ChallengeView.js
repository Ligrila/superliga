import React, { Component } from 'react';
import Reflux from 'reflux';
import { View,Image ,Modal, Share } from 'react-native';
import {connectStyle,List, ListItem, Left, Body, Icon, Text, Right,Button, Content} from 'native-base'

import Title from '../Title';
import { ChallengeViewStore, ChallengeViewActions } from '../../store/ChallengeViewStore';

const trophyImage = require('../../assets/images/championship/trophy.png')
const medalImage = require('../../assets/images/championship/medal.png')
const trophyCreatedImage = require('../../assets/images/championship/trophy-created.png')


class ChallengeView extends Reflux.Component {
  challenge = {
    id: null,
    name: null,
    challenge1:{

    },
    challenge2:{

    }
  }
  state = {
    name: '',
    type : 'trivia',
    notificationVisible:false
  }
  constructor(props) {
    super(props);
    this.challenge = this.props.challenge
    this.notified = this.props.notified || false
    this.state.notificationVisible = this.notified
    this.store = ChallengeViewStore
  }



  componentDidMount(){
    ChallengeViewActions.changeChallenge(this.challenge.id)
    ChallengeViewActions.ranking(this.challenge.id, this.state.type)
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
    this.props.navigation.navigate("ChallengeView",{championship})
  }
  setnotificationVisible(visible) {
    this.setState({notificationVisible: visible});
  }
  renderNotification(){
    const styles = this.props.style
    const title = "FELICITACIONES!"
    const text = "Tu desafrio fue aceptado"
    
    return (
    <Modal
    style={styles.modal}
    animationType="slide"
    transparent={true}
    visible={this.state.notificationVisible}
    onRequestClose={() => {
      
    }}>
    <View style={styles.modalContent}>


      <View style={styles.modalBody}>
      <Button transparent
            style={styles.modalCloseButton}
            onPress={() => {
              this.setnotificationVisible(!this.state.notificationVisible);
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
  renderItems(){
    const styles = this.props.style;

    if(!this.state.ChallengeView.hasData){
      return;
    }
    if(typeof this.state.ChallengeView[this.state.type] == 'undefined'){
      return null;
    }
    if(!this.state.ChallengeView[this.state.type].hasData){
      return null;
    }

    const championship1 = this.state.ChallengeView[this.state.type].data.championship1;
    const championship2 = this.state.ChallengeView[this.state.type].data.championship2;
    

    const renderItem = (position,points,name) => {
      let image = null;
      let positionMargin = null;
      if(position==1){
        image = <Image source={trophyImage} style={styles.trophyImage} />
        positionMargin = <View style={styles.positionMargin} />
      }
      if(position==2 || position==3 ){
        image = <Image source={medalImage} style={styles.medalImage} />
        positionMargin = <View style={styles.positionMargin} />
      }
      return (<ListItem avatar style={{...styles.listItem,...styles.listItemPosition[position]}} key={position}>
      <Left style={{...styles.listItemLeft,...styles.listItemPositionLeft[position]}}>
        <Text style={styles.positionText}>{position}º</Text>{positionMargin}
        {image}
      </Left>
      <Body style={{...styles.listItemBody,...styles.listItemPositionBody[position]}}>
        <Text style={styles.userNameText}>{name}</Text>
      </Body>
      <Right style={{...styles.listItemRight,...styles.listItemPositionRight[position]}}>
        <Text style={styles.pointsText}>{points}p</Text>
      </Right>
    </ListItem>)
    }

    const items = [];
    if(championship1.points >= championship2.points){
      items.push(renderItem(1,championship1.points,championship1.name))
      items.push(renderItem(2,championship2.points,championship2.name))
    } else{
      items.push(renderItem(1,championship2.points,championship2.name))
      items.push(renderItem(2,championship1.points,championship1.name))
    }

    return items;
    

    
  }
  rankingFilter = (type)=>{
    this.setState({type})
    ChallengeViewActions.ranking(this.challenge.id, type)
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
        {this.renderNotification()}
        <Title text={'DESAFIO ' + this.state.name}></Title>


        {this.renderButtons()}

        <List style={styles.list}>
          {this.renderItems()}
        </List>

      </Content>
    );
  }
}


export default connectStyle('SuperLiga.ChampionshipView')(ChallengeView);