import React, { Component } from 'react';
import Reflux from 'reflux';
import { Share, Image, View } from 'react-native';
import {connectStyle,List, ListItem, Left, Body, Text, Right,Button,Icon, Content, ActionSheet} from 'native-base'
import {Linking} from 'expo'


import Title from '../Title';
import { ChampionshipsStore, ChampionshipsActions } from '../../store/ChampionshipsStore';
import Notice from '../Notice';
import { UsersStore } from '../../store/UserStore';


const trophyAvatarSrc = require('../../assets/images/championship/trophy-avatar.png')



class ChampionshipList extends Reflux.Component {
 state = {

 }
  constructor(props) {
    super(props);
    this.stores = [ChampionshipsStore,UsersStore];

  }

  componentDidMount(){
    ChampionshipsActions.list()
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
  onChallenge(championship){
    this.props.navigation.navigate("ChallengeCreate",{championship})
  }
  renderItems(){
    const styles = this.props.style;
    if(this.state.Championships.data.length == 0){
      return (
        <Notice text="No estás inscripto a ningún torneo." />
      )
    }

    actionSheets = (championship) =>{      
      const BUTTONS = ["Invitar", "Desafiar con este torneo","Cancelar"];
      const DESTRUCTIVE_INDEX = 2;
      const CANCEL_INDEX = 3;
      ActionSheet.show(
        {
          options: BUTTONS,
          cancelButtonIndex: CANCEL_INDEX,
          destructiveButtonIndex: DESTRUCTIVE_INDEX,
          title: "Opciones"
        },
        buttonIndex => {

          switch(buttonIndex){
            case 0: this.onShare(championship);break;
            case 1: this.onChallenge(championship);break;
            default: break;
          }
          
        }
      );
    }
    let isFirst = true;
    return this.state.Championships.data.map((championshipUsers)=>{
      const championship = championshipUsers.championship
      const button = () => {
        return (
          <Button transparent onPress={()=>actionSheets(championship)}>
            <Icon name="gear" style={styles.icon} type="FontAwesome"/>
          </Button>
        )
      };
      const buttonRender = (championship.user_id == this.state.user.id) ? button() : null;
      const itemStyle = isFirst ? {...styles.listItemFirst,...styles.listItem} : styles.listItem;
      isFirst = false;
      return (

        <ListItem avatar button style={itemStyle} key={championship.id} onPress={()=>this.viewItem(championship)}>
          <Left>
            <View  style={styles.thumbnail } >
            <Image source={trophyAvatarSrc}  style={styles.thumbnailImg } />
            </View>
          </Left>
          <Body>
            <Text style={styles.championshipName}>{championship.name}</Text>
            <Text style={styles.text}>Organizado por {championship.user.first_name} {championship.user.last_name}{'\n'}
            finaliza el {this.formatDate(championship.end_date)}
            </Text>
          </Body>
          <Right>
            {buttonRender}
          </Right>
        </ListItem>
      )
    })
  }
  
  render() {
    const styles = this.props.style;
    return (
      <Content style={styles.container}>
        <Title text={'TORNEOS \n SUPERLIGA'}></Title>
        <List style={styles.list}>
          {this.renderItems()}
        </List>
      </Content>
    );
  }
}


export default connectStyle('SuperLiga.ChampionshipList')(ChampionshipList);