import React, { Component } from 'react';
import Reflux from 'reflux';
import { Share, Image, View } from 'react-native';
import {connectStyle,List, ListItem, Left, Body, Text, Right,Button,Icon, Content, ActionSheet} from 'native-base'
import { Linking } from 'expo';



import Title from '../Title';
import { ChallengesStore, ChallengesActions } from '../../store/ChallengesStore';
import Notice from '../Notice';
import { UsersStore } from '../../store/UserStore';
import ChallengeItem from './ChallengeItem';






class ChallengeList extends Reflux.Component {
 state = {

 }
  constructor(props) {
    super(props);
    this.stores = [ChallengesStore,UsersStore];

  }

  componentDidMount(){
    ChallengesActions.list()
  }
  onShare(c){
    const shareUrl = Linking.makeUrl('championships/' + c.id)
    Share.share(
      {
        title: 'Jugada Super Liga',
        message: "Hola te invito a mi torneo de amigos '"+c.name+"', para participar has click aquí " + shareUrl
      }
    );
  }

  

  renderItems(){
    const styles = this.props.style;
    if(!this.state.Challenges.hasData){
      return (
        <Notice text="Todavía no has desafiado a un torneo." />
      )
    }

    let isFirst = true;
    return this.state.Challenges.data.map((challenge)=>{
      

      const itemStyle = isFirst ? {...styles.listItemFirst,...styles.listItem} : styles.listItem;

      return (
        <ChallengeItem key={challenge.id} navigation={this.props.navigation} challenge={challenge} />
      )
    })
  }
  
  render() {
    const styles = this.props.style;
    return (
      <Content style={styles.container}>
        <Title text={'TUS \n DESAFIOS'}></Title>
        <List style={styles.list}>
          {this.renderItems()}
        </List>
      </Content>
    );
  }
}


export default connectStyle('SuperLiga.ChampionshipList')(ChallengeList);