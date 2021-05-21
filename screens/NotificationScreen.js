import React from 'react';

import {connectStyle,Container, Content } from 'native-base'
import {RefreshControl} from 'react-native'

import Wallpaper from '../components/Wallpaper';
import AppHeader from '../components/AppHeader/AppHeader';

import bgSrc from '../assets/images/championship/bg2.png';
import Notification from '../components/Notification/Notifications';
import { NotificationsActions } from '../store/NotificationsStore';



class NotificationScreen extends React.Component {
  state = {
    refreshing: false
  }
  _onRefresh = ()=>{
    NotificationsActions.list()
  }
  render() {
    const styles = this.props.style;
    return (
      <Container>
        <Wallpaper source={bgSrc}>
        <AppHeader navigation={this.props.navigation} drawerOpen={() => {this.props.navigation.openDrawer()}} />
        <Content contentContainerStyle={styles.content}
                                refreshControl={
                                  <RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={this._onRefresh} />
                                  }        
          >        
          <Notification navigation={this.props.navigation}/>
        </Content>
        </Wallpaper>
      </Container>
    );
  }
}

export default connectStyle('SuperLiga.NotificationScreen')(NotificationScreen);