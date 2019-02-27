import React, { Component } from 'react';
import Reflux from 'reflux';
import { Share, Image, View } from 'react-native';
import {connectStyle,List, ListItem, Left, Body, Text, Right,Button,Icon, Content, ActionSheet} from 'native-base'
import {Linking} from 'expo'


import Title from '../Title';
import { AllChampionshipsStore, AllChampionshipsActions } from '../../store/AllChampionshipsStore';
import Notice from '../Notice';
import { UsersStore } from '../../store/UserStore';


const trophyAvatarSrc = require('../../assets/images/championship/trophy-avatar.png')



class ChallengeChampionshipList extends Reflux.Component {
 state = {

 }
  constructor(props) {
    super(props);
    this.stores = [AllChampionshipsStore,UsersStore];

  }

  componentDidMount(){
    AllChampionshipsActions.list()
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
  renderItems(){
    const styles = this.props.style;
    if(this.state.AllChampionships.data.length == 0){
      return (
        <Notice text="Ups no encontramos ningún torneo." />
      )
    }

    actionSheets = (championship) =>{      
      const BUTTONS = ["Invitar", "Cancelar"];
      const DESTRUCTIVE_INDEX = 1;
      const CANCEL_INDEX = 2;
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
            default: break;
          }
          
        }
      );
    }
    let isFirst = true;
    return this.state.AllChampionships.data.map((championship)=>{
      
      const button = () => {
        return (
          <Button icon onPress={()=>actionSheets(championship)}>
            <Icon name="handshake-o" style={styles.icon} type="FontAwesome"/>
          </Button>
        )
      };
      const buttonRender = (championship.user_id != this.state.user.id) ? button() : null;
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
            <Text>{championship.points} puntos</Text>
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
        <Title text={'DESAFIOS \n SUPERLIGA'}></Title>
        <List style={styles.list}>
          {this.renderItems()}
        </List>
      </Content>
    );
  }
}


export default connectStyle('SuperLiga.ChallengeChampionshipList')(ChallengeChampionshipList);