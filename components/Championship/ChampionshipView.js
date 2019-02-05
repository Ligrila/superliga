import React, { Component } from 'react';
import Reflux from 'reflux';
import { View,Image } from 'react-native';
import {connectStyle,List, ListItem, Left, Body, Thumbnail, Text, Right,Button,Icon, Content} from 'native-base'

import Title from '../Title';
import { ChampionshipViewStore, ChampionshipViewActions } from '../../store/ChampionshipViewStore';

const trophyImage = require('../../assets/images/championship/trophy.png')
const medalImage = require('../../assets/images/championship/medal.png')


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
    type : 'day'
  }
  constructor(props) {
    super(props);
    this.championship = this.props.championship
    this.store = ChampionshipViewStore

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
  renderItems(){
    const styles = this.props.style;

    
    
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
      <Button transparent onPress={this.dayRanking}>
        <Text style={{...styles.buttonText,...selected.day}}>Ranking Día</Text>
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
        <Title text={'TORNEO ' + this.championship.name}></Title>
        {this.renderButtons()}

        <List style={styles.list}>
          {this.renderItems()}
        </List>
      </Content>
    );
  }
}


export default connectStyle('SuperLiga.ChampionshipView')(ChampionshipView);