import React, { Component } from 'react'
import { View,Image } from 'react-native'
import {connectStyle,Text} from 'native-base'
import Enviroment from '../../constants/Enviroment';


const avatarUri = Enviroment.apiUrl + '/users/avatar/'

class Message extends Component {
  render() {
    const styles = this.props.style
    return (
      <View style={styles.container}>
        <Image
            style={styles.avatar} source={{uri:avatarUri+this.props.message.user_id}}></Image>
        <Text style={styles.message}> {this.props.message.name}:  {this.props.message.message} </Text>
      </View>
    )
  }
}

export default connectStyle('SuperLiga.ChatMessage')(Message)