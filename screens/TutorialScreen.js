import React from 'react';

import {Image,View} from 'react-native'

import {connectStyle,Container, Content,Header,Button,Icon,Left,Body,Title,Right } from 'native-base'
import Wallpaper from '../components/Wallpaper';
import AppHeader from '../components/AppHeader/AppHeader';

import tutorialImg from '../assets/images/tutorial1.png';
import tutorialImg2 from '../assets/images/tutorial2.png';
import tutorialImg3 from '../assets/images/tutorial3.png';
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
              <Icon name='ios-arrow-back' style={styles.icon} />
            </Button>
          </Left>
        </Header>
        <Content contentContainerStyle={styles.game}>
          <View style={{flex:1,width:"100%",height:"100%"}}>
            <Image source={tutorialImg} style={styles.tutorialImg} resizeMethod='resize' resizeMode='contain'></Image>
            <Image source={tutorialImg2} style={styles.tutorialImg2} resizeMethod='resize' resizeMode='contain'></Image>
            <Image source={tutorialImg3} style={styles.tutorialImg3} resizeMethod='resize' resizeMode='contain'></Image>

          </View>
        </Content>
      </Container>
    );
  }
}

export default connectStyle('SuperLiga.TutorialScreen')(TutorialScreen);