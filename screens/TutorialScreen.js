import React from 'react';

import {Image} from 'react-native'

import {connectStyle,Container, Content,Header,Button,Icon,Left,Body,Title,Right } from 'native-base'
import Wallpaper from '../components/Wallpaper';
import AppHeader from '../components/AppHeader/AppHeader';

import tutorialImg from '../assets/images/tutorial.png';
import Layout from '../constants/Layout';



class TutorialScreen extends React.Component {
  goBack = () => {
    this.props.navigation.navigate("Home");
  }
  render() {
    const styles = this.props.style;
    return (
      <Container style={styles.container}>
        <Header transparent>
          <Left>
            <Button transparent
              onPress={this.goBack}
            >
              <Icon name='arrow-back' style={styles.icon} />
            </Button>
          </Left>
        </Header>
        <Content contentContainerStyle={styles.game}>
          <Image source={tutorialImg} style={styles.tutorialImg}></Image>
        </Content>
      </Container>
    );
  }
}

export default connectStyle('SuperLiga.TutorialScreen')(TutorialScreen);