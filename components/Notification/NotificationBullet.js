import React, { Component } from 'react'
import { View } from 'react-native'
import {connectStyle,Text} from 'native-base'
import Reflux from 'reflux'
import { UsersStore } from '../../store/UserStore';

class NotificationBullet extends Reflux.Component {
  constructor(props){
      super(props)
      this.store = UsersStore
  }
  render() {
    if(this.state.user.unreaded_notifications_count<=0){
        return null;
    }
    const styles = this.props.style
    console.log({styles})

    return (
      <View style={styles.container}>
        <Text style={styles.text}>{this.state.user.unreaded_notifications_count} </Text>
      </View>
    )
  }
}


export default connectStyle('SuperLiga.NotificationBullet')(NotificationBullet)