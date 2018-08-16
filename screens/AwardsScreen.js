import React from 'react';

import {connectStyle,Container, Content } from 'native-base'
import Wallpaper from '../components/Wallpaper';
import AppHeader from '../components/AppHeader/AppHeader';

import bgSrc from '../assets/images/awards/bg.png';
import Awards from '../components/Awards';



class AwardsScreen extends React.Component {
  render() {
    const styles = this.props.style;
    return (
      <Container>
        <Wallpaper source={bgSrc}>
        <AppHeader drawerOpen={() => {this.props.navigation.openDrawer()}} />
        <Content contentContainerStyle={styles.game}>
          <Awards />
        </Content>
        </Wallpaper>
      </Container>
    );
  }
}

export default connectStyle('SuperLiga.AwardsScreen')(AwardsScreen);