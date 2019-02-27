import React, { Component } from 'react';

import { View,TouchableOpacity} from 'react-native';
import {connectStyle, Text, Button, Body, Right, Left} from 'native-base'



class NotificationItem extends React.Component {

  constructor(props) {
    super(props);
    this.notification = this.props.notification
  }



  
  renderDate(){
    console.log(this.notification.created)
    const dateParts = (this.notification.created.split(" ")[0].split('-'))
    const year = dateParts[0]
    const month = dateParts[1]
    const day = dateParts[2]
    
    return `${day}/${month}/${year}`
  }
  onPress = () => {
    const notification = this.notification
    if(notification.data.navigate){
      this.props.navigation.navigate(notification.data.navigate,notification.data.params || null )
    }
  }
  render() {
    const styles = this.props.style;
    return (
      <TouchableOpacity onPress={this.onPress}>
      <View style={styles.container} >
        <View style={styles.body}><Text style={styles.dateText}>{this.renderDate()}</Text><Text style={styles.text}>{this.notification.body}</Text></View>
      </View>
      </TouchableOpacity>
    );
  }
}


export default connectStyle('SuperLiga.NotificationItem')(NotificationItem);