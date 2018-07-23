import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Container, Content } from 'native-base'

import Wallpaper from '../components/Wallpaper';
import AppHeader from '../components/AppHeader/AppHeader';


import bgSrc from '../assets/images/bg.png';

export default class GameScreen extends React.Component {
  render() {
    return (
      <Container>
        <Wallpaper source={bgSrc}>
        <AppHeader drawerOpen={() => {this.props.navigation.openDrawer()}} game={true} />
        <Content>
             
        </Content>
        </Wallpaper>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
