import React, { Component } from 'react';
import Reflux from 'reflux';
import { View } from 'react-native';
import {connectStyle, Icon, Button} from 'native-base'
import { NotificationsStore, NotificationsActions } from '../../store/NotificationsStore';
import NotificationItem from './NotificationItem';
import Title from '../Title';



class Notification extends Reflux.Component {

  constructor(props) {
    super(props);
    this.store = NotificationsStore

  }

  componentDidMount(){
    NotificationsActions.list()
  }

  renderItems  = () => {
    return this.state.Notifications.data.map((notification)=>{
        return (<NotificationItem notification={notification} key={notification.id} navigation={this.props.navigation}/>)
    })
  }
  

  render() {
    const styles = this.props.style;
    return (
      <View style={styles.container} >
        <Title text={'NOTIFICATIONES'}></Title>
        {this.renderItems()}
      </View>
    );
  }
}


export default connectStyle('SuperLiga.Notification')(Notification);