import React, { Component } from 'react';
import Reflux from 'reflux';
import {  View, Alert } from 'react-native';
import {connectStyle,Toast,  Text,Button, Content} from 'native-base'



import Avatar from '../Avatar';
const trophyAvatarSrc = require('../../assets/images/championship/trophy-avatar.png')





class ChampionshipItem extends React.Component {
 state = {

 }
 championship = {}

  constructor(props) {
    super(props);
    this.championship = this.props.championship;

  }

  componentDidMount(){
   

  }

  formatDate(s){
    const pad = function(num) { return ('00'+num).slice(-2) };
    const d = new Date(s.split(" ")[0]);
    const day = pad(d.getDate());
    const month = pad(d.getMonth() + 1);
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  }

  

  

  render() {
    const styles = this.props.style;
    const nameContainerStyles = this.props.altrow ? {...styles.nameContainer,...styles.nameContainerAltRow} : styles.nameContainer
    const avatar = this.championship.avatar ? {uri:this.championship.avatar} : trophyAvatarSrc
    return (
        <View style={styles.container}>
            <View style={styles.position}>
                <Text style={styles.positionText}>{this.championship.position}º</Text>
            </View>
            <View style={nameContainerStyles}>
                <View style={styles.name}>
                    <Text style={styles.nameText}>
                      {this.championship.name} {"\n"}
                      {this.championship.users_count} jugadores
                    </Text>
                    
                </View>
                <View style={styles.points}>
                    <Text style={styles.pointsText}>{this.championship.points}p</Text>
                    
                </View>
                <View style={styles.challenge}>

                </View>

            </View>
            <View style={styles.avatar}>
              <Avatar mini avatar={avatar}></Avatar>
            </View>

        </View>
    );
  }
}


export default connectStyle('SuperLiga.ChampionshipItem')(ChampionshipItem);