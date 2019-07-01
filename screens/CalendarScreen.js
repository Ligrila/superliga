import React from 'react';

import {connectStyle,Container, Content } from 'native-base'
import Wallpaper from '../components/Wallpaper';
import AppHeader from '../components/AppHeader/AppHeader';

import bgSrc from '../assets/images/bg.png';
import Calendar from '../components/Calendar';


class CalendarScreen extends React.Component {
  render() {
    const styles = this.props.style;
    return (
      <Container>
        <Wallpaper source={bgSrc}>
        <AppHeader navigation={this.props.navigation} drawerOpen={() => {this.props.navigation.openDrawer()}} />
        <Content padder contentContainerStyle={styles.game}>
          <Calendar />
        </Content>
        </Wallpaper>
      </Container>
    );
  }
}

export default connectStyle('SuperLiga.CalendarScreen')(CalendarScreen);