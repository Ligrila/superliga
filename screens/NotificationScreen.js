import React from 'react';

import {connectStyle,Container, Content } from 'native-base'
import Wallpaper from '../components/Wallpaper';
import AppHeader from '../components/AppHeader/AppHeader';

import bgSrc from '../assets/images/championship/bg.png';
import Notification from '../components/Notification';



class NotificationScreen extends React.Component {
  render() {
    const styles = this.props.style;
    return (
      <Container>
        <Wallpaper source={bgSrc}>
        <AppHeader drawerOpen={() => {this.props.navigation.openDrawer()}} />
        <Content contentContainerStyle={styles.content} padder>
          <Notification navigation={this.props.navigation}/>
        </Content>
        </Wallpaper>
      </Container>
    );
  }
}

export default connectStyle('SuperLiga.NotificationScreen')(NotificationScreen);