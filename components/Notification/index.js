import React, { Component } from 'react';
import Reflux from 'reflux';
import { View } from 'react-native';
import {connectStyle, Icon, Button} from 'native-base'
import { NotificationsStore, NotificationsActions } from '../../store/NotificationsStore';
import NotificationItem from './NotificationItem';
import Title from '../Title';
import { UsersActions } from '../../store/UserStore';



class Notification extends Reflux.Component {

  constructor(props) {
    super(props);
    this.store = NotificationsStore

  }

  componentDidMount(){
    NotificationsActions.list()
    NotificationsActions.notificationsLoaded.listen(()=>{
      UsersActions.update()
    })
  }

  renderItems  = () => {
    return this.state.Notifications.data.map((notification,index)=>{
        const colorIndex = (index+1)%3
        return (<NotificationItem colorIndex={colorIndex} notification={notification} key={notification.id} navigation={this.props.navigation}/>)
    })
  }
  

  render() {
    const styles = this.props.style;
    return (
      <View style={styles.container} >
        <Title text={'MIS \n NOTIFICACIONES'}></Title>
        {this.renderItems()}
      </View>
    );
  }
}


export default connectStyle('SuperLiga.Notification')(Notification);