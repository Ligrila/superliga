import React, { Component } from 'react';
import Reflux from 'reflux';
import { Share } from 'react-native';
import {connectStyle,List, ListItem, Left, Body, Thumbnail, Text, Right,Button,Icon, Content} from 'native-base'
import {Linking} from 'expo'


import Title from '../Title';
import { ChampionshipsStore, ChampionshipsActions } from '../../store/ChampionshipsStore';
import Notice from '../Notice';

const logo = require('../../assets/images/app_logo.png')


class ChampionshipList extends Reflux.Component {
 state = {

 }
  constructor(props) {
    super(props);
    this.store = ChampionshipsStore;

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
  renderItems(){
    const styles = this.props.style;
    if(this.state.Championships.data.length == 0){
      return (
        <Notice text="No estás inscripto a ningún torneo." />
      )
    }

    return this.state.Championships.data.map((championshipUsers)=>{
      const championship = championshipUsers.championship
      const avatar = championship.user.avatar
      return (

        <ListItem avatar button style={styles.listItem} key={championship.id} onPress={()=>this.viewItem(championship)}>
          <Left>
            <Thumbnail source={{uri:avatar}} />
          </Left>
          <Body>
            <Text style={styles.text}>{championship.name}</Text>
            <Text note>Organizado por {championship.user.first_name} {championship.user.last_name}{'\n'}
            del {this.formatDate(championship.start_date)}  al {this.formatDate(championship.end_date)}
            </Text>
          </Body>
          <Right>
            <Button transparent onPress={()=>this.onShare(championship)}>
              <Icon name="share-alt-square" type="FontAwesome"/>
            </Button>
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