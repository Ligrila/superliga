import React from 'react';

import {Image} from 'react-native'

import {connectStyle,Container, Content } from 'native-base'
import Wallpaper from '../components/Wallpaper';
import AppHeader from '../components/AppHeader/AppHeader';

import tutorialImg from '../assets/images/tutorial.png';
import Layout from '../constants/Layout';



class TutorialScreen extends React.Component {
  render() {
    const styles = this.props.style;
    return (
      <Container>
        <AppHeader drawerOpen={() => {this.props.navigation.openDrawer()}} />
        <Content contentContainerStyle={styles.game}>
          <Image source={tutorialImg} style={styles.tutorialImg}></Image>
        </Content>
      </Container>
    );
  }
}

export default connectStyle('SuperLiga.TutorialScreen')(TutorialScreen);